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
      ratingScore: "",
    };
  }

  componentDidMount() {
    console.log();
  }

  onSubmit = () => {
    // get user and post refs
    const userRef = db.collection("Users").doc(this.props.auth.uid);

    const postRef = db
      .collection("Posts")
      .doc(this.props.location.state.post.id);

    return userRef.onSnapshot((doc) => {
      if (doc.data().userRates.includes(this.props.location.state.post.id)) {
        this.setState({ hasRated: true });
        console.log("has this user rated? ", this.state.hasRated);
      } else {
        userRef.update({
          userRates: [
            ...doc.data().userRates,
            this.props.location.state.post.id,
          ],
        });
      }
    });
  };

  onChangeRateInput = (value) => {
    this.setState({ ratingScore: value });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>{this.state.ratingScore}</div>

        <Input
          type="range"
          min="0"
          max="100"
          value={this.state.ratingScore}
          onChange={(e) => this.onChangeRateInput(e.target.value)}
        />
        {this.state.hasRated ? (
          <Button disabled>Submit</Button>
        ) : (
          <Button color="success" onClick={() => this.onSubmit()}>
            Submit
          </Button>
        )}
      </div>
    );
  }
}
