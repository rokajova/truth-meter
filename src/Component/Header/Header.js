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
import classes from "./Header.module.css";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand text-white" href="#">
          Truthmeter
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            <li className="nav-item active">
              <a className="nav-link text-white text-uppercase ml-5" href="#">
                info&nbsp;<i class="fas fa-info"></i>{" "}
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white text-uppercase ml-5" href="#">
                user&nbsp;<i class="fas fa-user"></i>
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Header);
