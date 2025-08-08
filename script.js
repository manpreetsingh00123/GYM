document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav-links');
  const navToggle = document.querySelector('.nav-toggle');

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    navToggle.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navToggle.classList.remove('open');
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length === 1) return;
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      const offset = 70;
      const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // Toast
  const toast = createToast();
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      toast.show('Message sent — we\'ll get back to you soon! 🎉');
      contactForm.reset();
    });
  }

  // Scroll to top
  const topBtn = document.querySelector('#scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function createToast() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return {
      show(msg, ttl = 3000) {
        const node = document.createElement('div');
        node.className = 'toast';
        node.textContent = msg;
        container.appendChild(node);
        requestAnimationFrame(() => node.classList.add('show'));
        setTimeout(() => {
          node.classList.remove('show');
          node.addEventListener('transitionend', () => node.remove());
        }, ttl);
      }
    };
  }
});
