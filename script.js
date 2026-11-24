/**
 * EDGAR SÁNCHEZ — PORTAFOLIO INMERSIVO
 * script.js · v3.0 — Arquitectura modular ES2022+
 * ─────────────────────────────────────────────────
 * Módulos:
 *  1. i18n (ES / EN)
 *  2. Ambient Canvas (partículas WebGL-free)
 *  3. Cursor magnético
 *  4. Header scroll / nav
 *  5. Scroll progress
 *  6. Lenis smooth scroll
 *  7. GSAP + ScrollTrigger reveals
 *  8. Typed.js roles
 *  9. Vanilla Tilt 3D
 * 10. Project filters
 * 11. Project modal
 * 12. Spotlight cards
 * 13. Theme toggle (dark/light)
 * 14. Accent palette
 * 15. Language toggle
 * 16. Timeline fill
 * 17. Magnetic buttons
 * 18. Active nav highlight
 */

'use strict';

/* ═══════════════════════════════════════════════════
   1. i18n — TRADUCCIONES
═══════════════════════════════════════════════════ */
const TRANSLATIONS = {
  es: {
    'nav.about':       'Sobre mí',
    'nav.experience':  'Experiencia',
    'nav.projects':    'Proyectos',
    'nav.education':   'Formación',
    'nav.skills':      'Habilidades',
    'nav.cv':          'CV',
    'nav.contact':     'Contacto',

    'hero.available':       'Disponible',
    'hero.role':            'Técnico en Desarrollo de Software',
    'hero.stat.projects':   'Proyectos',
    'hero.stat.techs':      'Tecnologías',
    'hero.stat.team':       'Equipo activo',
    'hero.subtitle':        'Técnico en Desarrollo de Software y Electrónica Industrial',
    'hero.focus':           'Enfoque:',
    'hero.desc':            'Profesional organizado y proactivo, con alta capacidad para el trabajo en equipo, la toma rápida de decisiones y el desempeño bajo presión. Especializado en desarrollo web y móvil, bases de datos relacionales, Git/GitHub, automatización con Arduino y soporte técnico.',
    'hero.cta.experience':  'Ver experiencia',
    'hero.cta.cv':          'Descargar CV',
    'hero.scroll':          'Explorar',

    'about.eyebrow': 'Perfil',
    'about.title':   'Sobre mí',
    'about.text':    'Mi interés por la tecnología comenzó a los 12 años, cuando recibí mi primera computadora. Desde entonces exploro la programación y el diseño de software para crear soluciones. Fuera del ámbito tecnológico disfruto buscar soluciones a problemas matemáticos, compartir con familiares y amigos, y participar en actividades deportivas y retóricas.',

    'experience.eyebrow': 'Trayectoria',
    'experience.title':   'Experiencia laboral',
    'experience.sub':     'Colaborando en productos de software reales con impacto.',

    'exp.role':   'Desarrollador Backend · Proyecto ALBA',
    'exp.status': 'En curso',
    'exp.desc':   'Participo en el diseño y desarrollo móvil de ALBA, una plataforma de salud y adherencia farmacológica geriátrica dirigida a adultos mayores, cuidadores y personal médico. Trabajo con Flutter/Dart y Firebase bajo arquitectura limpia, en un equipo de 12 desarrolladores con flujo ágil.',
    'exp.b1': 'Implementación de manejo de estado con Provider, recordatorios dinámicos y QR para vincular roles.',
    'exp.b2': 'Colaboración en servicios en segundo plano para detectar caídas con giroscopio y acelerómetro.',
    'exp.b3': 'Aplicación de criterios de accesibilidad WCAG AAA para una solución de alto impacto social.',

    'projects.eyebrow': 'Trabajo aplicado',
    'projects.title':   'Proyectos destacados',
    'projects.sub':     'Software, electrónica y automatización para resolver necesidades reales.',

    'filter.all':        'Todos',
    'filter.software':   'Software & Web',
    'filter.hardware':   'Electrónica & IoT',
    'filter.automation': 'Automatización',

    'p01.badge': 'En curso',
    'p01.title': 'ALBA · Salud y adherencia farmacológica',
    'p01.desc':  'App móvil para adultos mayores, cuidadores y personal médico con recordatorios y detección de caídas.',
    'p02.badge': 'Junior Dev · Líder',
    'p02.title': 'Sistema de gestión de inventario',
    'p02.desc':  'Aplicación de control de inventario con consultas SQL optimizadas y lógica cliente-servidor.',
    'p03.badge': 'Líder técnico',
    'p03.title': 'Microcontroladores y sensores',
    'p03.desc':  'Programación de Arduino Uno y Mega, diseño y simulación en Proteus con instrumentación de sensores.',
    'p04.badge': 'Web dev',
    'p04.title': 'Sitio web para empresa local',
    'p04.desc':  'Sitio web responsivo para empresa de consultoría con sección de servicios de gestión de inventarios.',
    'p05.badge': 'Automatización',
    'p05.title': 'Bot de Telegram con n8n',
    'p05.desc':  'Bot de Telegram conectado a flujos n8n para responder mensajes y automatizar tareas en tiempo real.',
    'p06.badge': 'Software',
    'p06.title': 'Sistema de control de parqueo',
    'p06.desc':  'Registro de vehículos con nombre, tipo y placa para control de entradas y consulta de historial.',

    'education.eyebrow': 'Aprendizaje',
    'education.title':   'Formación académica y técnica',
    'edu1.title': 'Técnico en Desarrollo de Software',
    'edu1.desc':  'Formación práctica e intensiva en arquitectura de software, bases de datos, desarrollo frontend y backend, y metodologías colaborativas con Git/GitHub.',
    'edu2.when':  'Villa de los Niños · 2023–2025',
    'edu2.title': 'Bachillerato con Orientación en Electrónica Industrial',
    'edu2.desc':  'Diseño de circuitos, instrumentación de sensores, simulación en Proteus y programación de microcontroladores.',
    'edu3.title': 'Certificación en Climatización y Mantenimiento',
    'edu3.desc':  'Diagnóstico, instalación y mantenimiento preventivo/correctivo de equipos de aire acondicionado.',

    'skills.eyebrow': 'Lo que aporto',
    'skills.title':   'Habilidades técnicas y adaptativas',
    'sk1.title': 'Lenguajes de programación',
    'sk2.title': 'Bases de datos relacionales',
    'sk3.title': 'Herramientas y entornos IT',
    'sk4.title': 'Soporte y hardware',
    'sk4.desc':  'Diagnóstico de equipos, mantenimiento preventivo y correctivo, sistemas de climatización.',
    'stack.title': 'Mi stack tecnológico',
    'stack.sub':   'Lenguajes, plataformas y herramientas que uso en mis proyectos.',
    'soft.title': 'Habilidades adaptativas',
    'soft.1': 'Toma de decisiones rápida y acertada.',
    'soft.2': 'Tolerancia al trabajo bajo presión y resolución de problemas.',
    'soft.3': 'Aprendizaje continuo y adaptación tecnológica.',
    'soft.4': 'Proactividad, organización y buenas relaciones interpersonales.',

    'languages.eyebrow': 'Lingüística',
    'languages.title':   'Idiomas',
    'lang.es':       'Español',
    'lang.es.level': 'Nativo',
    'lang.en':       'Inglés',
    'lang.en.level': 'Intermedio',

    'pillars.eyebrow': 'Mi forma de aportar',
    'pillars.title':   'Un perfil que conecta software y electrónica',
    'pillar1.title':   'Software con propósito',
    'pillar1.desc':    'Desarrollo experiencias web y móviles claras y accesibles, como la plataforma ALBA para adultos mayores.',
    'pillar2.title':   'Visión entre sistemas',
    'pillar2.desc':    'Mi formación dual me permite trabajar con aplicaciones, datos, circuitos, microcontroladores y sensores.',
    'pillar3.title':   'Aprendizaje y colaboración',
    'pillar3.desc':    'Disfruto aprender tecnologías nuevas y resolver problemas desde distintas perspectivas en equipo.',

    'cv.eyebrow': 'Descarga',
    'cv.title':   'Mi currículum',
    'cv.desc':    'Descarga mi CV en PDF para conocer más sobre mi experiencia, formación y habilidades.',
    'cv.btn':     'Descargar CV en PDF',

    'contact.eyebrow': 'Conversemos',
    'contact.title':   '¿Trabajamos juntos?',
    'contact.sub':     'Estoy listo para aportar soluciones de software y tecnología a nuevos retos.',

    'modal.highlights': 'Aspectos clave:',
    'palette.title': 'Acento',
    'footer.back': 'Inicio',

    'typed.1': 'Desarrollo Web y Móvil (Flutter / JS)',
    'typed.2': 'Bases de Datos (MySQL / PostgreSQL)',
    'typed.3': 'Electrónica Industrial y Arduino',
    'typed.4': 'Automatización de Flujos con n8n',
    'typed.5': 'Arquitectura Limpia · Git · GitHub',
  },
  en: {
    'nav.about':       'About',
    'nav.experience':  'Experience',
    'nav.projects':    'Projects',
    'nav.education':   'Education',
    'nav.skills':      'Skills',
    'nav.cv':          'CV',
    'nav.contact':     'Contact',

    'hero.available':       'Available',
    'hero.role':            'Software Development Technician',
    'hero.stat.projects':   'Projects',
    'hero.stat.techs':      'Technologies',
    'hero.stat.team':       'Active team',
    'hero.subtitle':        'Software Development & Industrial Electronics Technician',
    'hero.focus':           'Focus:',
    'hero.desc':            'Organized and proactive professional with strong capacity for teamwork, quick decision-making, and performance under pressure. Specialized in web and mobile development, relational databases, Git/GitHub, Arduino automation, and technical support.',
    'hero.cta.experience':  'See experience',
    'hero.cta.cv':          'Download CV',
    'hero.scroll':          'Explore',

    'about.eyebrow': 'Profile',
    'about.title':   'About me',
    'about.text':    'My interest in technology started at age 12 when I received my first computer. Since then I have been exploring programming and software design to build real solutions. Outside the tech world I enjoy solving math puzzles, spending time with family and friends, and participating in sports and debate activities.',

    'experience.eyebrow': 'Track record',
    'experience.title':   'Work experience',
    'experience.sub':     'Collaborating on real software products with meaningful impact.',

    'exp.role':   'Backend Developer · Project ALBA',
    'exp.status': 'In progress',
    'exp.desc':   'I participate in the design and mobile development of ALBA, a geriatric health and pharmacological adherence platform for elderly patients, caregivers and medical staff, using Flutter/Dart and Firebase with clean architecture in a 12-developer agile team.',
    'exp.b1': 'State management with Provider, dynamic reminders, and QR code role-linking.',
    'exp.b2': 'Background services using gyroscope and accelerometer for fall detection.',
    'exp.b3': 'WCAG AAA accessibility standards applied to a high social-impact solution.',

    'projects.eyebrow': 'Applied work',
    'projects.title':   'Featured projects',
    'projects.sub':     'Software, electronics and automation to solve real-world needs.',

    'filter.all':        'All',
    'filter.software':   'Software & Web',
    'filter.hardware':   'Electronics & IoT',
    'filter.automation': 'Automation',

    'p01.badge': 'In progress',
    'p01.title': 'ALBA · Health & Pharmacological Adherence',
    'p01.desc':  'Mobile app for elderly patients, caregivers and medical staff with reminders and fall detection.',
    'p02.badge': 'Junior Dev · Project lead',
    'p02.title': 'Inventory management system',
    'p02.desc':  'Inventory control app with optimized SQL queries and client-server logic.',
    'p03.badge': 'Technical lead',
    'p03.title': 'Microcontrollers & sensors',
    'p03.desc':  'Arduino Uno & Mega programming, Proteus simulation and sensor instrumentation.',
    'p04.badge': 'Web dev',
    'p04.title': 'Website for local business',
    'p04.desc':  'Responsive website for a consulting company showcasing inventory management services.',
    'p05.badge': 'Automation',
    'p05.title': 'Telegram bot with n8n',
    'p05.desc':  'Telegram bot connected to n8n flows for real-time message responses and task automation.',
    'p06.badge': 'Software',
    'p06.title': 'Parking control system',
    'p06.desc':  'Vehicle registration system with name, type and plate for entry control and history queries.',

    'education.eyebrow': 'Learning path',
    'education.title':   'Academic & technical training',
    'edu1.title': 'Software Development Technician',
    'edu1.desc':  'Intensive hands-on training in software architecture, databases, frontend & backend development, and collaborative Git/GitHub workflows.',
    'edu2.when':  'Villa de los Niños · 2023–2025',
    'edu2.title': 'Science Baccalaureate — Industrial Electronics',
    'edu2.desc':  'Circuit design, sensor instrumentation, Proteus simulation, and microcontroller programming.',
    'edu3.title': 'HVAC & Maintenance Certification',
    'edu3.desc':  'Diagnosis, installation, and preventive/corrective maintenance of air conditioning systems.',

    'skills.eyebrow': 'What I bring',
    'skills.title':   'Technical & adaptive skills',
    'sk1.title': 'Programming languages',
    'sk2.title': 'Relational databases',
    'sk3.title': 'Tools & IT environments',
    'sk4.title': 'Hardware & support',
    'sk4.desc':  'Equipment diagnostics, preventive and corrective maintenance, and HVAC systems.',
    'stack.title': 'My tech stack',
    'stack.sub':   'Languages, platforms, and tools I use across my projects.',
    'soft.title': 'Adaptive skills',
    'soft.1': 'Fast and accurate decision-making.',
    'soft.2': 'Resilience under pressure and problem-solving.',
    'soft.3': 'Continuous learning and technology adaptation.',
    'soft.4': 'Proactivity, organization, and strong interpersonal relationships.',

    'languages.eyebrow': 'Linguistics',
    'languages.title':   'Languages',
    'lang.es':       'Spanish',
    'lang.es.level': 'Native',
    'lang.en':       'English',
    'lang.en.level': 'Intermediate',

    'pillars.eyebrow': 'How I contribute',
    'pillars.title':   'A profile bridging software and electronics',
    'pillar1.title':   'Purposeful software',
    'pillar1.desc':    'I build clear, accessible web and mobile experiences — like the ALBA platform for elderly patients.',
    'pillar2.title':   'Cross-system thinking',
    'pillar2.desc':    'My dual background lets me work with applications, databases, circuits, microcontrollers, and sensors.',
    'pillar3.title':   'Learning & collaboration',
    'pillar3.desc':    'I enjoy picking up new technologies and tackling problems from multiple angles within a team.',

    'cv.eyebrow': 'Download',
    'cv.title':   'My résumé',
    'cv.desc':    'Download my CV in PDF to learn more about my experience, training, and skills.',
    'cv.btn':     'Download CV (PDF)',

    'contact.eyebrow': "Let's talk",
    'contact.title':   'Work together?',
    'contact.sub':     "I'm ready to bring software and technology solutions to new challenges.",

    'modal.highlights': 'Key highlights:',
    'palette.title': 'Accent',
    'footer.back': 'Top',

    'typed.1': 'Web & Mobile Dev (Flutter / JS)',
    'typed.2': 'Databases (MySQL / PostgreSQL)',
    'typed.3': 'Industrial Electronics & Arduino',
    'typed.4': 'Flow Automation with n8n',
    'typed.5': 'Clean Architecture · Git · GitHub',
  }
};

