import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_AUTHENTICATION_KEY,
    authDomain: "movies-7fc1e.firebaseapp.com",
    databaseURL: "https://movies-7fc1e-default-rtdb.firebaseio.com",
    projectId: "movies-7fc1e",
    storageBucket: "movies-7fc1e.appspot.com",
    messagingSenderId: "158966636932",
    appId: "1:158966636932:web:0f3080570f9bda76bcbdd1"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


  export { firebase, db};