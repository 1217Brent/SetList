// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ ADD THIS
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0tqDDJ7Ci-r3E8BmFTHougK5XYllVO3E",
  authDomain: "setlist-9cf29.firebaseapp.com",
  databaseURL: "https://setlist-9cf29-default-rtdb.firebaseio.com",
  projectId: "setlist-9cf29",
  storageBucket: "setlist-9cf29.firebasestorage.app",
  messagingSenderId: "415850302271",
  appId: "1:415850302271:web:31fd9a0c9c1e412a92a18a",
  measurementId: "G-TPL0S1LWDC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, app, db };
