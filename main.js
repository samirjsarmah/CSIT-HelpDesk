/* ============================================================
   Cotton University – CS & IT Help Desk  |  main.js
   ============================================================ */

/* ── Loading Screen ─────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});

/* ── Dark / Light Mode ──────────────────────────────────── */
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
let dark = localStorage.getItem('theme') === 'dark';
applyTheme();

function applyTheme() {
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  if (themeBtn) themeBtn.innerHTML = dark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}
if (themeBtn) themeBtn.addEventListener('click', () => {
  dark = !dark;
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  applyTheme();
});

/* ── Sticky Navbar ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
});

/* ── Mobile Nav ─────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger?.addEventListener('click', () => mobileNav.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!mobileNav.contains(e.target) && !hamburger.contains(e.target))
    mobileNav.classList.remove('open');
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

/* ── Search Overlay ─────────────────────────────────────── */
const searchOverlay = document.getElementById('search-overlay');
document.getElementById('search-toggle')?.addEventListener('click', () => searchOverlay.classList.add('active'));
document.getElementById('search-close')?.addEventListener('click', () => searchOverlay.classList.remove('active'));
searchOverlay?.addEventListener('click', e => { if (e.target === searchOverlay) searchOverlay.classList.remove('active'); });

/* Search functionality */
document.getElementById('search-input')?.addEventListener('input', function () {
  const q = this.value.toLowerCase();
  if (!q) return;
  const sections = ['courses', 'cutoff', 'syllabus', 'faq', 'contact', 'notices', 'faculty'];
  for (const id of sections) {
    if (id.includes(q) || document.getElementById(id)?.textContent.toLowerCase().includes(q)) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      searchOverlay.classList.remove('active');
      break;
    }
  }
});

/* ── Typing Animation ───────────────────────────────────── */
const typingEl = document.getElementById('typing-text');
const phrases = [
  'Explore BCA, B.Sc CS & MCA Programs',
  'Find Courses, Syllabi & Cutoffs',
  'Ask Questions & Get Instant Help'
];
let pIdx = 0, cIdx = 0, deleting = false;
function typeLoop() {
  if (!typingEl) return;
  const current = phrases[pIdx];
  typingEl.textContent = deleting ? current.substring(0, cIdx--) : current.substring(0, cIdx++);
  let delay = deleting ? 40 : 70;
  if (!deleting && cIdx > current.length) { delay = 2000; deleting = true; }
  if (deleting && cIdx < 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; delay = 400; }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ── Active Nav Link on Scroll ──────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, #mobile-nav a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

/* ── Scroll Reveal ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

/* ── Course Tabs ────────────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.course-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab)?.classList.add('active');
  });
});

/* ── Semester Accordion ─────────────────────────────────── */
document.querySelectorAll('.sem-header').forEach(h => {
  h.addEventListener('click', () => {
    const item = h.closest('.sem-item');
    item.classList.toggle('open');
  });
});

/* ── Syllabus Cards ─────────────────────────────────────── */
document.querySelectorAll('.syl-card-header').forEach(h => {
  h.addEventListener('click', () => h.closest('.syl-card').classList.toggle('expanded'));
});

/* ── FAQ Accordion ──────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Cutoff Table Filter ─────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterTable();
  });
});
document.getElementById('cutoff-search')?.addEventListener('input', filterTable);

function filterTable() {
  const category = document.querySelector('.filter-btn.active')?.dataset.cat || 'all';
  const query = document.getElementById('cutoff-search')?.value.toLowerCase() || '';
  document.querySelectorAll('.cutoff-table tbody tr').forEach(row => {
    const cat = row.dataset.cat || '';
    const text = row.textContent.toLowerCase();
    const catMatch = category === 'all' || cat === category;
    const qMatch = !query || text.includes(query);
    row.style.display = catMatch && qMatch ? '' : 'none';
  });
}

/* ── Visitor Counter ─────────────────────────────────────── */
const COUNTER_NS = 'cotton-csit-helpdesk';

async function initVisitors() {
  try {
    const res  = await fetch(
      `https://api.counterapi.dev/v1/${COUNTER_NS}/total-visitors/up`
    );
    const data = await res.json();
    const total = data.count || 1;
    animateCount('count-total', total, 1800);
  } catch (err) {
    console.warn('Counter error:', err);
    const fallback = parseInt(localStorage.getItem('cu_total') || '4820');
    animateCount('count-total', fallback, 1800);
  }
}

function animateCount(id, target, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  const ease  = t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(ease(p) * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

const visitorObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    initVisitors();
    visitorObs.disconnect();
  }
}, { threshold: 0.3 });

