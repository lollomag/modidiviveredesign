// Modi di Vivere — shared interactions

// Sticky nav state
(function navScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Reveal-on-scroll
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
})();

// Hero parallax (slow)
(function parallax() {
  const hero = document.querySelector('[data-parallax]');
  if (!hero) return;
  const wrapper = hero.closest('.hero');
  const onScroll = () => {
    const y = window.scrollY;
    const limit = wrapper ? wrapper.offsetHeight : window.innerHeight;
    if (y > limit) return;
    hero.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + y * 0.0002})`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Mobile menu
(function menu() {
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  if (!btn || !links || !nav) return;

  if (!links.querySelector('.nav-cta-mobile')) {
    const ctaLi = document.createElement('li');
    ctaLi.className = 'nav-cta-mobile';
    ctaLi.innerHTML =
      '<a href="contatti.html" class="nav-mobile-cta">Prenota i servizi</a>';
    links.appendChild(ctaLi);
  }

  function openMenu() {
    nav.classList.add('menu-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    nav.classList.contains('menu-open') ? closeMenu() : openMenu();
  });

  // Close on link click
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeMenu();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('menu-open') && !nav.contains(e.target)) closeMenu();
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 880) closeMenu();
  }, { passive: true });
})();
