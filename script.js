/* ===================================
   AVATAR WALKER ANIMATION
   =================================== */

class AvatarWalker {
  constructor() {
    this.avatar = document.querySelector(".avatar");
    this.container = document.querySelector(".middle");

    // Avatar properties
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.speed = 0.5;
    this.rotation = 0;
    this.direction = 1; // 1 = left (original), -1 = right (flipped)

    // Walking animation
    this.walkCycle = 0;
    this.walkSpeed = 0.1;

    this.init();
  }

  init() {
    // Set initial random position
    this.setRandomTarget();
    this.x = this.targetX;
    this.y = this.targetY;

    // Start animation loop
    this.animate();
  }

  setRandomTarget() {
    const containerRect = this.container.getBoundingClientRect();
    const avatarSize = this.avatar.offsetWidth;

    // Calculate safe boundaries
    const maxX = containerRect.width - avatarSize;
    const maxY = containerRect.height - avatarSize;

    // Set new random target
    this.targetX = Math.random() * maxX;
    this.targetY = Math.random() * maxY;
  }

  animate() {
    // Calculate distance to target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If close to target, get a new target immediately
    if (distance < 5) {
      this.setRandomTarget();
    }

    // Always move and animate
    const newDx = this.targetX - this.x;
    const newDy = this.targetY - this.y;
    const newDistance = Math.sqrt(newDx * newDx + newDy * newDy);

    // Normalize direction and apply speed
    this.x += (newDx / newDistance) * this.speed;
    this.y += (newDy / newDistance) * this.speed;

    // Always update walking animation
    this.walkCycle += this.walkSpeed;
    this.rotation = Math.sin(this.walkCycle) * 5; // Oscillate between -5 and 5 degrees

    // Determine direction (flip avatar based on movement)
    if (newDx > 0 && this.direction === 1) {
      // Moving right, flip avatar
      this.direction = -1;
    } else if (newDx < 0 && this.direction === -1) {
      // Moving left, restore original
      this.direction = 1;
    }

    // Apply transforms
    this.avatar.style.transform = `
      translate(${this.x}px, ${this.y}px) 
      scaleX(${this.direction}) 
      rotate(${this.rotation}deg)
    `;

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize Avatar Walker
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new AvatarWalker();
  });
} else {
  new AvatarWalker();
}

/* ===================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   =================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    // If you have a fixed header, set headerOffset to its height (in px)
    const headerOffset = document.querySelector("header")?.offsetHeight || 0;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Optional: update URL hash without jumping
    history.pushState(null, "", href);
  });
});

/* ===================================
   CONTACT MODAL
   =================================== */

const circularButton = document.querySelector(".circular-button");
const getInTouchButton = document.querySelector(".get-in-touch-btn");
const modalOverlay = document.querySelector(".contact-modal-overlay");
const closeModal = document.querySelector(".close-modal");
const contactForm = document.querySelector(".contact-form");

// Open contact modal
circularButton.addEventListener("click", () => {
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

getInTouchButton.addEventListener("click", () => {
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Close contact modal
closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const yourEmail = "diogo.a.p.pinto@hotmail.com";

  const subject = `New message from ${name}`;
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
  const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${body}`;

  window.location.href = mailtoLink;

  setTimeout(() => {
    contactForm.reset();
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }, 500);
});

/* ===================================
   MENU MODAL
   =================================== */

const menuBtn = document.querySelector(".menu");
const menuOverlay = document.querySelector(".menu-modal-overlay");
const closeMenuBtn = document.querySelector(".close-menu");
const menuLinks = document.querySelectorAll(".menu-link");

// Open menu modal
menuBtn.addEventListener("click", () => {
  menuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Close menu modal
closeMenuBtn.addEventListener("click", () => {
  menuOverlay.classList.remove("active");
  document.body.style.overflow = "hidden";
  document.body.style.overflowY = "auto";
});

// Close menu when clicking on links
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "hidden";
    document.body.style.overflowY = "auto";
  });
});

// Close menu when clicking outside
menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "hidden";
    document.body.style.overflowY = "auto";
  }
});

/* ===================================
   FIXED BUTTONS VISIBILITY (SCROLL)
   =================================== */

const getInTouchBtn = document.querySelector(".get-in-touch-btn");
const homeSection = document.querySelector("#home");

console.log("Menu button:", menuBtn);
console.log("Get in touch button:", getInTouchBtn);
console.log("Home section:", homeSection);

// Intersection Observer to show/hide buttons based on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log("Home intersection:", entry.isIntersecting);

      if (!entry.isIntersecting) {
        console.log("Left home - showing buttons");
        setTimeout(() => {
          if (menuBtn) menuBtn.classList.add("show-menu");
          if (getInTouchBtn) {
            getInTouchBtn.classList.add("fixed");
            setTimeout(() => {
              getInTouchBtn.classList.add("show-btn");
            }, 50);
          }
        }, 300);
      } else {
        if (menuBtn) menuBtn.classList.remove("show-menu");
        if (getInTouchBtn) {
          getInTouchBtn.classList.remove("show-btn");
          setTimeout(() => {
            getInTouchBtn.classList.remove("fixed");
          }, 500); // Wait for animation to finish
        }
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Start observing home section
if (homeSection) observer.observe(homeSection);
