/* =========================================
   STEEL POINT - MAIN JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {

  // =========================================
  // PRELOADER
  // =========================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('fade-out');
        setTimeout(function() {
          preloader.style.display = 'none';
        }, 600);
      }, 1500);
    });
  }

  // =========================================
  // NAVBAR SCROLL EFFECT
  // =========================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // =========================================
  // HAMBURGER MENU
  // =========================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================
  // BACK TO TOP BUTTON
  // =========================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================
  // PARTICLE BACKGROUND
  // =========================================
  const particlesBg = document.getElementById('particles-bg');
  if (particlesBg) {
    createParticles(particlesBg);
  }

  function createParticles(container) {
    const particleCount = 50;
    const colors = ['#f97316', '#fb923c', '#fed7aa', '#1e40af', '#60a5fa'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 4 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 15;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        bottom: -10px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: 0.4;
      `;

      container.appendChild(particle);
    }
  }

  // =========================================
  // AOS - ANIMATE ON SCROLL
  // =========================================
  function initAOS() {
    const aosElements = document.querySelectorAll('[data-aos]');

    if (!aosElements.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    aosElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  initAOS();

  // =========================================
  // COUNTER ANIMATION
  // =========================================
  function animateCounter(el, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        el.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target, 2000);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function(el) {
    counterObserver.observe(el);
  });

  // =========================================
  // TESTIMONIALS SLIDER
  // =========================================
  const testTrack = document.getElementById('testTrack');
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');
  const dotsContainer = document.getElementById('testDots');

  if (testTrack && prevBtn && nextBtn) {
    const cards = testTrack.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    const total = cards.length;

    // Create dots
    if (dotsContainer) {
      cards.forEach(function(_, i) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function() { goToSlide(i); });
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.slider-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = (index + total) % total;
      testTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    prevBtn.addEventListener('click', function() { goToSlide(currentIndex - 1); });
    nextBtn.addEventListener('click', function() { goToSlide(currentIndex + 1); });

    // Auto-slide
    let autoSlide = setInterval(function() { goToSlide(currentIndex + 1); }, 5000);

    testTrack.addEventListener('mouseenter', function() { clearInterval(autoSlide); });
    testTrack.addEventListener('mouseleave', function() {
      autoSlide = setInterval(function() { goToSlide(currentIndex + 1); }, 5000);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    testTrack.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testTrack.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) goToSlide(currentIndex + 1);
      if (touchEndX - touchStartX > 50) goToSlide(currentIndex - 1);
    }, { passive: true });
  }

  // =========================================
  // RIPPLE EFFECT ON BUTTONS
  // =========================================
  document.querySelectorAll('.btn-primary, .btn-submit, .btn-nav-cta').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      setTimeout(function() { ripple.remove(); }, 600);
    });
  });

  // =========================================
  // SMOOTH PAGE LOAD
  // =========================================
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(function() {
    document.body.style.opacity = '1';
  });

  // =========================================
  // WORKING HOURS BADGE
  // =========================================
  function updateWorkingHours() {
    const badge = document.querySelector('.open-badge');
    if (!badge) return;

    const now = new Date();
    const day = now.getDay(); // 0=Sun, 6=Sat
    const hour = now.getHours();

    let isOpen = false;
    if (day >= 1 && day <= 6 && hour >= 9 && hour < 18) isOpen = true;
    if (day === 7 && hour >= 9 && hour < 13) isOpen = true;

    badge.innerHTML = isOpen
      ? '<i class="fas fa-circle" style="color:#22c55e; font-size:0.5rem;"></i> Open Now'
      : '<i class="fas fa-circle" style="color:#ef4444; font-size:0.5rem;"></i> Closed Now';
    badge.style.color = isOpen ? '#22c55e' : '#ef4444';
  }

  updateWorkingHours();
  setInterval(updateWorkingHours, 60000);

});

// =========================================
// UTILITY: Throttle
// =========================================
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function() { inThrottle = false; }, limit);
    }
  };
}

// ========================GALLERY JS =====================
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".gallery-tab");
    const photosTab = document.getElementById("photosTab");
    const videosTab = document.getElementById("videosTab");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {

            // Remove active from all buttons
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            const selected = this.getAttribute("data-tab");

            if (selected === "photos") {
                photosTab.classList.remove("hidden");
                videosTab.classList.add("hidden");
            } else {
                videosTab.classList.remove("hidden");
                photosTab.classList.add("hidden");
            }
        });
    });
});
