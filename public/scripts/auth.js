import { auth } from './firebase.js'; // Adjust path as needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// Sign Up
function signUpUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Signed up:", userCredential.user);
      // Redirect or show success message
    })
    .catch((error) => {
      console.error("Sign-up error:", error.code, error.message);
    });
}

// Sign In
function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Signed in:", userCredential.user);
      // Redirect to dashboard or show welcome
    })
    .catch((error) => {
      console.error("Sign-in error:", error.code, error.message);
    });
}