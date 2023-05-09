// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhlYJ1tAIGT5uIj_bp1wrMmiPaV4mDk-8",
  authDomain: "manager-application-51a3b.firebaseapp.com",
  projectId: "manager-application-51a3b",
  storageBucket: "manager-application-51a3b.appspot.com",
  messagingSenderId: "919887526471",
  appId: "1:919887526471:web:cce07266d6c003ad8a4f62",
  measurementId: "G-FBJNRL9LJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default database;