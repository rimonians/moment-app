// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY_9Uh7UfVBURFtyif52_rsH4byNVsfJw",
  authDomain: "moment-d5758.firebaseapp.com",
  projectId: "moment-d5758",
  storageBucket: "moment-d5758.appspot.com",
  messagingSenderId: "331734937398",
  appId: "1:331734937398:web:9802f126f1fe86f48e4d97",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
