const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const ALGOLIA_INDEX_NAME = "Posts";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

admin.initializeApp();

// create a new doc in Users collection in the firebase on new user create
exports.newUserSignup = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("Users").doc(user.uid).set({
    userID: user.uid,
    userName: user.displayName,
    userPosts: [],
    userRatesID: [],
    userRatesScore: [],
    createDate: new Date(),
    userPhoto: user.photoURL,
    userAbout: "",
  });
});

// Update the search index every time a post is written.
exports.onNoteCreated = functions.firestore
  .document("Posts/{postID}")

  .onCreate((snap, context) => {
    // Get the note document
    const post = snap.data();

    // Add an 'objectID' field which Algolia requires
    post.objectID = context.params.postID;

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(post).catch((error) => {
      console.log(error);
    });
  });
