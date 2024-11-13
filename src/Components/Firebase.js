// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs8263eA3JMoLxkI8LihKql8TymuObspE",
  authDomain: "learnhub-60b63.firebaseapp.com",
  projectId: "learnhub-60b63",
  storageBucket: "learnhub-60b63.appspot.com",
  messagingSenderId: "527597448437",
  appId: "1:527597448437:web:2cb4eff68d61bba9fde9bc",
  measurementId: "G-7CKHER53KJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth()
export default app