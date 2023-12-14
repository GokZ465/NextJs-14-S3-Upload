// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD81sNNDyKbG7mmV8ru9BVUkBHSDugAV5Y",
  authDomain: "private-cloud-bb41d.firebaseapp.com",
  projectId: "private-cloud-bb41d",
  storageBucket: "private-cloud-bb41d.appspot.com",
  messagingSenderId: "163697095794",
  appId: "1:163697095794:web:e794655aaeeef4f376feeb",
  measurementId: "G-3DT0TZ89ZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
