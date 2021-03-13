import React, { Component } from "react";
import { Container, Spinner } from "react-bootstrap";
import PostCard from "../PostCard/PostCard";
import firebase from "../../Config/firebase";
import classes from "./Main.module.css";

const db = firebase.firestore();

class Main extends Component {
  constructor(props) {
    super(props);
    this.myDiv = React.createRef();
    this.state = {
      lastPost: null,
      isLoaded: false,
      posts: [],
      showLoading: false,
    };
  }

  nextPost = () => {
    this.setState({ showLoading: true });
    db.collection("Posts")
      .orderBy("createDate", "desc")
      .startAfter(this.state.lastPost.createDate)
      .limit(5)
      .get()
      .then((docs) => {
        if (!docs.empty) {
          let allPosts = [];
          docs.forEach(function (doc) {
            const post = { id: doc.id, ...doc.data() };
            allPosts.push(post);
          });

          let updated_posts = this.state.posts.concat(allPosts);
          this.setState(
            {
              posts: updated_posts,
            },
            () => {
              this.setState({
                isLoaded: true,
                lastPost: this.state.posts[this.state.posts.length - 1],
              });
            }
          );
        }
        this.setState({ showLoading: false });
      });
  };

  componentDidMount() {
    this.getMyPosts();
  }

  // Populate posts array with firebase data, onSnapshot allows real time rendering
  getMyPosts = () => {
    db.collection("Posts")
      .orderBy("createDate", "desc")
      .limit(10)
      .onSnapshot((docs) => {
        if (!docs.empty) {
          let allPosts = [];
          docs.forEach(function (doc) {
            const post = {
              id: doc.id,
              ...doc.data(),
            };
            allPosts.push(post);
          });
          this.setState(
            {
              posts: allPosts,
            },
            () => {
              this.setState({
                isLoaded: true,
                lastPost: this.state.posts[this.state.posts.length - 1],
              });
            }
          );
        }
      });
  };

  handleLoadMore = () => {
    this.getMyPosts();
  };

  handleScroll = () => {
    let triggerHeight =
      this.myDiv.current.scrollTop + this.myDiv.current.offsetHeight;
    if (triggerHeight >= this.myDiv.current.scrollHeight) {
      this.nextPost();
    }
  };

  render() {
    return (
      <div>
        <div
          className={classes.Container}
          onScroll={() => this.handleScroll()}
          ref={this.myDiv}
        >
          {" "}
          {/* Once the posts array is populated, return the elements in the array as PostCard component with props */}
          {this.state.isLoaded
            ? this.state.posts.map((post, index) => {
                return <PostCard key={index} data={post} />;
              })
            : ""}
        </div>
        {this.state.showLoading ? (
          <div className={classes.Loading}>
            <Spinner animation="grow" />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Main;
