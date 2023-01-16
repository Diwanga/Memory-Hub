 // Import the functions you need from the SDKs you need
import firebase from 'firebase/app'

 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKP0kJMfrLcciU7ecirmCv2R1SjF5JvDA",
  authDomain: "memhub-321108.firebaseapp.com",
  projectId: "memhub-321108",
  storageBucket: "memhub-321108.appspot.com",
  messagingSenderId: "884732681276",
  appId: "1:884732681276:web:9a6b7edca357344d273739"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = firebase.storage()

export  {
    storage, firebase as default
  }