/* ═══════════════════════════════════════════════════
   PROJECT DATA
═══════════════════════════════════════════════════ */
const PROJECTS = [
  {
    num:'01',
    badge:{ es:'Proyecto en curso',       en:'In progress' },
    title:{ es:'ALBA · Salud y adherencia farmacológica', en:'ALBA · Health & Pharmacological Adherence' },
    desc :{ es:'Aplicación móvil para adultos mayores, cuidadores y personal médico con recordatorios, vinculación por QR y detección de caídas.',
            en:'Mobile app for elderly patients, caregivers and medical staff with reminders, QR linking and fall detection.' },
    bullets:{
      es:['Arquitectura limpia en Flutter/Dart con gestión de estado mediante Provider.',
          'Vinculación segura entre roles mediante tokens y lectura de QR.',
          'Servicios en segundo plano con giroscopio y acelerómetro para detección de caídas.',
          'Diseño centrado en accesibilidad WCAG AAA.'],
      en:['Clean architecture in Flutter/Dart with Provider state management.',
          'Secure role-linking via tokens and QR code scanning.',
          'Background services using gyroscope and accelerometer for fall detection.',
          'WCAG AAA accessibility-first design.']
    },
    tags:['Flutter','Dart','Firebase','Provider','Git']
  },
  {
    num:'02',
    badge:{ es:'Junior Dev · Líder', en:'Junior Dev · Project lead' },
    title:{ es:'Sistema de gestión de inventario y tienda', en:'Inventory & store management system' },
    desc :{ es:'Control de inventario con SQL optimizado y lógica cliente-servidor.', en:'Inventory control with optimized SQL and client-server logic.' },
    bullets:{
      es:['Modelado relacional con integridad referencial para productos y transacciones.',
          'Optimización de consultas SQL y vistas estructuradas.',
          'Control de versiones con Git y GitHub.'],
      en:['Relational modeling with referential integrity for products and transactions.',
          'Optimized SQL queries and structured views.',
          'Version control with Git and GitHub.']
    },
    tags:['SQL','GitHub','Inventario','Cliente-Servidor']
  },
  {
    num:'03',
    badge:{ es:'Líder técnico', en:'Technical lead' },
    title:{ es:'Microcontroladores y sensores', en:'Microcontrollers & sensors' },
    desc :{ es:'Arduino Uno/Mega, simulación en Proteus e instrumentación de sensores.',
            en:'Arduino Uno/Mega, Proteus simulation and sensor instrumentation.' },
    bullets:{
      es:['Simulación eléctrica en Proteus previo a implementación física.',
          'Programación en C/C++ para sensores y actuadores.',
          'Diagnóstico y soporte técnico en sistemas automatizados.'],
      en:['Electrical simulation in Proteus before physical build.',
          'C/C++ programming for sensors and actuators.',
          'Diagnostics and technical support for automated systems.']
    },
    tags:['Arduino','Proteus','C/C++','Sensores']
  },
  {
    num:'04',
    badge:{ es:'Desarrollo web', en:'Web development' },
    title:{ es:'Sitio web para empresa local', en:'Website for local business' },
    desc :{ es:'Sitio responsivo para empresa de consultoría de inventarios.', en:'Responsive website for an inventory consulting firm.' },
    bullets:{
      es:['Maquetación semántica con HTML5 y estilos adaptables con CSS3.',
          'Optimización para móviles, tablets y escritorio.',
          'Presentación clara de servicios para captación de clientes.'],
      en:['Semantic layout with HTML5 and adaptive styles with CSS3.',
          'Optimized for mobile, tablet, and desktop.',
          'Clear service presentation for client acquisition.']
    },
    tags:['HTML5','CSS3','Responsivo']
  },
  {
    num:'05',
    badge:{ es:'Automatización', en:'Automation' },
    title:{ es:'Bot de Telegram con n8n', en:'Telegram bot with n8n' },
    desc :{ es:'Bot conectado a flujos n8n para automatizar tareas en tiempo real.', en:'Bot connected to n8n flows for real-time task automation.' },
    bullets:{
      es:['Orquestación de webhooks y nodos condicionales en n8n.',
          'Procesamiento automatizado de comandos vía Telegram Bot API.',
          'Reducción de tareas manuales mediante flujos integrados.'],
      en:['Webhook and conditional node orchestration in n8n.',
          'Automated command processing via Telegram Bot API.',
          'Manual task reduction through integrated flows.']
    },
    tags:['n8n','Telegram','Automatización','Webhooks']
  },
  {
    num:'06',
    badge:{ es:'Desarrollo de software', en:'Software development' },
    title:{ es:'Sistema de control de parqueo', en:'Parking control system' },
    desc :{ es:'Registro de vehículos con nombre, tipo y placa para control de entradas.', en:'Vehicle registration with name, type and plate for entry control.' },
    bullets:{
      es:['Registro estructurado de conductores y clasificación vehicular.',
          'Consultas rápidas de historial y disponibilidad.',
          'Validación de datos para evitar duplicidades.'],
      en:['Structured driver registry and vehicle classification.',
          'Fast history and availability queries.',
          'Data validation to prevent duplicates.']
    },
    tags:['Registros','Vehículos','Consultas']
  }
];

