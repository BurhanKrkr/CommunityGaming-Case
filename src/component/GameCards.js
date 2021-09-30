import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/style.scss";
import { Card } from "react-bootstrap";
import alertify from "alertifyjs";
import axios from "axios";
import moment from "moment";
import Pagination from "./Pagination";

export default function GameCards() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);


  const getData = async () => {
    // fetch("http://localhost:3000/cards")
    //   .then(function (response) {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then(function (myJson) {
    //     setData(myJson);
    //   });

    const response = await axios.get("http://localhost:3000/cards");
    response.data.sort((a, b) => {
        return b.score - a.score;
      });
      setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const showDeleteConfirm = (item) => {
    alertify.confirm(
      "<b>REMOVE NOMINEE</b>",
      "Do you want to remove <b>" + item?.title + "</b> from nominees?",
      async function () {
        await axios.delete(`http://localhost:3000/cards/${item.id}`);
        getData();
        alertify.success(item?.title + " removed from nominess!");
      },
      function () {
        alertify.error("Cancel");
        return;
      }
    );
  };
  const UpConfirm = async (item) => {
    item.score = parseInt(item.score) + 1;
    item.lastUpdate = moment(new Date()).format("Do/MMMM h:m ");
    console.log(item.score);
    console.log(item.lastUpdate);
    await axios.put(`http://localhost:3000/cards/${item.id}`, item);

    getData();
  };
  const DownConfirm = async (item) => {
    item.score = parseInt(item.score) - 1;
    item.lastUpdate = moment(new Date()).format("Do/MMMM h:m ");
    console.log(item.score);
    console.log(item.lastUpdate);

    await axios.put(`http://localhost:3000/cards/${item.id}`, item);

    getData();
  };

  const SortCard = (e) => {
    const selected = e.target.value;
    console.log(e.target.value);

    let orderedArray = [...data];
    if (selected === "MOST POINTS") {
      console.log("Büyükten küçüğe");
      console.log(orderedArray);
      orderedArray.sort(compareDesc);
    } else if (selected === "LESS POINTS") {
      console.log("Küçükten büyüğe");
      orderedArray.sort(compareAsc);
    }

    console.log(orderedArray);
    setData(orderedArray);

    function compareAsc(a, b) {
      if (a.score > b.score) {
        return 1;
      }
      if (a.score < b.score) {
        return -1;
      }
      return 0;
    }

    function compareDesc(a, b) {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
  const totalPagesNum = Math.ceil(data.length / cardsPerPage);

  return (
    <>
      <div
        className="func-btns"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex" }}>
          <Link to="/add" className="add_nominee">
            <i className="fas fa-plus"></i> {""} ADD NOMINEE
          </Link>
        </div>
        <div style={{ display: "flex", padding: "1.5rem" }}>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => SortCard(e)}
          >
            <option className="default">SORTING</option>
            <option defaultValue="1">MOST POINTS</option>
            <option defaultValue="2">LESS POINTS</option>
          </select>
        </div>
      </div>
      <center>
        <h2 className="title_explain" style={{ color: "white" }}>
          <b>VOTE</b> FOR <b>THE BEST TOURNAMENT</b> STREAMED!
        </h2>
      </center>
      <div style={{ textAlign: "center", margin: "40px" }}>
        {currentCards?.map((item, index) => {
          return (
            <Card className="MainPage_FeaturedItem" key={index}>
              <Card.Img variant="top" src={item.image} />

              <div className="vote-count">
                <center>
                  <h6>
                    {item.score}
                    <br /> Points
                  </h6>
                </center>
              </div>
              <Card.Body>
                <Card.Title className="SearchPageResultItem_Card_Title">
                  {item.title}
                </Card.Title>
                <Card.Text>
                  <b>Winner: </b> {item.detail}
                  <br />
                  <b>Last Vote Date: </b> {item.lastUpdate}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ backgroundColor: "transparent" }}>
                {item.footer}
                <button className="btn_down">
                  <i
                    title="down"
                    className="fas fa-thumbs-down"
                    onClick={(e) => DownConfirm(item)}
                  ></i>
                </button>
                <button className="btn_up">
                  <i
                    title="up"
                    className="fas fa-thumbs-up"
                    onClick={(e) => UpConfirm(item)}
                  ></i>
                </button>
                <button className="trash_btn">
                  <div
                    className="icon"
                    title="trash"
                    onClick={(e) => showDeleteConfirm(item)}
                  >
                    <div className="lid"></div>
                    <div className="lidcap"></div>
                    <div className="bin"></div>
                  </div>
                </button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
      <center>
        <Pagination
          pages={totalPagesNum}
          setCurrentPage={setCurrentPage}
        ></Pagination>
      </center>
    </>
  );
}
