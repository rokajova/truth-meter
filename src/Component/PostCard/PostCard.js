import React from "react";

const PostCard = (props) => {
  return (
    <div>
      <h1>{props.data.title}</h1>
      <h4>{props.data.link}</h4>
      <button onClick={() => console.log(props.data.link)}>as</button>
    </div>
  );
};

export default PostCard;
