import React from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import GaugeChart from "react-gauge-chart";
import firebase from "../../Config/firebase";
import classes from "./PostCard.module.css";

const db = firebase.firestore();
// Convert createDate timestamp seconds to string with result being YYYY/MM/DD HH:MM:SS
export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    " " +
    (date.getHours() < 10 ? "0" : "") +
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes() +
    ":" +
    (date.getSeconds() < 10 ? "0" : "") +
    date.getSeconds()
  );
}

const PostCard = (props) => {
  return (
    <Container className={classes.PostCardContainer}>
      <Link
        style={{ textDecoration: "none" }}
        to={{ pathname: "post/" + props.data.id }}
      >
        <Row className={classes.Link}>
          {" "}
          <h4>{props.data.link}</h4>{" "}
          <GaugeChart
            className={classes.Gauge}
            textColor="black"
            id="gauge-chart6"
            animate={true}
            nrOfLevels={5}
            percent={props.data.ratingScore / 100}
            needleColor="#fff"
          />
        </Row>
      </Link>
    </Container>
  );
};

export default PostCard;
