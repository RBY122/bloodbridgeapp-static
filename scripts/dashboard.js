
  // 🔗 Firebase Imports
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
  import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
  // 🔧 Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCH-fiYRsIYMfeHruNc6rPZ4u1Cmz0fHQY",
    authDomain: "bloodbridge-3f25e.firebaseapp.com",
    projectId: "bloodbridge-3f25e",
    storageBucket: "bloodbridge-3f25e.appspot.com",
    messagingSenderId: "192881021185",
    appId: "1:192881021185:web:6588421760928bdb2b0b00",
    measurementId: "G-W75RZG1BYV"
  };

  // 🚀 Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

// Helper to format Firestore Timestamp
const formatDate = (timestamp) => {
  if (!timestamp) return "--";
  const date = timestamp.toDate ? timestamp.toDate() : timestamp;
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric"
  });
};


  // 👤 Monitor Authentication State
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

  // 📦 Load Donation History from Firestore
  async function loadDonationHistory(userId) {
    const donationList = document.getElementById("donationList");
    if (!donationList) return;

    donationList.innerHTML = `<p class="text-muted">Loading donation history...</p>`;

    try {
      const donationsRef = collection(db, "donations");
      const q = query(donationsRef, where("userId", "==", userId));
      const snapshot = await getDocs(q);

      donationList.innerHTML = "";

      if (snapshot.empty) {
        donationList.innerHTML = `<p class="text-muted">No donation history found.</p>`;
        return;
      }

      snapshot.forEach((doc) => {
        const data = doc.data();
        const formattedDate = data.date?.toDate().toLocaleDateString() ?? "Unknown";

        const card = document.createElement("div");
        card.className = "card mb-3 shadow-sm border border-danger";
        card.setAttribute("role", "region");
        card.setAttribute("aria-label", "Donation Record");

        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title text-danger">${data.bloodType} Donation</h5>
            <p class="card-text">
              <strong>Date:</strong> ${formattedDate}<br>
              <strong>Location:</strong> ${data.location}<br>
              <strong>Status:</strong> ${data.status}
            </p>
          </div>
        `;
        donationList.appendChild(card);
      });
    } catch (error) {
      console.error("❌ Error fetching donation history:", error);
      donationList.innerHTML = `<p class="text-danger">Unable to load donation history. Please try again later.</p>`;
    }
  }


  // Update the dashboard after login
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Optional: add a delay to ensure Firebase restores the session
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 150); // slight buffer
    return;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      showAlert("User data not found.", "danger");
      return;
    }

    const data = userSnap.data();
    setText("fullName", data.fullName);
    setText("email", data.email);
    setText("phoneNumber", data.phoneNumber || "Not Provided");
    setText("bloodGroup", data.bloodGroup || "Unknown");
    setText("dob", formatDate(data.dateOfBirth));
    setText("nationalId", data.nationalIdNumber || "N/A");
    setText("emergencyName", data.emergencyContactName || "N/A");
    setText("emergencyPhone", data.emergencyContactPhone || "N/A");
    setText("nextDonation", formatDate(data.nextDonationDate));
    setText("tipNextDonation", formatDate(data.nextDonationDate));
    setText("lastDonation", formatDate(data.lastDonationDate));
    setText("nextAppointment", formatDate(data.nextAppointment));
    setText("profilePercent", `${data.profileCompletion || 0}%`);

   // Optional: animate progress bar
    const progressBar = document.getElementById("profileProgressBar");
    if (progressBar) {
      const percent = data.profileCompletion || 0;
      progressBar.style.width = `${percent}%`;
      progressBar.textContent = `${percent}%`;
    }
  } catch (err) {
    showAlert("Something went wrong while loading your profile.", "danger");
    console.error(err);
  }
});

// Helper Functions
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function showAlert(message, type = "success") {
  const alertBox = document.getElementById("alertBox");
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;
  alertBox.classList.remove("d-none");
}




  // 🚪 Handle Sign-Out
  const signOutBtn = document.getElementById("signOutBtn");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        console.log("👋 Signed out successfully.");
        window.location.href = "../Pages/SignIn.html";
      } catch (error) {
        console.error("❌ Sign-out failed:", error);
      }
    });
  }
