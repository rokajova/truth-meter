import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI77XJWE1N8evXTT0aI52iomKz20WJ358",
  authDomain: "truthmeter-53cd0.firebaseapp.com",
  projectId: "truthmeter-53cd0",
  storageBucket: "truthmeter-53cd0.appspot.com",
  messagingSenderId: "702333295821",
  appId: "1:702333295821:web:c775d07ff2ff52c06a9d84",
  measurementId: "G-VC37ZQP48B",
};

firebase.initializeApp();

firebase.firestore();

export default firebase;
