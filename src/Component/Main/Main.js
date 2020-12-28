import React, { Component } from "react";
import PostCard from "../PostCard/PostCard";
import firebase from "../../Config/firebase";

const db = firebase.firestore();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      posts: [],
    };
  }

  componentDidMount() {
    this.getMyPosts();
  }

  // Populate posts array with firebase data, onSnapshot allows real time rendering
  getMyPosts = () => {
    db.collection("Posts").onSnapshot((docs) => {
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
            });
          }
        );
      }
    });
  };

  render() {
    return (
      <div>
        {/* Once the posts array is populated, return the elements in the array as PostCard component with props */}
        {this.state.isLoaded
          ? this.state.posts.map((post, index) => {
              return <PostCard key={index} data={post} />;
            })
          : ""}
      </div>
    );
  }
}

export default Main;
