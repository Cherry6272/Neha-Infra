/**
 * Neha Infrastructures — Verified Enquiry & Contact Handler
 * Provides honest client-side validation, WhatsApp/Email prefilled handoff,
 * and seamless offline CRM logging for leads.html
 */

(function () {
  'use strict';

  function initEnquiryHandlers() {
    var forms = document.querySelectorAll('.contact-form-validated, .comment-one__form, #contact-form, #neha-contact-form');
    
    // Inject modal if not present
    if (!document.getElementById('contactFeedbackModal')) {
      var modalHtml = [
        '<div id="contactFeedbackModal" class="contact-feedback-modal" role="dialog" aria-modal="true" aria-labelledby="enquiryModalTitle">',
        '  <div class="contact-feedback-card">',
        '    <div class="contact-feedback-icon">',
        '      <i class="fas fa-check-circle"></i>',
        '    </div>',
        '    <h3 id="enquiryModalTitle">Enquiry Details Prepared</h3>',
        '    <p id="enquiryModalDesc">Thank you for reaching out to M/s Neha Infrastructures. Your civil project enquiry has been formatted. Choose how you would like to transmit your message directly to our engineering team:</p>',
        '    <div class="contact-feedback-actions">',
        '      <a id="modalWhatsAppBtn" href="#" target="_blank" class="whatsapp-send-btn">',
        '        <i class="fab fa-whatsapp" style="font-size: 20px;"></i> Send via WhatsApp to +91 98452 21414',
        '      </a>',
        '      <a id="modalEmailBtn" href="#" class="email-send-btn">',
        '        <i class="fas fa-envelope"></i> Send via Email (nehainfra@yahoo.com)',
        '      </a>',
        '      <button type="button" class="modal-close-btn" id="modalCloseBtn">Close Window</button>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n');
      
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      
      var closeBtn = document.getElementById('modalCloseBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          document.getElementById('contactFeedbackModal').classList.remove('active');
        });
      }
      
      var modalOverlay = document.getElementById('contactFeedbackModal');
      if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
          if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
          }
        });
      }
    }

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var nameInput = form.querySelector('[name="name"], [name="form_name"]');
        var emailInput = form.querySelector('[name="email"], [name="form_email"]');
        var phoneInput = form.querySelector('[name="phone"], [name="form_phone"]');
        var subjectInput = form.querySelector('[name="subject"], [name="form_subject"]');
        var messageInput = form.querySelector('[name="message"], textarea');

        var name = nameInput ? nameInput.value.trim() : '';
        var email = emailInput ? emailInput.value.trim() : '';
        var phone = phoneInput ? phoneInput.value.trim() : '';
        var subject = subjectInput ? subjectInput.value.trim() : 'Civil Infrastructure Project Enquiry';
        var message = messageInput ? messageInput.value.trim() : '';

        // Validation
        if (!name || name.length < 2) {
          alert('Please enter your full name.');
          if (nameInput) nameInput.focus();
          return false;
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
          alert('Please enter a valid email address.');
          if (emailInput) emailInput.focus();
          return false;
        }

        if (!phone || phone.replace(/\D/g, '').length < 8) {
          alert('Please enter a valid phone number (at least 8 digits).');
          if (phoneInput) phoneInput.focus();
          return false;
        }

        if (!message || message.length < 5) {
          alert('Please provide a brief description of your project or requirements.');
          if (messageInput) messageInput.focus();
          return false;
        }

        // Save to CRM localStorage
        try {
          var leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
          leads.push({
            id: 'lead_' + Date.now().toString(36),
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message,
            source: 'Website Contact Form',
            status: 'New',
            timestamp: Date.now(),
            pageSource: window.location.pathname.split('/').pop() || 'index.html'
          });
          localStorage.setItem('crm_leads', JSON.stringify(leads));
        } catch (err) {
          console.warn('CRM logging error:', err);
        }

        // Prepare prefilled links
        var waText = encodeURIComponent(
          'Hello Neha Infrastructures,\n\n' +
          'Name: ' + name + '\n' +
          'Phone: ' + phone + '\n' +
          'Email: ' + email + '\n' +
          'Subject: ' + subject + '\n\n' +
          'Project Requirements:\n' + message
        );
        var waUrl = 'https://wa.me/919845221414?text=' + waText;

        var mailtoSubject = encodeURIComponent('Project Enquiry: ' + subject + ' — ' + name);
        var mailtoBody = encodeURIComponent(
          'Dear M/s Neha Infrastructures Team,\n\n' +
          'I am requesting information regarding civil infrastructure services.\n\n' +
          'Client Name: ' + name + '\n' +
          'Contact Phone: ' + phone + '\n' +
          'Contact Email: ' + email + '\n\n' +
          'Requirements & Scope:\n' + message + '\n\n' +
          'Regards,\n' + name
        );
        var mailtoUrl = 'mailto:nehainfra@yahoo.com?subject=' + mailtoSubject + '&body=' + mailtoBody;

        // Update modal buttons
        var modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
        var modalEmailBtn = document.getElementById('modalEmailBtn');
        if (modalWhatsAppBtn) modalWhatsAppBtn.href = waUrl;
        if (modalEmailBtn) modalEmailBtn.href = mailtoUrl;

        // Show modal
        var modal = document.getElementById('contactFeedbackModal');
        if (modal) {
          modal.classList.add('active');
        }

        // Clear form
        form.reset();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnquiryHandlers);
  } else {
    initEnquiryHandlers();
  }
})();
