// Touch optimizado
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('touchstart', function() {
    this.classList.add('touch-effect');
  });
  
  card.addEventListener('touchend', function() {
    this.classList.remove('touch-effect');
  });
});

// Swipe para carrusel (opcional)
let touchStartX = 0;
const carousel = document.querySelector('.carousel-content');

carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) {
    // Swipe izquierda
    carousel.scrollBy({ left: 200, behavior: 'smooth' });
  } else if (touchEndX - touchStartX > 50) {
    // Swipe derecha
    carousel.scrollBy({ left: -200, behavior: 'smooth' });
  }
});