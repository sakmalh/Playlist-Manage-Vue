import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBbSKVF9yrVbzCfXSdclv08Q91NeJlJ3l8",
    authDomain: "muso-ninjas-eeafe.firebaseapp.com",
    projectId: "muso-ninjas-eeafe",
    storageBucket: "muso-ninjas-eeafe.appspot.com",
    messagingSenderId: "352327826221",
    appId: "1:352327826221:web:cef54642217d58fcc931a4"
  };

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }