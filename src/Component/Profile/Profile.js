import React, { Component } from "react";
import firebase from "../../Config/firebase";
import { withRouter, Link } from "react-router-dom";
import classes from "./Profile.module.css";

const db = firebase.firestore();

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      userData: [],
    };
  }

  componentDidMount() {
    // populate userData array with user data from firebase on first render
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        this.setState({ userData: doc.data() }, () => {
          this.setState({ hasLoaded: true });
        });
      }
    });
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Row}>
         
            <div className={classes.Col}>
              <div className={classes.Title}> {this.props.auth.email}</div>
              {/* <span
                style={{
                  borderTop: "1px solid  rgb(206, 223, 255)",
                  padding: "3px",
                }}
              >
               
              </span> */}
    
            </div>
          
        </div>
        <div className={classes.Row}>
          {this.state.userData.userPosts && (
            <div className={classes.Col}>
              <div className={classes.Title}>My Posts</div>
              {this.state.userData.userPosts.map((post) => (
                <li
                  style={{
                    borderTop: "1px solid  rgb(206, 223, 255)",
                    padding: "3px",
                  }}
                >
                  <Link to={"/post/" + post} className={classes.Link}>
                    {post}
                  </Link>
                </li>
              ))}
            </div>
          )}
          {this.state.userData.userPosts && (
            <div className={classes.Col}>
              <div className={classes.Title}>My Rates</div>
              {this.state.userData.userRatesID.map((rate, i) => (
                <li
                  style={{
                    borderTop: "1px solid rgb(206, 223, 255)",
                    padding: "3px",
                  }}
                >
                  <Link to={"/post/" + rate} className={classes.Link}>
                    {rate}
                  </Link>{" "}
                  rated as {this.state.userData.userRatesScore[i]}%
                </li>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
