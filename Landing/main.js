// Form submission
const form = document.querySelector('.signup__form');
const successMsg = document.getElementById('successMsg');

if (form && successMsg) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.style.opacity = '0.4';
    form.style.pointerEvents = 'none';
    setTimeout(() => {
      form.style.display = 'none';
      successMsg.classList.add('visible');
    }, 600);
  });
}

// Smooth active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--primary)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));