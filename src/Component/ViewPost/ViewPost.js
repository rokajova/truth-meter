import React, { Component } from "react";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import firebase from "../../Config/firebase";

const db = firebase.firestore();

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      isLoaded: false,
    };
    console.log(this.props);
  }

  //If state is defined, populate post state with post data from this.props.location.state.post, set isLoaded to true.
  //If state is not defined, run getPostByID function passing post id
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

  // Convert createDate timestamp to string with result being YYYY/MM/DD HH:MM:SS
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

  // get article from Posts collection in firestore, set article state with data
  getPostByID = (postid) => {
    db.collection("Posts")
      .doc(postid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState(
            {
              post: doc.data(),
            },
            () => {
              this.setState({
                isLoaded: true,
              });
            }
          );
        } else {
          this.props.history.push({ pathname: "/" });
        }
      });
  };

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
