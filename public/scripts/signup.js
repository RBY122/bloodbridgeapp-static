document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signUpForm");
  const alertBox = document.getElementById("alertBox");
  const successPopup = document.getElementById("successPopup");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous alerts
    alertBox.classList.add("d-none");
    successPopup.classList.add("d-none");

    let isValid = true;

    // Helper function to show error
    function showError(inputId, message) {
      const input = document.getElementById(inputId);
      const errorSpan = input.nextElementSibling;
      input.classList.add("is-invalid");
      errorSpan.textContent = message;
      errorSpan.classList.remove("d-none");
      isValid = false;
    }

    // Helper function to clear error
    function clearError(inputId) {
      const input = document.getElementById(inputId);
      const errorSpan = input.nextElementSibling;
      input.classList.remove("is-invalid");
      errorSpan.classList.add("d-none");
    }

    // Validate Full Name
    const fullName = document.getElementById("fullName").value.trim();
    if (fullName === "") {
      showError("fullName", "Full name is required.");
    } else {
      clearError("fullName");
    }

    // Validate Email
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      showError("email", "Email is required.");
    } else if (!emailPattern.test(email)) {
      showError("email", "Enter a valid email address.");
    } else {
      clearError("email");
    }

    // Validate Password
    const password = document.getElementById("password").value;
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      showError("password", "Password must be at least 8 characters and include letters and numbers.");
    } else {
      clearError("password");
    }

    // Validate Confirm Password
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword !== password) {
      showError("confirmPassword", "Passwords do not match.");
    } else {
      clearError("confirmPassword");
    }

    // Validate Terms Checkbox
    const termsChecked = document.getElementById("terms").checked;
    const termsSpan = document.getElementById("terms").nextElementSibling.nextElementSibling;
    if (!termsChecked) {
      document.getElementById("terms").classList.add("is-invalid");
      termsSpan.classList.remove("d-none");
      isValid = false;
    } else {
      document.getElementById("terms").classList.remove("is-invalid");
      termsSpan.classList.add("d-none");
    }

    // If all valid, store user and show success
    if (isValid) {
      const userData = {
        fullName,
        email,
        password
      };

      localStorage.setItem("user", JSON.stringify(userData));
      successPopup.classList.remove("d-none");

      setTimeout(() => {
        window.location.href = "SignIn.html";
      }, 2000);
    } else {
      alertBox.textContent = "Please fix the errors above and try again.";
      alertBox.classList.remove("d-none");
      alertBox.classList.add("alert-danger");
    }
  });
});