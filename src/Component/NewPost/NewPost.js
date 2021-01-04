import React, { Component } from "react";
import { Alert, Input, Button, FormGroup } from "reactstrap";
import firebase from "../../Config/firebase";
import { withRouter } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";

const db = firebase.firestore();

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      post: {
        title: "",
        link: "",
        createDate: new Date(),
        createUserID: "",
        createUserName: "",
      },
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState((state) => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
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

    const { tags } = this.state;
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

        <ReactTags
          tags={tags}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          delimiters={delimiters}
        />

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
