import React, { Component } from "react";
import { Alert, Input, Button, FormGroup } from "reactstrap";
import firebase from "../../Config/firebase";
import { withRouter } from "react-router-dom";

const db = firebase.firestore();

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: "",
        link: "",
        createDate: new Date(),
        createUserID: "",
        createUserName: "",
        tags: [],
      },
    };
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

  //add doc to Posts collection, then redirect to home
  submitPost() {
    const post = this.state.post;
    post.createUserID = this.props.auth.uid;
    post.createUserName = this.props.auth.displayName;
    db.collection("Posts")
      .add(post)
      .then((res) => {
        console.log(res);
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
      is_url(this.state.post.link) && this.state.post.title.length >= 1;

    return (
      <div>
        <FormGroup>
          <Input
            type="text"
            name="postTitle"
            id="postTitle"
            placeholder="Enter Title"
            onChange={(e) => this.onChangePostTitle(e.target.value)}
            value={this.state.post.title}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="text"
            name="postLink"
            id="postLink"
            placeholder="Enter Link"
            onChange={(e) => this.onChangePostLink(e.target.value)}
            value={this.state.post.link}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="text"
            name="postTags"
            id="postTags"
            placeholder="Enter Tags"
          />
        </FormGroup>

        {SumbmitCondition ? (
          <Button onClick={() => this.submitPost()} color="success">
            Submit
          </Button>
        ) : (
          <Button disabled>Submit</Button>
        )}
      </div>
    );
  }
}

export default withRouter(NewPost);
