import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../Config/firebase";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";
import logo from "./logo.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isClicked: false,
    };
  }

  //THIS IS GOING TO BE USED FOR ADMINISTRATOR FUNCTIONS
  // componentDidUpdate(nextProps, nextContext) {
  //   if (!nextProps.auth.isEmpty) {
  //     firebase
  //       .auth()
  //       .currentUser.getIdTokenResult()
  //       .then((claim) => {
  //         console.log(claim);
  //       });
  //   }
  // }

  toggle = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  };

  toggleDropDownOff = () => {
    this.setState({ isClicked: false });
  };

  render() {
    return (
      <div>
        {this.props.auth.isLoaded && (
          <nav className="NavbarItems">
            {" "}
            <Link to="/">
              <img className="navbar-logo" src={logo} />
            </Link>
            <Link to="/search" onClick={this.toggleDropDownOff}>
              <i className="fas fa-search " />
            </Link>
            <div className="menu-icon" onClick={this.toggle}>
              <i
                className={
                  this.state.isClicked ? "fas fa-times" : "fas fa-bars"
                }
              ></i>
            </div>
            {this.props.auth.isEmpty ? (
              <ul
                className={
                  this.state.isClicked ? "nav-menu active" : "nav-menu"
                }
              >
                <Link onClick={this.toggle} className="nav-links" to="/">
                  &nbsp; <i className="fas fa-home mr-2" />
                </Link>
                <Link onClick={this.toggle} className="nav-links" to="/login">
                  &nbsp; <i className="fas fa-user mr-2" />
                  <span>LOG IN</span>
                </Link>
                <Link onClick={this.toggle} className="nav-links" to="/info">
                  &nbsp; <i className="fas fa-info-circle mr-2" />
                </Link>
              </ul>
            ) : (
              <ul
                className={
                  this.state.isClicked ? "nav-menu active" : "nav-menu"
                }
              >
                <Link onClick={this.toggle} className="nav-links" to="/">
                  &nbsp; <i className="fas fa-home mr-2" />
                </Link>
                <Link
                  onClick={this.toggle}
                  className="nav-links"
                  to="/new-post"
                >
                  &nbsp; <i className="fas fa-plus mr-2" />
                  <span>NEW POST</span>
                </Link>

                <Link onClick={this.toggle} className="nav-links" to="/profile">
                  &nbsp; <i className="fas fa-user mr-2" />
                  <span>PROFILE</span>
                </Link>
                <li
                  className="nav-links"
                  onClick={() => {
                    this.toggle();
                    firebase.auth().signOut();
                  }}
                >
                  &nbsp; <i className="fas fa-minus mr-2" />
                  <span>LOG OUT</span>
                </li>
                <Link onClick={this.toggle} className="nav-links" to="/info">
                  &nbsp; <i className="fas fa-info-circle mr-1" />
                </Link>
              </ul>
            )}
          </nav>
        )}
      </div>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(withRouter(Header));
