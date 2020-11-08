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


  export const createUserProfileDocument = async(userAuth, additionalData)=>{
    if(!userAuth)
    {
      return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    console.log(snapshot);

    if(!snapshot.exists)
    {
      const {displayName ,email} = userAuth;
      const createdAt = new Date();

      try {

        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }catch(err)
      {
        console.log('error creating user' , err.message);
      }
    }

    return userRef;
  }
  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;