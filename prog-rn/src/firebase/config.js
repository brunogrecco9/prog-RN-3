import app from "firebase/app";
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyB2s159K_rUHsudDNiCC4KABB4i1_cADbM",
    authDomain: "prog-rn.firebaseapp.com",
    projectId: "prog-rn",
    storageBucket: "prog-rn.appspot.com",
    messagingSenderId: "527098272388",
    appId: "1:527098272388:web:7177326be5b0c25f4400d1"
  };

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();