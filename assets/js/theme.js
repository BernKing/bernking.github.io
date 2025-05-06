document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply the theme class to html and body elements
  // First remove any existing theme classes to avoid conflicts
  document.documentElement.classList.remove('light-mode', 'dark-mode');
  document.body.classList.remove('light-mode', 'dark-mode');
  document.documentElement.classList.add(currentTheme + '-mode');
  document.body.classList.add(currentTheme + '-mode');
  
  // Add event listener to toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (document.documentElement.classList.contains('dark-mode')) {
        document.documentElement.classList.replace('dark-mode', 'light-mode');
        document.body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.replace('light-mode', 'dark-mode');
        document.body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}); 