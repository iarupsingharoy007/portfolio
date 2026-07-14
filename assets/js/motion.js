// ============================================================
// ARUP SINGHA ROY — premium motion layer (GSAP + ScrollTrigger)
// Progressive enhancement only: if GSAP failed to load (CDN
// blocked, offline, etc.) this file exits immediately and the
// site still works via the plain CSS/IO fallbacks in main.js.
// ============================================================
(function () {
  'use strict';

  if (!window.gsap) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------
     Hero cinematic entrance
     Elements already carry .reveal for the no-JS fallback;
     we take over just for the hero so the CSS observer doesn't
     fight with this timeline.
  --------------------------------------------------------- */
  const heroEls = document.querySelectorAll('.hero .reveal');
  if (heroEls.length && !prefersReduced) {
    heroEls.forEach((el) => el.classList.remove('reveal', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'));
    gsap.set(heroEls, { opacity: 0, y: 26 });
    gsap.to(heroEls, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.09,
      delay: 0.15,
    });
  }

  /* ---------------------------------------------------------
     Scroll-linked parallax depth on the hero aurora wrapper
     (separate element from the mouse-parallax blobs in main.js
     so the two never fight over the same transform).
  --------------------------------------------------------- */
  if (!prefersReduced && window.ScrollTrigger) {
    gsap.to('.hero-aurora', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  }

  /* ---------------------------------------------------------
     Section headings + eyebrows: soft stagger reveal
  --------------------------------------------------------- */
  if (!prefersReduced && window.ScrollTrigger) {
    document.querySelectorAll('section').forEach((section) => {
      const targets = section.querySelectorAll('.eyebrow, .section-heading, .section-sub');
      if (!targets.length) return;
      gsap.from(targets, {
        opacity: 0,
        y: 22,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: section, start: 'top 78%' },
      });
    });
  }

  /* ---------------------------------------------------------
     Skill grid: node-by-node pop-in
  --------------------------------------------------------- */
  if (!prefersReduced && window.ScrollTrigger) {
    document.querySelectorAll('.skill-grid').forEach((grid) => {
      gsap.from(grid.querySelectorAll('.skill-node'), {
        opacity: 0,
        scale: 0.85,
        y: 10,
        duration: 0.5,
        ease: 'back.out(1.6)',
        stagger: 0.045,
        scrollTrigger: { trigger: grid, start: 'top 85%' },
      });
    });
  }

  /* ---------------------------------------------------------
     Timeline: scroll-synced progress line + dot pop
  --------------------------------------------------------- */
  const timelineEl = document.querySelector('[data-timeline]');
  const progressEl = document.querySelector('[data-timeline-progress]');
  if (timelineEl && progressEl && window.ScrollTrigger) {
    if (prefersReduced) {
      progressEl.style.height = '100%';
    } else {
      gsap.to(progressEl, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineEl,
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: 0.4,
        },
      });
    }
    if (!prefersReduced) {
      gsap.from(timelineEl.querySelectorAll('.timeline-dot'), {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.15,
        scrollTrigger: { trigger: timelineEl, start: 'top 65%' },
      });
    }
  }

  /* ---------------------------------------------------------
     Magnetic buttons — smoother GSAP version replaces the
     vanilla one in main.js (which only runs when GSAP is absent)
  --------------------------------------------------------- */
  if (!prefersReduced) {
    document.querySelectorAll('.btn, .icon-btn').forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        xTo((e.clientX - rect.left - rect.width / 2) * 0.22);
        yTo((e.clientY - rect.top - rect.height / 2) * 0.32);
      });
      btn.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  }

  /* ---------------------------------------------------------
     Project cards: subtle lift + tag stagger on scroll
  --------------------------------------------------------- */
  if (!prefersReduced && window.ScrollTrigger) {
    document.querySelectorAll('.project-card').forEach((card) => {
      gsap.from(card.querySelectorAll('.project-tags span'), {
        opacity: 0,
        y: 8,
        duration: 0.4,
        stagger: 0.05,
        scrollTrigger: { trigger: card, start: 'top 85%' },
      });
    });
  }
})();
