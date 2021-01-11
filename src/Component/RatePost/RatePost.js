import React, { Component } from "react";
import { Input, Button } from "reactstrap";

export default class RatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      ratingScore: ""
    };
  }

  onChangeRateInput = (value) => {
    this.setState({ratingScore: value})
  }

  render() {
    return (
      <div>
        <Input type="range" min="0" max="100" value={this.state.ratingScore} onChange={(e) => this.onChangeRateInput(e.target.value)}/>
        <Button>Rate</Button>
        {this.state.ratingScore}
      </div>
    );
  }
}
