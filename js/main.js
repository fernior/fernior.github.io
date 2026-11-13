/**
 * Fernando Junior Hernández · CIO / CTO Executive Portfolio
 * Main Script (Zero-Build Vanilla Architecture with GSAP, Lenis & Lucide)
 * 
 * Strict Style Rule: Zero em-dashes in any UI text.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State Setup
  let currentLang = localStorage.getItem('fernior_lang') || 'es';
  let currentTheme = localStorage.getItem('fernior_theme') || 'dark';
  let activeCaseIndex = 0;
  let activeCredentialFilter = 'all';

  // Apply initial theme
  const root = document.documentElement;
  if (currentTheme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }

  // 2. Initialize Lenis Smooth Scroll & GSAP Integration
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // 3. Hero Canvas: Interactive Neural Command Mesh (60 FPS)
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || window.innerHeight);

    const mouse = { x: -2000, y: -2000, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = -2000;
      mouse.y = -2000;
    });

    window.addEventListener('resize', () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
      initNodes();
    });

    let nodes = [];
    const nodeCount = Math.min(Math.floor((width * height) / 13000), 75);

    function initNodes() {
      nodes = [];
      const isDark = !root.classList.contains('light');
      for (let i = 0; i < nodeCount; i++) {
        const radius = Math.random() * 1.8 + 1.2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: radius,
          baseRadius: radius,
          color: isDark
            ? (Math.random() > 0.8 ? '#38BDF8' : '#0284C7')
            : (Math.random() > 0.8 ? '#0284C7' : '#94A3B8')
        });
      }
    }
    initNodes();

    let isCanvasVisible = true;
    const canvasObserver = new IntersectionObserver(([entry]) => {
      isCanvasVisible = entry.isIntersecting;
      if (isCanvasVisible) renderCanvas();
    }, { threshold: 0.05 });
    canvasObserver.observe(canvas);

    function renderCanvas() {
      if (!isCanvasVisible) return;
      ctx.clearRect(0, 0, width, height);
      const isDark = !root.classList.contains('light');
      const maxDist = 135;

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        const dxMouse = mouse.x - nodeA.x;
        const dyMouse = mouse.y - nodeA.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 1.5;
          nodeA.x -= (dxMouse / distMouse) * force;
          nodeA.y -= (dyMouse / distMouse) * force;
          nodeA.radius = nodeA.baseRadius * 1.8;
        } else {
          nodeA.radius = nodeA.baseRadius;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * (isDark ? 0.35 : 0.2);
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${opacity})` : `rgba(2, 132, 199, ${opacity})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeA.color;
        ctx.shadowColor = isDark ? '#38BDF8' : '#0284C7';
        ctx.shadowBlur = isDark ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (mouse.x > 0 && mouse.y > 0 && mouse.x < width && mouse.y < height) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#38BDF8' : '#0284C7';
        ctx.fill();

        for (let i = 0; i < nodes.length; i++) {
          const dist = Math.hypot(mouse.x - nodes[i].x, mouse.y - nodes[i].y);
          if (dist < mouse.radius) {
            const opacity = (1 - dist / mouse.radius) * (isDark ? 0.6 : 0.35);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(nodes[i].x, nodes[i].y);
            ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${opacity})` : `rgba(2, 132, 199, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // 4. Spotlight Card Hover Effect Tracking
  function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
  initSpotlightCards();

  // 5. Dynamic Rotating Headline in Hero
  let titleIndex = 0;
  let rotatingTitleInterval = null;
  function startRotatingHeadline(titles) {
    if (rotatingTitleInterval) clearInterval(rotatingTitleInterval);
    const titleElement = document.getElementById('rotating-headline');
    if (!titleElement) return;

    rotatingTitleInterval = setInterval(() => {
      titleIndex = (titleIndex + 1) % titles.length;
      if (typeof gsap !== 'undefined') {
        gsap.to(titleElement, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            titleElement.textContent = titles[titleIndex];
            gsap.to(titleElement, { opacity: 1, y: 0, duration: 0.4 });
          }
        });
      } else {
        titleElement.textContent = titles[titleIndex];
      }
    }, 3800);
  }

  // 6. Render Metrics Counters with GSAP ScrollTrigger
  let countersAnimated = false;
  function renderMetrics(metricsData) {
    const container = document.getElementById('metrics-container');
    if (!container) return;

    container.innerHTML = metricsData.items.map((item, idx) => {
      const isSpan2 = idx === 4 ? 'md:col-span-2 lg:col-span-2' : '';
      return `
        <div class="spotlight-card p-7 flex flex-col justify-between group ${isSpan2}">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-${item.accent === 'gold' ? 'amber' : item.accent === 'crimson' ? 'rose' : 'sky'}-500/15 text-${item.accent === 'gold' ? 'amber' : item.accent === 'crimson' ? 'rose' : 'sky'}-400 border border-${item.accent === 'gold' ? 'amber' : item.accent === 'crimson' ? 'rose' : 'sky'}-500/20">
                ${item.badge}
              </span>
              <div class="p-2 rounded-xl bg-white/5 border border-white/10 text-${item.accent === 'gold' ? 'amber' : item.accent === 'crimson' ? 'rose' : 'sky'}-400">
                <i data-lucide="${idx === 0 ? 'zap' : idx === 1 ? 'users' : idx === 2 ? 'wifi' : idx === 3 ? 'dollar-sign' : 'shield-check'}" class="w-5 h-5"></i>
              </div>
            </div>

            <div class="mb-2">
              <div class="text-4xl sm:text-5xl font-black font-mono tracking-tight text-${item.accent === 'gold' ? 'amber' : item.accent === 'crimson' ? 'rose' : 'sky'}-400 mb-1">
                <span class="metric-counter" data-target="${item.target}" data-prefix="${item.prefix || ''}" data-suffix="${item.suffix || ''}">
                  ${item.prefix || ''}0${item.suffix || ''}
                </span>
              </div>
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                ${item.highlight}
              </div>
            </div>

            <h3 class="text-lg font-bold mb-2 text-white">
              ${item.title}
            </h3>
            <p class="text-xs sm:text-sm leading-relaxed mb-4 text-slate-300">
              ${item.description}
            </p>
          </div>

          <div class="pt-4 border-t border-white/8 flex items-center justify-between text-xs font-mono text-slate-400">
            <span class="font-semibold text-${item.accent === 'gold' ? 'amber' : item.accent === 'crimson' ? 'rose' : 'sky'}-400">${item.org}</span>
            <span>Misión Crítica</span>
          </div>
        </div>
      `;
    }).join('');

    initSpotlightCards();
    animateCounters();
  }

  function animateCounters() {
    if (countersAnimated) return;
    const counters = document.querySelectorAll('.metric-counter');

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: '#impact',
        start: 'top 80%',
        onEnter: () => {
          countersAnimated = true;
          counters.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            const obj = { val: 0 };

            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent = `${prefix}${Math.floor(obj.val)}${suffix}`;
              }
            });
          });
        }
      });
    } else {
      counters.forEach((el) => {
        const target = el.getAttribute('data-target');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        el.textContent = `${prefix}${target}${suffix}`;
      });
    }
  }

  // 7. Render Pillars (4 Ejes del CIO)
  function renderPillars(pillarsData) {
    const container = document.getElementById('pillars-container');
    if (!container) return;

    const icons = ['briefcase', 'shield-check', 'database', 'cpu'];

    container.innerHTML = pillarsData.items.map((pillar, idx) => {
      return `
        <div class="spotlight-card p-8 flex flex-col justify-between group transition-all duration-300">
          <div>
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:border-sky-400/40 transition-all duration-300">
                  <i data-lucide="${icons[idx]}" class="w-6 h-6"></i>
                </div>
                <div>
                  <span class="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                    ${pillar.subtitle}
                  </span>
                  <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    ${pillar.title}
                  </h3>
                </div>
              </div>
              <span class="text-2xl font-black font-mono text-white/10 group-hover:text-sky-400/25 transition-colors">
                ${pillar.number}
              </span>
            </div>

            <p class="text-sm sm:text-base leading-relaxed mb-6 font-normal text-slate-300">
              ${pillar.description}
            </p>

            <div class="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 mb-6 text-xs sm:text-sm font-medium text-sky-200">
              <div class="flex items-start gap-2.5">
                <i data-lucide="sparkles" class="w-4 h-4 text-sky-400 shrink-0 mt-0.5"></i>
                <div>
                  <span class="font-bold font-mono text-[11px] uppercase tracking-wider block text-sky-400 mb-0.5">
                    Enfoque de Dirección Ejecutiva:
                  </span>
                  ${pillar.focus}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-white/8">
            <span class="text-[11px] font-mono uppercase tracking-wider block mb-3 font-semibold text-slate-400">
              Herramientas, Estándares & Marcos de Trabajo:
            </span>
            <div class="flex flex-wrap gap-2">
              ${pillar.tools.map((t) => `
                <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-medium border bg-white/5 border-white/10 text-slate-300 group-hover:border-sky-400/30 group-hover:text-white transition-colors">
                  ${t}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');

    initSpotlightCards();
  }

  // 8. Render Case Studies (Tabs & Detailed Breakdown)
  function renderCaseStudies(casesData) {
    const tabsContainer = document.getElementById('case-tabs-container');
    const contentContainer = document.getElementById('case-content-container');
    if (!tabsContainer || !contentContainer) return;

    // Render Tabs
    tabsContainer.innerHTML = casesData.items.map((item, idx) => {
      const isActive = idx === activeCaseIndex;
      const tabIcons = ['building-2', 'landmark', 'trending-up', 'shield-check'];
      return `
        <button
          onclick="window.selectCaseStudy(${idx})"
          class="flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all cursor-pointer border ${
            isActive
              ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border-sky-400/60 text-sky-400 shadow-lg shadow-sky-950/40 font-semibold'
              : 'bg-white/5 border-white/8 text-slate-300 hover:text-white hover:bg-white/10'
          }"
        >
          <i data-lucide="${tabIcons[idx]}" class="w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}"></i>
          <span>${item.organization}</span>
          <span class="text-[10px] font-mono opacity-60 hidden sm:inline">(${item.period})</span>
        </button>
      `;
    }).join('');

    // Render Active Case Content
    const current = casesData.items[activeCaseIndex];
    contentContainer.innerHTML = `
      <div class="spotlight-card p-6 sm:p-10 border border-sky-500/30">
        <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div class="flex flex-wrap items-center gap-3">
            <span class="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
              ${current.sector}
            </span>
            <div class="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <i data-lucide="briefcase" class="w-3.5 h-3.5 text-sky-400"></i>
              <span class="font-semibold text-white">${current.role}</span>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-sky-400"></i>
              <span>${current.period}</span>
            </div>
          </div>
          <div class="text-xs font-mono font-bold text-sky-400 flex items-center gap-1">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
            <span>Caso Directivo #${activeCaseIndex + 1}</span>
          </div>
        </div>

        <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-8 leading-snug text-white">
          ${current.headline}
        </h3>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <!-- Reto -->
          <div class="p-6 rounded-2xl border bg-white/5 border-rose-500/20 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-3 text-rose-400">
                <i data-lucide="alert-circle" class="w-5 h-5 shrink-0"></i>
                <span class="text-xs font-mono font-bold uppercase tracking-wider">${casesData.labels.challenge}</span>
              </div>
              <p class="text-xs sm:text-sm leading-relaxed text-slate-300">${current.challenge}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-rose-500/20 text-[11px] font-mono text-rose-400/90 font-medium">
              Punto de Partida Crítico
            </div>
          </div>

          <!-- Estrategia -->
          <div class="p-6 rounded-2xl border bg-white/5 border-sky-500/20 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-3 text-sky-400">
                <i data-lucide="compass" class="w-5 h-5 shrink-0"></i>
                <span class="text-xs font-mono font-bold uppercase tracking-wider">${casesData.labels.strategy}</span>
              </div>
              <p class="text-xs sm:text-sm leading-relaxed text-slate-300">${current.strategy}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-sky-500/20 text-[11px] font-mono text-sky-400/90 font-medium">
              Arquitectura & Liderazgo de TI
            </div>
          </div>

          <!-- Resultados -->
          <div class="p-6 rounded-2xl border bg-white/5 border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-3 text-emerald-400">
                <i data-lucide="check-circle-2" class="w-5 h-5 shrink-0"></i>
                <span class="text-xs font-mono font-bold uppercase tracking-wider">${casesData.labels.results}</span>
              </div>
              <ul class="space-y-2 text-xs sm:text-sm">
                ${current.results.map((res) => `
                  <li class="flex items-start gap-2">
                    <span class="text-emerald-400 mt-1 shrink-0 font-bold">•</span>
                    <span class="text-slate-300">${res}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div class="mt-4 pt-3 border-t border-emerald-500/20 text-[11px] font-mono text-emerald-400/90 font-medium">
              Retorno de Inversión y Eficiencia
            </div>
          </div>
        </div>

        <!-- KPIs -->
        <div class="mb-8">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-3">
            ${casesData.labels.kpiBox}:
          </span>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            ${current.kpis.map((kpi) => `
              <div class="p-4 rounded-xl border bg-white/5 border-white/10 text-center">
                <div class="text-xl sm:text-2xl font-black font-mono text-sky-400 mb-0.5">${kpi.value}</div>
                <div class="text-[11px] font-mono font-medium text-slate-400">${kpi.label}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Architecture Tags -->
        <div class="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
          <div class="flex items-center gap-1.5 text-xs font-mono text-slate-400 mr-2">
            <i data-lucide="tag" class="w-3.5 h-3.5 text-sky-400"></i>
            <span>${casesData.labels.architecture}:</span>
          </div>
          ${current.tags.map((tag) => `
            <span class="px-3 py-1 rounded-lg text-xs font-mono font-semibold border bg-sky-500/10 border-sky-400/20 text-sky-300">
              ${tag}
            </span>
          `).join('')}
        </div>
      </div>
    `;

    initSpotlightCards();
  }

  window.selectCaseStudy = (index) => {
    activeCaseIndex = index;
    const data = window.PORTFOLIO_DATA[currentLang];
    renderCaseStudies(data.cases);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  // 9. Render Timeline with Scroll-Triggered Track
  function renderTimeline(timelineData) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = timelineData.items.map((item, idx) => {
      const isCurrent = item.current;
      return `
        <div class="relative pl-12 sm:pl-20">
          <!-- Timeline Node -->
          <div class="absolute left-4 sm:left-8 top-6 -translate-x-1/2 flex items-center justify-center">
            ${
              isCurrent
                ? `<span class="relative flex h-5 w-5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-5 w-5 bg-sky-500 border-2 border-[#070B14]"></span>
                  </span>`
                : `<div class="w-4 h-4 rounded-full bg-slate-700 border-2 border-sky-400/80 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>`
            }
          </div>

          <!-- Card -->
          <div class="spotlight-card p-6 sm:p-8 transition-all duration-300 ${isCurrent ? 'border-sky-400/50 shadow-lg shadow-sky-950/30' : ''}">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border flex items-center gap-1.5 ${
                  isCurrent ? 'bg-sky-500/20 text-sky-300 border-sky-400/40' : 'bg-white/5 text-slate-300 border-white/10'
                }">
                  <i data-lucide="calendar" class="w-3 h-3 text-sky-400"></i>
                  <span>${item.period}</span>
                </span>
                ${isCurrent ? `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">${timelineData.currentBadge}</span>` : ''}
              </div>
              <span class="text-xs font-mono text-slate-400 flex items-center gap-1">
                <i data-lucide="building" class="w-3 h-3 text-sky-400"></i>
                <span>${item.sector}</span>
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-black tracking-tight mb-1 text-white">
              ${item.role}
            </h3>

            <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-sky-400 mb-4">
              <span>${item.company}</span>
              <span class="text-slate-500">·</span>
              <span class="text-slate-400 font-normal flex items-center gap-1">
                <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                ${item.location}
              </span>
            </div>

            <p class="text-xs sm:text-sm leading-relaxed mb-4 font-medium text-slate-200">
              ${item.highlight}
            </p>

            <div id="timeline-details-${idx}" class="mt-4 pt-4 border-t border-white/10 space-y-2.5">
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 block mb-2">
                Logros Clave y Responsabilidades:
              </span>
              ${item.achievements.map((ach) => `
                <div class="flex items-start gap-2.5 text-xs sm:text-sm">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-sky-400 shrink-0 mt-0.5"></i>
                  <span class="text-slate-300">${ach}</span>
                </div>
              `).join('')}
            </div>

            <div class="mt-6 pt-4 border-t border-white/8 flex flex-wrap gap-1.5">
              ${item.competencies.map((comp) => `
                <span class="px-2 py-0.5 rounded text-[11px] font-mono border bg-white/5 border-white/10 text-slate-300">
                  ${comp}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');

    initSpotlightCards();

    // GSAP ScrollTrigger for Timeline Glow Progress Line
    if (typeof ScrollTrigger !== 'undefined') {
      const glowTrack = document.getElementById('timeline-glow-track');
      if (glowTrack) {
        ScrollTrigger.create({
          trigger: '#timeline-container',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: true,
          onUpdate: (self) => {
            glowTrack.style.height = `${(self.progress * 100).toFixed(1)}%`;
          }
        });
      }
    }
  }

  // 10. Render Credentials with Category Filtering
  function renderCredentials(credentialsData) {
    const filterContainer = document.getElementById('credentials-filter-container');
    const listContainer = document.getElementById('credentials-list-container');
    if (!filterContainer || !listContainer) return;

    // Filters
    const filters = [
      { id: 'all', label: credentialsData.filterAll },
      { id: 'degree', label: credentialsData.filterDegrees },
      { id: 'certification', label: credentialsData.filterCerts },
      { id: 'executive', label: credentialsData.filterExecutive }
    ];

    filterContainer.innerHTML = filters.map((f) => {
      const isActive = f.id === activeCredentialFilter;
      return `
        <button
          onclick="window.setCredentialFilter('${f.id}')"
          class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
            isActive
              ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/25'
              : 'bg-white/5 border-white/8 text-slate-300 hover:text-white hover:bg-white/10'
          }"
        >
          ${f.label}
        </button>
      `;
    }).join('');

    // Filter items
    const filtered = credentialsData.items.filter((item) => {
      if (activeCredentialFilter === 'all') return true;
      return item.type === activeCredentialFilter;
    });

    listContainer.innerHTML = filtered.map((item) => {
      const icon = item.type === 'degree' ? 'graduation-cap' : item.type === 'certification' ? 'award' : 'shield-check';
      return `
        <div class="spotlight-card p-6 flex flex-col justify-between group transition-all">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <div class="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-sky-400/40 transition-colors">
                  <i data-lucide="${icon}" class="w-5 h-5 text-sky-400"></i>
                </div>
                <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400">
                  ${item.category}
                </span>
              </div>
              <span class="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                ${item.year}
              </span>
            </div>

            <h3 class="text-base sm:text-lg font-bold tracking-tight mb-2 leading-snug text-white">
              ${item.title}
            </h3>

            <p class="text-xs sm:text-sm font-medium mb-3 text-slate-300">
              ${item.institution}
            </p>
          </div>

          <div class="pt-4 border-t border-white/8 flex items-center justify-between">
            ${
              item.license
                ? `<div class="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold">
                    <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                    <span>${item.license}</span>
                  </div>`
                : `<span class="text-[11px] font-mono text-slate-400">Acreditación Verificada</span>`
            }
            <a
              href="https://credly.com/users/fernando-junior-hernandez"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver credencial en Credly"
              class="p-1 rounded text-slate-400 hover:text-sky-400 transition-colors"
            >
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');

    initSpotlightCards();
  }

  window.setCredentialFilter = (filterId) => {
    activeCredentialFilter = filterId;
    const data = window.PORTFOLIO_DATA[currentLang];
    renderCredentials(data.credentials);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  // 11. Interactive Executive Quick Message Composer
  let selectedTopic = '';
  function initContactComposer(contactData) {
    const topicContainer = document.getElementById('contact-topics-container');
    const previewEl = document.getElementById('message-preview');
    if (!topicContainer || !previewEl) return;

    selectedTopic = contactData.interactive.topics[0];

    topicContainer.innerHTML = contactData.interactive.topics.map((t, idx) => {
      const isSelected = idx === 0;
      return `
        <button
          type="button"
          onclick="window.selectContactTopic('${t}', this)"
          class="topic-btn p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
            isSelected
              ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-semibold shadow-sm'
              : 'bg-white/5 border-white/8 text-slate-300 hover:bg-white/10'
          }"
        >
          ${t}
        </button>
      `;
    }).join('');

    updateMessagePreview();
  }

  window.selectContactTopic = (topic, btn) => {
    selectedTopic = topic;
    document.querySelectorAll('.topic-btn').forEach((b) => {
      b.classList.remove('bg-sky-500/20', 'border-sky-400', 'text-sky-300', 'font-semibold', 'shadow-sm');
      b.classList.add('bg-white/5', 'border-white/8', 'text-slate-300');
    });
    btn.classList.remove('bg-white/5', 'border-white/8', 'text-slate-300');
    btn.classList.add('bg-sky-500/20', 'border-sky-400', 'text-sky-300', 'font-semibold', 'shadow-sm');
    updateMessagePreview();
  };

  function updateMessagePreview() {
    const previewEl = document.getElementById('message-preview');
    const nameInput = document.getElementById('sender-name');
    const companyInput = document.getElementById('sender-company');
    if (!previewEl) return;

    const name = (nameInput && nameInput.value.trim()) || (currentLang === 'es' ? '[Nombre]' : '[Name]');
    const company = (companyInput && companyInput.value.trim()) || (currentLang === 'es' ? '[Organización]' : '[Organization]');

    let text = '';
    if (currentLang === 'en') {
      text = `Hello Fernando. My name is ${name} from ${company}. I am reaching out regarding: "${selectedTopic}". I would like to schedule an executive conversation with you.`;
    } else {
      text = `Hola Fernando. Mi nombre es ${name} de ${company}. Me comunico respecto a: "${selectedTopic}". Me gustaría coordinar una conversación ejecutiva contigo.`;
    }
    previewEl.textContent = `"${text}"`;
  }

  const nameInp = document.getElementById('sender-name');
  const compInp = document.getElementById('sender-company');
  if (nameInp) nameInp.addEventListener('input', updateMessagePreview);
  if (compInp) compInp.addEventListener('input', updateMessagePreview);

  window.sendWhatsApp = () => {
    const previewEl = document.getElementById('message-preview');
    const text = encodeURIComponent(previewEl.textContent.replace(/^"|"$/g, ''));
    window.open(`https://wa.me/525522973001?text=${text}`, '_blank');
  };

  window.sendEmail = () => {
    const previewEl = document.getElementById('message-preview');
    const subject = encodeURIComponent(`Contacto Ejecutivo: ${selectedTopic}`);
    const body = encodeURIComponent(previewEl.textContent.replace(/^"|"$/g, ''));
    window.location.href = `mailto:fernior@gmail.com?subject=${subject}&body=${body}`;
  };

  // 12. Copy Utilities (Phone, Email, ATS CV)
  window.copyText = (text, elementId, successText) => {
    navigator.clipboard.writeText(text).then(() => {
      const el = document.getElementById(elementId);
      if (el) {
        const original = el.textContent;
        el.textContent = successText;
        el.classList.add('text-emerald-400');
        setTimeout(() => {
          el.textContent = original;
          el.classList.remove('text-emerald-400');
        }, 2000);
      }
      if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      }
    });
  };

  // 13. Executive CV Modal Logic
  const cvModal = document.getElementById('cv-modal');
  window.openCVModal = () => {
    if (cvModal) {
      cvModal.classList.remove('hidden');
      cvModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  };

  window.closeCVModal = () => {
    if (cvModal) {
      cvModal.classList.add('hidden');
      cvModal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  };

  window.downloadAtsCV = () => {
    const atsText = `FERNANDO JUNIOR HERNÁNDEZ
Director de Tecnologías de la Información (CIO / CTO) | Infraestructura, Ciberseguridad, Transformación Digital y ERP
Ciudad de México, CDMX (Disponibilidad para viajar) | Tel: +52 55 2297 3001 | Email: fernior@gmail.com
LinkedIn: linkedin.com/in/fernior | Credly: credly.com/users/fernando-junior-hernandez | Idiomas: Español (Nativo), Inglés (B2+ Avanzado)

PERFIL EJECUTIVO
Director de Tecnologías de la Información (CIO / CTO) con más de 15 años de trayectoria en posiciones de Dirección y Gerencia Senior de TI, liderando la estrategia tecnológica nacional, infraestructura corporativa de misión crítica, redes, ciberseguridad y transformación digital en el sector farmacéutico, servicios financieros regulados (CNBV) y empresas multinacionales. Sólida experiencia en arquitectura de software, gobierno de datos y gestión de sistemas ERP corporativos (implementación de ERP Intelisis y gestión de arquitecturas homologables a SAP y Oracle), Cloud Computing, BI e IA. Experto en Gobierno de TI (ITIL, COBIT, Scrum, SAFe, PMI), administración financiera de CAPEX y OPEX, negociación de contratos tecnológicos, licenciamiento, niveles de servicio (SLAs) y continuidad operativa (BCP y DRP).

EXPERIENCIA PROFESIONAL
* Gerente de Sistemas y Director de Tecnología (CTO) | OFINSA, Operadora de Fondos Nafinsa (Junio 2026 : Actual)
* Director de Infraestructura y Tecnología Aplicada | Instituto Nacional Electoral INE (Marzo 2025 : Mayo 2026)
* IT Senior Regional Manager | MetLife México (Junio 2022 : Febrero 2025)
* Gerente de Tecnología / CTO | Grupo Lefarma (Octubre 2021 : Junio 2022)
* Gerente Senior de Tecnología | Alsea (Domino's Pizza & Starbucks) (Julio 2014 : Octubre 2021)

EDUCACIÓN Y CERTIFICACIONES
* Maestría en Gestión de Innovación en TIC | INFOTEC (CONACYT) | Cédula: 12756886
* Licenciatura en Ciencias de la Informática | IPN (UPIICSA) | Cédula: 8842389
* Certified SAFe 5 Practitioner & Certified SAFe 5 Scrum Master
* Microsoft Certified: Azure Fundamentals (AZ-900)
* Google Project Management Specialization (PMI)`;

    const blob = new Blob([atsText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Fernando_Junior_Hernandez_CV_ATS.txt';
    a.click();
    URL.revokeObjectURL(url);

    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  window.printVisualCV = () => {
    window.print();
  };

  // Close modal on Esc key or backdrop click
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeCVModal();
  });
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) window.closeCVModal();
    });
  }

  // 14. Theme Toggle (Dark / Light)
  window.toggleTheme = () => {
    const isLight = root.classList.contains('light');
    if (isLight) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('fernior_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('fernior_theme', 'light');
    }
    updateThemeIcon();
  };

  function updateThemeIcon() {
    const iconWrapper = document.getElementById('theme-toggle-icon');
    if (!iconWrapper) return;
    const isLight = root.classList.contains('light');
    iconWrapper.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  updateThemeIcon();

  // 15. Master Language Switcher
  window.toggleLanguage = () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('fernior_lang', currentLang);
    applyLanguage(currentLang);
  };

  function applyLanguage(lang) {
    const data = window.PORTFOLIO_DATA[lang];
    if (!data) return;

    // Update lang attribute
    document.documentElement.lang = lang;

    // Update lang toggle label
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.textContent = lang.toUpperCase();
    }
    const langBtnAlt = document.getElementById('lang-btn-alt');
    if (langBtnAlt) {
      langBtnAlt.textContent = lang === 'es' ? 'EN' : 'ES';
    }

    // Update simple i18n nodes
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = key.split('.').reduce((acc, k) => acc && acc[k], data);
      if (val) el.textContent = val;
    });

    // Start rotating headline
    startRotatingHeadline(data.hero.rotatingTitles);

    // Render dynamic complex sections
    renderMetrics(data.metrics);
    renderPillars(data.pillars);
    renderCaseStudies(data.cases);
    renderTimeline(data.timeline);
    renderCredentials(data.credentials);
    initContactComposer(data.contact);

    // Re-create lucide icons for newly inserted HTML
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }

  // 16. Initial Language Boot
  applyLanguage(currentLang);

  // 17. Cinematic GSAP Entry Animation
  if (typeof gsap !== 'undefined') {
    gsap.from('#hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.from('#hero-name', { opacity: 0, y: 25, duration: 0.9, delay: 0.4, ease: 'power3.out' });
    gsap.from('#rotating-headline', { opacity: 0, y: 20, duration: 0.8, delay: 0.6, ease: 'power3.out' });
    gsap.from('#hero-subheadline', { opacity: 0, y: 20, duration: 0.8, delay: 0.8, ease: 'power3.out' });
    gsap.from('#hero-pitch', { opacity: 0, y: 20, duration: 0.8, delay: 1.0, ease: 'power3.out' });
    gsap.from('#hero-ctas', { opacity: 0, y: 20, duration: 0.8, delay: 1.2, ease: 'power3.out' });
    gsap.from('#hero-photo-wrapper', { opacity: 0, scale: 0.95, duration: 1.1, delay: 0.5, ease: 'power3.out' });
  }
});

