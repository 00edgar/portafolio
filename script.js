'use strict';
(() => {
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const has = (k) => typeof window[k] !== 'undefined';
  const safe = (fn) => { try { fn(); } catch (e) { /* CDN no disponible: la página sigue funcionando */ } };
  const ACCENTS = { azul: '#7db4ff', esmeralda: '#52e3a4', violeta: '#c4a6ff', ambar: '#ffc561' };

  // Imágenes: respaldo SVG si falla la red
  const svgFallback = (label) => 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#101828"/><g fill="none" stroke="#7db4ff" stroke-width="3"><path d="M120 250h200l40-80h120l40 160h160"/><circle cx="120" cy="250" r="12"/><circle cx="680" cy="330" r="12"/></g><text x="400" y="430" fill="#c3ccdc" font-family="sans-serif" font-size="28" text-anchor="middle">${label || 'Tecnología'}</text></svg>`);
  const Images = {
    init() {
      $$('img').forEach((img) => {
        const fix = () => { if (img.dataset.failed) return; img.dataset.failed = '1'; img.src = svgFallback(img.dataset.fallback || img.alt); };
        img.addEventListener('error', fix);
        if (img.complete && img.naturalWidth === 0 && img.src) fix();
      });
    }
  };

  // Acento en vivo
  const Theme = {
    init() {
      const sel = $('#accent'); let saved = 'azul';
      safe(() => { saved = localStorage.getItem('accent') || 'azul'; });
      if (!ACCENTS[saved]) saved = 'azul';
      sel.value = saved; this.set(saved);
      sel.addEventListener('change', () => this.set(sel.value));
    },
    set(name) {
      document.documentElement.dataset.accent = name;
      safe(() => localStorage.setItem('accent', name));
      Particles.recolor();
    }
  };

  // Scroll: Lenis + GSAP
  const Scroll = {
    init() {
      if (!has('gsap')) return;
      gsap.registerPlugin(ScrollTrigger);
      if (has('Lenis') && !reduce) {
        const lenis = new Lenis({ lerp: 0.1 });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
        $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
          const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -70 }); }
        }));
      }
      const bar = $('.progress');
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => gsap.set(bar, { scaleX: s.progress }) });
    }
  };

  // Revelado de imágenes + entrada del Hero + línea de tiempo
  const Reveal = {
    init() {
      if (!has('gsap') || reduce) return;
      $$('[data-reveal-img]').forEach((box) => {
        const img = $('img', box) || box;
        gsap.fromTo(box, { clipPath: 'inset(12% 8% 12% 8% round 18px)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0% round 18px)', opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: box, start: 'top 88%', once: true } });
        gsap.fromTo(img, { scale: 1.12, filter: 'blur(10px)' },
          { scale: 1, filter: 'blur(0px)', duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: box, start: 'top 88%', once: true } });
      });
      gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
        .from('.hero-txt > *', { y: 40, opacity: 0, stagger: 0.1 })
        .from('.photo', { y: 60, opacity: 0, scale: 0.94 }, 0.2);
      const tl = $('.timeline');
      if (tl) {
        const line = document.createElement('span'); line.className = 'line'; tl.prepend(line);
        gsap.to(line, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 70%', scrub: true } });
        $$('li', tl).forEach((li) => gsap.from(li, { x: 30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: li, start: 'top 85%', once: true } }));
      }
    }
  };

  // Partículas
  const Particles = {
    ready: false,
    init() {
      if (!has('tsParticles') || reduce) return;
      safe(() => {
        tsParticles.load('particles', {
          fpsLimit: 40, detectRetina: false,
          particles: { number: { value: coarse ? 35 : 70 }, color: { value: ACCENTS[document.documentElement.dataset.accent] },
            links: { enable: true, distance: 140, opacity: 0.35, color: ACCENTS[document.documentElement.dataset.accent] },
            move: { enable: true, speed: 0.9, outModes: 'bounce' }, size: { value: { min: 1, max: 3 } }, opacity: { value: 0.6 } },
          interactivity: { events: { onHover: { enable: !coarse, mode: 'grab' } }, modes: { grab: { distance: 160, links: { opacity: 0.7 } } } }
        }).then(() => { this.ready = true; this.recolor(); });
      });
    },
    recolor() {
      if (!this.ready) return;
      safe(() => {
        const c = ACCENTS[document.documentElement.dataset.accent];
        const p = tsParticles.domItem(0); if (!p) return;
        p.options.particles.color.value = c; p.options.particles.links.color = c;
        p.refresh();
      });
    }
  };

  // Cursor y botones magnéticos
  const Pointer = {
    init() {
      if (coarse || reduce || !has('gsap')) return;
      const cur = $('.cursor');
      const x = gsap.quickTo(cur, 'x', { duration: 0.2 }), y = gsap.quickTo(cur, 'y', { duration: 0.2 });
      addEventListener('pointermove', (e) => { gsap.set(cur, { opacity: 1 }); x(e.clientX - 7); y(e.clientY - 7); }, { passive: true });
      $$('.mag').forEach((b) => {
        b.addEventListener('pointermove', (e) => {
          const r = b.getBoundingClientRect();
          gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.3 });
        });
        b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,.4)' }));
      });
    }
  };

  // Tilt 3D
  const Tilt = {
    init() {
      if (coarse || reduce || !has('VanillaTilt')) return;
      safe(() => VanillaTilt.init($$('.tilt, .proj, .proj-lite'), { max: 6, speed: 500, glare: true, 'max-glare': 0.18, scale: 1.01 }));
    }
  };

  // Reacción en cadena en tarjetas
  const Cards = {
    init() {
      const cards = $$('.card');
      const group = (c) => $$('.card', c.parentElement).filter((n) => !n.hidden);
      cards.forEach((c) => {
        const on = () => {
          c.classList.add('hot');
          group(c).forEach((n) => n !== c && n.classList.add('dim'));
          if (has('gsap') && !reduce) {
            gsap.fromTo($$('.tags li', c), { y: 0 }, { y: -6, duration: 0.25, stagger: 0.05, yoyo: true, repeat: 1, ease: 'power2.out' });
          }
        };
        const off = () => { c.classList.remove('hot'); group(c).forEach((n) => n.classList.remove('dim')); };
        c.addEventListener('pointermove', (e) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px');
        }, { passive: true });
        c.addEventListener('pointerenter', on); c.addEventListener('pointerleave', off);
        c.addEventListener('focus', on); c.addEventListener('blur', off);
      });
    }
  };

  // Stack con onda de levitación
  const Stack = {
    items: [
      ['devicon-javascript-plain colored', 'JavaScript', 'Lógica y UI interactiva en web (ES6+).'],
      ['devicon-python-plain colored', 'Python', 'Scripts, automatización y análisis.'],
      ['devicon-html5-plain colored', 'HTML5', 'Estructura semántica y accesible.'],
      ['devicon-css3-plain colored', 'CSS3', 'Diseño responsivo y animaciones.'],
      ['devicon-cplusplus-plain colored', 'C / C++', 'Programación de microcontroladores Arduino.'],
      ['devicon-dart-plain colored', 'Dart', 'Lenguaje de las apps móviles con Flutter.'],
      ['devicon-flutter-plain colored', 'Flutter', 'Apps móviles multiplataforma como ALBA.'],
      ['devicon-firebase-plain colored', 'Firebase', 'Autenticación y base de datos en tiempo real.'],
      ['devicon-mysql-plain colored', 'MySQL / SQL', 'Consultas, vistas y optimización.'],
      ['devicon-postgresql-plain colored', 'PostgreSQL', 'Modelado relacional robusto.'],
      ['devicon-arduino-plain colored', 'Arduino', 'Automatización con Uno y Mega, sensores.'],
      ['devicon-git-plain colored', 'Git / GitHub', 'Control de versiones y trabajo en equipo.']
    ],
    init() {
      const ul = $('#stack');
      this.items.forEach(([cls, name, ctx]) => {
        const li = document.createElement('li'); li.tabIndex = 0; li.setAttribute('aria-label', `${name}: ${ctx}`);
        li.innerHTML = `<i class="${cls}" aria-hidden="true"></i><span class="tip" role="tooltip"><b>${name}</b><br>${ctx}</span>`;
        ul.append(li);
      });
      if (!has('gsap') || reduce) return;
      const lis = $$('li', ul);
      const wave = (i) => lis.forEach((el, j) => {
        const d = Math.abs(i - j); if (d > 3) return;
        gsap.to(el, { y: -16 / (d + 1), duration: 0.35, delay: d * 0.06, ease: 'power2.out', overwrite: true });
      });
      const rest = () => gsap.to(lis, { y: 0, duration: 0.5, stagger: 0.03, overwrite: true });
      lis.forEach((li, i) => { li.addEventListener('pointerenter', () => wave(i)); li.addEventListener('focus', () => wave(i)); li.addEventListener('blur', rest); });
      ul.addEventListener('pointerleave', rest);
    }
  };

  // Filtros
  const Filters = {
    init() {
      const btns = $$('.f'), cards = $$('#grid .proj');
      btns.forEach((b) => b.addEventListener('click', () => {
        btns.forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
        const f = b.dataset.f;
        cards.forEach((c) => {
          const show = f === 'all' || c.dataset.cat === f;
          if (!has('gsap') || reduce) { c.hidden = !show; return; }
          if (show) { c.hidden = false; gsap.fromTo(c, { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, clearProps: 'transform' }); }
          else gsap.to(c, { opacity: 0, scale: 0.96, duration: 0.25, onComplete: () => { c.hidden = true; } });
        });
      }));
    }
  };

  // Modal
  const Modal = {
    init() {
      const dlg = $('#modal'); let last = null;
      const open = (c) => {
        last = c; const img = $('img', c);
        $('#m-img').src = img.src; $('#m-img').alt = img.alt;
        $('#m-meta').textContent = $('.meta', c).textContent; $('#m-title').textContent = $('h3', c).textContent;
        $('#m-desc').textContent = $('p:not(.meta)', c).textContent; $('#m-tags').innerHTML = $('.tags', c).innerHTML;
        if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
      };
      $$('.proj').forEach((c) => {
        c.addEventListener('click', () => open(c));
        c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(c); } });
      });
      const close = () => { dlg.close ? dlg.close() : dlg.removeAttribute('open'); last && last.focus(); };
      $('.close', dlg).addEventListener('click', close);
      dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
      addEventListener('keydown', (e) => { if (e.key === 'Escape' && dlg.hasAttribute('open')) close(); });
    }
  };

  // Menú móvil y Typed
  const Nav = {
    init() {
      const b = $('.burger'), m = $('#menu');
      b.addEventListener('click', () => { const o = m.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
      $$('a', m).forEach((a) => a.addEventListener('click', () => { m.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }));
      if (has('Typed') && !reduce) safe(() => new Typed('#typed', { strings: ['Flutter y Firebase', 'Bases de datos SQL', 'Arduino y electrónica', 'Automatización con n8n'], typeSpeed: 50, backSpeed: 25, backDelay: 1600, loop: true }));
      else $('#typed').textContent = 'Flutter, SQL y Arduino';
    }
  };

  const boot = () => {
    [Images, Theme, Nav, Stack, Filters, Modal, Cards, Scroll, Reveal, Pointer, Tilt, Particles].forEach((m) => safe(() => m.init()));
  };
  addEventListener('load', boot);
})();
