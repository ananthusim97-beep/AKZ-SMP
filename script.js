/* ==================================================================
   ASHVALE SMP — SCRIPT
   Each block below handles one piece of behaviour. Nothing here
   needs editing for normal content changes (names, links, images) —
   those all live in index.html. This file only needs edits if you
   want to change *how* something behaves.
   ================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 350);
  });
  // Safety net in case the load event already fired
  if (document.readyState === 'complete') {
    setTimeout(() => loader.classList.add('is-hidden'), 350);
  }

  /* ---------- Ember particle field ---------- */
  const emberField = document.getElementById('emberField');
  if (emberField && !prefersReducedMotion) {
    const EMBER_COUNT = window.innerWidth < 700 ? 14 : 28;
    for (let i = 0; i < EMBER_COUNT; i++) {
      const ember = document.createElement('span');
      ember.className = 'ember';
      ember.style.left = Math.random() * 100 + 'vw';
      ember.style.animationDuration = 8 + Math.random() * 10 + 's';
      ember.style.animationDelay = Math.random() * 12 + 's';
      ember.style.opacity = 0.3 + Math.random() * 0.5;
      emberField.appendChild(ember);
    }
  }

  /* ---------- Navbar background on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);

    const backToTop = document.getElementById('backToTop');
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

  function closeMobileMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    mobileMenuBackdrop.classList.remove('is-open');
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBackdrop.classList.toggle('is-open', isOpen);
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal, .lore-item, .player-card, .world-stat, .gallery-item, .video-card');
  revealEls.forEach(el => el.classList.add('reveal'));

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = item.dataset.caption || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  /* ---------- Video modal (trailer + video cards) ---------- */
  const videoModal = document.getElementById('videoModal');
  const videoModalIframe = document.getElementById('videoModalIframe');
  const videoModalClose = document.getElementById('videoModalClose');

  function openVideoModal(videoId) {
    if (!videoId) return;
    videoModalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    videoModal.classList.add('is-open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    videoModalIframe.src = ''; // stop playback
    document.body.style.overflow = '';
  }

  document.getElementById('watchTrailerBtn').addEventListener('click', function () {
    openVideoModal(this.dataset.video);
  });

  document.querySelectorAll('.video-thumb').forEach(btn => {
    btn.addEventListener('click', function () {
      openVideoModal(this.dataset.video);
    });
  });

  videoModalClose.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeVideoModal(); });

  /* ---------- Close overlays with Escape ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (lightbox.classList.contains('is-open')) closeLightbox();
    if (videoModal.classList.contains('is-open')) closeVideoModal();
    if (mobileMenu.classList.contains('is-open')) closeMobileMenu();
  });

  /* ---------- Copy server IP ---------- */
  const copyIpBtn = document.getElementById('copyIpBtn');
  const copyToast = document.getElementById('copyToast');
  const serverIp = document.getElementById('serverIp');

  copyIpBtn.addEventListener('click', async () => {
    const ip = serverIp.textContent.trim();
    try {
      await navigator.clipboard.writeText(ip);
    } catch (err) {
      // Fallback for older browsers / non-secure contexts
      const tempInput = document.createElement('input');
      tempInput.value = ip;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }
    copyToast.classList.add('is-visible');
    setTimeout(() => copyToast.classList.remove('is-visible'), 1800);
  });

  /* ---------- Back to top ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
});
