// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBmGx2zjdWw6O3tlzP7bdTqk9LCkHzFb2E",
  authDomain: "login-page-7ccd8.firebaseapp.com",
  projectId: "login-page-7ccd8",
  storageBucket: "login-page-7ccd8.appspot.com",
  messagingSenderId: "671910252727",
  appId: "1:671910252727:web:2b80704f7e4066544cbd32",
  measurementId: "G-SHH5MHKB2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app,auth};