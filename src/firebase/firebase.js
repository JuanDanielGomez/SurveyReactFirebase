import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyDRjs6GIkEmyPBJ1F2PasbUKTE4Y2TtHl4",
    authDomain: "telematica-ba2e0.firebaseapp.com",
    databaseURL: "https://telematica-ba2e0.firebaseio.com",
    projectId: "telematica-ba2e0",
    storageBucket: "telematica-ba2e0.appspot.com",
    messagingSenderId: "443803970265"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
  db,
  auth,
  storage,
};