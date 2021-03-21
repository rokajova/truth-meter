import React, { Component } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ViewPost from "../ViewPost/ViewPost";
import NewPost from "../NewPost/NewPost";
import Login from "../Login/Login";
import RatePost from "../RatePost/RatePost";
import Profile from "../Profile/Profile";
import Search from "../Search/Search";

import ProtectedRoute from "./ProtectedRoute";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// admin function
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

          <Route path="/search">
            <Search />
          </Route>

          <Route
            path="/profile"
            component={AdminOnly(Profile, this.props.auth)}
          />

          <Route path="/post/:id">
            <Route
              path="/post/:id"
              component={AdminOnly(ViewPost, this.props.auth)}
            />

            <Route
              path="/post/:id"
              component={AdminOnly(RatePost, this.props.auth)}
            />
          </Route>
          <Route
            path="/new-post"
            component={AdminOnly(NewPost, this.props.auth)}
          />
          {/* <ProtectedRoute
            path="/new-post"
            component={AdminOnly(NewPost, this.props.auth)}
            isAuth={!this.props.auth.isEmpty}
          /> */}

          {/* redirects to home page on non link */}
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
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
