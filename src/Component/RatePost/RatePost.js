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
      ratingScore: 0,
    };
  }

  componentDidMount() {}

  onSubmit = () => {
    // get user and post refs
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
