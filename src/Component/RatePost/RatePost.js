import React, { Component } from "react";
import { Input, Button } from "reactstrap";

export default class RatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Input type="range" />
        <Button>Rate</Button>
      </div>
    );
  }
}
