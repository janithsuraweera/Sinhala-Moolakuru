// Help Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const aboutBtn = document.getElementById('about-btn');
  const aboutModal = document.getElementById('about-modal');
  const closeAboutModal = document.querySelector('.close-modal-about');
  const modeToggle = document.getElementById('mode-toggle');
  const socialLinks = document.querySelectorAll('.social-link');

  // Initialize
  initEventListeners();

  function initEventListeners() {
    // About modal
    aboutBtn.addEventListener('click', () => {
      aboutModal.style.display = 'flex';
    });

    closeAboutModal.addEventListener('click', () => {
      aboutModal.style.display = 'none';
    });

    // Close modal when clicking outside
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) {
        aboutModal.style.display = 'none';
      }
    });

    // Mode toggle
    if (modeToggle) {
      modeToggle.addEventListener('click', toggleDarkMode);
    }

    // Social links analytics
    socialLinks.forEach(link => {
      link.addEventListener('click', handleSocialLinkClick);
    });
  }

  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    modeToggle.textContent = isDark ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('darkMode', isDark);
  }

  function handleSocialLinkClick(e) {
    const platform = e.currentTarget.classList[1]; // github, facebook, etc.
    const url = e.currentTarget.href;
    
    // Analytics tracking (you can add your analytics code here)
    console.log(`Social link clicked: ${platform} - ${url}`);
    
    // Optional: Add a small delay for visual feedback
    e.currentTarget.style.transform = 'scale(0.95)';
    setTimeout(() => {
      e.currentTarget.style.transform = 'scale(1)';
    }, 150);
  }

  // Load dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    document.body.classList.add('dark');
    if (modeToggle) {
      modeToggle.textContent = '☀️';
    }
  }

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape key to close modal
    if (e.key === 'Escape' && aboutModal.style.display === 'flex') {
      aboutModal.style.display = 'none';
    }
    
    // Ctrl/Cmd + K to focus search (if you add search functionality)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      // Add search functionality here if needed
    }
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.faq-item, .feature-item, .developer-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add copy email functionality
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      const email = emailLink.href.replace('mailto:', '');
      
      // Copy to clipboard
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Email copied to clipboard!');
      });
    });
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary);
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9rem;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  }

  // Add accessibility features
  document.querySelectorAll('.social-link, .feature-item, .faq-item').forEach(element => {
    element.setAttribute('tabindex', '0');
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (element.tagName === 'A') {
          element.click();
        }
      }
    });
  });

  // Add performance optimizations
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalculate any layout-dependent elements
      console.log('Window resized, recalculating layout...');
    }, 250);
  });

  // Add service worker registration for offline support
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}); 