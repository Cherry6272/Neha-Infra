/**
 * Neha Infrastructures — Verified Enquiry & Contact Handler
 * Provides accessible inline validation, anti-duplicate submission protection,
 * configurable form endpoint integration, and direct official email transmission.
 * Form submissions are delivered exclusively to nehainfra@yahoo.com.
 */

(function () {
  'use strict';

  // Centralized Configuration
  window.NEHA_CONFIG = window.NEHA_CONFIG || {
    // External Form Submission Service:
    // To route enquiries to email automatically via Formspree on GitHub Pages:
    // Set formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'
    // Leave as empty string ('') when awaiting account registration.
    formspreeEndpoint: '',

    // Official Company Contact Destination (Email only)
    companyEmail: 'nehainfra@yahoo.com',
    companyAddress: '#02, 1st Floor, Rangasri, Canara Bank Layout, Bangalore – 560097'
  };

  // Privacy Protection: Purge any legacy unencrypted CRM data
  try {
    localStorage.removeItem('crm_leads');
    localStorage.removeItem('crm_visits');
    localStorage.removeItem('crm_authenticated');
    sessionStorage.removeItem('crm_authenticated');
  } catch (e) {
    // Ignore storage restriction
  }

  function showInlineError(inputEl, errorEl, message) {
    if (!inputEl || !errorEl) return;
    inputEl.classList.add('is-invalid');
    inputEl.setAttribute('aria-invalid', 'true');
    var span = errorEl.querySelector('span') || errorEl;
    span.textContent = message;
    errorEl.style.display = 'block';
  }

  function clearInlineError(inputEl, errorEl) {
    if (!inputEl) return;
    inputEl.classList.remove('is-invalid');
    inputEl.setAttribute('aria-invalid', 'false');
    if (errorEl) {
      errorEl.style.display = 'none';
      var span = errorEl.querySelector('span') || errorEl;
      span.textContent = '';
    }
  }

  function initEnquiryHandlers() {
    var contactForm = document.getElementById('neha-contact-form');
    if (!contactForm) return;

    var nameInput = contactForm.querySelector('#contact-name');
    var emailInput = contactForm.querySelector('#contact-email');
    var serviceInput = contactForm.querySelector('#contact-service');
    var messageInput = contactForm.querySelector('#contact-message');
    var submitBtn = contactForm.querySelector('#submit-enquiry-btn');
    var feedbackEl = document.getElementById('enquiry-feedback');

    var nameErr = document.getElementById('contact-name-error');
    var emailErr = document.getElementById('contact-email-error');
    var messageErr = document.getElementById('contact-message-error');

    // Live clearing on typing
    if (nameInput) nameInput.addEventListener('input', function () { clearInlineError(nameInput, nameErr); });
    if (emailInput) emailInput.addEventListener('input', function () { clearInlineError(emailInput, emailErr); });
    if (messageInput) messageInput.addEventListener('input', function () { clearInlineError(messageInput, messageErr); });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      var firstInvalid = null;

      var name = nameInput ? nameInput.value.trim() : '';
      var email = emailInput ? emailInput.value.trim() : '';
      var service = serviceInput ? serviceInput.value.trim() : 'Civil Infrastructure Project Enquiry';
      var message = messageInput ? messageInput.value.trim() : '';

      // Validate Name
      if (!name || name.length < 2) {
        showInlineError(nameInput, nameErr, 'Please enter your full name (minimum 2 characters).');
        isValid = false;
        if (!firstInvalid) firstInvalid = nameInput;
      } else {
        clearInlineError(nameInput, nameErr);
      }

      // Validate Email (Required)
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!email || !emailRegex.test(email)) {
        showInlineError(emailInput, emailErr, 'Please enter a valid email address for correspondence (e.g. name@domain.com).');
        isValid = false;
        if (!firstInvalid) firstInvalid = emailInput;
      } else {
        clearInlineError(emailInput, emailErr);
      }

      // Validate Message / Scope
      if (!message || message.length < 10) {
        showInlineError(messageInput, messageErr, 'Please describe your project location and scope of work (minimum 10 characters).');
        isValid = false;
        if (!firstInvalid) firstInvalid = messageInput;
      } else {
        clearInlineError(messageInput, messageErr);
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Prepare Direct Email URLs
      var mailSubject = encodeURIComponent('Civil Project Enquiry: ' + service + ' — ' + name);
      var mailBody = encodeURIComponent(
        'Dear M/s Neha Infrastructures Engineering Team,\n\n' +
        'PROJECT ENQUIRY DETAILS:\n' +
        '• Client / Firm Name: ' + name + '\n' +
        '• Official Email: ' + email + '\n' +
        '• Service Category: ' + service + '\n\n' +
        'Scope of Work / Project Specifications:\n' + message + '\n\n' +
        'Regards,\n' + name
      );
      var mailUrl = 'mailto:' + window.NEHA_CONFIG.companyEmail + '?subject=' + mailSubject + '&body=' + mailBody;

      // Check if external Formspree / Cloud endpoint is configured
      var endpoint = window.NEHA_CONFIG.formspreeEndpoint;

      if (endpoint && typeof endpoint === 'string' && endpoint.trim().length > 0) {
        // Prevent accidental duplicate submissions
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Transmitting Enquiry...';
        }

        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            service: service,
            message: message,
            submissionDate: new Date().toISOString(),
            sourcePage: window.location.pathname.split('/').pop() || 'contact.html'
          })
        })
        .then(function (response) {
          if (response.ok) {
            if (feedbackEl) {
              feedbackEl.innerHTML = [
                '<div class="alert alert-success d-flex align-items-center" role="alert">',
                '  <i class="fas fa-check-circle me-2 fs-5"></i>',
                '  <div><strong>Enquiry Received!</strong> Your civil project specifications have been successfully delivered to our engineering desk (' + window.NEHA_CONFIG.companyEmail + '). We will review your requirements and respond within 1 business day.</div>',
                '</div>'
              ].join('');
            }
            contactForm.reset();
          } else {
            throw new Error('Endpoint returned HTTP ' + response.status);
          }
        })
        .catch(function (err) {
          console.warn('Form submission service error:', err);
          if (feedbackEl) {
            feedbackEl.innerHTML = [
              '<div class="alert alert-warning" role="alert">',
              '  <div class="d-flex align-items-center mb-2">',
              '    <i class="fas fa-envelope me-2 fs-5"></i>',
              '    <strong>Direct Email Delivery:</strong>',
              '  </div>',
              '  <p class="mb-2 small">To transmit your project specifications directly to our engineering desk, click below to send via email:</p>',
              '  <a href="' + mailUrl + '" class="thm-btn py-2 px-3" style="font-size: 14px;">',
              '    <i class="fas fa-paper-plane me-1"></i> Send via Email (' + window.NEHA_CONFIG.companyEmail + ')',
              '  </a>',
              '</div>'
            ].join('');
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Submit Project Enquiry';
          }
        });

      } else {
        // Direct Email Handoff (Static GitHub Pages production baseline)
        window.location.href = mailUrl;

        if (feedbackEl) {
          feedbackEl.innerHTML = [
            '<div class="alert alert-success d-flex align-items-center" role="alert">',
            '  <i class="fas fa-check-circle me-2 fs-5"></i>',
            '  <div><strong>Enquiry Loaded:</strong> Your project enquiry has been prepared and opened in your email client for delivery to <strong>' + window.NEHA_CONFIG.companyEmail + '</strong>. If your mail client did not open automatically, <a href="' + mailUrl + '" class="fw-bold text-dark text-decoration-underline">click here to send email</a>.</div>',
            '</div>'
          ].join('');
        }
        contactForm.reset();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnquiryHandlers);
  } else {
    initEnquiryHandlers();
  }
})();
