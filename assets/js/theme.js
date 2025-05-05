document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply the theme class to body
  document.body.classList.add(currentTheme + '-mode');
  
  // Add event listener to toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (document.body.classList.contains('dark-mode')) {
        document.body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}); 