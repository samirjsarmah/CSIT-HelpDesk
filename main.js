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

document.getElementById('mca-cutoff-download')?.addEventListener('click', function () {

  const btn = this;
  const originalText = btn.innerHTML;

  // Loading State
  btn.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Preparing PDF...';

  btn.disabled = true;

  setTimeout(() => {

    const { jsPDF } = window.jspdf;

    // Create PDF
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("MCA Cutoff Marks - Cotton University (2025)", 20, 20);

    // Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("CPGEE Admission Cutoff Details", 20, 30);

    // Table Header
    doc.setFont("helvetica", "bold");

    doc.text("Category", 20, 50);
    doc.text("Score", 90, 50);
    doc.text("Percentage", 150, 50);

    // Divider Line
    doc.line(20, 54, 190, 54);

    // Table Data
    doc.setFont("helvetica", "normal");

    const data = [
      ["Unreserved", "148 / 200", "74%"],
      ["OBC", "130 / 200", "65%"],
      ["SC", "110 / 200", "55%"],
      ["ST", "96 / 200", "48%"],
      ["ST (Plains)", "104 / 200", "52%"],
      ["ST (Hills)", "104 / 200", "52%"],
      ["EWS", "104 / 200", "52%"]
    ];

    let y = 65;

    data.forEach(row => {
      doc.text(row[0], 20, y);
      doc.text(row[1], 90, y);
      doc.text(row[2], 150, y);

      y += 10;
    });

    // Footer Info
    y += 10;

    doc.setFontSize(10);

    doc.text(
      "Source: Cotton University Admission Portal",
      20,
      y
    );

    y += 8;

    doc.text(
      "Exam: CPGEE | Total Marks: 200 | Duration: 2 Hours",
      20,
      y
    );

    y += 8;

    doc.text(
      "Negative Marking: -0.25 per wrong answer",
      20,
      y
    );

    y += 12;

    doc.setTextColor(120);

    doc.text(
      "Note: Data is indicative. Official cutoffs published on the Cotton University portal.",
      20,
      y,
      { maxWidth: 170 }
    );

    // Download PDF
    doc.save("mca_cutoff.pdf");

    // Success State
    btn.innerHTML =
      '<i class="fa-solid fa-check"></i> Downloaded!';

    setTimeout(() => {
      btn.innerHTML = originalText;
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

    // MOVED TITLE & BODY HERE
    title: 'Notice regarding PG Admission 2026',
    body: 'MCA Admission 2026',

    link: 'https://cottonuniversity.ac.in/index_post_details?p=2700'
  },
];

function renderNotices(filter = 'all') {
  const container = document.getElementById('notices-container');
  if (!container) return;

  const filtered = filter === 'all'
    ? noticesData
    : noticesData.filter(n => n.tag.toLowerCase() === filter.toLowerCase());

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="notice-empty">
        <i class="fa-solid fa-bell-slash"></i>
        <p>No notices in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(n => `
    <div class="notice-card reveal ${n.important ? 'notice-important' : ''}">
      
      ${n.important
        ? '<div class="notice-important-ribbon"><i class="fa-solid fa-star"></i> Important</div>'
        : ''
      }

      <div class="notice-top">
        <span class="notice-tag tag-${n.tagColor}">
          ${n.tag}
        </span>

        <span class="notice-date">
          <i class="fa-regular fa-calendar"></i> ${n.date}
        </span>
      </div>

      <!-- BODY MOVED ABOVE -->
      <p class="notice-body">${n.body || ''}</p>

      <!-- TITLE MOVED BELOW -->
      <h3 class="notice-title">${n.title}</h3>

      <a href="${n.link}" target="_blank" class="notice-link">
        Read More <i class="fa-solid fa-arrow-right"></i>
      </a>

    </div>
  `).join('');

  // Re-observe newly added .reveal elements
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* Notice filter tabs */
document.querySelectorAll('.notice-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.notice-filter-btn')
      .forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

    renderNotices(btn.dataset.filter);
  });
});

/* Init notices */
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

//* ── PYQ Filter & Cards ──────────────────────────────────── */
const pyqData = [

  {
    program: 'mca',
    subject: 'cpgee',
    title: 'CPGEE PYQ Question Paper',
    desc: 'Official previous year entrance examination paper.',
    link: 'https://drive.google.com/drive/folders/1I-Ba5ONj48Fo2EqhF-TPHuU3R7gcoCdV'
  },

  {
    program: 'bca',
    subject: 'semester',
    title: 'BCA Previous Year Question Papers',
    desc: 'Semester-wise previous year question papers for BCA.',
    link: 'https://drive.google.com/drive/folders/1I-Ba5ONj48Fo2EqhF-TPHuU3R7gcoCdV'
  },

  {
    program: 'bsc',
    subject: 'semester',
    title: 'B.Sc CS Previous Year Question Papers',
    desc: 'Semester-wise previous year question papers for B.Sc CS.',
    link: 'https://drive.google.com/drive/folders/1I-Ba5ONj48Fo2EqhF-TPHuU3R7gcoCdV'
  },

];

function renderPYQ(programFilter = 'all', subjectFilter = 'all') {

  const container = document.getElementById('pyq-container');

  if (!container) return;

  let filtered = pyqData;

  /* ── Program Filter ───────────────────────────────── */
  if (programFilter !== 'all') {
    filtered = filtered.filter(p => p.program === programFilter);
  }

  /* ── Subject Filter ───────────────────────────────── */
  if (subjectFilter !== 'all') {
    filtered = filtered.filter(p => p.subject === subjectFilter);
  }

  /* ── Empty State ──────────────────────────────────── */
  if (filtered.length === 0) {

    container.innerHTML = `
      <div class="pyq-empty">
        <i class="fa-solid fa-file-circle-xmark"></i>
        <p>No papers found for selected filters.</p>
      </div>
    `;

    return;
  }

  /* ── Render Cards ─────────────────────────────────── */
  container.innerHTML = filtered.map((p, i) => `

    <div class="pyq-card reveal"
         style="transition-delay:${i * 0.05}s">

      <div class="pyq-card-top">

        <span class="pyq-program-badge prog-${p.program}">
          ${p.program.toUpperCase()}
        </span>

      </div>

      <h4 class="pyq-title">
        ${p.title}
      </h4>

      <p class="pyq-desc">
        ${p.desc}
      </p>

      <div class="pyq-actions">

        <a href="${p.link}"
           target="_blank"
           class="pyq-btn primary">

          <i class="fa-solid fa-download"></i>
          Download Paper

        </a>

      </div>

    </div>

  `).join('');

  /* ── Reveal Animation ─────────────────────────────── */
  container.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

}

/* ── PYQ Filters ────────────────────────────────────────── */
let pyqProgram = 'all',
    pyqSubject = 'all';

/* ── Program Buttons ───────────────────────────────────── */
document.querySelectorAll('.pyq-program-btn').forEach(btn => {

  btn.addEventListener('click', () => {

    document.querySelectorAll('.pyq-program-btn')
      .forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

    pyqProgram = btn.dataset.prog;

    renderPYQ(pyqProgram, pyqSubject);

  });

});

/* ── Init ──────────────────────────────────────────────── */
renderPYQ();

/* ═══════════════════════════════════════════════════════
   VISITOR COUNTER
═══════════════════════════════════════════════════════ */

const counterElement = document.getElementById('count-total');

async function loadVisitors() {
  try {
    // counterapi.dev is the active replacement for countapi.xyz
    const response = await fetch(
      'https://api.counterapi.dev/v1/cotton-csit-helpdesk/visits/up'
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    animateCounter(data.count);          // ← was never called before

  } catch (error) {
    console.error('COUNTER ERROR:', error);
    if (counterElement) counterElement.textContent = '—';
  }
}

function animateCounter(target) {
  if (!counterElement) return;          // ← guard added
  let current = 0;
  const duration = 1800;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counterElement.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Single DOMContentLoaded listener (you had it duplicated before)
window.addEventListener('DOMContentLoaded', loadVisitors);
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
