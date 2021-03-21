import React, { Component } from "react";
import firebase from "../../Config/firebase";
import { withRouter, Redirect } from "react-router-dom";

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
      <div>
        <div>
          {this.state.userData.userPosts && (
            <div>
              user posts:
              {this.state.userData.userPosts.map((post) => (
                <li>{post}</li>
              ))}
            </div>
          )}
          {this.state.userData.userPosts && (
            <div>
              user rates:
              {this.state.userData.userRatesID.map((rate, i) => (
                <li>
                  {rate}, {this.state.userData.userRatesScore[i]}
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
