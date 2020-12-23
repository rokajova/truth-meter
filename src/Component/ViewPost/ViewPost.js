import { ReactReduxContext } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      isLoaded: false,
    };
    console.log(this.props);
  }

  componentDidMount() {
    if (typeof this.props.location.state !== "undefined") {
      if (this.props.location.state.hasOwnProperty("post")) {
        this.setState(
          {
            post: this.props.location.state.post,
          },
          () => {
            this.setState({ isLoaded: true });
          }
        );
      }
    } else {
      this.getPostByID(this.props.match.params.id);
    }
  }

  getPostByID() {}

  render() {
    if (this.state.isLoaded) {
      return <div>{this.state.post.link}</div>;
    } else {
      return <div>Loading</div>;
    }
  }
}

export default withRouter(ViewPost);
