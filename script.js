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

  /* ---- Profile photo — try multiple LinkedIn CDN patterns ---- */
  // LinkedIn blocks hotlinking; we attempt a graceful avatar fallback
  const photo = document.getElementById('profilePhoto');
  if (photo) {
    photo.addEventListener('error', function () {
      // Fallback to a styled initial avatar
      this.src =
        'https://ui-avatars.com/api/?name=Manish+Mittal&size=600&background=111111&color=c8a97e&bold=true&font-size=0.33&length=2';
    });
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

  /* ---- Cursor glow effect (desktop only) ---- */
  if (window.matchMedia('(hover: hover)').matches) {
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    glow.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(200,169,126,0.05) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      z-index: 0;
      transition: opacity 0.3s;
      opacity: 0;
    `;
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* ---- Reveal hero immediately ---- */
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image-wrap');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('visible');
      if (heroImage) heroImage.classList.add('visible');
    }, 100);
  }

  /* ---- Typing text effect on hero eyebrow ---- */
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) {
    const originalText = eyebrow.textContent;
    eyebrow.textContent = '';
    eyebrow.style.borderRight = '1px solid rgba(200,169,126,0.7)';
    eyebrow.style.display = 'inline-block';

    let i = 0;
    function typeChar() {
      if (i < originalText.length) {
        eyebrow.textContent += originalText[i];
        i++;
        setTimeout(typeChar, 40);
      } else {
        setTimeout(() => {
          eyebrow.style.borderRight = 'none';
        }, 800);
      }
    }

    setTimeout(typeChar, 500);
  }

  /* ---- Initial nav check ---- */
  updateActiveNav();
})();
