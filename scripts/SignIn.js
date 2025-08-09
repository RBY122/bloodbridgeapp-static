// signin.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const form = document.getElementById("loginForm");
const successPopup = document.getElementById("successPopup");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      successPopup.classList.remove("d-none");
      console.log("✅ Signed in:", userCredential.user);

      setTimeout(() => {
        window.location.href = "../Pages/Dashboard.html";
      }, 1500);
    })
    .catch((error) => {
      alert(`❌ Sign-in failed: ${error.message}`);
      console.error("Sign-in error:", error);
    });
});