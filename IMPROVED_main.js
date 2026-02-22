/**
 * ✅ IMPROVED: main.js
 * Replaces: java.js + public/scripts/site.js
 * A consolidated, modern JavaScript architecture for BloodBridge
 */

class BloodBridge {
  constructor() {
    this.currentPage = this.getPageName();
    this.init();
  }

  /**
   * Initialize all components
   */
  init() {
    this.setupNavigation();
    this.setupFormValidation();
    this.setupPasswordToggle();
    this.setupFAQ();
    this.setupPaymentFlow();
    this.setupEventDelegation();
    
    console.log('✅ BloodBridge initialized');
  }

  /**
   * Get current page name from URL
   */
  getPageName() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  /**
   * Setup navigation - highlight active links
   */
  setupNavigation() {
    document.querySelectorAll('.nav-item a').forEach(link => {
      if (link.href.includes(this.currentPage)) {
        link.parentElement.classList.add('active');
      }
    });
  }

  /**
   * Setup form validation with real-time feedback
   */
  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));
      
      // Real-time validation on input
      form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    });
  }

  /**
   * Validate individual form field
   */
  validateField(field) {
    const fieldName = field.name || field.id;
    const value = field.value.trim();
    let isValid = true;
    let error = '';

    // Email validation
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      error = 'Please enter a valid email address';
    }

    // Required field
    if (field.required && !value) {
      isValid = false;
      error = `${fieldName} is required`;
    }

    // Min length
    if (field.minLength && value.length < field.minLength) {
      isValid = false;
      error = `Minimum ${field.minLength} characters required`;
    }

    if (!isValid) {
      this.showFieldError(field, error);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  /**
   * Handle form submission
   */
  handleFormSubmit(e, form) {
    e.preventDefault();

    // Validate all fields
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let allValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        allValid = false;
      }
    });

    if (allValid) {
      this.showSuccess(`Form submitted successfully!`);
      // Here: Handle actual form submission (API call, etc.)
      // Example: submitForm(form);
    } else {
      this.showError('Please fix the errors above');
    }
  }

  /**
   * Show field-level error
   */
  showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let errorElement = field.parentElement.querySelector('.invalid-feedback');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'invalid-feedback';
      field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  /**
   * Clear field error
   */
  clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorElement = field.parentElement.querySelector('.invalid-feedback');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  /**
   * Setup password visibility toggle
   */
  setupPasswordToggle() {
    const toggleButtons = document.querySelectorAll('[data-toggle-password]');
    
    toggleButtons.forEach(btn => {
      const fieldId = btn.dataset.togglePassword;
      const passwordField = document.getElementById(fieldId);
      
      if (passwordField) {
        btn.addEventListener('click', () => {
          const isHidden = passwordField.type === 'password';
          passwordField.type = isHidden ? 'text' : 'password';
          btn.textContent = isHidden ? '👁️ Hide' : '🔒 Show';
          btn.setAttribute('aria-label', isHidden
            ? 'Hide password'
            : 'Show password (warning: password visible on screen)'
          );
        });
      }
    });
  }

  /**
   * Setup FAQ accordion functionality
   */
  setupFAQ() {
    const faqButtons = document.querySelectorAll('[data-faq-toggle]');
    
    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const faqItem = btn.parentElement;
        const content = faqItem.querySelector('.faq-content');
        const isOpen = faqItem.classList.contains('open');
        
        if (isOpen) {
          faqItem.classList.remove('open');
          btn.textContent = '▶ Expand Answer';
          content.style.display = 'none';
        } else {
          faqItem.classList.add('open');
          btn.textContent = '🔽 Collapse Answer';
          content.style.display = 'block';
        }
      });
    });
  }

  /**
   * Setup payment flow - step by step
   */
  setupPaymentFlow() {
    const paymentOptions = document.querySelectorAll('[data-payment-option]');
    const continueBtn = document.getElementById('continueBtn');

    paymentOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove active from all
        paymentOptions.forEach(o => o.classList.remove('active'));
        // Add active to clicked
        option.classList.add('active');
      });
    });

    if (continueBtn) {
      continueBtn.addEventListener('click', () => this.handlePaymentContinue());
    }
  }

  /**
   * Handle payment flow continuation
   */
  handlePaymentContinue() {
    const amount = document.getElementById('amount');
    const selectedMethod = document.querySelector('[data-payment-option].active');

    if (!amount || !amount.value || amount.value <= 0) {
      this.showError('Please enter a valid amount');
      return;
    }

    if (!selectedMethod) {
      this.showError('Please select a payment method');
      return;
    }

    this.showSuccess(`Proceeding with ${selectedMethod.textContent}: GHS ${amount.value}`);
    // Here: Handle payment API call
  }

  /**
   * Setup global event delegation for dynamic elements
   */
  setupEventDelegation() {
    // Bootstrap dropdown handling
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(trigger => {
      // Bootstrap handles this automatically, but we can add custom logic here
    });
  }

  /**
   * Show success message
   */
  showSuccess(message) {
    this.showAlert(message, 'success');
  }

  /**
   * Show error message
   */
  showError(message) {
    this.showAlert(message, 'danger');
  }

  /**
   * Show alert toast
   */
  showAlert(message, type = 'info') {
    const alertContainer = this.getAlertContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  /**
   * Get or create alert container
   */
  getAlertContainer() {
    let container = document.getElementById('alertContainer');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'alertContainer';
      container.className = 'position-fixed top-0 end-0 p-3';
      container.style.zIndex = 'var(--z-tooltip)';
      document.body.appendChild(container);
    }
    
    return container;
  }
}

/**
 * Initialize BloodBridge on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
  window.bloodBridge = new BloodBridge();
});

/**
 * Optional: Export for module systems
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BloodBridge;
}
