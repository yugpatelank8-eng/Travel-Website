document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          const icon = menuToggle.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  const sliderTrack = document.querySelector(".slider-track");
  const slides = Array.from(sliderTrack.children);
  const nextButton = document.getElementById("sliderNextBtn");
  const prevButton = document.getElementById("sliderPrevBtn");
  let currentIndex = 0;

  function goToSlide(index) {
    sliderTrack.style.transform = "translateX(-" + index * 100 + "vw)";
    currentIndex = index;
  }

  if (nextButton && prevButton && slides.length > 0) {
    nextButton.addEventListener("click", () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    });

    prevButton.addEventListener("click", () => {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(prevIndex);
    });
  }

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const speed = 200; // Lower number = faster animation
    const updateCount = () => {
      const count = +counter.innerText;
      const inc = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  };

  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          const impactCounters = entry.target.querySelectorAll(".counter");
          if (impactCounters.length > 0) {
            impactCounters.forEach((counter) => {
              if (counter.innerText === "0") {
                animateCounter(counter);
              }
            });
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".animated-item").forEach((item) => {
    animationObserver.observe(item);
  });

  let lastScrollY = window.scrollY;
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle(
        "hidden",
        lastScrollY < window.scrollY && window.scrollY > 100
      );
    }
    lastScrollY = window.scrollY;
  });
});
