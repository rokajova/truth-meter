import React, { Component } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ViewPost from "../ViewPost/ViewPost";
import NewPost from "../NewPost/NewPost";
import Login from "../Login/Login";

import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const AdminOnly = (ComposedComponent, auth) => {
  class AdminOnly extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div>
          <ComposedComponent
            location={this.props.location}
            history={this.props.history}
            auth={auth}
          />
        </div>
      );
    }
  }
  return AdminOnly;
};

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
          <Route path="/login">
            <Login />
          </Route>
          <Route
            path="/post/:id"
            component={AdminOnly(ViewPost, this.props.auth)}
          />
          <Route
            path="/new-post"
            component={AdminOnly(NewPost, this.props.auth)}
          />
        </Switch>
      </div>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(withRouter(RouterManager));
