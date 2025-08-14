// 🌐 BloodBridge Dashboard Script
document.addEventListener("DOMContentLoaded", () => {
  // 🔗 DOM Elements
  const userNameSpan = document.getElementById("userName");
  const userEmailSpan = document.getElementById("userEmail");
  const alertBox = document.getElementById("alertBox");
  const logoutBtn = document.getElementById("logoutBtn");
  const yearSpan = document.getElementById("year");
  const notificationsPanel = document.getElementById("notificationsPanel");
  const schedulePanel = document.getElementById("schedulePanel");
  const chatInput = document.getElementById("chatInput");
  const postMessageBtn = document.getElementById("postMessage");
  const chatMessages = document.getElementById("chatMessages");

  // 🕒 Update Footer Year
  yearSpan.textContent = new Date().getFullYear();

  // 🔐 Check Login Status
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  if (isLoggedIn !== "true" || !user) {
    alertBox.textContent = "You must be signed in to access the dashboard.";
    alertBox.classList.remove("d-none", "alert-success");
    alertBox.classList.add("alert-danger");

    setTimeout(() => {
      window.location.href = "../Pages/SignIn.html";
    }, 2000);
    return;
  }

  // 👤 Display User Info
  userNameSpan.textContent = user.name || "Anonymous";
  if (userEmailSpan) userEmailSpan.textContent = user.email || "";

  // 🔓 Logout Handler
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "../Pages/SignIn.html";
  });

  // 🔔 Real-Time Notifications (Simulated)
  const sampleAlerts = [
    "Urgent: O+ blood needed at Kumasi South Hospital!",
    "Blood campaign at KNUST campus this Saturday.",
    "AB- donors needed for emergency surgery at Komfo Anokye.",
    "🩸 New donor registered in Kumasi!",
    "🚨 Urgent request: O+ blood needed at Komfo Anokye Teaching Hospital.",
    "❤️ Your donation schedule has been updated.",
    "📢 Forum update: New discussion on donor eligibility."
  ];

  // Store alerts once
  if (!localStorage.getItem("bloodBridgeAlerts")) {
    localStorage.setItem("bloodBridgeAlerts", JSON.stringify(sampleAlerts));
  }

  // Rotate alerts every 5 seconds
  function activateNotifications() {
    const banner = document.getElementById("notificationBanner");
    const alerts = JSON.parse(localStorage.getItem("bloodBridgeAlerts"));
    let index = 0;

    setInterval(() => {
      if (banner) {
        banner.querySelector("span").textContent = alerts[index];
        banner.classList.add("flash");
        setTimeout(() => banner.classList.remove("flash"), 1000);
        index = (index + 1) % alerts.length;
      }
    }, 5000);
  }

  activateNotifications();

  // 📅 Load Donation Schedule
  const schedule = JSON.parse(localStorage.getItem("donationSchedule")) || [
    { date: "2025-08-20", location: "Kumasi Central Blood Bank" },
    { date: "2025-09-05", location: "Tech Hospital" }
  ];

  if (schedulePanel && schedule.length > 0) {
    schedulePanel.innerHTML = schedule.map(item => `
      <div class="mb-2">
        <strong>${item.date}</strong> — ${item.location}
      </div>
    `).join("");
  }

  // 💬 Chat Forum Logic
  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

  function renderMessages() {
    if (!chatMessages) return;

    if (messages.length === 0) {
      chatMessages.innerHTML = `<p class="text-muted">No messages yet. Be the first to share!</p>`;
    } else {
      chatMessages.innerHTML = messages.map(msg => `
        <div class="border rounded p-2 mb-2">
          <strong>${msg.name}</strong><br/>
          <span>${msg.text}</span>
        </div>
      `).join("");
    }
  }

  if (postMessageBtn && chatInput) {
    postMessageBtn.addEventListener("click", () => {
      const text = chatInput.value.trim();
      if (text !== "") {
        messages.push({ name: user.name || "Anonymous", text });
        localStorage.setItem("chatMessages", JSON.stringify(messages));
        chatInput.value = "";
        renderMessages();
      }
    });
  }

  renderMessages();

  // 🚀 Action Button Navigation
  const navMap = {
    btnSchedule: "Appointments.html",
    btnForum: "Forum.html",
    btnProfile: "Profile.html"
  };

  Object.entries(navMap).forEach(([id, url]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => window.location.href = url;
    }
  });
});

document.getElementById("btnSchedule").onclick = () => window.location.href = "Appointments.html";
document.getElementById("btnForum").onclick = () => window.location.href = "forum.html";
document.getElementById("btnProfile").onclick = () => window.location.href = "Profile.html";
