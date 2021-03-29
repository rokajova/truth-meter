import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Collapse, Button } from "react-bootstrap";
import firebase from "../../Config/firebase";
import classes from "./ViewPost.module.css";

const db = firebase.firestore();

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      isLoaded: false,
      infoOpen: false,
    };
  }

  //If state is defined, populate post state with post data from this.props.location.state.post, set isLoaded to true.
  //If state is not defined, run getPostByID function passing post id
  componentDidMount() {
    this.getPostByID(this.props.match.params.id);
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
      // do i need to use onSnapshot here, if im migrating GaugeChart to RatePost component?
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
      // make the link have a protocol and the start ()
      let link;
      if (!this.state.post.link.slice(0, 4).includes("http")) {
        link = "https://" + this.state.post.link;
      } else {
        link = this.state.post.link;
      }

      return (
        <div className={classes.ViewPostContainer}>
          <span className={classes.Link}>{this.state.post.link}</span>
          <span
            onClick={() => this.setState({ infoOpen: !this.state.infoOpen })}
            className={classes.Dots}
          />

          {/* <Button
              // className={classes.Button}
              onClick={() => this.setState({ infoOpen: !this.state.infoOpen })}
              aria-controls="example-collapse-text"
              aria-expanded={this.state.infoOpen}
            ></Button> */}

          <Collapse in={this.state.infoOpen}>
            <div>info here</div>
          </Collapse>

          <iframe className={classes.iframe} src={link} />
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default withRouter(ViewPost);
