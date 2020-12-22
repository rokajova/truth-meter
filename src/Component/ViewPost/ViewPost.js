import { ReactReduxContext } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props);
  }
  render() {
    return <div>Post</div>;
  }
}

export default withRouter(ViewPost);
