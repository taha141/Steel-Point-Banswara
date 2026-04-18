/* =========================================
   STEEL POINT - PRODUCTS PAGE JS
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {

  // =========================================
  // PRODUCT FILTER
  // =========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-main-card');

  if (filterButtons.length && productCards.length) {

    filterButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach(function(card, index) {
          const category = card.getAttribute('data-category');
          const shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9) translateY(20px)';

            setTimeout(function() {
              card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, index * 60);
          } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';

            setTimeout(function() {
              card.classList.add('hidden');
            }, 300);
          }
        });
      });
    });
  }

  // =========================================
  // PRODUCT CARD HOVER EFFECT
  // =========================================
  productCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      // Add a glow effect to the card
      this.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 30