document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".banner-slide");
  let current = 0;
  let timer;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startAuto() {
    timer = setInterval(nextSlide, 3500);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  showSlide(current);
  startAuto();
});
