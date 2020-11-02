import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyCb_rY30Dh8cMV0H4Xv8GFAOdrVStsv-Cc",
    authDomain: "crwn-db-5e87d.firebaseapp.com",
    databaseURL: "https://crwn-db-5e87d.firebaseio.com",
    projectId: "crwn-db-5e87d",
    storageBucket: "crwn-db-5e87d.appspot.com",
    messagingSenderId: "17271119901",
    appId: "1:17271119901:web:aebc31172de926859c66f4",
    measurementId: "G-JRS20Q16B4"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;