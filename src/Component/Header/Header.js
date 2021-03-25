import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../Config/firebase";
import { Link, withRouter } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "./Header.css";

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

  render() {
    return (
      <nav className="NavbarItems">
        <Link className="navbar-logo" to="/">
          TruthMeter
        </Link>
        <div>
          <i className="fas fa-search mr-auto" />
        </div>
        <div className="menu-icon" onClick={this.toggle}>
          <i
            className={this.state.isClicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        {this.props.auth.isEmpty ? (
          <ul className={this.state.isClicked ? "nav-menu active" : "nav-menu"}>
            <Link className="nav-links" to="/login">
              &nbsp; <i className="fas fa-user mr-1" />
              <span>LOG IN</span>
            </Link>
            <Link className="nav-links" to="/info">
              &nbsp; <i className="fas fa-info mr-1" />
              <span>INFO</span>
            </Link>
          </ul>
        ) : (
          <ul className={this.state.isClicked ? "nav-menu active" : "nav-menu"}>
            <Link className="nav-links" to="/new-post">
              &nbsp; <i className="fas fa-plus mr-1" />
              <span>NEW POST</span>
            </Link>
            <Link className="nav-links" to="/info">
              &nbsp; <i className="fas fa-info mr-1" />
              <span>INFO</span>
            </Link>
            <Link className="nav-links" to="/profile">
              &nbsp; <i className="fas fa-user mr-1" />
              <span>PROFILE</span>
            </Link>
            <li
              className="nav-links"
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              &nbsp; <i className="fas fa-minus mr-1" />
              <span>LOG OUT</span>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(withRouter(Header));
