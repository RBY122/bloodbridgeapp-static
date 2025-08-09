// auth.js
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { loadDonationHistory } from "./donations.js";

// 👤 Monitor Auth State
onAuthStateChanged(auth, async (user) => {
  const welcome = document.getElementById("welcomeMessage");

  if (user) {
    console.log("✅ Authenticated:", user.email);
    if (welcome) welcome.textContent = `Welcome, ${user.email}`;
    await loadDonationHistory(user.uid);
  } else {
    console.warn("🚫 Not authenticated. Redirecting...");
    window.location.href = "../Pages/SignIn.html";
  }
});

// 🚪 Sign-Out Handler
const signOutBtn = document.getElementById("signOutBtn");
if (signOutBtn) {
  signOutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      console.log("👋 Signed out successfully.");
      window.location.href = "../Pages/SignIn.html";
    } catch (error) {
      console.error("❌ Sign out error:", error);
    }
  });
}