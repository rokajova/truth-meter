const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// create a new collection in the firebase on new user create
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

exports.ratingScore = functions.https.onCall((data, context) => {
  // get ref for post doc
  const userRef = admin.firestore().collection("Users").doc(context.auth.uid);
  const postRef = admin.firestore().collection("Posts").doc(data.id);

  return userRef.get().then((doc) => {
    // check if user hasn't already rated the post
    if (doc.data().userRatesID.includes(data.id)) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "You can only rate something once"
      );
    }

    return userRef
      .update({
        userRatesID: [...doc.data().userRatesID, data.id],
      })
      .then(() => {
        return postRef.update({
          ratingScore: admin.firestore.FieldValue.increment(1),
        });
      });
  });
});
