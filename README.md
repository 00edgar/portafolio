# Portafolio · Edgar Sánchez

Sitio estático (HTML5, CSS3, JavaScript ES6+) sin paso de compilación, listo para GitHub Pages.

## Archivos
- `index.html`: estructura semántica, SEO, ARIA y librerías por CDN.
- `style.css`: variables CSS con `data-accent`, glassmorphism, spotlight, responsive y `prefers-reduced-motion`.
- `script.js`: controladores modulares (Images, Theme, Scroll/Lenis, Reveal, Particles, Pointer, Tilt, Cards, Stack, Filters, Modal, Nav).

## Librerías (CDN)
GSAP 3.12.5 + ScrollTrigger, Lenis 1.0.42, tsParticles slim 2.12, Vanilla-Tilt 1.8.1, Typed.js 2.1, Devicon 2.15.1, Google Fonts (Space Grotesk, Instrument Serif).

## Despliegue en GitHub Pages
1. Sube los 4 archivos a la raíz del repositorio `portafolio`.
2. En **Settings → Pages**, elige la rama `main` y la carpeta `/ (root)`.
3. Publica en `https://00edgar.github.io/portafolio/`.

## Notas
- Foto y CV se cargan desde `https://00edgar.github.io/portafolio/`; las imágenes externas tienen respaldo SVG.
- El acento elegido se guarda en `localStorage`.
- El cursor personalizado y el Tilt 3D se desactivan con `pointer: coarse`.
