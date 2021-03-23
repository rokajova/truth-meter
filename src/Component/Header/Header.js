import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import firebase from "../../Config/firebase";
import { Link, withRouter } from "react-router-dom";
import classes from "./Header.module.css";
import Search from "../Search/Search";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        {this.props.auth.isLoaded && (
          <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
            <Link to={{ pathname: "/" }}>
              {" "}
              <Navbar.Brand className="text-white">TruthMeter</Navbar.Brand>
            </Link>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              {this.props.auth.isEmpty ? (
                <Nav className="ml-auto ">
                  <Nav.Link>
                    <Link
                      style={{ textDecoration: "none", color: "silver" }}
                      to="/login"
                    >
                      {" "}
                      &nbsp; <i className="fas fa-user mr-1" />{" "}
                      <span>LOGIN / SIGNUP</span>
                    </Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link style={{ textDecoration: "none", color: "silver" }}>
                      &nbsp; <i className="fas fa-info mr-1" />
                      <span>INFO</span>
                    </Link>
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav className="ml-auto">
                  <Nav.Link>
                    <Link
                      to="/new-post"
                      style={{ textDecoration: "none", color: "silver" }}
                    >
                      &nbsp; <i className="fas fa-plus mr-1" />
                      <span>NEW POST</span>
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link style={{ textDecoration: "none", color: "silver" }}>
                      &nbsp; <i className="fas fa-info mr-1" />
                    </Link>
                    <span>INFO</span>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "silver" }}
                    >
                      {" "}
                      &nbsp; <i className="fas fa-user mr-1" />
                      <span>PROFILE</span>
                    </Link>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      firebase.auth().signOut();
                    }}
                    style={{ textDecoration: "none", color: "silver" }}
                  >
                    {" "}
                    &nbsp; <i className="fas fa-minus mr-1" />
                    <span>LOG OUT</span>
                  </Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Navbar>
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
