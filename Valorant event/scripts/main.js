document.addEventListener("DOMContentLoaded", function () {
  // CTA button click handler
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      window.location.href = "pages/auth.html";
    });
  }

  // Add hover effect to reward items
  const rewardItems = document.querySelectorAll(".reward-item");
  rewardItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.querySelector("h3").style.color = "#fff";
    });

    item.addEventListener("mouseleave", function () {
      this.querySelector("h3").style.color = "var(--valorant-red)";
    });
  });

  // Add click effect to detail cards
  const detailCards = document.querySelectorAll(".detail-card");
  detailCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
      setTimeout(() => {
        this.style.transform = "translateY(-10px)";
      }, 300);
    });
  });
});

// Optional: Add slider navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.querySelector(".events-cards");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  if (cardsContainer && prevBtn && nextBtn) {
    const cardWidth = document.querySelector(".event-card").offsetWidth;
    const scrollAmount = cardWidth + 15; 

    nextBtn.addEventListener("click", () => {
      cardsContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    prevBtn.addEventListener("click", () => {
      cardsContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");

  burgerMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", function () {
    burgerMenu.classList.remove("active");
    mobileMenu.classList.remove("active");
    this.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  const dots = document.querySelectorAll(".dot");

  let currentSlide = 0;
  const slideCount = slides.length;
  let startX = 0;
  let endX = 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  let slideInterval = setInterval(nextSlide, 5000);

  slider.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const diffX = startX - endX;
    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }
  }

  updateSlider();
});



document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("cardsSlider");
  const dots = document.querySelectorAll(".event-dot");
  const prevArrow = document.getElementById("prevArrow");
  const nextArrow = document.getElementById("nextArrow");
  let isDown = false;
  let startX;
  let scrollLeft;
  let currentIndex = 0;

  // Only apply touch/swipe functionality on mobile
  if (window.innerWidth <= 768) {
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      snapToCard();
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

    // Dot navigation
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        currentIndex = index;
        updateSliderPosition();
        updateControls();
      });
    });

    // Arrow navigation
    prevArrow.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
        updateControls();
      }
    });

    nextArrow.addEventListener("click", function () {
      if (currentIndex < dots.length - 1) {
        currentIndex++;
        updateSliderPosition();
        updateControls();
      }
    });

    // Update controls on scroll
    slider.addEventListener("scroll", function () {
      updateActiveControl();
    });
  }

  function snapToCard() {
    const cardWidth = slider.querySelector(".event-card").offsetWidth;
    const scrollPos = slider.scrollLeft;
    currentIndex = Math.round(scrollPos / (cardWidth + 20)); // 20 is the margin
    updateSliderPosition();
    updateControls();
  }

  function updateSliderPosition() {
    const cardWidth = slider.querySelector(".event-card").offsetWidth;
    slider.scrollTo({
      left: currentIndex * (cardWidth + 20),
      behavior: "smooth",
    });
  }

  function updateControls() {
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Update arrows
    prevArrow.style.opacity = currentIndex === 0 ? "0.5" : "1";
    nextArrow.style.opacity = currentIndex === dots.length - 1 ? "0.5" : "1";
  }

  function updateActiveControl() {
    const cardWidth = slider.querySelector(".event-card").offsetWidth;
    const scrollPos = slider.scrollLeft;
    const newIndex = Math.round(scrollPos / (cardWidth + 20));

    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateControls();
    }
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      // Reset scroll position when switching back to desktop
      slider.scrollLeft = 0;
      currentIndex = 0;
      updateControls();
    }
  });

  // Initial controls state
  if (window.innerWidth <= 768) {
    updateControls();
  }
});
