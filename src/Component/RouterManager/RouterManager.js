import React, { Component } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ViewPost from "../ViewPost/ViewPost";
import NewPost from "../NewPost/NewPost";

import { Switch, Route } from "react-router-dom";

class RouterManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/post/:id">
            <ViewPost />
          </Route>
          <Route path="/new-post">
            <NewPost />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default RouterManager;
