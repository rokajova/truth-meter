import React, { Component } from "react";
import { Container, Row, Col, Input, Button, FormGroup } from "reactstrap";
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
    db.collection("Posts")
      .add(post)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    this.props.history.push("/");
  }

  render() {
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

        <Button onClick={() => this.submitPost()}>Submit</Button>
      </div>
    );
  }
}

export default withRouter(NewPost);
