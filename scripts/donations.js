// donations.js
import { db } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

export async function loadDonationHistory(userId) {
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