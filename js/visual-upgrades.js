document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Galería automática de Nuestra esencia.
  document.querySelectorAll(".essence-slideshow").forEach((gallery) => {
    const slides = [...gallery.querySelectorAll(".slide")];
    const dots = [...gallery.querySelectorAll(".slide-dots span")];
    if (slides.length < 2) return;
    let current = slides.findIndex((slide) => slide.classList.contains("active"));
    if (current < 0) current = 0;
    window.setInterval(() => {
      slides[current].classList.remove("active");
      if (dots[current]) dots[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
      if (dots[current]) dots[current].classList.add("active");
    }, 4600);
  });

  // Animaciones de entrada al desplazarse por la página.
  const revealTargets = document.querySelectorAll(
    ".essence-story, .essence-vision, .essence-value, .mutaura-note, .essence-contact-content, .essence-socials"
  );
  revealTargets.forEach((element, index) => {
    element.classList.add("js-reveal");
    if (element.classList.contains("essence-value")) {
      element.style.transitionDelay = `${(index % 4) * 90}ms`;
    }
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }
});
