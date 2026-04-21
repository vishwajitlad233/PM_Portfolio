// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a slight delay based on the index if in a grid
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Optional: only animate once
      }
    });
  }, {
    root: null,
    rootMargin: '100px 0px',
    threshold: 0.05
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 3. Typing Effect
  const typeText = document.querySelector('.typewriter');
  if (typeText) {
    const textToType = typeText.getAttribute('data-text') || 'Product Manager × AI Expert';
    typeText.textContent = '';
    
    let charIndex = 0;
    const typeSpeed = 100; // ms per char
    
    function type() {
      if (charIndex < textToType.length) {
        typeText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, typeSpeed);
      }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
  }

  // 4. Logo Marquee Clone for infinite loop
  const marqueeContent = document.querySelector('.marquee-content');
  if (marqueeContent) {
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
  }
});
// --- Modal Functions ---
window.openCaseStudy = function(src, title, subtitle) {
    const modal = document.getElementById('csModal');
    const backdrop = document.getElementById('csBackdrop');
    const frame = document.getElementById('csFrame');
    const titleEl = document.getElementById('csModalTitle');
    const subEl = document.getElementById('csModalSubtitle');
    const extLink = document.getElementById('csExtLink');

    if(titleEl) titleEl.textContent = title;
    if(subEl) subEl.textContent = subtitle;
    if(extLink) extLink.href = src;

    frame.src = 'about:blank'; // reset
    document.getElementById('csLoading').style.opacity = '1';
    frame.src = src;

    backdrop.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeCaseStudy = function() {
    const modal = document.getElementById('csModal');
    const backdrop = document.getElementById('csBackdrop');
    if(modal) modal.classList.remove('open');
    if(backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
        const frame = document.getElementById('csFrame');
        if(frame) frame.src = 'about:blank';
    }, 300);
};

window.openPrototype = function(src) {
    const shell = document.getElementById('iphoneShell');
    const backdrop = document.getElementById('iphoneBackdrop');
    const frame = document.getElementById('iphoneFrame');

    frame.src = 'about:blank';
    frame.src = src;

    backdrop.classList.add('open');
    shell.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closePrototype = function(e) {
    if (e && e.target !== document.getElementById('iphoneBackdrop') && !e.target.closest('.iphone-close-btn')) {
        return;
    }
    const shell = document.getElementById('iphoneShell');
    const backdrop = document.getElementById('iphoneBackdrop');
    if(shell) shell.classList.remove('open');
    if(backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
        const frame = document.getElementById('iphoneFrame');
        if(frame) frame.src = 'about:blank';
    }, 300);
};

// Escape listener for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeCaseStudy();
        window.closePrototype();
    }
});
