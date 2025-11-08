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

/* ===================================
   PROJECT LOADING AND FILTERING
   =================================== */

// Category label mapping
const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full Stack',
  design: 'Design'
};

// Load projects from JSON
async function loadProjects() {
  try {
    const response = await fetch('data/projects.json');
    const data = await response.json();
    return data.projects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

// Technology badges mapping
const techBadges = {
  'JavaScript': 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
  'Python': 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white',
  'HTML': 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
  'HTML5': 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
  'CSS': 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
  'CSS3': 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
  'React': 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',
  'Angular': 'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white',
  'Node.js': 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white',
  'TypeScript': 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white',
  'MySQL': 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white',
  'PostgreSQL': 'https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white',
  'MongoDB': 'https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white',
  'Express': 'https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white',
  'Flask': 'https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white',
  'PHP': 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white',
  'Git': 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
  'GitHub': 'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white',
  'Figma': 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white',
  'Canva': 'https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white',
  'Stripe': 'https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white',
  'JWT': 'https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white',
  'GSAP': 'https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white',
  'DOM API': 'https://img.shields.io/badge/DOM_API-E34F26?style=for-the-badge&logo=html5&logoColor=white',
  'Chrome Extension API': 'https://img.shields.io/badge/Chrome_Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white'
};

// Create project card HTML
function createProjectCard(project) {
  const techTags = project.technologies
    .map(tech => {
      const badge = techBadges[tech] || `https://img.shields.io/badge/${tech.replace(/\s+/g, '_')}-999999?style=for-the-badge`;
      return `<div class="card"><img src="${badge}" alt="${tech}"></div>`;
    })
    .join('');

  const categoryLabel = categoryLabels[project.category] || project.category;
  const hasDemo = project.links.demo && project.links.demo !== '#';
  const hasGithub = project.links.github && project.links.github !== '#';

  return `
    <article class="project-card" data-category="${project.category}" data-image="${project.image}">
      <div class="project-header">
        <div class="project-header-left">
          <div class="project-title-line">
            <h3 class="project-title">${project.title}</h3>
          </div>
          <div class="project-date-line">
            <span class="project-date">${project.date}</span>
          </div>
        </div>
        <svg class="project-expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      <div class="project-content">
        <div class="project-content-inner">
          
          <div class="project-left">
            <p class="project-description">${project.description}</p>

            <div class="project-links">
              <a href="${hasDemo ? project.links.demo : '#'}" 
                 class="social-button ${!hasDemo ? 'inactive' : ''}" 
                 ${hasDemo ? 'target="_blank"' : ''}
                 ${!hasDemo ? 'onclick="return false;"' : ''}
                 title="${hasDemo ? 'View Live Demo' : 'Demo not available'}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
              </a>
              <a href="${hasGithub ? project.links.github : '#'}" 
                 class="social-button ${!hasGithub ? 'inactive' : ''}" 
                 ${hasGithub ? 'target="_blank"' : ''}
                 ${!hasGithub ? 'onclick="return false;"' : ''}
                 title="${hasGithub ? 'View on GitHub' : 'GitHub not available'}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="var(--orange)">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            <div class="project-footer">
              <span class="project-category-badge">${categoryLabel}</span>
              <span class="project-tech-label">Technologies</span>
              <div class="project-tech">
                ${techTags}
              </div>
            </div>
          </div>

          <!-- RIGHT SIDE (1/3) -->
          <div class="project-right">
            <div class="project-image">
              <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
          </div>

        </div>
      </div>
    </article>
  `;
}

// Toggle project expansion
function toggleProject(card) {
  const isExpanded = card.classList.contains('expanded');
  
  // Close all other projects
  document.querySelectorAll('.project-card.expanded').forEach(c => {
    if (c !== card) {
      c.classList.remove('expanded');
    }
  });
  
  // Toggle current project
  card.classList.toggle('expanded');
}

// Render projects to the DOM
function renderProjects(projects) {
  const projectsGrid = document.querySelector('.projects-grid');
  projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');
  
  // Add click handlers for expansion
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const header = card.querySelector('.project-header');
    header.addEventListener('click', () => toggleProject(card));
  });
  
  // Add stagger animation after rendering
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Filter projects
function filterProjects(filter) {
  const projectCards = document.querySelectorAll('.project-card');
  const emptyState = document.querySelector('.projects-empty');
  let visibleCount = 0;

  projectCards.forEach(card => {
    const category = card.dataset.category;
    
    // Close expanded projects when filtering
    card.classList.remove('expanded');
    
    if (filter === 'all' || category === filter) {
      card.classList.remove('hidden');
      visibleCount++;
      card.style.animation = 'fadeInUp 0.5s ease forwards';
    } else {
      card.classList.add('hidden');
    }
  });

  // Show/hide empty state
  if (visibleCount === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
}

// Initialize project filtering
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter category and filter projects
      const filter = btn.dataset.filter;
      filterProjects(filter);
    });
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Load and render projects
  const projects = await loadProjects();
  renderProjects(projects);
  
  // Initialize filters
  initProjectFilters();
});
