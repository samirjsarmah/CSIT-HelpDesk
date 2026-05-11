/* ============================================================
   Cotton University – CS & IT Help Desk  |  main.js
   Enhanced: Glass Liquid + iOS Parallax Edition
   New: MCA Cutoff Download, Notices, Documents Required, PYQs
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
  parallaxOnScroll();
});

/* ── iOS-style Parallax ─────────────────────────────────── */
function parallaxOnScroll() {
  const scrollY = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  const heroDots = document.querySelector('.hero-dots');
  const heroPattern = document.querySelector('.hero-pattern');
  if (heroBg) heroBg.style.transform = `translateY(${scrollY * 0.35}px) translateZ(0)`;
  if (heroDots) heroDots.style.transform = `translateY(${scrollY * 0.18}px)`;
  if (heroPattern) heroPattern.style.transform = `translateY(${scrollY * 0.22}px)`;
}

/* ── Gyroscope / Device-Tilt Parallax (mobile) ──────────── */
if (window.DeviceOrientationEvent) {
  const heroStatCards = document.querySelectorAll('.hero-stat-card');
  window.addEventListener('deviceorientation', (e) => {
    const tiltX = (e.gamma || 0) / 45;
    const tiltY = (e.beta  || 0) / 90;
    heroStatCards.forEach((card, i) => {
      const depth = (i + 1) * 3;
      card.style.transform = `translate(${tiltX * depth}px, ${tiltY * depth}px)`;
    });
  });
}

/* ── Liquid Cursor Glow (desktop) ───────────────────────── */
(function initCursorGlow() {
  if (window.innerWidth < 768) return;
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 350px; height: 350px; border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,176,0.08) 0%, transparent 65%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    top: 0; left: 0;
    will-change: transform;
  `;
  document.body.appendChild(glow);
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.07;
    glowY += (mouseY - glowY) * 0.07;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();

/* ── Liquid Glass Hover Tilt ────────────────────────────── */
(function initCardTilt() {
  if (window.innerWidth < 768) return;
  const tiltCards = document.querySelectorAll('.quick-card, .hero-stat-card, .syl-card, .faq-item');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) scale(1.01)`;
      card.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--my', `${(y + 0.5) * 100}%`);
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

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
document.addEventListener('keydown', e => { if (e.key === 'Escape') searchOverlay.classList.remove('active'); });

document.getElementById('search-input')?.addEventListener('input', function () {
  const q = this.value.toLowerCase();
  if (!q) return;
  const sections = ['courses', 'cutoff', 'syllabus', 'notices', 'documents', 'pyq', 'faq', 'contact'];
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
  'Download Previous Year Papers',
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
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const siblings = e.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 80);
      });
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.10 });
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

/* ── Cutoff Table Filter ────────────────────────────────── */
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

/* ── MCA Cutoff Download ─────────────────────────────────── */
document.getElementById('mca-cutoff-download')?.addEventListener('click', function () {
  const btn = this;
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing PDF...';
  btn.disabled = true;

  setTimeout(() => {
    // Generate a simple CSV/text data as a downloadable file (real scenario: link to hosted PDF)
    const cutoffData = `MCA Cutoff Marks - Cotton University (2025)
===========================================
Category          Score (out of 200)   Percentage
--------------------------------------------------
Unreserved        148 / 200            74%
OBC               130 / 200            65%
SC                110 / 200            55%
ST                96 / 200             48%
ST (Plains)       104 / 200            52%
ST (Hills)        104 / 200            52%
EWS               104 / 200            52%

Source: Cotton University Admission Portal
Exam: CPGEE (Cotton University Post Graduate Entrance Examination)
Mode: Offline OMR | Total Marks: 200 | Duration: 2 Hours
Negative Marking: -0.25 per wrong answer

Note: Data is indicative. Official cutoffs published on the Cotton University portal.
    `;
    const blob = new Blob([cutoffData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MCA_Cutoff_CottonUniversity_2025.txt';
    a.click();
    URL.revokeObjectURL(url);

    btn.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded!';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
    }, 2500);
  }, 1200);
});

