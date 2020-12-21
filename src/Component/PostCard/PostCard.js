import React from "react";
import { Link } from "react-router-dom";

const PostCard = (props) => {
  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      <Link to={"post/" + props.data.id}>
        <h1>{props.data.title}</h1>
        <a href={props.data.link}>{props.data.link}</a>
      </Link>
    </div>
  );
};

export default PostCard;
