const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const progressBar = document.querySelector('.scroll-progress span');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  progressBar?.style.setProperty('transform', `scaleX(${progress})`);
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

if (!reduced && window.matchMedia('(pointer: fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', event => {
    if (glow) {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.style.opacity = '1';
    }
  }, { passive: true });

  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });

  const tilt = document.querySelector('.tilt-card');
  tilt?.addEventListener('pointermove', event => {
    const rect = tilt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tilt.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-3px)`;
  });
  tilt?.addEventListener('pointerleave', () => {
    tilt.style.transform = '';
  });
}
if (reduced) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