/* ── Notices Section ─────────────────────────────────────── */
const noticesData = [
  {
    id: 1,
    tag: 'Admission',
    tagColor: 'blue',
    date: '12 May 2026',
    title: 'MCA Admission 2026: Notice regarding PG Admission 2026',
    
    link: 'https://cottonuniversity.ac.in/index_post_details?p=2700'
  },


  // {
  //   id: 2,
  //   tag: 'Admission',
  //   tagColor: 'blue',
  //   date: '05 May 2025',
  //   title: 'BCA & B.Sc CS Admission 2025-26: Merit List Schedule',
  //   body: 'The first merit list for BCA and B.Sc Computer Science will be published on 15 June 2025. Students are advised to keep checking the official portal.',
  //   important: true,
  //   link: 'https://www.cottonuniversity.ac.in'
  // },


  // {
  //   id: 3,
  //   tag: 'Exam',
  //   tagColor: 'gold',
  //   date: '28 Apr 2025',
  //   title: 'End Semester Examination Schedule — Even Semester 2024-25',
  //   body: 'The timetable for Even Semester End Semester Examinations has been released. Students must download their admit cards from the student portal before the exam.',
  //   important: false,
  //   link: '#'
  // },


  // {
  //   id: 4,
  //   tag: 'Event',
  //   tagColor: 'teal',
  //   date: '20 Apr 2025',
  //   title: 'TechFest 2025 — Registration Open',
  //   body: 'The Annual Technical Festival of CSIT Department is scheduled for 10–12 June 2025. Registrations for coding contests, hackathons, and workshops are now open.',
  //   important: false,
  //   link: '#'
  // },


  // {
  //   id: 5,
  //   tag: 'Scholarship',
  //   tagColor: 'green',
  //   date: '12 Apr 2025',
  //   title: 'Post-Matric Scholarship 2024-25: Last Date Extended',
  //   body: 'The last date for submission of Post-Matric Scholarship applications has been extended to 30 April 2025. SC/ST/OBC students are urged to apply immediately.',
  //   important: false,
  //   link: '#'
  // },


  // {
  //   id: 6,
  //   tag: 'Placement',
  //   tagColor: 'purple',
  //   date: '05 Apr 2025',
  //   title: 'Campus Recruitment Drive — Wipro Technologies',
  //   body: 'Wipro Technologies will conduct a campus recruitment drive on 20 May 2025 for final year MCA students. Eligible students must register through the Training & Placement Cell.',
  //   important: false,
  //   link: '#'
  // }
];

function renderNotices(filter = 'all') {
  const container = document.getElementById('notices-container');
  if (!container) return;
  const filtered = filter === 'all' ? noticesData : noticesData.filter(n => n.tag.toLowerCase() === filter.toLowerCase());
  if (filtered.length === 0) {
    container.innerHTML = `<div class="notice-empty"><i class="fa-solid fa-bell-slash"></i><p>No notices in this category.</p></div>`;
    return;
  }
  container.innerHTML = filtered.map(n => `
    <div class="notice-card reveal ${n.important ? 'notice-important' : ''}">
      ${n.important ? '<div class="notice-important-ribbon"><i class="fa-solid fa-star"></i> Important</div>' : ''}
      <div class="notice-top">
        <span class="notice-tag tag-${n.tagColor}">${n.tag}</span>
        <span class="notice-date"><i class="fa-regular fa-calendar"></i> ${n.date}</span>
      </div>
      <h3 class="notice-title">${n.title}</h3>
      <p class="notice-body">${n.body}</p>
      <a href="${n.link}" target="_blank" class="notice-link">Read More <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  `).join('');

  // Re-observe newly added .reveal elements
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// Notice filter tabs
document.querySelectorAll('.notice-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.notice-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderNotices(btn.dataset.filter);
  });
});

// Init notices
renderNotices('all');

