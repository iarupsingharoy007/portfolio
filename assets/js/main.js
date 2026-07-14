// ============================================================
// ARUP SINGHA ROY — site interactions
// ============================================================
(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const themeBtn = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  function setThemeIcon() {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (themeBtn) themeBtn.innerHTML = isLight ? sunIcon() : moonIcon();
  }
  function moonIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12.3A9 9 0 1 1 11.7 3 7 7 0 0 0 21 12.3Z"/></svg>';
  }
  function sunIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2 12h2.4M19.6 12H22M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"/></svg>';
  }
  setThemeIcon();
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      if (next === 'dark') root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', next);
      setThemeIcon();
    });
  }

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  /* ---------- Scroll-spy active nav link ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObs.observe(el));

  /* ---------- Magnetic buttons (fallback when GSAP isn't available) ---------- */
  if (!window.gsap) {
    const magnets = document.querySelectorAll('.btn, .icon-btn');
    magnets.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ---------- Cursor glow ---------- */
  const glow = document.querySelector('.cursor-glow');
  if (glow) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- Hero aurora parallax (mouse) ---------- */
  const blobs = document.querySelectorAll('.aurora-blob');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    blobs.forEach((b, i) => {
      const depth = (i + 1) * 6;
      b.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  /* ---------- Nav: shrink on scroll + hide on scroll-down / reveal on scroll-up ---------- */
  const navEl = document.querySelector('.nav');
  if (navEl) {
    let lastY = window.scrollY;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        navEl.classList.toggle('scrolled', y > 40);
        if (y > lastY && y > 140) navEl.classList.add('nav-hidden');
        else navEl.classList.remove('nav-hidden');
        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const statusEl = contactForm.querySelector('[data-form-status]');
    const submitBtn = contactForm.querySelector('.form-submit');

    function setFieldError(id, message) {
      const err = contactForm.querySelector(`[data-error-for="${id}"]`);
      if (err) err.textContent = message || '';
      const field = contactForm.querySelector(`#${id}`);
      if (field) field.closest('.field')?.classList.toggle('has-error', !!message);
    }

    function validate() {
      let ok = true;
      const name = contactForm.querySelector('#cf-name');
      const email = contactForm.querySelector('#cf-email');
      const message = contactForm.querySelector('#cf-message');

      if (!name.value.trim()) { setFieldError('cf-name', 'Please enter your name.'); ok = false; }
      else setFieldError('cf-name', '');

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) { setFieldError('cf-email', 'Please enter a valid email.'); ok = false; }
      else setFieldError('cf-email', '');

      if (!message.value.trim()) { setFieldError('cf-message', 'Please add a short message.'); ok = false; }
      else setFieldError('cf-message', '');

      return ok;
    }

    ['cf-name', 'cf-email', 'cf-message'].forEach((id) => {
      const field = contactForm.querySelector(`#${id}`);
      if (field) field.addEventListener('blur', validate);
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate()) return;

      const endpoint = contactForm.getAttribute('action') || '';
      if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
        statusEl.textContent = 'Form isn\u2019t connected yet \u2014 set up a Formspree endpoint (or similar) and update the form\u2019s action URL.';
        statusEl.classList.add('is-error');
        return;
      }

      contactForm.classList.add('submitting');
      submitBtn.disabled = true;
      statusEl.classList.remove('is-error', 'is-success');
      statusEl.textContent = '';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          statusEl.textContent = 'Thanks \u2014 your message is on its way. I\u2019ll get back to you soon.';
          statusEl.classList.add('is-success');
          contactForm.reset();
          contactForm.classList.add('submitted');
        } else {
          throw new Error('Request failed');
        }
      } catch (err) {
        statusEl.textContent = 'Something went wrong sending that \u2014 please try the email link below instead.';
        statusEl.classList.add('is-error');
      } finally {
        contactForm.classList.remove('submitting');
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------- Current year ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
