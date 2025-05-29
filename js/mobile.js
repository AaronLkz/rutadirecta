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

    // Crear botón flotante de WhatsApp
    const whatsappBtn = document.createElement("a");
    whatsappBtn.href =
      "https://wa.me/521234567890?text=¡Hola!%20Quiero%20hacer%20un%20pedido";
    whatsappBtn.className = "whatsapp-float";
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappBtn);
  }
});
