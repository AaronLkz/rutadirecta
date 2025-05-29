document.addEventListener("DOMContentLoaded", function () {
  // Solo ejecutar en móviles
  if (window.innerWidth <= 768) {
    // Efectos táctiles
    document.querySelectorAll(".mobile-card").forEach((card) => {
      card.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.96)";
        this.style.backgroundColor = "var(--dark)"; // Usa el color oscuro
      });

      card.addEventListener("touchend", function () {
        this.style.transform = "scale(1)";
        this.style.backgroundColor = "var(--light)"; // Vuelve al color original
      });
    });
  }
});
