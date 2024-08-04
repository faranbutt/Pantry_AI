// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh9B31Zol9GruKAI_hLlBc5qWGlOPqamw",
  authDomain: "pantry-app-6f673.firebaseapp.com",
  projectId: "pantry-app-6f673",
  storageBucket: "pantry-app-6f673.appspot.com",
  messagingSenderId: "397148065423",
  appId: "1:397148065423:web:b1c8558e652eee30ffaafa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app, firebaseConfig, firestore};
