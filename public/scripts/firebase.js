// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"; // Optional

const firebaseConfig = {
  apiKey: "AIzaSyCH-fiYRsIYMfeHruNc6rPZ4u1Cmz0fHQY",
  authDomain: "bloodbridgeapp-c1134.firebaseapp.com",
  projectId: "bloodbridgeapp-c1134",
  storageBucket: "bloodbridgeapp-c1134.appspot.com",
  messagingSenderId: "192881021185",
  appId: "1:192881021185:web:6588421760928bdb2b0b00"
};

// 🔌 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app); // Optional