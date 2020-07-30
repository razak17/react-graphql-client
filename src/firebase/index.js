import * as firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAgDD64QAIZvmKVLbSol-7ombYaxB9xmXU",
  authDomain: "graphqlnodereact.firebaseapp.com",
  // databaseURL: "https://graphqlnodereact.firebaseio.com",
  projectId: "graphqlnodereact",
  storageBucket: "graphqlnodereact.appspot.com",
  // messagingSenderId: "1070526201478",
  appId: "1:1070526201478:web:b8f5ac2eeb723276591b07",
  measurementId: "G-C1EVM3D665",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
