import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Collapse, Button } from "react-bootstrap";
import GaugeChart from "react-gauge-chart";
import firebase from "../../Config/firebase";
import RatePost from "../RatePost/RatePost";

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
      const gaugeStyle = { width: 400 };
      return (
        <div style={{ border: "1px solid black" }}>
          <div>
            <p style={{ display: "inline-block" }}>{this.state.post.link}</p>
            <Button
              style={{ display: "inline-block" }}
              onClick={() => this.setState({ infoOpen: !this.state.infoOpen })}
              aria-controls="example-collapse-text"
              aria-expanded={this.state.infoOpen}
            ></Button>
            <Collapse in={this.state.infoOpen}>
              <div id="example-collapse-text">
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
          </div>

          <iframe
            src={this.state.post.link}
            style={{
              width: "100%",
              height: "80vh",
              border: "none",
            }}
          />
          <GaugeChart
            id="gauge-chart6"
            style={gaugeStyle}
            animate={false}
            textColor="black"
            nrOfLevels={15}
            percent={this.state.post.ratingScore / 100}
            needleColor="#345243"
          />
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default withRouter(ViewPost);
