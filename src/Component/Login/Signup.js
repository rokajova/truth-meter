import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../Config/firebase";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

// The createUserWithEmailAndPassword and cloud functions don't work well with eachother.
// Since I'm using a function to create a document with created users each time a createUserWithEmailAndPassword fire
// the cloud function does not pick up the the promise function to create a display name and while it does create a display name, which can be accessed under
// "firebase.auth().currentUser.displayName" the document in the Users collection does not update accordingly.
// https://stackoverflow.com/questions/40389946/how-do-i-set-the-displayname-of-firebase-user/40429080 <- does not solve the cloud function issue, but does change the display name
// https://stackoverflow.com/questions/48741932/firebase-authfunctions-create-user-with-displayname <- might solve the isuue, will come back to it later on.

const Signup = () => {
  // required states for authentication
  const [user, setUser] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // config for google authentication
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  // clears login and signin state
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  // clears errors state
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  // signs up a new user if there are no errors described in the switch statement
  // if there are errors, set state with the corresponding error
  const handleSignup = () => {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  // checks for auth state changes, set state accordingly
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  // this hook is ran on every render
  useEffect(() => {
    authListener();
  }, []);

  return (
    <section className={classes.login}>
      <div className={classes.loginContainer}>
        <input
          type="text"
          autoFocus
          required
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className={classes.errorMsg}>{emailError}</p>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={classes.errorMsg}>{passwordError}</p>

        <div className={classes.btnContainer}>
          {" "}
          <div>
            <button className={classes.button} onClick={handleSignup}>
              Sign up
            </button>
            <p>
              Have an account?
              <Link style={{ textDecoration: "none" }} to="login">
                {" "}
                <span>Log in</span>
              </Link>
            </p>
          </div>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    </section>
  );
};

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Signup);
