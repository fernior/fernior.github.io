/* ============================================================
   ANTIGRAVITY — Fernando Hernández
   Main JavaScript: Particles, Terminal, Animations, Timeline
   ============================================================ */

'use strict';

// ── Utility: Wait for DOM ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTerminalSimulation();
  initNavScroll();
  initScrollReveal();
  initCountUp();
  initTimelineHover();
  initMobileNav();
});

/* ============================================================
   1. PARTICLE / ANTIGRAVITY CANVAS SYSTEM
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = window.innerWidth;
  let H = window.innerHeight;
  let mouse = { x: W / 2, y: H / 2 };
  let animId;

  const PARTICLE_COUNT = Math.min(Math.floor((W * H) / 14000), 90);
  const CONNECTION_DIST = 140;
  const COLORS = ['rgba(0,212,255,', 'rgba(124,58,237,', 'rgba(16,185,129,', 'rgba(99,102,241,'];

  canvas.width = W;
  canvas.height = H;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(randomY = false) {
      this.x = Math.random() * W;
      this.y = randomY ? Math.random() * H : H + 20;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.3 + 0.05);
      this.size = Math.random() * 1.8 + 0.6;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = (Math.random() - 0.5) * 0.015;
      this.wobbleAmp = Math.random() * 0.3 + 0.1;
    }

    update() {
      this.wobble += this.wobbleSpeed;
      this.x += this.vx + Math.sin(this.wobble) * this.wobbleAmp;
      this.y += this.vy;

      // Mouse gravity repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 1.2;
        this.y += (dy / dist) * force * 1.2;
      }

      if (this.y < -20 || this.x < -40 || this.x > W + 40) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color + '1)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.18;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = 'rgba(0,212,255,1)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const resizeObs = new ResizeObserver(() => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });
  resizeObs.observe(document.body);
}

/* ============================================================
   2. TERMINAL SIMULATION (Gemini-style typewriter)
   ============================================================ */
function initTerminalSimulation() {
  const lines = [
    { type: 'prompt', cmd: 'gemini query --model=pro --profile="fjh"' },
    { type: 'out', text: '⟳  Connecting to Gemini Pro...', cls: '' },
    { type: 'out', text: '✓  Session authenticated', cls: 'success' },
    { type: 'blank' },
    { type: 'out', text: '📋 PROFILE SUMMARY', cls: 'highlight' },
    { type: 'out', text: '   Name    → Fernando Junior Hernández', cls: '' },
    { type: 'out', text: '   Role    → CTO · Platform Engineering Lead', cls: '' },
    { type: 'out', text: '   XP      → 15+ years critical infrastructure', cls: '' },
    { type: 'blank' },
    { type: 'out', text: '🤖 AI STACK DETECTED', cls: 'highlight' },
    { type: 'out', text: '   ✦ AWS Bedrock · Gemini Pro · Ollama LLMs', cls: 'purple' },
    { type: 'out', text: '   ✦ n8n agents · Qdrant vectors · Supabase', cls: 'purple' },
    { type: 'out', text: '   ✦ Kubernetes · Terraform · OpenShift', cls: 'amber' },
    { type: 'blank' },
    { type: 'out', text: '☁  CLOUD SCOPE', cls: 'highlight' },
    { type: 'out', text: '   AWS · Azure · GCP — multi-cloud native', cls: '' },
    { type: 'blank' },
    { type: 'out', text: '✅ STATUS: Available for high-impact roles', cls: 'success' },
  ];

  const body = document.getElementById('terminal-body');
  if (!body) return;

  let idx = 0;
  const cursor = document.getElementById('terminal-cursor');

  function renderNext() {
    if (idx >= lines.length) {
      // restart after pause
      setTimeout(() => {
        body.innerHTML = '';
        // re-add cursor
        const c = document.createElement('div');
        c.className = 'terminal-line visible';
        c.innerHTML = '<span class="terminal-prompt">❯</span><span class="cursor-blink" id="terminal-cursor"></span>';
        body.appendChild(c);
        idx = 0;
        setTimeout(renderNext, 600);
      }, 4000);
      return;
    }

    const line = lines[idx++];
    const el = document.createElement('div');
    el.className = 'terminal-line';

    if (line.type === 'blank') {
      el.innerHTML = '&nbsp;';
      el.className = 'terminal-line visible';
      body.appendChild(el);
      setTimeout(renderNext, 80);
      return;
    }

    if (line.type === 'prompt') {
      el.innerHTML = `<span class="terminal-prompt">❯</span><span class="terminal-cmd"> ${line.cmd}</span>`;
    } else {
      el.innerHTML = `<span class="terminal-out ${line.cls || ''}">${line.text}</span>`;
    }

    body.appendChild(el);

    // Remove cursor from previous location, add to end
    const oldCursor = document.getElementById('terminal-cursor');
    if (oldCursor) oldCursor.parentElement.remove();
    const cursorEl = document.createElement('div');
    cursorEl.className = 'terminal-line visible';
    cursorEl.innerHTML = '<span class="terminal-prompt">❯</span><span class="cursor-blink" id="terminal-cursor"></span>';
    body.appendChild(cursorEl);

    // scroll to bottom
    body.scrollTop = body.scrollHeight;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add('visible');
      });
    });

    const delay = line.type === 'prompt' ? 500 : 260;
    setTimeout(renderNext, delay);
  }

  // Initial prompt line
  const initLine = document.createElement('div');
  initLine.className = 'terminal-line visible';
  initLine.innerHTML = '<span class="terminal-prompt">❯</span><span class="cursor-blink" id="terminal-cursor"></span>';
  body.appendChild(initLine);

  setTimeout(renderNext, 800);
}

/* ============================================================
   3. NAVIGATION SCROLL EFFECT
   ============================================================ */
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ============================================================
   4. SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ============================================================
   5. COUNT-UP ANIMATION FOR STATS
   ============================================================ */
function initCountUp() {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const isFloat = el.dataset.float === 'true';
      const duration = 1800;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

/* ============================================================
   6. TIMELINE HOVER EFFECTS
   ============================================================ */
function initTimelineHover() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach(item => {
    const card = item.querySelector('.timeline-card');
    const node = item.querySelector('.timeline-node');
    if (!card || !node) return;

    item.addEventListener('mouseenter', () => {
      node.style.transform = 'translateX(-50%) scale(1.6)';
    });
    item.addEventListener('mouseleave', () => {
      node.style.transform = '';
    });
  });
}

/* ============================================================
   7. MOBILE NAVIGATION
   ============================================================ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobile-nav-close');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  closeBtn && closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

/* ============================================================
   8. SMOOTH ANCHOR SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
