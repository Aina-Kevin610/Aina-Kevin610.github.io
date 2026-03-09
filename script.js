const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

const phrases = [
  'Étudiant passionné par le code.',
  'Futur ingénieur logiciel.',
  'Explorateur de l\'IA.',
  'Membre de 42 Antananarivo.',
];
let i = 0, j = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const phrase = phrases[i];
  if (!deleting) {
    typeEl.textContent = phrase.slice(0, ++j);
    if (j === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = phrase.slice(0, --j);
    if (j === 0) {
      deleting = false;
      i = (i + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 70);
}
type();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
