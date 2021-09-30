import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import alertify from "alertifyjs";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export default function AddGameCard() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const setField = (e, field) => {
    data[field] = e?.target?.value;
    setData(data);
  };

  const form_OnSubmit = async (e) => {
    e.preventDefault();
    const newGameCard = {
      title: data.title,
      detail: data.detail,
      image: data.image,
      score: 0,
      lastUpdate: moment(new Date()).format("Do/MMMM  h:m "),
    };
    const response = await axios.post(
      "http://localhost:3000/cards",
      newGameCard
    );
    setData(response);
    history.push("/");
    alertify.success(data.title + " add to cart");
  };

  return (
    <div>
      <div style={{ marginLeft: "25%", marginRight: "25%" }}>
        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: "#263238", color: "white" }}
          >
            <center>
              <h4>
                <b>ADD NEW NOMINEE</b>
              </h4>
            </center>
          </div>
          <div className="card-body">
            <Form onSubmit={(e) => form_OnSubmit(e)}>
              <div className="form-group">
                <label htmlFor="title">Tournament Name</label>
                <Form.Control
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  onChange={(e) => setField(e, "title")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="winner">Tournament Winner Team</label>
                <Form.Control
                  type="text"
                  name="detail"
                  id="detail"
                  className="form-control"
                  onChange={(e) => setField(e, "detail")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Cover Image Url </label>
                <Form.Control
                  type="text"
                  name="image"
                  id="image"
                  className="form-control"
                  onChange={(e) => setField(e, "image")}
                />
              </div>
              <center>
                <Link to="/" className="btn btn-danger btn-block" type="submit">
                  Close
                </Link>
                <button className="btn btn-success btn-block" type="submit">
                  ADD NOMINEE
                </button>
              </center>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
