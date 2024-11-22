document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.querySelector('.md\\:hidden');

  if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', () => {
          // Toggle mobile menu
          // Add your mobile menu toggle logic here
      });
  }
});