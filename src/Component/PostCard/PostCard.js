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
    <Link
      style={{ textDecoration: "none" }}
      to={{ pathname: "post/" + props.data.id }}
    >
      <div className={classes.PostCardContainer}>
        <div className={classes.Link}>
          <span>{props.data.link}</span>
        </div>
        <div className={classes.Gauge}>
          <GaugeChart
            nrOfLevels={10}
            colors={["red", "yellow", "green"]}
            textColor="black"
            animate={true}
            percent={props.data.ratingScore / 100}
            needleColor="#fff"
            needleBaseColor="#fff"
            hideText={true}
          />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
