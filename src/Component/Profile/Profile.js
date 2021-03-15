import React, { Component } from "react";
import firebase from "../../Config/firebase";

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
        user posts:
        {this.state.hasLoaded &&
          this.state.userData.userPosts.map((post) => <li>{post}</li>)}
      </div>
    );
  }
}

export default Profile;
