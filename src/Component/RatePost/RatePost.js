import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import firebase from "../../Config/firebase";

const db = firebase.firestore();

export default class RatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      hasRated: false,
      rate: "",
      // array with ratevalues from firebase
      rates: [],
    };
  }

  // check if the user has rated on the post on first render, set state accordingly
  componentDidMount() {
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        this.setState({ hasLoaded: true });
        if (
          doc.data().userRatesID.includes(this.props.location.state.post.id)
        ) {
          this.setState({ hasRated: true });
          console.log("user has rated on this post!");
        } else {
          console.log("user has not rated on this post!");
        }
      }
    });
  }

  updateRatingScore = async () => {
    // get post ref
    const postRef = db
      .collection("Posts")
      .doc(this.props.location.state.post.id);

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
      .doc(this.props.location.state.post.id);
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
      if (doc.data().userRatesID.includes(this.props.location.state.post.id)) {
        this.setState({ hasRated: true });
        // if user has NOT rated the post, update userRates field with post id and rating score in Users collection
      } else {
        userRef.update({
          userRatesID: [
            ...doc.data().userRatesID,

            this.props.location.state.post.id,
          ],
          userRatesScore: [...doc.data().userRatesScore, this.state.rate],
        });
      }
    });
  };

  // submit rate to firebase with all the necessary updates
  onSubmit = () => {
    this.updateUsersCol();
    this.updatePostsCol();
  };

  // change rate state to what the rate sliders value is
  onChangeRateInput = (value) => {
    this.setState({ rate: value });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          {this.state.rate + this.props.location.state.post.id}
        </div>

        {this.state.hasRated ? (
          <div>
            {" "}
            <Input type="range" min="0" max="100" disabled />
            <Button disabled>Submit</Button>
          </div>
        ) : (
          <div>
            <Input
              type="range"
              value={this.state.rate}
              min="0"
              max="100"
              onChange={(e) => this.onChangeRateInput(e.target.value)}
            />
            <Button color="success" onClick={() => this.onSubmit()}>
              Submit
            </Button>
          </div>
        )}
      </div>
    );
  }
}
