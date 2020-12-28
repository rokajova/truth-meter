import { ReactReduxContext } from "react-redux";
import React, { Component } from "react";
import { Container } from "reactstrap";
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

  timeStampToString = (ts) => {
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
  };

  getPostByID() {}

  render() {
    if (this.state.isLoaded) {
      return (
        <Container>
          <div>
            <div>Title: {this.state.post.title}</div>
            <div>Link: {this.state.post.link}</div>
            <div>
              Date: {this.timeStampToString(this.state.post.createDate.seconds)}
            </div>
          </div>
        </Container>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default withRouter(ViewPost);
