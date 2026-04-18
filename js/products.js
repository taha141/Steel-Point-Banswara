/* =========================================
   STEEL POINT - PRODUCTS PAGE JS
========================================= */

document.addEventListener('DOMContentLoaded', function () {

  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-main-card');

  /* =========================
     PRODUCT FILTER
  ========================= */
  if (filterButtons.length && productCards.length) {

    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {

        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;

        productCards.forEach(card => {
          const category = card.dataset.category;

          if (filter === 'all' || category === filter) {
            card.style.display = 'block';

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);

          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });

      });
    });

  }

  /* =========================
     CARD HOVER EFFECT
  ========================= */

  productCards.forEach(card => {

    card.addEventListener('mouseenter', function () {
      if (window.innerWidth > 768) {
        this.style.transform = 'translateY(-8px)';
      }
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });

  });

});
