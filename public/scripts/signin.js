document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const alertBox = document.getElementById("alertBox");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  // Toggle password visibility
  togglePasswordBtn.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePasswordBtn.innerHTML = type === "password"
      ? `<i class="fas fa-eye"></i> Show Password`
      : `<i class="fas fa-eye-slash"></i> Hide Password`;
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alertBox.classList.add("d-none");

    let isValid = true;

    // Helper functions
    function showError(inputId, message) {
      const input = document.getElementById(inputId);
      const errorSpan = input.nextElementSibling;
      input.classList.add("is-invalid");
      errorSpan.textContent = message;
      errorSpan.classList.remove("d-none");
      isValid = false;
    }

    function clearError(inputId) {
      const input = document.getElementById(inputId);
      const errorSpan = input.nextElementSibling;
      input.classList.remove("is-invalid");
      errorSpan.classList.add("d-none");
    }

    // Validate Email
    const email = document.getElementById("email").value.trim();
    if (email === "") {
      showError("email", "Email is required.");
    } else {
      clearError("email");
    }

    // Validate Password
    const password = passwordInput.value;
    if (password === "") {
      showError("password", "Password is required.");
    } else {
      clearError("password");
    }

    // If valid, check credentials
    if (isValid) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "../Pages/Dashboard.html";
      } else {
        alertBox.textContent = "Invalid email or password.";
        alertBox.classList.remove("d-none");
        alertBox.classList.add("alert-danger");
      }
    } else {
      alertBox.textContent = "Please fix the errors above and try again.";
      alertBox.classList.remove("d-none");
      alertBox.classList.add("alert-danger");
    }
  });
});