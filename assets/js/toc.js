// Floating Table‑of‑Contents — simplified version
// ----------------------------------------------------
//  • Uses IntersectionObserver instead of scroll maths
//  • Generates stable, unique heading IDs
//  • Always open (no toggle/collapse functionality)
//  • Non-scrollable TOC content
//  • Completely hidden on mobile devices
//  • Dynamic positioning to avoid content overlap (left side)
//  • Toggle button to show/hide TOC
//  • Cleaner, smaller code‑path

/*
Required CSS additions (keep near your TOC styles)
-------------------------------------------------
.floating-toc-header .arrow-icon.rotated {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}
*/

document.addEventListener('DOMContentLoaded', () => {
  // Skip TOC creation on mobile devices
  if (window.innerWidth < 768) return;

  /* ------------------------------------------------------------------
     1. Check for user preference on TOC visibility
  ------------------------------------------------------------------ */
  const tocHidden = localStorage.getItem('tocHidden') === 'true';
  document.body.classList.toggle('toc-hidden', tocHidden);
  document.body.classList.toggle('toc-visible', !tocHidden);

  /* ------------------------------------------------------------------
     2. Collect headings and ensure each one has a unique, slugified ID
  ------------------------------------------------------------------ */
  const headings = document.querySelectorAll(
    '.post-content h1, .post-content h2, .post-content h3, .post-content h4'
  );
  if (!headings.length) return;

  /* ------------------------------------------------------------------
     3. Create and add toggle button
  ------------------------------------------------------------------ */
  const toggleButton = document.createElement('button');
  toggleButton.className = 'toc-toggle-button';
  toggleButton.innerHTML = tocHidden ? '≡' : '×'; // Menu icon or close icon
  toggleButton.setAttribute('aria-label', tocHidden ? 'Show table of contents' : 'Hide table of contents');
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener('click', () => {
    const isCurrentlyHidden = document.body.classList.contains('toc-hidden');
    document.body.classList.toggle('toc-hidden', !isCurrentlyHidden);
    document.body.classList.toggle('toc-visible', isCurrentlyHidden);
    toggleButton.innerHTML = isCurrentlyHidden ? '×' : '≡'; // Toggle icon
    toggleButton.setAttribute('aria-label', isCurrentlyHidden ? 'Hide table of contents' : 'Show table of contents');
    localStorage.setItem('tocHidden', !isCurrentlyHidden);
  });

  /* ------------------------------------------------------------------
     4. Position TOC to avoid content overlap
  ------------------------------------------------------------------ */
  const adjustTocPosition = () => {
    const tocContainer = document.querySelector('.floating-toc-container');
    if (!tocContainer) return;
    
    const postContent = document.querySelector('.post-content');
    if (!postContent) return;
    
    const postRect = postContent.getBoundingClientRect();
    const contentLeftEdge = postRect.left;
    const windowWidth = window.innerWidth;
    
    // Calculate available space on the left side
    const availableSpace = Math.max(0, contentLeftEdge - 40); // 40px buffer
    
    if (availableSpace < 280) {
      // Limited space - adjust size
      tocContainer.style.width = `${Math.max(availableSpace, 200)}px`;
      tocContainer.style.left = '20px';
    } else {
      // Plenty of space - use default sizing from CSS
      tocContainer.style.width = '';
      tocContainer.style.left = '20px';
    }
    
    // Handle visibility
    if (window.innerWidth < 768) {
      tocContainer.style.display = 'none';
      toggleButton.style.display = 'none';
    } else {
      tocContainer.style.display = '';
      toggleButton.style.display = '';
    }
  };
  
  // Add resize listener to adjust positioning
  window.addEventListener('resize', adjustTocPosition);
  
  // Add zoom detection by periodically checking layout
  let lastWidth = window.innerWidth;
  setInterval(() => {
    if (window.innerWidth === lastWidth) {
      // Width unchanged but zoom might have changed
      adjustTocPosition();
    }
    lastWidth = window.innerWidth;
  }, 1000); // Check every second

  headings.forEach((h) => {
    if (!h.id) {
      const base = h.textContent
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      let id = base;
      let n = 1;
      while (document.getElementById(id)) id = `${base}-${n++}`;
      h.id = id;
    }
  });

  /* ------------------------------------------------------------------
     5. Build the simplified, always-open TOC 
  ------------------------------------------------------------------ */
  const tocContainer = document.createElement('div');
  tocContainer.className = 'floating-toc-container toc-expanded'; // Always expanded
  tocContainer.innerHTML = `
    <div class="floating-toc-header">
      <span class="current-section">Table of Contents</span>
    </div>
    <div class="floating-toc-content"></div>`;

  const tocContent = tocContainer.querySelector('.floating-toc-content');
  // Make TOC content non-scrollable
  tocContent.style.overflow = 'hidden';
  // Remove any max-height that might cause scrolling
  tocContent.style.maxHeight = 'none';
  
  const currentSectionEl = tocContainer.querySelector('.current-section');

  /* ------------------------------------------------------------------
     6. Create a link for every heading
  ------------------------------------------------------------------ */
  const tocItems = [];
  headings.forEach((h, i) => {
    const level = Number(h.tagName.substring(1));
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.className = `toc-item toc-level-${level}`;
    a.textContent = h.textContent;
    a.dataset.index = i;
    tocContent.appendChild(a);
    tocItems.push(a);
  });

  /* ------------------------------------------------------------------
     7. High‑light helper
  ------------------------------------------------------------------ */
  function setActive(idx) {
    tocItems.forEach((el) => el.classList.remove('active'));
    if (idx >= 0 && idx < tocItems.length && tocItems[idx] && headings[idx]) {
      tocItems[idx].classList.add('active');
      currentSectionEl.textContent = headings[idx].textContent;
    }
  }

  /* ------------------------------------------------------------------
     8. Clicks inside the TOC instantly update the highlight
  ------------------------------------------------------------------ */
  tocContent.addEventListener('click', (e) => {
    if (!e.target.classList.contains('toc-item')) return;
    const idx = Number(e.target.dataset.index);
    setActive(idx);
  });

  /* ------------------------------------------------------------------
     9. Observe headings → update highlight as the user scrolls
  ------------------------------------------------------------------ */
  const observer = new IntersectionObserver(
    (entries) => {
      let topMost = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!topMost || entry.boundingClientRect.top < topMost.boundingClientRect.top) {
            topMost = entry;
          }
        }
      });
      if (topMost) {
        setActive(Number(topMost.target.dataset.index));
      }
    },
    {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0,
    }
  );

  headings.forEach((h, i) => {
    h.dataset.index = i;
    observer.observe(h);
  });

  /* ------------------------------------------------------------------
     10. Insert the TOC and set the initial state
  ------------------------------------------------------------------ */
  const postElement = document.querySelector('.post');
  if (postElement) {
    postElement.prepend(tocContainer);
    if (headings.length > 0) {
        setActive(0);
    }
    
    // Adjust position after inserting
    setTimeout(adjustTocPosition, 100);
  } else {
    console.warn("'.post' element not found for TOC insertion.");
  }
});