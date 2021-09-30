import { useState, useEffect } from "react";

const Pagination = ({ pages, setCurrentPage }) => {

  const numOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }
  const [currentButton, setCurrentBUtton] = useState(1);

  useEffect(()=>{
      setCurrentPage(currentButton)
  }, [currentButton, setCurrentBUtton])

  return (
    <div className="clearfix">
      <ul className="pagination" style={{display:"inline-flex"}}>
        <li
          className={`${
            currentButton === 1 ? "page-item disabled" : "page-item"
          }`}
        >
          <a
            href="#!"
            className="page-link"
            onClick={() =>
              setCurrentBUtton((prev) => (prev === 1 ? prev : prev - 1))
            }
          >
            Previous
          </a>
        </li>
        {numOfPages.map((page, index) => {
          return (
            <li
              key={index}
              className={`${
                currentButton === page ? "page-item active" : "page-item"
              }`}
            >
              <a
                href="#!"
                className="page-link"
                onClick={() => setCurrentBUtton(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={`${
            currentButton === numOfPages.length
              ? "page-item disabled"
              : "page-item"
          }`}
        >
          <a
            href="#!"
            className="page-link"
            onClick={() =>
              setCurrentBUtton((prev) =>
                prev === numOfPages ? prev : prev + 1
              )
            }
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

