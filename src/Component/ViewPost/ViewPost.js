import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import firebase from "../../Config/firebase";
import classes from "./ViewPost.module.css";
import GaugeChart from "react-gauge-chart";

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
        <div>
          <div style={{ borderTop: " 1px solid rgb(157, 187, 243)" }}>
            {" "}
            <span className={classes.Link}>{this.state.post.link}</span>
            <span
              onClick={() => this.setState({ infoOpen: !this.state.infoOpen })}
              className={classes.Dots}
            />
            <Collapse in={this.state.infoOpen}>
              <div className={classes.MoreInfo}>
                <div className={classes.MoreInfoEl}>
                  <span
                    style={{
                      color: "lightblue",
                    }}
                  >
                    Created by :
                  </span>{" "}
                  {this.state.post.createUserEmail.split("@")[0]}
                </div>
                <div className={classes.MoreInfoEl}>
                  {" "}
                  <span
                    style={{
                      color: "lightblue",
                    }}
                  >
                    Date Posted :
                  </span>{" "}
                  {this.timeStampToString(this.state.post.createDate.seconds)}
                </div>
                <div className={classes.MoreInfoEl}>
                  <span
                    style={{
                      color: "lightblue",
                    }}
                  >
                    Full link :
                  </span>{" "}
                  <a href={this.state.post.link} target="_blank">
                    {this.state.post.link}
                  </a>
                </div>
                {this.state.post.ratingScore ? (
                  <div className={classes.MoreInfoEl}>
                    <span
                      style={{
                        color: "lightblue",
                      }}
                    >
                      Truth score :
                    </span>{" "}
                    {Math.round(this.state.post.ratingScore)}%
                  </div>
                ) : (
                  <div className={classes.MoreInfoEl}>
                    <span
                      style={{
                        color: "lightblue",
                      }}
                    >
                      Truth score :
                    </span>{" "}
                    This post has not been rated.
                  </div>
                )}
                <div className={classes.MoreInfoEl}>
                  <span
                    style={{
                      color: "lightblue",
                    }}
                  >
                    Total rates :
                  </span>{" "}
                  {this.state.post.rates.length}
                </div>
              </div>
            </Collapse>
          </div>
          <div className={classes.iframeContainer}>
            <div className={classes.Gauge}>
              <GaugeChart
                nrOfLevels={10}
                cornerRadius={1}
                colors={["red", "yellow", "forestgreen"]}
                arcWidth={0.3}
                animate={true}
                percent={this.state.post.ratingScore / 100}
                needleColor="#fff"
                needleBaseColor="rgb(206, 223, 255)"
                hideText={true}
                animDelay={0}
              />
            </div>
            <iframe className={classes.iframe} src={link} />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default withRouter(ViewPost);
