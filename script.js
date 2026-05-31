const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const newsletter = document.querySelector("[data-newsletter]");
const message = document.querySelector("[data-form-message]");
const editionButtons = document.querySelectorAll(".edition-tabs button");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (newsletter && message) {
  newsletter.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    message.classList.remove("error", "success");

    if (!email || !String(email).includes("@")) {
      message.textContent = "Enter a valid email address before joining.";
      message.classList.add("error");
      return;
    }

    message.textContent = "Thanks. This static demo captured the interaction locally.";
    message.classList.add("success");
    form.reset();
  });
}

editionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    editionButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

// Scroll-triggered reveal animations
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

// Header scroll effect + hero parallax
const heroBg = document.querySelector(".hero .section-bg img");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (header) {
    header.classList.toggle("scrolled", scrollY > 60);
  }
  if (!reduceMotion && heroBg && scrollY < 1000) {
    heroBg.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.18}px)) scale(1.18)`;
  }
}, { passive: true });

// Floating particles
function createParticles() {
  const container = document.querySelector(".atmosphere");
  if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const count = Math.min(12, Math.floor(window.innerWidth / 120));

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const x = Math.random() * 100;
    const size = 1 + Math.random() * 2;
    const duration = 12 + Math.random() * 18;
    const delay = Math.random() * duration;
    const hue = Math.random() > 0.5 ? "155, 106, 184" : "74, 143, 212";

    particle.style.cssText = `
      left: ${x}%;
      width: ${size}px;
      height: ${size}px;
      background: rgba(${hue}, ${0.3 + Math.random() * 0.4});
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      bottom: -10px;
    `;
    container.appendChild(particle);
  }
}

createParticles();
