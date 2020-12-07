import React, { Component } from "react";
import PostCard from "../PostCard/PostCard";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PostCard />
      </div>
    );
  }
}

export default Main;
