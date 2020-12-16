import React, { Component } from "react";
import PostCard from "../PostCard/PostCard";
import firebase from "../../Config/firebase";

const db = firebase.firestore();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      posts: [],
    };
  }

  componentDidMount() {
    this.getMyPosts();
  }

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
  //isnt connected to firebase(?)
  render() {
    return (
      <div>
        {this.state.posts}
        {this.state.posts.map((post, index) => {
          return <PostCard key={index} data={post} />;
        })}
      </div>
    );
  }
}

export default Main;
