/* =====================================================================
   Cornerstone Church — interactions
   Vanilla JS, no dependencies.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- Sticky nav: solid on scroll ---------- */
  const nav = document.querySelector('.nav');
  if (nav && !nav.classList.contains('is-solid')) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const mobile = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu__close');

  const openMenu = () => { if (mobile) { mobile.classList.add('is-open'); document.body.style.overflow = 'hidden'; } };
  const closeMenu = () => { if (mobile) { mobile.classList.remove('is-open'); document.body.style.overflow = ''; } };

  if (toggle) toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* Mobile submenu accordions */
  document.querySelectorAll('.m-group__btn').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('.m-group').classList.toggle('is-open'));
  });

  /* ---------- Hero background (generated video + gradient fallback) ---------- */
  const hero = document.querySelector('.hero');
  const pauseBtn = document.querySelector('.hero__pause');
  const heroVideo = document.querySelector('.hero__video');
  const playVideo = () => { if (!heroVideo) return; const p = heroVideo.play(); if (p && p.catch) p.catch(function () {}); };

  if (heroVideo) {
    const reveal = () => heroVideo.classList.add('is-ready');
    if (heroVideo.readyState >= 2) reveal();
    heroVideo.addEventListener('loadeddata', reveal, { once: true });
    heroVideo.addEventListener('playing', reveal, { once: true });
    playVideo(); // nudge autoplay on browsers that need a prod
  }

  if (hero && pauseBtn) {
    const label = pauseBtn.querySelector('span');
    pauseBtn.addEventListener('click', () => {
      const paused = hero.classList.toggle('is-paused'); // also pauses the gradient fallback
      if (heroVideo) { paused ? heroVideo.pause() : playVideo(); }
      if (label) label.textContent = paused ? 'Play' : 'Pause';
      pauseBtn.setAttribute('aria-pressed', String(paused));
    });
  }

  /* ---------- Accordions (beliefs / FAQ) ---------- */
  document.querySelectorAll('.acc-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.acc-item');
      const isOpen = item.classList.contains('is-open');
      // Close siblings within the same accordion for a tidy feel
      const group = item.closest('.accordion');
      if (group) group.querySelectorAll('.acc-item.is-open').forEach((el) => { if (el !== item) el.classList.remove('is-open'); });
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Newsletter (stub, no backend) ---------- */
  document.querySelectorAll('[data-newsletter]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.parentElement.querySelector('.newsletter__msg');
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        if (msg) msg.textContent = 'Thank you! You’ve been subscribed.';
        form.reset();
      } else if (msg) {
        msg.textContent = 'Please enter a valid email address.';
      }
    });
  });

  /* ---------- Contact form (stub) ---------- */
  document.querySelectorAll('[data-contact]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('[data-form-note]');
      if (note) note.textContent = 'Thanks for reaching out — we’ll be in touch soon.';
      form.reset();
    });
  });

  /* ---------- Auto year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Smooth momentum scrolling (Lenis, progressive enhancement) ----------
     Loads only when motion is allowed; if the CDN/script is unavailable the site
     simply falls back to native CSS smooth scrolling. */
  (function initSmoothScroll() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js';
    s.defer = true;
    s.onload = function () {
      if (typeof Lenis !== 'function') return;
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      // Route in-page anchor links through Lenis for a smooth, nav-offset scroll
      const offset = document.querySelector('.nav') ? -84 : 0;
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (href && href.length > 1) {
            const el = document.querySelector(href);
            if (el) { e.preventDefault(); lenis.scrollTo(el, { offset }); }
          }
        });
      });
    };
    document.head.appendChild(s);
  })();
})();
