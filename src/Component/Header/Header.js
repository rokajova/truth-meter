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
      // <Navbar color="dark" expand="md">
      //   <NavbarBrand href="/">Truth Meter</NavbarBrand>
      //   <NavbarToggler onClick={this.toggle} />
      //   <Collapse isOpen={this.state.isOpen} navbar>
      //     {!this.props.auth.isEmpty && (
      //       <Nav className="mr-auto" navbar>
      //         <NavItem>
      //           <NavLink href="/new-post">New Post</NavLink>
      //         </NavItem>
      //       </Nav>
      //     )}

      //     {!this.props.auth.isEmpty && <div>{this.props.auth.displayName}</div>}
      //     <UncontrolledDropdown>
      //       <DropdownToggle nav caret>
      //         Options
      //       </DropdownToggle>
      //       <DropdownMenu right>
      //         {this.props.auth.isEmpty ? (
      //           <DropdownItem>
      //             <Link to={{ pathname: "/login" }}>Login</Link>
      //           </DropdownItem>
      //         ) : (
      //           <div>
      //             <DropdownItem onClick={() => firebase.auth().signOut()}>
      //               Logout
      //             </DropdownItem>
      //             <DropdownItem href="/profile">My Profile</DropdownItem>
      //           </div>
      //         )}
      //       </DropdownMenu>
      //     </UncontrolledDropdown>
      //   </Collapse>
      // </Navbar>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="/">TruthMeter</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline>
            <i className="fas fa-search mr-1" />
            <FormControl type="text" className="mr-sm-2" />
          </Form>
          {this.props.auth.isEmpty ? (
            <Nav className="ml-auto ">
              <Nav.Link href="#">
                &nbsp; <i className="fas fa-info" /> INFO
              </Nav.Link>
              <Nav.Link href="/login">
                &nbsp; <i className="fas fa-user" /> LOG IN/SIGN UP
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link href="/new-post">
                {" "}
                &nbsp; <i className="fas fa-plus" />
                NEW POST
              </Nav.Link>
              <NavDropdown title="USER" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
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
