// ============================================================================
// SHARED SCRIPT FOR ALL PAGES
// This script handles: navigation, newsletter forms, contact forms,
// scroll reveals, particles, and interactive elements.
// ============================================================================

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const newsletterForms = document.querySelectorAll("[data-newsletter]");
const editionButtons = document.querySelectorAll(".edition-tabs button");
const contactForm = document.querySelector("[data-contact]");
const contactMessage = document.querySelector("[data-contact-message]");
const mailchimpPlaceholderPattern = /YOUR-ACCOUNT|YOUR_U_VALUE|YOUR_AUDIENCE_ID|usXX/;

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

function getMailchimpJsonpUrl(actionUrl, email) {
  const url = new URL(actionUrl);
  url.pathname = url.pathname.replace("/subscribe/post", "/subscribe/post-json");
  url.searchParams.set("EMAIL", email);
  return url;
}

function submitToMailchimp(actionUrl, email) {
  return new Promise((resolve, reject) => {
    const callbackName = `mailchimpCallback_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const url = getMailchimpJsonpUrl(actionUrl, email);
    const script = document.createElement("script");

    url.searchParams.set("c", callbackName);

    window[callbackName] = (response) => {
      delete window[callbackName];
      script.remove();
      resolve(response);
    };

    script.onerror = () => {
      delete window[callbackName];
      script.remove();
      reject(new Error("Mailchimp request failed"));
    };

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

newsletterForms.forEach((newsletter) => {
  const message = newsletter.querySelector("[data-form-message]");

  if (!message) return;

  newsletter.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    const actionUrl = form.getAttribute("action") || "";

    message.classList.remove("error", "success");

    if (!email || !email.includes("@")) {
      message.textContent = "Enter a valid email address before joining.";
      message.classList.add("error");
      return;
    }

    if (!actionUrl || mailchimpPlaceholderPattern.test(actionUrl)) {
      message.textContent = "Newsletter signup is almost ready. Add the Mailchimp form URL to finish setup.";
      message.classList.add("error");
      return;
    }

    try {
      message.textContent = "Joining...";
      const response = await submitToMailchimp(actionUrl, email);
      const isSuccess = response.result === "success";
      const alreadySubscribed = /already subscribed/i.test(response.msg || "");

      message.textContent = isSuccess || alreadySubscribed
        ? "Thanks. Please check your inbox to confirm your subscription."
        : (response.msg || "").replace(/^\d+\s*-\s*/, "") || "Something went wrong. Please try again.";
      message.classList.add(isSuccess || alreadySubscribed ? "success" : "error");

      if (isSuccess || alreadySubscribed) form.reset();
    } catch (error) {
      message.textContent = "Something went wrong. Please try again.";
      message.classList.add("error");
    }
  });
});

editionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    editionButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

// Contact form handler (for contact.html)
if (contactForm && contactMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const messageText = formData.get("message");

    contactMessage.classList.remove("error", "success");

    if (!name || !email || !messageText) {
      contactMessage.textContent = "Please fill in all required fields.";
      contactMessage.classList.add("error");
      return;
    }

    if (!String(email).includes("@")) {
      contactMessage.textContent = "Please enter a valid email address.";
      contactMessage.classList.add("error");
      return;
    }

    // Static demo - in production, wire this to a form service like Formspree, Netlify Forms, etc.
    contactMessage.textContent = "Thanks for your message! This static demo captured the interaction locally.";
    contactMessage.classList.add("success");
    form.reset();
  });
}

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
