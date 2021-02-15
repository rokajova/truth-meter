const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
