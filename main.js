/* ─── NAV SCROLL ──────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── MOBILE MENU ─────────────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

/* ─── COUNTER ANIMATION ───────────────────────────────────── */
function animateCount(el, target, suffix) {
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat__num').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        animateCount(el, target);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero__stats');
if (statsEl) statsObserver.observe(statsEl);

/* ─── FADE-IN OBSERVER ─────────────────────────────────────── */
const fadeTargets = document.querySelectorAll(
  '.service-card, .process__step, .portfolio__card, .testi__card, .about__content, .about__visual, .section__header'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

fadeTargets.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  fadeObserver.observe(el);
});

/* fallback: pastikan semua elemen visible setelah 1.5 detik */
setTimeout(() => {
  fadeTargets.forEach(el => el.classList.add('visible'));
}, 1500);

/* ─── FORM SUBMIT ──────────────────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
    btn.disabled = true;
    btn.style.opacity = '0.85';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      btn.style.opacity = '';
      form.reset();
    }, 3000);
  });
}

/* ─── SMOOTH ANCHOR OFFSET ─────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
