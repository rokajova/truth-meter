import React, { Component } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";

class RouterManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default RouterManager;
