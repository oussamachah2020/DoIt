// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/database"; // Make sure you include this line for Realtime Database

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiI4LHpKQSFmocRDmPTh5NkZSe6-kIEVo",
  authDomain: "doit-a3787.firebaseapp.com",
  databaseURL:
    "https://doit-a3787-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "doit-a3787",
  storageBucket: "doit-a3787.appspot.com",
  messagingSenderId: "224745434187",
  appId: "1:224745434187:web:846927483d99757885f1ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
