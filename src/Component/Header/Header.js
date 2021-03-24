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
import "./Header.css";
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
      <div class="wrapper">
        <nav>
          <input type="checkbox" id="show-search" />
          <input type="checkbox" id="show-menu" />
          <label for="show-menu" class="menu-icon">
            <i class="fas fa-bars"></i>
          </label>
          <div class="content">
            <div class="logo">
              <a href="#">CodingNepal</a>
            </div>
            <ul class="links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#" class="desktop-link">
                  Features
                </a>
                <input type="checkbox" id="show-features" />
                <label for="show-features">Features</label>
                <ul>
                  <li>
                    <a href="#">Drop Menu 1</a>
                  </li>
                  <li>
                    <a href="#">Drop Menu 2</a>
                  </li>
                  <li>
                    <a href="#">Drop Menu 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Menu 4</a>
                  </li>
                </ul>
              </li>
              <li>
                {" "}
                <a href="#" class="desktop-link">
                  Services
                </a>
                <input type="checkbox" id="show-services" />
                <label for="show-services">Services</label>
                <ul>
                  <li>
                    <a href="#">Drop Menu 1</a>
                  </li>
                  <li>
                    <a href="#">Drop Menu 2</a>
                  </li>
                  <li>
                    <a href="#">Drop Menu 3</a>
                  </li>
                  <li>
                    <a href="#" class="desktop-link">
                      More Items
                    </a>
                    <input type="checkbox" id="show-items" />
                    <label for="show-items">More Items</label>
                    <ul>
                      <li>
                        <a href="#">Sub Menu 1</a>
                      </li>
                      <li>
                        <a href="#">Sub Menu 2</a>
                      </li>
                      <li>
                        <a href="#">Sub Menu 3</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Feedback</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <label for="show-search" class="search-icon">
            <i class="fas fa-search"></i>
          </label>
          <form action="#" class="search-box">
            <input
              type="text"
              placeholder="Type Something to Search..."
              required
            />
            <button type="submit" class="go-icon">
              <i class="fas fa-long-arrow-alt-right"></i>
            </button>
          </form>
        </nav>
      </div>

      // <div>
      //   {this.props.auth.isLoaded && (
      //     <Navbar collapseOnSelect bg="dark" expand="sm" variant="dark">
      //       <Link to={{ pathname: "/" }}>
      //         {" "}
      //         <Navbar.Brand className="text-white">TruthMeter</Navbar.Brand>
      //       </Link>
      //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      //       <Navbar.Collapse id="basic-navbar-nav">
      //         {this.props.auth.isEmpty ? (
      //           <Nav className="ml-auto ">
      //             <Nav.Link>
      //               <Link
      //                 style={{ textDecoration: "none", color: "silver" }}
      //                 to="/login"
      //               >
      //                 {" "}
      //                 &nbsp; <i className="fas fa-user mr-1" />{" "}
      //                 <span>LOGIN / SIGNUP</span>
      //               </Link>
      //             </Nav.Link>

      //             <Nav.Link>
      //               <Link style={{ textDecoration: "none", color: "silver" }}>
      //                 &nbsp; <i className="fas fa-info mr-1" />
      //                 <span>INFO</span>
      //               </Link>
      //             </Nav.Link>
      //           </Nav>
      //         ) : (
      //           <Nav className="ml-auto">
      //             <Nav.Link>
      //               <Link
      //                 to="/new-post"
      //                 style={{ textDecoration: "none", color: "silver" }}
      //               >
      //                 &nbsp; <i className="fas fa-plus mr-1" />
      //                 <span>NEW POST</span>
      //               </Link>
      //             </Nav.Link>
      //             <Nav.Link>
      //               <Link style={{ textDecoration: "none", color: "silver" }}>
      //                 &nbsp; <i className="fas fa-info mr-1" />
      //               </Link>
      //               <span>INFO</span>
      //             </Nav.Link>
      //             <Nav.Link>
      //               <Link
      //                 to="/profile"
      //                 style={{ textDecoration: "none", color: "silver" }}
      //               >
      //                 {" "}
      //                 &nbsp; <i className="fas fa-user mr-1" />
      //                 <span>PROFILE</span>
      //               </Link>
      //             </Nav.Link>
      //             <Nav.Link
      //               onClick={() => {
      //                 firebase.auth().signOut();
      //               }}
      //               style={{ textDecoration: "none", color: "silver" }}
      //             >
      //               {" "}
      //               &nbsp; <i className="fas fa-minus mr-1" />
      //               <span>LOG OUT</span>
      //             </Nav.Link>
      //           </Nav>
      //         )}
      //       </Navbar.Collapse>
      //     </Navbar>
      //   )}
      // </div>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(withRouter(Header));
