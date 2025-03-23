document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar todos los enlaces que apuntan a secciones
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Hacemos el scroll más lento y exagerado
        const duration = 2000; // 2 segundos
        const start = window.pageYOffset;
        const distance = offsetPosition - start;
        let startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, start, distance, duration);
          window.scrollTo(0, run);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }

        // Función de easing para hacer el movimiento más suave
        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      }
    });
  });
});
