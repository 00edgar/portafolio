document.addEventListener("DOMContentLoaded", () => {
    // 1. Menú Móvil Desplegable
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const isActive = navLinks.classList.contains("active");
        menuToggle.textContent = isActive ? "Cerrar" : "Menú";
      });
  
      // Cerrar menú al presionar una opción
      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
          menuToggle.textContent = "Menú";
        });
      });
    }
  
    // 2. Animación Scroll Reveal (Remplazo de Reveal.tsx)
    const revealElements = document.querySelectorAll(".reveal");
  
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
  
            // Si el elemento contiene barras de habilidad, anima el progreso
            const progressBar = entry.target.querySelector(".progress-fill");
            if (progressBar) {
              const targetWidth = progressBar.getAttribute("data-value");
              progressBar.style.width = targetWidth;
            }
  
            // Dejar de observar para que se mantenga visible
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Se activa al mostrar el 15% del elemento
      }
    );
  
    revealElements.forEach((el) => revealObserver.observe(el));
  });