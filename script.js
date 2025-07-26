// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const sectionId = this.getAttribute('href');
    if (sectionId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(sectionId).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('main section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Animate card-sections and project-blocks on scroll
function animateOnScroll(selector, initial = {opacity: 0, transform: 'translateY(30px)'}, final = {opacity: 1, transform: 'translateY(0)'}) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = final.opacity;
        entry.target.style.transform = final.transform;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => {
    el.style.opacity = initial.opacity;
    el.style.transform = initial.transform;
    el.style.transition = 'opacity 0.7s, transform 0.7s';
    observer.observe(el);
  });
}
animateOnScroll('.card-section');
animateOnScroll('.project-block', {opacity: 0, transform: 'translateY(20px)'}, {opacity: 1, transform: 'translateY(0)'});

// Animate skill bars when skills section is in view
const skillsSection = document.getElementById('skills');
const skillLevels = document.querySelectorAll('.skill-level');
const skillPercents = ["95%","85%","55%","55%","50%","85%","50%","85%"];
let skillsAnimated = false;

function animateSkills() {
  skillLevels.forEach((bar, i) => {
    bar.classList.add('animate-skill');
    bar.style.width = skillPercents[i];
  });
}
function resetSkills() {
  skillLevels.forEach(bar => {
    bar.classList.remove('animate-skill');
    bar.style.width = '0';
  });
}
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      animateSkills();
      skillsAnimated = true;
    } else if (!entry.isIntersecting && skillsAnimated) {
      resetSkills();
      skillsAnimated = false;
    }
  });
}, { threshold: 0.3 });
skillsObserver.observe(skillsSection);