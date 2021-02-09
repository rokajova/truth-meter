import React from "react";
import { Link } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
import firebase from "../../Config/firebase";

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
  const chartStyle = { width: 400 };

  return (
    <Link
      to={{ pathname: "post/" + props.data.id, state: { post: props.data } }}
    >
      <div style={{ border: "1px solid black", margin: "10px" }}>
        <h1>{props.data.title}</h1>
        <h3>{props.data.link}</h3>
        <div>
          Create Date : {timeStampToString(props.data.createDate.seconds)}
        </div>
        <div>Posted By: {props.data.createUserName}</div>
        <div>RatingScore: {props.data.ratingScore} %</div>
        <GaugeChart
          style={chartStyle}
          textColor="black"
          id="gauge-chart6"
          animate={false}
          nrOfLevels={15}
          percent={props.data.ratingScore / 100}
          needleColor="#345243"
        />
      </div>
    </Link>
  );
};

export default PostCard;
