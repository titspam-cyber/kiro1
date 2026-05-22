/* Limão Cachorro — landing interactions */

(function () {
  'use strict';

  /* ---- Sticky topbar shadow on scroll ---- */
  const topbar = document.getElementById('topbar');
  const onScroll = () => {
    if (window.scrollY > 12) topbar.classList.add('scrolled');
    else topbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile burger menu ---- */
  const burger = document.getElementById('burger');
  burger.addEventListener('click', () => {
    topbar.classList.toggle('open');
  });
  // Close menu when a nav link is clicked (mobile)
  document.querySelectorAll('.topnav a').forEach((link) => {
    link.addEventListener('click', () => topbar.classList.remove('open'));
  });

  /* ---- Reveal-on-scroll ---- */
  const targets = document.querySelectorAll(
    '.section-head, .card, .pillar, .series, .persona, .channel, ' +
    '.activation, .role, .timeline-item, .freq, .budget, .kpi, ' +
    '.risk, .tier, .deliv, .closing-quote, .callout'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show everything
    targets.forEach((el) => el.classList.add('visible'));
  }

  /* ---- Highlight current section in the top nav ---- */
  const navLinks = document.querySelectorAll('.topnav a[href^="#"]');
  const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((a) => {
              const isActive = a.getAttribute('href') === '#' + id;
              a.style.color = isActive ? 'var(--accent)' : '';
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => navIO.observe(s));
  }
})();
