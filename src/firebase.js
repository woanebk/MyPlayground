// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK6BEtEf9Oephzz3jdEYogkYLCcNDajHk",
  authDomain: "myplayground-f12e9.firebaseapp.com",
  projectId: "myplayground-f12e9",
  storageBucket: "myplayground-f12e9.appspot.com",
  messagingSenderId: "315891727238",
  appId: "1:315891727238:web:a308e4f151576c9db50a07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

const storage = getStorage();

export {provider, app, auth, storage}
export default db