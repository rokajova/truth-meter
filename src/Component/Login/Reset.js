import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../Config/firebase";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

const Reset = () => {
  // required states for authentication
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  // config for google authentication
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  // clears login and signin state
  const clearInputs = () => {
    setEmail("");
  };
  // clears errors state
  const clearErrors = () => {
    setEmailError("");
  };

  // signs in with existing user if there are no errors described in the switch statement
  // if there are errors, set state with the corresponding error
  async function handleReset() {
    clearErrors();
    setMessage("");
    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        setMessage("Check your inbox for further steps");
        setBtnDisabled(true);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
        }
      });
  }

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

        {emailError && <p className={classes.errorMsg}>{emailError}</p>}
        {message && <p className={classes.successMsg}>{message}</p>}

        <div className={classes.btnContainer}>
          {" "}
          <div>
            <button
              disabled={btnDisabled}
              className={classes.button}
              onClick={handleReset}
            >
              Reset password
            </button>
            <p>
              Have an account?
              <Link style={{ textDecoration: "none" }} to="/login">
                {" "}
                <span>Log in</span>
              </Link>
            </p>
            <p>
              Don't have an account?
              <Link style={{ textDecoration: "none" }} to="/signup">
                {" "}
                <span>Sign up</span>
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

export default enhance(Reset);
