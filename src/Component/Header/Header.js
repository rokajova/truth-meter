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
        <header>
          <div className={classes.logo}>
            <h1>Truthmeter</h1>
          </div>
          <ul>
            <li>
              <a href="/">Info</a>
            </li>
            <li>
              <a href="/">Log In / Sign Up</a>
            </li>
            <li>
              <a href="/">Log In / Sign Up</a>
            </li>
            <li>
              <a href="/">Log In / Sign Up</a>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Header);

// REACTSTRAP HEADER AND BOOTSTRAP HEADER CODE

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
// <nav className="navbar navbar-expand-lg navbar-light bg-dark">
//   <a className="navbar-brand text-white" href="/">
//     Truthmeter
//   </a>
//   <button
//     className="navbar-toggler"
//     type="button"
//     data-toggle="collapse"
//     data-target="#navbarSupportedContent"
//     aria-controls="navbarSupportedContent"
//     aria-expanded="false"
//     aria-label="Toggle navigation"
//   >
//     <span className="navbar-toggler-icon"></span>
//   </button>

//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav m-auto">
//       {!this.props.auth.isEmpty && (
//         <li className="nav-item active">
//           <a
//             className="nav-link text-white text-uppercase "
//             href="/new-post"
//           >
//             New Post&nbsp;<i class="fas fa-plus"></i>{" "}
//             <span className="sr-only">(current)</span>
//           </a>
//         </li>
//       )}
//       {this.props.auth.isEmpty ? (
//         <li className="nav-item">
//           <a
//             className="nav-link text-white text-uppercase "
//             href="/login"
//           >
//             Log in/ Sign Up&nbsp;<i class="fas fa-user"></i>
//           </a>
//         </li>
//       ) : (
//         <li className="nav-item dropdown">
//           <a
//             className="nav-link dropdown-toggle"
//             href="#"
//             id="navbarDropdownMenuLink"
//             data-toggle="dropdown"
//             aria-haspopup="true"
//             aria-expanded="false"
//           >
//             Dropdown link
//           </a>
//           <div
//             className="dropdown-menu"
//             aria-labelledby="navbarDropdownMenuLink"
//           >
//             <a className="dropdown-item" href="#">
//               Action
//             </a>
//             <a className="dropdown-item" href="#">
//               Another action
//             </a>
//             <a className="dropdown-item" href="#">
//               Something else here
//             </a>
//           </div>
//         </li>
//         <div>
//           <li className="nav-item">
//             <a
//               className="nav-link text-white text-uppercase "
//               href="/profile"
//             >
//               My profile&nbsp;<i class="fas fa-user"></i>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a
//               className="nav-link text-white text-uppercase"
//               onClick={() => firebase.auth().signOut()}
//             >
//               Logout&nbsp;<i class="fas fa-minus"></i>
//             </a>
//           </li>
//         </div>
//       )}
//       <li className="nav-item active">
//         <a className="nav-link text-white text-uppercase " href="#">
//           info&nbsp;<i class="fas fa-info"></i>{" "}
//           <span className="sr-only">(current)</span>
//         </a>
//       </li>
//     </ul>
//     <form className="form-inline my-2 my-lg-0">
//       <input
//         className="form-control mr-sm-2"
//         type="search"
//         placeholder="Search"
//         aria-label="Search"
//       />
//       <button
//         className="btn btn-outline-primary my-2 my-sm-0"
//         type="submit"
//       >
//         Search
//       </button>
//     </form>
//   </div>
// </nav>
