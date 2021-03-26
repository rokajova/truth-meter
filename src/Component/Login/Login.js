import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../Config/firebase";
import classes from "./Login.module.css";

const Login = () => {
  // required states for authentication
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

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

  // signs in with existing user if there are no errors described in the switch statement
  // if there are errors, set state with the corresponding error
  const handleLogin = () => {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
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

  // sign out user, this is being used in the Header
  // const handleLogout = () => {
  //   firebase.auth().signOut();
  // };

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
        <label>UserName</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className={classes.errorMsg}>{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={classes.errorMsg}>{passwordError}</p>
        <div className={classes.btnContainer}>
          {" "}
          {hasAccount ? (
            <div>
              <button className={classes.button} onClick={handleLogin}>
                Sign In
              </button>
              <p>
                Don't have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
              </p>
            </div>
          ) : (
            <div>
              <button className={classes.button} onClick={handleSignup}>
                Sign Up
              </button>
              <p>
                Have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span>
              </p>
            </div>
          )}{" "}
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

export default enhance(Login);
