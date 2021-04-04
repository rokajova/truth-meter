import React, { Component } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ViewPost from "../ViewPost/ViewPost";
import NewPost from "../NewPost/NewPost";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import Reset from "../Login/Reset";
import RatePost from "../RatePost/RatePost";
import Profile from "../Profile/Profile";
import Search from "../Search/Search";
import Info from "../Info/Info";

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
          {/* Unprotected routes */}
          <Route path="/" exact>
            <Main />
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/info">
            <Info />
          </Route>

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

          {/* Protected routes */}
          {/* LOGIN First, wait until firebase auth has loaded, then run the custom ProtectedRoute component */}
          {this.props.auth.isLoaded ? (
            <ProtectedRoute
              path="/login"
              component={AdminOnly(Login, this.props.auth)}
              isAuth={this.props.auth.isEmpty}
              redirectpathname="/"
            />
          ) : (
            <div></div>
          )}
          {/*SIGNUP First, wait until firebase auth has loaded, then run the custom ProtectedRoute component */}
          {this.props.auth.isLoaded ? (
            <ProtectedRoute
              path="/signup"
              component={AdminOnly(Signup, this.props.auth)}
              isAuth={this.props.auth.isEmpty}
              redirectpathname="/"
            />
          ) : (
            <div></div>
          )}
          {/*FORGOT PASSWORD First, wait until firebase auth has loaded, then run the custom ProtectedRoute component */}
          {this.props.auth.isLoaded ? (
            <ProtectedRoute
              path="/forgot-password"
              component={AdminOnly(Reset, this.props.auth)}
              isAuth={this.props.auth.isEmpty}
              redirectpathname="/"
            />
          ) : (
            <div></div>
          )}

          {/* PROFILE First, wait until firebase auth has loaded, then run the custom ProtectedRoute component */}
          {this.props.auth.isLoaded ? (
            <ProtectedRoute
              path="/profile"
              component={AdminOnly(Profile, this.props.auth)}
              isAuth={!this.props.auth.isEmpty}
              redirectpathname="/login"
            />
          ) : (
            <div></div>
          )}

          {/*NEW-POST First, wait until firebase auth has loaded, then run the custom ProtectedRoute component */}
          {this.props.auth.isLoaded ? (
            <ProtectedRoute
              path="/new-post"
              component={AdminOnly(NewPost, this.props.auth)}
              isAuth={!this.props.auth.isEmpty}
              redirectpathname="/login"
            />
          ) : (
            <div></div>
          )}

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
