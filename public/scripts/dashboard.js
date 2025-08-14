document.addEventListener("DOMContentLoaded", () => {
  const userNameSpan = document.getElementById("userName");
  const userEmailSpan = document.getElementById("userEmail");
  const alertBox = document.getElementById("alertBox");
  const logoutBtn = document.getElementById("logoutBtn");
  const yearSpan = document.getElementById("year");

  // Update footer year
  yearSpan.textContent = new Date().getFullYear();

  // Check login status
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

  // Display user info
  userNameSpan.textContent = user.name || "Anonymous";
  userEmailSpan.textContent = user.email;

  // Logout handler
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "../Pages/SignIn.html";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const userNameSpan = document.getElementById("userName");
  const yearSpan = document.getElementById("year");
  const logoutBtn = document.getElementById("logoutBtn");

  // 🕒 Footer Year
  yearSpan.textContent = new Date().getFullYear();

  // 👤 Load User Info
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.name) {
    userNameSpan.textContent = user.name;
  }

  // 🔓 Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../Pages/SignIn.html";
  });

  // 🔔 Real-Time Notifications (Simulated)
  const notificationsPanel = document.getElementById("notificationsPanel");
  const sampleAlerts = [
    "Urgent: O+ blood needed at Kumasi South Hospital!",
    "Blood campaign at KNUST campus this Saturday.",
    "AB- donors needed for emergency surgery at Komfo Anokye."
  ];
  let alertIndex = 0;

  function showNextAlert() {
    notificationsPanel.innerHTML = `<div class="alert alert-warning">${sampleAlerts[alertIndex]}</div>`;
    alertIndex = (alertIndex + 1) % sampleAlerts.length;
  }

  showNextAlert(); // Initial alert
  setInterval(showNextAlert, 10000); // Rotate every 10 seconds

  // 📅 Donation Schedule
  const schedulePanel = document.getElementById("schedulePanel");
  const schedule = JSON.parse(localStorage.getItem("donationSchedule")) || [
    { date: "2025-08-20", location: "Kumasi Central Blood Bank" },
    { date: "2025-09-05", location: "Tech Hospital" }
  ];

  if (schedule.length > 0) {
    schedulePanel.innerHTML = schedule.map(item => `
      <div class="mb-2">
        <strong>${item.date}</strong> — ${item.location}
      </div>
    `).join("");
  }

  // 💬 Chat Forum
  const chatInput = document.getElementById("chatInput");
  const postMessageBtn = document.getElementById("postMessage");
  const chatMessages = document.getElementById("chatMessages");
  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

  function renderMessages() {
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

  postMessageBtn.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (text !== "") {
      messages.push({ name: user.name || "Anonymous", text });
      localStorage.setItem("chatMessages", JSON.stringify(messages));
      chatInput.value = "";
      renderMessages();
    }
  });

  renderMessages();
});
