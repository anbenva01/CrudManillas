// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireStore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEk_9pwlBBnhAVzD8kpL4oHpE7q0vxXG4",
  authDomain: "crudmanillas.firebaseapp.com",
  databaseURL: "https://crudmanillas-default-rtdb.firebaseio.com",
  projectId: "crudmanillas",
  storageBucket: "crudmanillas.appspot.com",
  messagingSenderId: "426127706670",
  appId: "1:426127706670:web:72db4abcb64e12bd34adbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFireStore(app);
export {db}