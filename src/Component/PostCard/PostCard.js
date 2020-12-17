import React from "react";

const PostCard = (props) => {
  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      <h1>{props.data.title}</h1>
      <a href={props.data.link}>{props.data.link}</a>
    </div>
  );
};

export default PostCard;
