/**
 * Neha Infrastructures — Verified Enquiry & Contact Handler
 * Provides accessible inline validation, anti-duplicate submission protection,
 * configurable form endpoint integration, and instant direct WhatsApp / Email fallback.
 * Strictly avoids storing personal client data in unencrypted browser storage.
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

    // Optional Cloud Database Endpoint (e.g. Supabase REST API)
    supabaseUrl: '',
    supabaseAnonKey: '',

    // Verified Company Contact Channels (Strictly Preserved)
    companyPhone: '+91 98452 21414',
    companyPhoneRaw: '+919845221414',
    companyWhatsApp: '919845221414',
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

  function ensureModalExists() {
    if (document.getElementById('contactFeedbackModal')) return;

    var modalHtml = [
      '<div id="contactFeedbackModal" class="contact-feedback-modal" role="dialog" aria-modal="true" aria-labelledby="enquiryModalTitle" aria-describedby="enquiryModalDesc">',
      '  <div class="contact-feedback-card">',
      '    <div class="contact-feedback-icon">',
      '      <i class="fas fa-check-circle"></i>',
      '    </div>',
      '    <h3 id="enquiryModalTitle">Enquiry Details Verified</h3>',
      '    <p id="enquiryModalDesc">Your civil project specifications have been formatted. Because project timelines and tender estimates require prompt coordination, transmit your enquiry directly to our engineering management team:</p>',
      '    <div class="contact-feedback-actions">',
      '      <a id="modalWhatsAppBtn" href="#" target="_blank" rel="noopener noreferrer" class="whatsapp-send-btn">',
      '        <i class="fab fa-whatsapp" style="font-size: 20px;"></i> Send via WhatsApp (+91 98452 21414)',
      '      </a>',
      '      <a id="modalEmailBtn" href="#" class="email-send-btn">',
      '        <i class="fas fa-envelope"></i> Send via Official Email (nehainfra@yahoo.com)',
      '      </a>',
      '      <button type="button" class="modal-close-btn" id="modalCloseBtn">Close Window</button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    var closeBtn = document.getElementById('modalCloseBtn');
    var modalOverlay = document.getElementById('contactFeedbackModal');

    function closeModal() {
      if (modalOverlay) modalOverlay.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function initEnquiryHandlers() {
    ensureModalExists();

    var contactForm = document.getElementById('neha-contact-form');
    if (!contactForm) return;

    var nameInput = contactForm.querySelector('#contact-name');
    var phoneInput = contactForm.querySelector('#contact-phone');
    var emailInput = contactForm.querySelector('#contact-email');
    var serviceInput = contactForm.querySelector('#contact-service');
    var messageInput = contactForm.querySelector('#contact-message');
    var submitBtn = contactForm.querySelector('#submit-enquiry-btn');
    var feedbackEl = document.getElementById('enquiry-feedback');

    var nameErr = document.getElementById('contact-name-error');
    var phoneErr = document.getElementById('contact-phone-error');
    var emailErr = document.getElementById('contact-email-error');
    var messageErr = document.getElementById('contact-message-error');

    // Live clearing on typing
    if (nameInput) nameInput.addEventListener('input', function () { clearInlineError(nameInput, nameErr); });
    if (phoneInput) phoneInput.addEventListener('input', function () { clearInlineError(phoneInput, phoneErr); });
    if (emailInput) emailInput.addEventListener('input', function () { clearInlineError(emailInput, emailErr); });
    if (messageInput) messageInput.addEventListener('input', function () { clearInlineError(messageInput, messageErr); });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      var firstInvalid = null;

      var name = nameInput ? nameInput.value.trim() : '';
      var phone = phoneInput ? phoneInput.value.trim() : '';
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

      // Validate Phone (digits only count)
      var cleanDigits = phone.replace(/\D/g, '');
      if (!phone || cleanDigits.length < 8 || cleanDigits.length > 15) {
        showInlineError(phoneInput, phoneErr, 'Please enter a valid contact phone number (at least 8-10 digits).');
        isValid = false;
        if (!firstInvalid) firstInvalid = phoneInput;
      } else {
        clearInlineError(phoneInput, phoneErr);
      }

      // Validate Email (when supplied)
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (email && !emailRegex.test(email)) {
        showInlineError(emailInput, emailErr, 'Please enter a valid email address (e.g. name@domain.com).');
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

      // Prepare Direct Dispatch URLs
      var waText = encodeURIComponent(
        'Hello Neha Infrastructures Engineering Team,\n\n' +
        'PROJECT ENQUIRY DETAILS:\n' +
        '• Name: ' + name + '\n' +
        '• Phone: ' + phone + '\n' +
        (email ? ('• Email: ' + email + '\n') : '') +
        '• Service Category: ' + service + '\n\n' +
        'Scope of Work / Requirements:\n' + message + '\n\n' +
        '[Transmitted via Neha Infrastructures Official Portal]'
      );
      var waUrl = 'https://wa.me/' + window.NEHA_CONFIG.companyWhatsApp + '?text=' + waText;

      var mailSubject = encodeURIComponent('Civil Project Enquiry: ' + service + ' — ' + name);
      var mailBody = encodeURIComponent(
        'Dear M/s Neha Infrastructures Team,\n\n' +
        'I am submitting a civil engineering project enquiry through your official website.\n\n' +
        'Client / Agency Name: ' + name + '\n' +
        'Contact Phone: ' + phone + '\n' +
        (email ? ('Contact Email: ' + email + '\n') : '') +
        'Service of Interest: ' + service + '\n\n' +
        'Project Location & Scope:\n' + message + '\n\n' +
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
            phone: phone,
            email: email || 'Not supplied',
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
                '  <div><strong>Enquiry Received!</strong> Your civil project specifications have been successfully delivered to our engineering desk. We will review your requirements and respond within 1 business day.</div>',
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
              '    <i class="fas fa-exclamation-triangle me-2 fs-5"></i>',
              '    <strong>Automated Transmission Notice:</strong>',
              '  </div>',
              '  <p class="mb-2 small">The automated service is currently experiencing network latency. To ensure your enquiry is received immediately, dispatch directly via our verified channels:</p>',
              '  <div class="d-flex flex-wrap gap-2 mt-2">',
              '    <a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-sm text-white" style="background-color: #25D366;">',
              '      <i class="fab fa-whatsapp me-1"></i> Send via WhatsApp (' + window.NEHA_CONFIG.companyPhone + ')',
              '    </a>',
              '    <a href="' + mailUrl + '" class="btn btn-sm btn-dark">',
              '      <i class="fas fa-envelope me-1"></i> Send via Email (' + window.NEHA_CONFIG.companyEmail + ')',
              '    </a>',
              '  </div>',
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
        // Transparent Direct Dispatch Flow (GitHub Pages production baseline)
        var modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
        var modalEmailBtn = document.getElementById('modalEmailBtn');
        var modal = document.getElementById('contactFeedbackModal');

        if (modalWhatsAppBtn) {
          modalWhatsAppBtn.href = waUrl;
          modalWhatsAppBtn.onclick = function () {
            if (modal) modal.classList.remove('active');
            if (feedbackEl) {
              feedbackEl.innerHTML = [
                '<div class="alert alert-success d-flex align-items-center" role="alert">',
                '  <i class="fas fa-check-circle me-2 fs-5"></i>',
                '  <div><strong>Enquiry Dispatched via WhatsApp!</strong> Your project enquiry has been launched to our engineering team at +91 98452 21414.</div>',
                '</div>'
              ].join('');
            }
            contactForm.reset();
          };
        }

        if (modalEmailBtn) {
          modalEmailBtn.href = mailUrl;
          modalEmailBtn.onclick = function () {
            if (modal) modal.classList.remove('active');
            if (feedbackEl) {
              feedbackEl.innerHTML = [
                '<div class="alert alert-success d-flex align-items-center" role="alert">',
                '  <i class="fas fa-check-circle me-2 fs-5"></i>',
                '  <div><strong>Enquiry Prepared via Email!</strong> Your project details have been loaded into your mail client for transmission to nehainfra@yahoo.com.</div>',
                '</div>'
              ].join('');
            }
            contactForm.reset();
          };
        }

        if (modal) {
          modal.classList.add('active');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnquiryHandlers);
  } else {
    initEnquiryHandlers();
  }
})();
