import React, { Component } from "react";
import firebase from "../../Config/firebase";
import { withRouter } from "react-router-dom";
import classes from "./NewPost.module.css";
import Recaptcha from "react-recaptcha";

const db = firebase.firestore();

class NewPost extends Component {
  constructor(props) {
    super(props);
    
    this.verifyCallback = this.verifyCallback.bind(this);
    this.expiredCallback = this.expiredCallback.bind(this);

    this.state = {
      // change this to false and add the porper URL in the recapcha dashboard once I golive
      isCaptchaVerified: false,

      tags: [],

      post: {
        title: "",
        link: "",
        createDate: new Date(),
        createUserID: "",
        createUserName: "",
        createUserEmail: "",
        tags: [],
        popularScore: "",
        rates: [],
        ratingScore: "",
      },
    };
    this.reactTags = React.createRef();
  }

  //ReactTags function
  onTagDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  //ReactTags function
  onTagAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }
  //ReactTags input validate condition(must return a boolean)
  onTagValidate() {
    return this.state.tags.length < 4;
  }

  // set Post title state from the Input
  onChangePostTitle = (value) => {
    this.setState({
      post: {
        ...this.state.post,
        title: value,
      },
    });
  };

  // set Post link state from the Input
  onChangePostLink = (value) => {
    this.setState({
      post: {
        ...this.state.post,
        link: value,
      },
    });
  };

  //recaptcha verify
  verifyCallback(response) {
    if (response) {
      this.setState({
        isCaptchaVerified: true,
      });
    }
  }

  //recaptcha expired
  expiredCallback() {
    this.setState({
      isCaptchaVerified: false,
    });
  }

  //add doc to Posts collection, then redirect to home
  submitPost() {
    // get user reference
    const userRef = db.collection("Users").doc(this.props.auth.uid);

    const post = this.state.post;
    post.createUserID = this.props.auth.uid;
    post.createUserEmail = this.props.auth.email;

    // a temp workaround to the signup problem, where I cannot update the display name on the firebase signup function
    // (see top commentin Signup component for detailed explanation)
    // post.createUserName = firebase.auth().currentUser.displayName;

    // tags working
    // post.tags = this.state.tags;

    db.collection("Posts")
      .add(post)
      .then((res) => {
        return userRef.get().then((doc) => {
          userRef.update({ userPosts: [...doc.data().userPosts, res.id] });
        });
      })
      .catch((err) => console.log(err));
    this.props.history.push("/");
  }

  render() {
    // Check is string is an URL
    function is_url(str) {
      let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      if (regexp.test(str)) {
        return true;
      } else {
        return false;
      }
    }

    // Must return True in order to Submit a post
    const SumbmitCondition =
      is_url(this.state.post.link) && this.state.isCaptchaVerified;

    return (
      <section className={classes.NewPost}>
        <div className={classes.NewPostContainer}>
          <div>
            {" "}
            <input
              type="text"
              placeholder="Enter a link and click Submit..."
              autoFocus
              required
              value={this.state.post.link}
              onChange={(e) => this.onChangePostLink(e.target.value)}
            />{" "}
          </div>
          <div className={classes.Recaptcha}>
            {" "}
            <Recaptcha
              sitekey="6Lc8sqUaAAAAACh2Rvquamf372-1SG9Wei-2QxJs"
              render="explicit"
              verifyCallback={this.verifyCallback}
              expiredCallback={this.expiredCallback}
              theme="dark"
            />
          </div>

          <div className={classes.ButtonContainer}>
            {SumbmitCondition ? (
              <button
                className={classes.button}
                onClick={() => this.submitPost()}
              >
                Submit
              </button>
            ) : (
              <button className={classes.button} disabled>
                Submit
              </button>
            )}
          </div>
        </div>

      </section>
    );
  }
}

export default withRouter(NewPost);