/* ── Documents Accordion ─────────────────────────────────── */
document.querySelectorAll('.doc-program-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.doc-program-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.doc-program-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── PYQ Filter & Cards ──────────────────────────────────── */
const pyqData = [
  { program: 'mca', subject: 'cpgee', title: 'CPGEE PYQ Question Paper' },
  
];

function renderPYQ(programFilter = 'all', subjectFilter = 'all', yearFilter = 'all') {
  const container = document.getElementById('pyq-container');
  if (!container) return;
  let filtered = pyqData;
  if (programFilter !== 'all') filtered = filtered.filter(p => p.program === programFilter);
  if (subjectFilter !== 'all') filtered = filtered.filter(p => p.subject === subjectFilter);
  if (yearFilter !== 'all') filtered = filtered.filter(p => p.year === parseInt(yearFilter));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="pyq-empty"><i class="fa-solid fa-file-circle-xmark"></i><p>No papers found for selected filters.</p></div>`;
    return;
  }

  container.innerHTML = filtered.map((p, i) => `
    <div class="pyq-card reveal" style="transition-delay:${i * 0.05}s">
      <div class="pyq-card-top">
        <div class="pyq-badge-row">
          <span class="pyq-program-badge prog-${p.program}">${p.program.toUpperCase()}</span>
          <span class="pyq-year-badge">${p.year}</span>
        </div>
        <div class="pyq-icon"><i class="fa-solid fa-file-pdf"></i></div>
      </div>
      <h4 class="pyq-title">${p.title}</h4>
      <p class="pyq-desc">${p.desc}</p>
      <div class="pyq-meta">
        <span><i class="fa-regular fa-file-lines"></i> ${p.pages} Pages</span>
        <span><i class="fa-solid fa-weight-hanging"></i> ${p.size}</span>
      </div>
      <button class="pyq-download-btn" data-title="${p.title}" data-year="${p.year}" data-program="${p.program}">
        <i class="fa-solid fa-download"></i> Download Paper
      </button>
    </div>
  `).join('');

  // Attach download handlers
  container.querySelectorAll('.pyq-download-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const orig = this.innerHTML;
      this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...';
      this.disabled = true;
      const { title, year, program } = this.dataset;
      setTimeout(() => {
        const content = `Cotton University — Department of CS & IT\n${title}\nYear: ${year} | Program: ${program.toUpperCase()}\n\n[This is a placeholder download. Please contact the department or check the official CSIT portal for actual question papers.]\n\nContact: csit.cottonuniversity.ac.in\nAddress: Dept. of CS & IT, Cotton University, Panbazar, Guwahati – 781001`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        this.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded!';
        setTimeout(() => { this.innerHTML = orig; this.disabled = false; }, 2500);
      }, 1000);
    });
  });

  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// PYQ filters
let pyqProgram = 'all', pyqSubject = 'all', pyqYear = 'all';

document.querySelectorAll('.pyq-program-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pyq-program-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    pyqProgram = btn.dataset.prog;
    renderPYQ(pyqProgram, pyqSubject, pyqYear);
  });
});
document.querySelectorAll('.pyq-subject-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pyq-subject-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    pyqSubject = btn.dataset.subject;
    renderPYQ(pyqProgram, pyqSubject, pyqYear);
  });
});
document.getElementById('pyq-year-select')?.addEventListener('change', function () {
  pyqYear = this.value;
  renderPYQ(pyqProgram, pyqSubject, pyqYear);
});

// Init PYQ
renderPYQ();

/* ── Visitor Counter ─────────────────────────────────────── */
const COUNTER_NS = 'cotton-csit-helpdesk';

async function initVisitors() {
  try {
    const res  = await fetch(`https://api.counterapi.dev/v1/${COUNTER_NS}/total-visitors/up`);
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
  const ease  = t => t < .5 ? 2*t*t : -1+(4-2*t)*t;
  function step(now) {
    const p = Math.min((now-start)/duration, 1);
    el.textContent = Math.floor(ease(p)*target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

const visitorObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { initVisitors(); visitorObs.disconnect(); }
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
document.getElementById('test-prev')?.addEventListener('click', () => { testIdx = testIdx > 0 ? testIdx-1 : 0; updateCarousel(); });
document.getElementById('test-next')?.addEventListener('click', () => { const max = totalSlides-perView; testIdx = testIdx < max ? testIdx+1 : max; updateCarousel(); });
dots.forEach((d, i) => d.addEventListener('click', () => { testIdx = i; updateCarousel(); }));
window.addEventListener('resize', updateCarousel);
setInterval(() => { const max = totalSlides-perView; testIdx = testIdx < max ? testIdx+1 : 0; updateCarousel(); }, 5000);

/* ── Chat Widget ─────────────────────────────────────────── */
const chatBox = document.getElementById('chat-box');
document.getElementById('chat-toggle')?.addEventListener('click', () => chatBox.classList.toggle('open'));
document.getElementById('chat-close-btn')?.addEventListener('click', () => chatBox.classList.remove('open'));

const botReplies = [
  "Hello! 👋 I'm the CS & IT Help Desk bot. How can I assist you today?",
  "For admission queries, please visit the Courses section or check the Notices section for latest updates.",
  "Cutoff marks are listed under the Cutoff section. You can filter by category and download the MCA cutoff PDF.",
  "The syllabus for all programs is available in the Syllabus section with PDF downloads.",
  "Documents required for admission are listed in the 'Documents Required' section of this website.",
  "Previous year question papers are available in the 'Previous Year Papers' section — filter by program and subject.",
  "For urgent matters, contact the department or visit the official portal: csit.cottonuniversity.ac.in.",
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
  setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; this.reset(); }, 3000);
});

/* ── Back to Top ─────────────────────────────────────────── */
document.getElementById('back-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── PDF Download (syllabus cards) ───────────────────────── */
document.querySelectorAll('.btn-download').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Only intercept buttons that are NOT links
    if (this.tagName === 'A') return;
    e.preventDefault();
    const orig = this.innerHTML;
    this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...';
    setTimeout(() => {
      this.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded!';
      setTimeout(() => this.innerHTML = orig, 2000);
    }, 1500);
  });
});

/* ── Smooth Section Transitions ────────────────────────────── */
(function addSectionTransitions() {
  const allSections = document.querySelectorAll('section');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.filter = 'blur(0px)';
      }
    });
  }, { threshold: 0.05 });
  allSections.forEach(s => sectionObs.observe(s));
})();

/* ── Init ────────────────────────────────────────────────── */
updateCarousel();
parallaxOnScroll();
