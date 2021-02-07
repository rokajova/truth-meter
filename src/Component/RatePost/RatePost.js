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
      rate: "20",
      // array with ratevalues from firebase
      rates: [],
    };
  }

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

  updatePosts = async () => {
    const postRef = db
      .collection("Posts")
      .doc(this.props.location.state.post.id);

    const doc = await postRef.get();
    await postRef.update({
      rates: [...doc.data().rates, this.state.rate],
    });
    this.blah();
  };

  blah = async () => {
    const postRef = db
      .collection("Posts")
      .doc(this.props.location.state.post.id);
    const doc = await postRef.get();
    const ratingScoreSum = doc
      .data()
      .rates.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    await postRef.update({
      ratingScore: ratingScoreSum / doc.data().rates.length,
    });
  };

  onSubmit = () => {
    // get user and post refs
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
        this.updatePosts();
      }
    });
  };

  onChangeRateInput = (value) => {
    this.setState({ rate: value });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          {this.state.rate + this.props.location.state.post.id}
        </div>
        <button onClick={() => this.updatePosts()}>update</button>
        <button onClick={() => this.blah()}>check</button>

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
