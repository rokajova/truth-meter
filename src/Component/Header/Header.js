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
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

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
      <Navbar bg="dark" expand="lg">
        <Link to={{ pathname: "/" }}>
          {" "}
          <Navbar.Brand className="text-white">TruthMeter</Navbar.Brand>
        </Link>

        <Form inline>
          <FormControl
            type="text"
            placeholder="enter a tag"
            className="mr-sm-3"
          />
        </Form>
        <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {this.props.auth.isEmpty ? (
            <Nav className="ml-auto ">
              <Nav.Link>
                <Link to="/login">
                  {" "}
                  &nbsp; <i className="fas fa-user" /> LOG IN/SIGN UP
                </Link>
              </Nav.Link>

              <Nav.Link>
                &nbsp; <i className="fas fa-info" /> INFO
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link>
                <Link to="/new-post">
                  {" "}
                  &nbsp; <i className="fas fa-plus" />
                  NEW POST
                </Link>
              </Nav.Link>
              <Nav.Link>
                {" "}
                &nbsp; <i className="fas fa-info" />
                INFO
              </Nav.Link>
              <Nav.Link>
                <Link to="/profile">
                  {" "}
                  &nbsp; <i className="fas fa-user" />
                  PROFILE
                </Link>
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                {" "}
                &nbsp; <i className="fas fa-minus" />
                LOG OUT
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Header);
