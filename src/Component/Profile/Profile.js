import React, { Component } from "react";
import firebase from "../../Config/firebase";

const db = firebase.firestore();

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
    };
  }

  componentDidMount() {
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        this.setState({ userData: doc.data() });
      }
    });
  }

  render() {
    return (
      <div>
        {" "}
        Posts by user: {this.state.userData.userPosts}
        <br />
        Rates by user: {this.state.userData.userRatesID}
        {this.state.userData.userRatesScore}
      </div>
    );
  }
}

export default Profile;
