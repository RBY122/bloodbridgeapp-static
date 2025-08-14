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