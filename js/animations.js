/* =========================================
   STEEL POINT - ANIMATIONS JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {

  // =========================================
  // TILT EFFECT ON CARDS
  // =========================================
  function initTiltEffect() {
    const cards = document.querySelectorAll('.feature-card, .stats-card, .vm-card');

    cards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform =
          `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transition = 'none';
      });

      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    });
  }

  initTiltEffect();

  // =========================================
  // HERO TITLE WORD-BY-WORD ANIMATION
  // =========================================
  function animateHeroTitle() {
    const titleLines = document.querySelectorAll('.title-line-1, .title-line-2, .title-line-3');

    titleLines.forEach(function(line, index) {
      line.style.opacity = '0';
      line.style.transform = 'translateY(30px)';
      line.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

      setTimeout(function() {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, 500 + index * 200);
    });
  }

  // Run after preloader (delay to sync)
  setTimeout(animateHeroTitle, 1600);

  // =========================================
  // PARALLAX EFFECT FOR HERO
  // =========================================
  const heroGrid = document.querySelector('.hero-grid');
  const heroFloatEls = document.querySelectorAll('.float-el');

  if (heroGrid) {
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;

      // Parallax grid
      if (heroGrid) {
        heroGrid.style.transform = `translateY(${scrollY * 0.3}px)`;
      }

      // Float elements parallax
      heroFloatEls.forEach(function(el, i) {
        const speed = 0.1 + i * 0.05;
        el.style.transform = `translateY(${-scrollY * speed}px)`;
      });
    });
  }

  // =========================================
  // MAGNETIC BUTTONS
  // =========================================
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-nav-cta');

    buttons.forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
      });

      btn.addEventListener('mouseleave', function() {
        btn.style.transform = '';
      });
    });
  }

  initMagneticButtons();

  // =========================================
  // SCROLL PROGRESS BAR
  // =========================================
  const progressBar = document.createElement('div');
  progressBar.id = 'scrollProgress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #f97316, #fb923c);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(249,115,22,0.5);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

  // =========================================
  // HOVER SOUND FEEDBACK (Visual)
  // =========================================
  function addHoverPulse() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('mouseenter', function() {
        this.style.letterSpacing = '0.8px';
        setTimeout(() => { this.style.letterSpacing = ''; }, 150);
      });
    });
  }

  addHoverPulse();

  // =========================================
  // FEATURE CARDS STAGGER ON SCROLL
  // =========================================
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length) {
    const featureObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const index = Array.from(featureCards).indexOf(entry.target);
          setTimeout(function() {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          featureObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    featureCards.forEach(function(card) {
      featureObserver.observe(card);
    });
  }

  // =========================================
  // LOGO GLITCH EFFECT (periodic)
  // =========================================
  const logoMain = document.querySelector('.logo-main');
  if (logoMain) {
    setInterval(function() {
      logoMain.style.textShadow = '2px 0 #f97316, -2px 0 #1e40af';
      setTimeout(function() {
        logoMain.style.textShadow = '';
      }, 100);
    }, 8000);
  }

  // =========================================
  // WHATSAPP FLOAT PULSE
  // =========================================
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    setInterval(function() {
      whatsappFloat.style.transform = 'scale(1.2)';
      setTimeout(function() {
        whatsappFloat.style.transform = 'scale(1)';
      }, 300);
    }, 4000);
  }

  // =========================================
  // PRODUCT PREVIEW CARDS - ENTRANCE
  // =========================================
  const productCards = document.querySelectorAll('.product-preview-card');
  if (productCards.length) {
    const productObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          productObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    productCards.forEach(function(card) {
      productObserver.observe(card);
    });
  }

  // =========================================
  // SMOOTH NUMBER FORMAT
  // =========================================
  function formatNumber(num) {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  // =========================================
  // CURSOR TRAIL EFFECT (subtle)
  // =========================================
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    let lastX = 0, lastY = 0;

    document.addEventListener('mousemove', function(e) {
      // Only create trail every 50px of movement
      const dist = Math.sqrt((e.clientX - lastX) ** 2 + (e.clientY - lastY) ** 2);

      if (dist > 50) {
        const dot = document.createElement('div');
        dot.style.cssText = `
          position: fixed;
          width: 4px; height: 4px;
          background: rgba(249, 115, 22, 0.4);
          border-radius: 50%;
          left: ${e.clientX - 2}px;
          top: ${e.clientY - 2}px;
          pointer-events: none;
          z-index: 9997;
          transition: opacity 0.5s ease, transform 0.5s ease;
        `;
        document.body.appendChild(dot);

        setTimeout(function() {
          dot.style.opacity = '0';
          dot.style.transform = 'scale(3)';
        }, 50);

        setTimeout(function() { dot.remove(); }, 550);

        lastX = e.clientX;
        lastY = e.clientY;
      }
    });
  }

});