/* ═══════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const PM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOUCH = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ── State ─────────────────────────────────── */
  let lang  = localStorage.getItem('es-portfolio-lang')  || 'es';
  let theme = localStorage.getItem('es-portfolio-theme') || 'dark';
  let accent= localStorage.getItem('es-portfolio-accent')|| 'blue';
  let typedInstance = null;

  /* ═══════════════════════════════════════════
     i18n
  ══════════════════════════════════════════ */
  const t = (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.es[key] ?? key;

  const applyLang = () => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.getElementById('langLabel').textContent = lang === 'es' ? 'EN' : 'ES';
    // Reinit typed with new strings
    if (typedInstance) { typedInstance.destroy(); initTyped(); }
  };

  const toggleLang = () => {
    lang = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('es-portfolio-lang', lang);
    applyLang();
  };

  document.getElementById('langToggle')?.addEventListener('click', toggleLang);

  /* ═══════════════════════════════════════════
     THEME
  ══════════════════════════════════════════ */
  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('es-portfolio-theme', theme);
  };

  const toggleTheme = () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme();
  };

  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
  applyTheme();

  /* ═══════════════════════════════════════════
     ACCENT PALETTE
  ══════════════════════════════════════════ */
  const applyAccent = (a) => {
    accent = a;
    document.documentElement.setAttribute('data-accent', a);
    localStorage.setItem('es-portfolio-accent', a);
    document.querySelectorAll('.swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.accent === a);
    });
  };

  const paletteToggle = document.getElementById('paletteToggle');
  const palettePanel  = document.getElementById('palettePanel');

  paletteToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = palettePanel.classList.toggle('open');
    palettePanel.setAttribute('aria-hidden', String(!open));
  });

  document.querySelectorAll('.swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      applyAccent(sw.dataset.accent);
    });
  });

  document.addEventListener('click', (e) => {
    if (!document.getElementById('paletteWrapper')?.contains(e.target)) {
      palettePanel?.classList.remove('open');
      palettePanel?.setAttribute('aria-hidden', 'true');
    }
  });

  applyAccent(accent);

  /* ═══════════════════════════════════════════
     AMBIENT CANVAS
  ══════════════════════════════════════════ */
  const initCanvas = () => {
    const canvas = document.getElementById('ambientCanvas');
    if (!canvas || PM) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive:true });

    // Parse accent color from CSS variable
    const getAccentRgb = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--ac-rgb').trim();
      return v ? v.split(',').map(n => parseInt(n)) : [56,189,248];
    };

    const PARTICLE_COUNT = TOUCH ? 40 : 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 2 + 1,
      a:  Math.random()
    }));

    let mouseX = -9999, mouseY = -9999;
    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; }, { passive:true });

    let raf;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const [r,g,b] = getAccentRgb();
      const W = canvas.width, H = canvas.height;

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Mouse repel
        const dx = p.x - mouseX, dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Damping
        p.vx *= 0.99; p.vy *= 0.99;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.4 * p.a})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.18 * (1 - d/130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
    };
    draw();
  };
  initCanvas();

  /* ═══════════════════════════════════════════
     SCROLL PROGRESS
  ══════════════════════════════════════════ */
  const progressBar = document.getElementById('scrollProgress');
  const header      = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const top = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${(top / max) * 100}%`;
    if (header) header.classList.toggle('scrolled', top > 50);
  }, { passive: true });

  /* ═══════════════════════════════════════════
     LENIS SMOOTH SCROLL
  ══════════════════════════════════════════ */
  let lenis = null;
  if (!PM && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenis.on('scroll', () => typeof ScrollTrigger !== 'undefined' && ScrollTrigger.update());
    if (typeof gsap !== 'undefined') {
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      navLinks?.classList.remove('open');
      burgerBtn?.classList.remove('open');
      burgerBtn?.setAttribute('aria-expanded','false');
      lenis ? lenis.scrollTo(target, { offset:-72 }) : target.scrollIntoView({ behavior:'smooth' });
    });
  });

  /* ═══════════════════════════════════════════
     MOBILE NAV
  ══════════════════════════════════════════ */
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks  = document.getElementById('navLinks');

  burgerBtn?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burgerBtn.classList.toggle('open', open);
    burgerBtn.setAttribute('aria-expanded', String(open));
  });

  /* ═══════════════════════════════════════════
     CUSTOM CURSOR
  ══════════════════════════════════════════ */
  if (!TOUCH && !PM) {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.left = `${mx}px`; dot.style.top = `${my}px`; }
    });

    const animateCursor = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring) { ring.style.left = `${rx}px`; ring.style.top = `${ry}px`; }
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.querySelectorAll('a,button,select,.proj-card,.stack-item').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ═══════════════════════════════════════════
     MAGNETIC BUTTONS
  ══════════════════════════════════════════ */
  if (!TOUCH && !PM) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top  - r.height/2;
        btn.style.transform = `translate(${x*.22}px,${y*.22}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ═══════════════════════════════════════════
     BTN RIPPLE (mouse pos)
  ══════════════════════════════════════════ */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--bx', `${e.clientX - r.left}px`);
      btn.style.setProperty('--by', `${e.clientY - r.top}px`);
    });
  });

  /* ═══════════════════════════════════════════
     SPOTLIGHT CARDS
  ══════════════════════════════════════════ */
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ═══════════════════════════════════════════
     VANILLA TILT
  ══════════════════════════════════════════ */
  if (!TOUCH && !PM && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 7, speed: 400, glare: true, 'max-glare': 0.12
    });
  }

  /* ═══════════════════════════════════════════
     TYPED.JS
  ══════════════════════════════════════════ */
  const initTyped = () => {
    const el = document.getElementById('typedEl');
    if (!el || typeof Typed === 'undefined') return;
    typedInstance = new Typed('#typedEl', {
      strings: [t('typed.1'), t('typed.2'), t('typed.3'), t('typed.4'), t('typed.5')],
      typeSpeed: 44,
      backSpeed: 26,
      backDelay: 2000,
      loop: true,
      cursorChar: '|'
    });
  };
  initTyped();

  /* ═══════════════════════════════════════════
     GSAP + ScrollTrigger REVEALS
  ══════════════════════════════════════════ */
  if (!PM && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.from('.hero-reveal-left', {
      x:-50, opacity:0, duration:1, ease:'power3.out', delay:.15
    });
    gsap.from('.hero-reveal-right > *', {
      y:28, opacity:0, duration:.85, ease:'power3.out', stagger:.08, delay:.25
    });

    // Generic fade-up
    gsap.utils.toArray('.reveal-up').forEach(el => {
      gsap.from(el, {
        y:36, opacity:0, duration:.75, ease:'power2.out',
        scrollTrigger:{ trigger:el, start:'top 87%', once:true }
      });
    });

    // Stagger cards
    const staggerGroups = ['.projects-grid', '.skills-grid', '.pillars-grid'];
    staggerGroups.forEach(sel => {
      const grid = document.querySelector(sel);
      if (!grid) return;
      gsap.from(grid.querySelectorAll('.reveal-stagger'), {
        y:30, opacity:0, duration:.65, ease:'power2.out', stagger:.1,
        scrollTrigger:{ trigger:grid, start:'top 86%', once:true }
      });
    });

    // Timeline items
    gsap.utils.toArray('.reveal-tl').forEach((item, i) => {
      gsap.from(item, {
        x:28, opacity:0, duration:.7, ease:'power2.out',
        scrollTrigger:{ trigger:item, start:'top 85%', once:true },
        delay: i * .08
      });
    });

    // Active nav based on section in view
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    sections.forEach(sec => {
      ScrollTrigger.create({
        trigger:sec,
        start:'top center',
        end:'bottom center',
        onEnter:() => setActiveNav(sec.id),
        onEnterBack:() => setActiveNav(sec.id)
      });
    });
    const setActiveNav = id => {
      navItems.forEach(a => {
        const href = a.getAttribute('href').replace('#','');
        a.classList.toggle('active', href === id);
      });
    };
  }

  /* ═══════════════════════════════════════════
     TIMELINE FILL (scroll-driven)
  ══════════════════════════════════════════ */
  const timelineFill    = document.getElementById('timelineFill');
  const timelineWrapper = document.querySelector('.timeline');
  if (timelineFill && timelineWrapper && !PM && typeof gsap !== 'undefined') {
    gsap.to(timelineFill, {
      height:'100%', ease:'none',
      scrollTrigger:{
        trigger:timelineWrapper,
        start:'top 72%', end:'bottom 55%',
        scrub:.4
      }
    });
  }

  /* ═══════════════════════════════════════════
     PROJECT FILTERS
  ══════════════════════════════════════════ */
  const filters  = document.querySelectorAll('.filter');
  const projCards= document.querySelectorAll('.proj-card');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      const cat = btn.dataset.filter;

      projCards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.classList.toggle('hidden-proj', !match);
        if (match && !PM && typeof gsap !== 'undefined') {
          gsap.fromTo(card,
            { opacity:0, y:16, scale:.97 },
            { opacity:1, y:0, scale:1, duration:.35, ease:'power2.out' }
          );
        }
      });
      typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh();
    });
  });

  /* ═══════════════════════════════════════════
     PROJECT MODAL
  ══════════════════════════════════════════ */
  const modal      = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');

  const openModal = idx => {
    const p = PROJECTS[idx];
    if (!p || !modal) return;
    document.getElementById('mNum').textContent   = p.num;
    document.getElementById('mBadge').textContent = p.badge[lang];
    document.getElementById('modalTitle').textContent = p.title[lang];
    document.getElementById('mDesc').textContent  = p.desc[lang];
    document.getElementById('mBullets').innerHTML = p.bullets[lang].map(b => `<li>${b}</li>`).join('');
    document.getElementById('mTags').innerHTML    = p.tags.map(tg => `<li class="tag">${tg}</li>`).join('');
    document.querySelector('.modal-highlights h4').textContent = t('modal.highlights');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.proj-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(Number(btn.dataset.project)));
  });
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });

  /* ═══════════════════════════════════════════
     DYNAMIC YEAR
  ══════════════════════════════════════════ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ═══════════════════════════════════════════
     INIT i18n (must be last to pick up all elements)
  ══════════════════════════════════════════ */
  applyLang();

  /* ═══════════════════════════════════════════
     HERO PARALLAX (subtle, mouse-driven)
  ══════════════════════════════════════════ */
  if (!TOUCH && !PM) {
    const hero = document.querySelector('.hero-section');
    const orbs = hero?.querySelectorAll('.orb');
    window.addEventListener('mousemove', e => {
      const cx = window.innerWidth/2, cy = window.innerHeight/2;
      const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
      orbs?.forEach((orb, i) => {
        const factor = (i + 1) * 12;
        orb.style.transform = `translate(${dx*factor}px,${dy*factor}px)`;
      });
    }, { passive:true });
  }

  /* ═══════════════════════════════════════════
     SECTION OBSERVER (fallback if no GSAP)
  ══════════════════════════════════════════ */
  if (PM || typeof gsap === 'undefined') {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
        }
      });
    }, { threshold:.12 });

    document.querySelectorAll('.reveal-up,.reveal-stagger,.reveal-tl,.hero-reveal-left,.hero-reveal-right').forEach(el => {
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      obs.observe(el);
    });
  }
});
