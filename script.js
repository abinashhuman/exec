/* ================================================
   Manish Mittal — Personal Website
   script.js  |  Interactions & animations
   ================================================ */

(function () {
  'use strict';

  /* ---- Navbar scroll state ---- */
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  function onScroll() {
    const y = window.scrollY;

    // Scrolled class for glass effect
    if (y > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide navbar on fast scroll-down, show on scroll-up
    if (y > lastScrollY + 8 && y > 120) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = y;
    updateActiveNav();
  }

  navbar.style.transition =
    'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease, transform 0.35s ease';

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Active nav link highlighting ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ---- Mobile menu toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let menuOpen = false;

  function toggleMenu(open) {
    menuOpen = open;
    mobileMenu.classList.toggle('open', open);
    const spans = navToggle.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      document.body.style.overflow = 'hidden';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
      document.body.style.overflow = '';
    }
  }

  navToggle.addEventListener('click', () => toggleMenu(!menuOpen));

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) toggleMenu(false);
  });

  /* ---- Intersection Observer — fade-in animation ---- */
  const fadeTargets = document.querySelectorAll(
    '.hero-content, .work-card, .bio-era, .phil-card, .contact-text, .contact-quote, .section-header'
  );

  // Add fade-in class programmatically
  fadeTargets.forEach((el, i) => {
    el.classList.add('fade-in');
    // Stagger within groups
    const delay = (i % 4) * 0.1;
    el.style.transitionDelay = delay + 's';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08,
    }
  );

  fadeTargets.forEach((el) => observer.observe(el));

  /* ---- Profile photo — hover/touch swap ---- */
  const photo = document.getElementById('profilePhoto');
  if (photo) {
    const hoverSrc = photo.dataset.hoverSrc;
    const defaultSrc = photo.dataset.defaultSrc;

    // Preload hover image
    if (hoverSrc) {
      const preload = new Image();
      preload.src = hoverSrc;
    }

    photo.addEventListener('mouseenter', function () {
      if (hoverSrc) this.src = hoverSrc;
    });
    photo.addEventListener('mouseleave', function () {
      if (defaultSrc) this.src = defaultSrc;
    });

    // Touch support
    photo.addEventListener('touchstart', function () {
      if (hoverSrc) this.src = hoverSrc;
    }, { passive: true });
    photo.addEventListener('touchend', function () {
      if (defaultSrc) this.src = defaultSrc;
    }, { passive: true });
  }

  /* ---- Smooth scroll for anchor links (polyfill for Safari) ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Reveal hero immediately ---- */
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image-wrap');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('visible');
      if (heroImage) heroImage.classList.add('visible');
    }, 100);
  }

  /* ---- Initial nav check ---- */
  updateActiveNav();
})();