const visitorsSection = document.getElementById('visitors');
if (visitorsSection) visitorObs.observe(visitorsSection);

/* ── Testimonials Carousel ───────────────────────────────── */
let testIdx = 0;
const track = document.querySelector('.testimonials-track');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.test-dot');
const totalSlides = cards.length;
let perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

function updateCarousel() {
  perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const max = totalSlides - perView;
  testIdx = Math.min(testIdx, max);
  const pct = testIdx * (100 / perView);
  if (track) track.style.transform = `translateX(-${pct}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === testIdx));
}

document.getElementById('test-prev')?.addEventListener('click', () => {
  testIdx = testIdx > 0 ? testIdx - 1 : 0;
  updateCarousel();
});
document.getElementById('test-next')?.addEventListener('click', () => {
  const max = totalSlides - perView;
  testIdx = testIdx < max ? testIdx + 1 : max;
  updateCarousel();
});
dots.forEach((d, i) => d.addEventListener('click', () => { testIdx = i; updateCarousel(); }));
window.addEventListener('resize', updateCarousel);

/* Auto-slide every 5s */
setInterval(() => {
  const max = totalSlides - perView;
  testIdx = testIdx < max ? testIdx + 1 : 0;
  updateCarousel();
}, 5000);

/* ── Chat Widget ─────────────────────────────────────────── */
const chatBox = document.getElementById('chat-box');
document.getElementById('chat-toggle')?.addEventListener('click', () => chatBox.classList.toggle('open'));
document.getElementById('chat-close-btn')?.addEventListener('click', () => chatBox.classList.remove('open'));

const botReplies = [
  "Hello! 👋 I'm the CS & IT Help Desk bot. How can I assist you today?",
  "For admission queries, please visit the Courses section",
  "Cutoff marks are listed under the Cutoff section. You can filter by category.",
  "The syllabus for all programs is available in the Syllabus section with PDF downloads.",
  "For urgent matters, call us at +91-361-2345678 during office hours (9AM–5PM).",
  "You can submit a detailed query using the Contact form. We respond within 24 hours.",
  "The academic calendar and notices are updated regularly in the Notices section."
];
let replyIdx = 1;

document.getElementById('chat-send')?.addEventListener('click', sendChat);
document.getElementById('chat-input')?.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

function sendChat() {
  const input = document.getElementById('chat-input');
  const msgs = document.getElementById('chat-messages');
  const msg = input?.value.trim();
  if (!msg || !msgs) return;
  msgs.innerHTML += `<div class="chat-msg user">${escapeHtml(msg)}</div>`;
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    const reply = botReplies[replyIdx % botReplies.length];
    replyIdx++;
    msgs.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 800);
}
function escapeHtml(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── Contact Form ────────────────────────────────────────── */
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-submit');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg,#10b981,#34d399)';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

/* ── Back to Top ─────────────────────────────────────────── */
document.getElementById('back-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── PDF Download Simulation ─────────────────────────────── */
document.querySelectorAll('.btn-download').forEach(btn => {
  btn.addEventListener('click', () => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded!';
      setTimeout(() => btn.innerHTML = orig, 2000);
    }, 1500);
  });
});

/* ── Prospectus Button ───────────────────────────────────── */
document.getElementById('prospectus-btn')?.addEventListener('click', () => {
  alert('📄 Prospectus download will begin shortly.\nFor the latest prospectus, contact: ');
});

/* ── Init ────────────────────────────────────────────────── */
updateCarousel();
