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
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">TruthMater</Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
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
