import React, { Component } from "react";
import PostCard from "../PostCard/PostCard";
import firebase from "../../Config/firebase";
import classes from "./Main.module.css";

const db = firebase.firestore();

class Main extends Component {
  constructor(props) {
    super(props);
    this.myDiv = React.createRef();
    this.state = {
      isLoaded: false,
      posts: [],
      showMoreDisabled: false,
      lastPost: null,
    };
  }

  componentDidMount() {
    this.getMyPosts();
  }

  // Populate posts array with firebase data, onSnapshot allows real time rendering
  getMyPosts = () => {
    db.collection("Posts")
      .orderBy("createDate", "desc")
      .limit(20)
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

  nextPost = () => {
    this.setState({ showMoreDisabled: true });
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
                showMoreDisabled: false,
              });
            }
          );
        }
      });
  };

  render() {
    return (
      <div className={classes.Container}>
        {/* Once the posts array is populated, return the elements in the array as PostCard component with props */}
        {this.state.isLoaded &&
          this.state.posts.map((post, index) => {
            return <PostCard key={index} data={post} />;
          })}
        <div className={classes.ShowMore}>
          {" "}
          {this.state.showMoreDisabled ? (
            <span className={classes.DownArrowDisabled}>
              {" "}
              <i class="fas fa-chevron-down" />
            </span>
          ) : (
            <span
              onClick={() => {
                this.nextPost();
              }}
              className={classes.DownArrow}
            >
              {" "}
              <i class="fas fa-chevron-down" />
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
