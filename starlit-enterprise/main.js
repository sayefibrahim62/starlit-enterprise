// ============================================================
// STARLIT ENTERPRISE — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // ---- 2. Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));

  // ---- 3. Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksList.classList.toggle('open');
    document.body.style.overflow = navLinksList.classList.contains('open') ? 'hidden' : '';
  });
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksList.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- 4. Back to Top ----
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- 5. Footer Year ----
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- 6. Scroll Reveal ----
  const revealElements = document.querySelectorAll(
    '.service-card, .why-card, .contact-card, .about-grid, .appt-grid, .section-header'
  );
  revealElements.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => revealObserver.observe(el));

  // ---- 7. Hero Particles ----
  const particleContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 30;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.bottom = '-10px';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 10 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    particleContainer.appendChild(p);
  }

  // ---- 8. Set min date for appointment ----
  const dateInput = document.getElementById('appt-date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate() + 1).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // ---- 9. Appointment Form ----
  const apptForm = document.getElementById('appointmentForm');
  if (apptForm) {
    apptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(apptForm)) return;

      const btn = document.getElementById('appt-submit');
      const btnText = document.getElementById('appt-btn-text');
      btn.disabled = true;
      btnText.textContent = 'Submitting…';

      // Simulate submission (replace with your backend/FormSpree endpoint)
      setTimeout(() => {
        apptForm.classList.add('hidden');
        document.getElementById('appt-success').classList.remove('hidden');
      }, 1200);
    });
  }

  // ---- 10. Contact Form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(contactForm)) return;

      const btn = document.getElementById('contact-submit');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      setTimeout(() => {
        contactForm.classList.add('hidden');
        document.getElementById('contact-success').classList.remove('hidden');
      }, 1200);
    });
  }

  // ---- 11. Form Validation ----
  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#f87171';
        field.focus();
        valid = false;
      }
    });
    return valid;
  }

  // ---- 12. Smooth anchor scrolling (offset for fixed nav) ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
