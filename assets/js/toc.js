document.addEventListener('DOMContentLoaded', function() {
  // Get all headings in the post
  const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4');
  if (headings.length === 0) return;
  
  // Create TOC container
  const tocContainer = document.createElement('div');
  tocContainer.className = 'floating-toc-container';
  tocContainer.innerHTML = `
    <div class="floating-toc-header">
      <span class="current-section">Current Section</span>
      <span class="toc-toggle">▼</span>
    </div>
    <div class="floating-toc-content"></div>
  `;
  
  const tocContent = tocContainer.querySelector('.floating-toc-content');
  const currentSection = tocContainer.querySelector('.current-section');
  
  // Build TOC
  headings.forEach((heading, index) => {
    // Add ID to heading if it doesn't have one
    if (!heading.id) {
      heading.id = 'heading-' + index;
    }
    
    // Create TOC item
    const level = parseInt(heading.tagName.substring(1));
    const tocItem = document.createElement('a');
    tocItem.href = '#' + heading.id;
    tocItem.className = 'toc-item toc-level-' + level;
    tocItem.textContent = heading.textContent;
    tocContent.appendChild(tocItem);
  });
  
  // Add TOC to page
  document.querySelector('.post').prepend(tocContainer);
  
  // Toggle TOC visibility
  const tocToggle = tocContainer.querySelector('.toc-toggle');
  const tocHeader = tocContainer.querySelector('.floating-toc-header');
  
  tocHeader.addEventListener('click', function(e) {
    tocContainer.classList.toggle('toc-expanded');
    tocToggle.textContent = tocContainer.classList.contains('toc-expanded') ? '▲' : '▼';
    e.stopPropagation();
  });
  
  // Close TOC when clicking outside
  document.addEventListener('click', function(e) {
    if (!tocContainer.contains(e.target) && tocContainer.classList.contains('toc-expanded')) {
      tocContainer.classList.remove('toc-expanded');
      tocToggle.textContent = '▼';
    }
  });
  
  // Prevent clicks inside TOC content from closing it
  tocContent.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // Update current section on scroll
  let currentHeadingIndex = 0;
  
  function updateCurrentSection() {
    const scrollPosition = window.scrollY;
    
    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i];
      if (scrollPosition >= heading.offsetTop - 100) {
        currentHeadingIndex = i;
        currentSection.textContent = heading.textContent;
        
        // Update active class
        const tocItems = tocContent.querySelectorAll('.toc-item');
        tocItems.forEach(item => item.classList.remove('active'));
        tocItems[i].classList.add('active');
        
        break;
      }
    }
  }
  
  // Set initial section
  updateCurrentSection();
  
  // Update on scroll (with debounce)
  let scrollTimer;
  window.addEventListener('scroll', function() {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateCurrentSection, 100);
  });
}); 