// Solo se ejecuta en móviles
if (window.innerWidth <= 768) {
  // Crear grid de categorías
  const carouselContent = document.querySelector('.carousel-content');
  if (carouselContent) {
    const mobileCategories = document.createElement('div');
    mobileCategories.className = 'mobile-categories';
    mobileCategories.innerHTML = carouselContent.innerHTML;
    carouselContent.parentNode.insertBefore(mobileCategories, carouselContent.nextSibling);
    
    // Convertir las tarjetas para móviles
    document.querySelectorAll('.mobile-categories .category-card').forEach(card => {
      card.className = 'mobile-card';
    });
  }

  // Efectos táctiles
  document.querySelectorAll('.mobile-card').forEach(card => {
    card.addEventListener('touchstart', () => {
      card.style.transform = 'scale(0.96)';
      card.style.backgroundColor = '#f9f9f9';
    });
    
    card.addEventListener('touchend', () => {
      card.style.transform = 'scale(1)';
      card.style.backgroundColor = 'white';
    });
  });

  // Botón flotante de WhatsApp
  const whatsappBtn = document.createElement('a');
  whatsappBtn.href = 'https://wa.me/521234567890?text=¡Hola!%20Quiero%20hacer%20un%20pedido';
  whatsappBtn.className = 'whatsapp-float';
  whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
  document.body.appendChild(whatsappBtn);
}