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
  // gauge style

  return (
    <Link
      to={{ pathname: "post/" + props.data.id, state: { post: props.data } }}
    >
      <Container className={classes.PostCardContainer}>
        <Row>
          <Col sm={8}>{props.data.link}</Col>
          <Col sm={4}>
            <GaugeChart
              textColor="black"
              id="gauge-chart6"
              animate={false}
              nrOfLevels={15}
              percent={props.data.ratingScore / 100}
              needleColor="#345243"
            />
          </Col>
        </Row>
      </Container>
    </Link>
  );
};

export default PostCard;
