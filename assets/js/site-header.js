// /assets/js/site-header.js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('header.site-header').forEach(header => {
    const menuToggle = header.querySelector('.menu-toggle');
    const navbar     = header.querySelector('.navbar');
    const bars       = menuToggle?.querySelectorAll('.bar');
    if (!menuToggle || !navbar || !bars.length) return;   // safety

    const closeMenuOnOutsideClick = e => {
      if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    };

    const toggleMenu = isOpen => {
      menuToggle.setAttribute('aria-expanded', isOpen);
      navbar.classList.toggle('active', isOpen);
      if (isOpen) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        document.addEventListener('click', closeMenuOnOutsideClick);
      } else {
        bars.forEach(bar => { bar.style.transform = ''; bar.style.opacity = ''; });
        document.removeEventListener('click', closeMenuOnOutsideClick);
      }
    };

    menuToggle.addEventListener('click', e => {
      e.stopPropagation();
      toggleMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    navbar.addEventListener('click', e => e.stopPropagation());
  });
});
