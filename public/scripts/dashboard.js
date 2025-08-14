// dashboard.js
import { auth } from './firebase.js';
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const userNameDisplay = document.getElementById("userName");
  const userEmailDisplay = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");
  const alertBox = document.getElementById("alertBox");

  // 🔐 Auth Guard
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // ✅ Show user info
      userNameDisplay.textContent = user.displayName || "Anonymous";
      userEmailDisplay.textContent = user.email;
    } else {
      // 🚫 Redirect if not signed in
      window.location.href = "/Pages/SignIn.html";
    }
  });

  // 🚪 Logout Logic
  logoutBtn?.addEventListener("click", async () => {
    try {
      await signOut(auth);
      showAlert("Signed out successfully.", "success");
      setTimeout(() => {
        window.location.href = "/Pages/SignIn.html";
      }, 1000);
    } catch (err) {
      console.error("Sign-out error:", err);
      showAlert("Error signing out: " + err.message, "danger");
    }
  });

  function showAlert(message, type = "danger") {
    if (!alertBox) return;
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    alertBox.classList.remove("d-none");
  }

  // 🕒 Footer Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});