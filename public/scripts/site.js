document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // 1. Bootstrap Dropdowns
  // ----------------------------
  document.querySelectorAll(".dropdown-toggle").forEach(trigger => {
    new bootstrap.Dropdown(trigger);
  });

  // ----------------------------
  // 2. FAQ Toggle Text
  // ----------------------------
  document.addEventListener("click", event => {
    const button = event.target.closest(".card button");
    const collapseElement = button?.closest(".card")?.querySelector(".collapse");
    if (collapseElement) {
      collapseElement.addEventListener("shown.bs.collapse", () => {
        button.textContent = "🔽 Collapse Answer";
      });
      collapseElement.addEventListener("hidden.bs.collapse", () => {
        button.textContent = "▶ Expand Answer";
      });
    }
  });

  // ----------------------------
  // 3. Footer Padding
  // ----------------------------
  document.body.style.paddingBottom = "80px";

  // ----------------------------
  // 4. Password Toggle & Validation
  // ----------------------------
  const passwordInput = document.getElementById("password");
  const togglePasswordButton = document.getElementById("toggle-password");

  if (passwordInput && togglePasswordButton) {
    togglePasswordButton.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePasswordButton.textContent = isHidden ? "Hide password" : "Show password";
      togglePasswordButton.setAttribute("aria-label", isHidden
        ? "Hide password."
        : "Show password as plain text. Warning: this will display your password on the screen.");
    });

    passwordInput.addEventListener("input", () => passwordInput.setCustomValidity(""));
  }

  function validatePassword() {
    if (!passwordInput) return;
    const value = passwordInput.value;
    const messages = [];
    if (value.length < 8) messages.push("At least eight characters.");
    if (!/[A-Z]/.test(value)) messages.push("At least one uppercase letter.");
    if (!/[a-z]/.test(value)) messages.push("At least one lowercase letter.");
    if (!/\d/.test(value)) messages.push("At least one number.");
    if (!/[@$!%*?&]/.test(value)) messages.push("At least one special character.");
    passwordInput.setCustomValidity(messages.join(" "));
  }

  const form = document.querySelector("form");
  const signinButton = document.querySelector("button#sign-in");

  if (form && signinButton) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      validatePassword();
      form.reportValidity();
      if (form.checkValidity()) {
        alert("Logging in!");
        signinButton.disabled = true;
      }
    });
  }

  // ----------------------------
  // 5. Active Nav Highlight
  // ----------------------------
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-item a").forEach(link => {
    if (link.href.includes(currentPage)) {
      link.parentElement.classList.add("active");
    }
  });

  // ----------------------------
  // 6. Payment Flow (jQuery)
  // ----------------------------
  $(".payment-option").click(function () {
    $(".payment-option").removeClass("active");
    $(this).addClass("active");
  });

  $("#continueBtn").click(function () {
    const amount = $("#amount").val();
    const methodSelected = $(".payment-option.active").length > 0;
    $("#errorMessage").hide();

    if (!amount || amount <= 0) {
      showError("Please enter a valid donation amount.");
    } else if (!methodSelected) {
      showError("Please select a payment method.");
    } else {
      $("#step1").hide();
      $("#step2").fadeIn();
    }
  });

  function showError(message) {
    $("#errorMessage").text(message).fadeIn();
  }

  $("#paymentSuccessBtn").click(function () {
    $("#step2").hide();
    $("#step3").fadeIn();
  });

  // ----------------------------
  // 7. Team Carousel
  // ----------------------------
  const teamCarousel = document.querySelector('#teamCarousel');
  if (teamCarousel) {
    new bootstrap.Carousel(teamCarousel);
  }

  // ----------------------------
  // 8. Select2 & Form Steps (jQuery)
  // ----------------------------
  $('.select2').select2();

  $('.next-step').click(function () {
    $(this).closest('.form-step').hide().next('.form-step').show();
  });

  $('.prev-step').click(function () {
    $(this).closest('.form-step').hide().prev('.form-step').show();
  });

  // ----------------------------
  // 9. Progress Bar & Step Navigation
  // ----------------------------
  const progressBar = document.querySelector("#completionBar");
  const completionText = document.querySelector("#profileCompletion");
  const profileFields = document.querySelectorAll("input, select, textarea");
  const steps = document.querySelectorAll(".form-step");
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
    });
  }

  function updateProgress() {
    const completed = Array.from(profileFields).filter(field =>
      field.type === "checkbox" ? field.checked : field.value.trim() !== ""
    ).length;
    const percent = (completed / profileFields.length) * 100;
    if (progressBar) {
      progressBar.style.width = percent + "%";
      progressBar.setAttribute("aria-valuenow", percent);
    }
    if (completionText) {
      completionText.innerText = Math.round(percent) + "%";
    }
  }

  profileFields.forEach(field => {
    field.addEventListener("input", updateProgress);
    field.addEventListener("change", updateProgress);
  });

  updateProgress();
  showStep(currentStep);

  document.querySelectorAll(".next-step").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll(".prev-step").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // ----------------------------
  // 10. Dark Mode Toggle
  // ----------------------------
  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });

  // ----------------------------
  // 11. View More / Less Toggle
  // ----------------------------
  const collapseElement = document.getElementById("moreDetails");
  const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");

  if (collapseElement && toggleDetailsBtn) {
    collapseElement.addEventListener("shown.bs.collapse", () => {
      toggleDetailsBtn.textContent = "Show Less";
    });
    collapseElement.addEventListener("hidden.bs.collapse", () => {
      toggleDetailsBtn.textContent = "View More Details";
    });
  }

  // ----------------------------
  // 12. Counter Animation
  // ----------------------------
  feather.replace();
  document.querySelectorAll('.counter').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const update = () => {
      count += Math.ceil(target / 200);
      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });

  // ----------------------------
  // 13. Mobile Dropdown Close
  // ----------------------------
  document.addEventListener("click", event => {
    document.querySelectorAll(".dropdown-menu").forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        dropdown.style.visibility = "hidden";
        dropdown.style.opacity = "0";
      }
    });
  });
});


document.querySelectorAll('.bottom-nav div').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.bottom-nav i').forEach(icon => {
      icon.classList.remove('active');
    });
    item.querySelector('i').classList.add('active');
  });
});

// auth.js — Session Checker for BloodBridge

(function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in — redirect to login page
    window.location.href = "/Pages/SignIn.html";
  } else {
    // Optional: personalize UI
    const welcomeEl = document.getElementById("welcomeUser");
    if (welcomeEl) {
      welcomeEl.textContent = `Welcome, ${user.name}`;
    }
  }
})();