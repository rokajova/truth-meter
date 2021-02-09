import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  NavbarToggler,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import firebase from "../../Config/firebase";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

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

  render() {
    return (
      <Navbar color="dark" expand="md">
        <NavbarBrand href="/">Truth Meter</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {!this.props.auth.isEmpty && (
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/new-post">New Post</NavLink>
              </NavItem>
            </Nav>
          )}

          {!this.props.auth.isEmpty && <div>{this.props.auth.displayName}</div>}
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              {this.props.auth.isEmpty ? (
                <DropdownItem>
                  <Link to={{ pathname: "/login" }}>Login</Link>
                </DropdownItem>
              ) : (
                <div>
                  <DropdownItem onClick={() => firebase.auth().signOut()}>
                    Logout
                  </DropdownItem>
                  <DropdownItem href="/profile">My Profile</DropdownItem>
                </div>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
      </Navbar>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Header);
