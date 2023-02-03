// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL5rvvHIkINYL6k6P1fczDX38XFMmkYag",
  authDomain: "shopr-assignment-auth.firebaseapp.com",
  projectId: "shopr-assignment-auth",
  storageBucket: "shopr-assignment-auth.appspot.com",
  messagingSenderId: "786392261610",
  appId: "1:786392261610:web:bf9b4b051cec94c7354893"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()