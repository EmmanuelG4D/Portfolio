document.addEventListener('DOMContentLoaded', () => {

  // ── Typewriter ──
  const phrases = [
    'Full-Stack Web Developer',
    'React & Node.js Engineer',
    'E-Commerce Specialist',
    'Healthcare EdTech Builder',
    'Freelance Problem Solver',
  ];
  let pi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typewriter-text');

  function type() {
    if (!el) return;
    const current = phrases[pi];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 48 : 78);
  }
  setTimeout(type, 600);

  // ── Nav scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // ── Reveal on scroll ──
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(r => obs.observe(r));

  // Trigger reveal for elements already visible on page load
  setTimeout(() => {
    reveals.forEach(r => {
      const rect = r.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        r.classList.add('visible');
      }
    });
  }, 100);

  // ── Skill bars ──
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.skill-bar-fill');
        if (fill) { fill.style.width = fill.dataset.width + '%'; }
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-bar-item').forEach(b => barObs.observe(b));

  // ── Mobile nav ──
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileNav').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('mobileClose').addEventListener('click', closeMobileNav);
  document.querySelectorAll('.mnav-link').forEach(a => a.addEventListener('click', closeMobileNav));

  function closeMobileNav() {
    document.getElementById('mobileNav').classList.remove('open');
    document.body.style.overflow = '';
  }

}); // ← DOMContentLoaded ends here

// ── WhatsApp Form Submit ──
// This sits OUTSIDE DOMContentLoaded so onclick can find it globally
function sendToWhatsApp() {

  // Get field values
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const project = document.getElementById('fproject').value;
  const budget  = document.getElementById('fbudget').value;
  const message = document.getElementById('fmessage').value.trim();

  // Validation
  if (!name || !email || !project || !budget || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  // Your WhatsApp number
  const phone = '2348012345678';

  // Build the message
  const text =
`Hello Emmanuel! I found you via your portfolio.

👤 Name: ${name}
📧 Email: ${email}
💼 Project Type: ${project}
💰 Budget: ${budget}

📋 Project Details:
${message}`;

  // Encode for URL
  const encoded = encodeURIComponent(text);

  // WhatsApp URL
  const url = `https://wa.me/${phone}?text=${encoded}`;

  // Show success message
  document.getElementById('form-success').style.display = 'block';

  // Open WhatsApp
  setTimeout(() => {
    window.open(url, '_blank');
  }, 800);

}