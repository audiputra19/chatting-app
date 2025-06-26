// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYp-5f7nGHBzTtk3fnvob8BW_0pO879js",
  authDomain: "chatting-app-ad89a.firebaseapp.com",
  databaseURL: "https://chatting-app-ad89a-default-rtdb.firebaseio.com",
  projectId: "chatting-app-ad89a",
  storageBucket: "chatting-app-ad89a.firebasestorage.app",
  messagingSenderId: "774244103972",
  appId: "1:774244103972:web:fef90e25c2d496d48165b1",
  measurementId: "G-2Q96VG3RGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);