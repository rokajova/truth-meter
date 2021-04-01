import React, { Component } from "react";
import { ButtonGroup, Form, Modal } from "react-bootstrap";
import firebase from "../../Config/firebase";
import GaugeChart from "react-gauge-chart";
import classes from "./RatePost.module.css";

const db = firebase.firestore();

export default class RatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      hasRated: false,
      show: false,
      // posts ratingScore from firebase
      ratingScore: "",
      // current rate by user
      rate: "",
      // array with ratevalues from firebase
      rates: [],
    };
  }

  // check if the user has rated on the post on first render, check what the ratingScore of the post is
  // and update state with the updated ratinScore, set state accordingly
  componentDidMount() {
    // get post and user refs
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    const postRef = db
      .collection("Posts")
      .doc(this.props.location.pathname.slice(6));

    userRef.get().then((doc) => {
      this.setState({ hasLoaded: true });
      if (doc.exists) {
        if (
          doc.data().userRatesID.includes(this.props.location.pathname.slice(6))
        ) {
          this.setState({ hasRated: true });
          console.log("user has rated on this post!");
        } else {
          console.log("user has not rated on this post!");
        }
      }
    });
    // TypeError: Cannot read property 'ratingScore' of undefined, this happens when i go to an unavailable website? need to change link input

    postRef.onSnapshot((doc) => {
      this.setState({ ratingScore: doc.data().ratingScore });
    });
  }

  updateRatingScore = async () => {
    // get post ref
    const postRef = db
      .collection("Posts")
      .doc(this.props.location.pathname.slice(6));

    const doc = await postRef.get();
    // calculate the sum of rates array
    const ratingScoreSum = doc
      .data()
      .rates.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    // update ratingScore with rates array average
    await postRef.update({
      ratingScore: ratingScoreSum / doc.data().rates.length,
    });
  };
  updatePostsCol = async () => {
    const postRef = db
      .collection("Posts")
      .doc(this.props.location.pathname.slice(6));
    // add current rate to the rates array in the Posts doc
    const doc = await postRef.get();
    await postRef.update({
      rates: [...doc.data().rates, this.state.rate],
    });
    this.updateRatingScore();
  };
  updateUsersCol = () => {
    // get user ref
    const userRef = db.collection("Users").doc(this.props.auth.uid);

    return userRef.onSnapshot((doc) => {
      // if user has rated the post
      if (
        doc.data().userRatesID.includes(this.props.location.pathname.slice(6))
      ) {
        this.setState({ hasRated: true });
        // if user has NOT rated the post, update userRates field with post id and rating score in Users collection
      } else {
        userRef.update({
          userRatesID: [
            ...doc.data().userRatesID,

            this.props.location.pathname.slice(6),
          ],
          userRatesScore: [...doc.data().userRatesScore, this.state.rate],
        });
      }
    });
  };

  // submit rate to firebase with all the necessary updates
  onSubmit = () => {
    this.setState({ show: false });
    this.updateUsersCol();
    this.updatePostsCol();
  };

  // change rate state to what the rate sliders value is
  onChangeRateInput = (value) => {
    this.setState({ rate: value });
  };

  render() {
    if (this.state.hasLoaded) {
      return (
        <div className={classes.RatePostContainer}>
          <div className={classes.Gauge}>
            <GaugeChart
              nrOfLevels={10}
              cornerRadius={1}
              colors={["red", "yellow", "forestgreen"]}
              arcWidth={0.3}
              animate={true}
              percent={this.state.ratingScore / 100}
              needleColor="#fff"
              needleBaseColor="rgb(206, 223, 255)"
              hideText={true}
              animDelay={0}
            />
          </div>
          {this.props.auth.isEmpty ? (
            <span>Please log in to rate this post</span>
          ) : (
            <div>
              {" "}
              {this.state.hasRated ? (
                <div>
                  <span>You have already rated this post</span>
                </div>
              ) : (
                <div>
                  <span
                    onClick={() => {
                      this.setState({ show: true });
                    }}
                    className={classes.RateThisPost}
                  >
                    Rate this post
                  </span>{" "}
                </div>
              )}
            </div>
          )}

          <Modal
            show={this.state.show}
            onHide={() => {
              this.setState({ show: false });
            }}
            centered={true}
            size="lg"
            className={classes.RateModal}
          >
            <Modal.Body className={classes.RateModalBody}>
              <Form>
                <Form.Group controlId="formBasicRange">
                  <Form.Control
                    color="success"
                    type="range"
                    value={this.state.rate}
                    min="0"
                    max="100"
                    onChange={(e) => this.onChangeRateInput(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <div style={{ textAlign: "center" }}>
                {this.state.rate ? (
                  <button
                    className={classes.button}
                    onClick={() => this.onSubmit()}
                  >
                    Rate this post as {this.state.rate}%
                  </button>
                ) : (
                  <button className={classes.button} disabled>
                    Use the slider to rate
                  </button>
                )}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      return null;
    }
  }
}
