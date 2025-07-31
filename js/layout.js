// Layout Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const demoTextDisplay = document.getElementById('demo-text-display');
  const demoInput = document.getElementById('demo-input');
  const clearDemoBtn = document.getElementById('clear-demo');
  const keys = document.querySelectorAll('.key');
  const aboutBtn = document.getElementById('about-btn');
  const aboutModal = document.getElementById('about-modal');
  const closeAboutModal = document.querySelector('.close-modal-about');
  const modeToggle = document.getElementById('mode-toggle');
  const stateButtons = document.querySelectorAll('.state-btn');

  let currentText = '';
  let isTypingMode = false;
  let currentState = 'normal'; // normal, shift, altgr

  // Initialize
  initKeyboard();
  initEventListeners();

  function initKeyboard() {
    // Add click event to each key
    keys.forEach(key => {
      key.addEventListener('click', handleKeyClick);
      key.addEventListener('touchstart', handleKeyTouch, { passive: true });
    });

    // Add keyboard event listeners for real typing
    document.addEventListener('keydown', handleKeyboardInput);
  }

  function initEventListeners() {
    // Clear button
    clearDemoBtn.addEventListener('click', clearText);

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

    // Demo input focus
    demoInput.addEventListener('focus', () => {
      isTypingMode = true;
      demoInput.style.borderColor = 'var(--primary)';
    });

    demoInput.addEventListener('blur', () => {
      isTypingMode = false;
      demoInput.style.borderColor = 'var(--border)';
    });

    // State buttons
    stateButtons.forEach(btn => {
      btn.addEventListener('click', handleStateChange);
    });
  }

  function handleStateChange(e) {
    const newState = e.target.getAttribute('data-state');
    
    // Update active button
    stateButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update current state
    currentState = newState;
    
    // Update keyboard display
    updateKeyboardDisplay();
  }

  function updateKeyboardDisplay() {
    keys.forEach(key => {
      const englishKey = key.getAttribute('data-english');
      const sinhalaChar = key.getAttribute('data-sinhala');
      const shiftedChar = key.getAttribute('data-shifted');
      const altgrChar = key.getAttribute('data-altgr');
      
      let displayChar = '';
      
      switch(currentState) {
        case 'normal':
          displayChar = sinhalaChar || englishKey;
          break;
        case 'shift':
          displayChar = shiftedChar || sinhalaChar || englishKey;
          break;
        case 'altgr':
          displayChar = altgrChar || sinhalaChar || englishKey;
          break;
      }
      
      // Update the display (this is just for visual feedback)
      const sinhalaSpan = key.querySelector('.sinhala-char');
      if (sinhalaSpan) {
        sinhalaSpan.textContent = displayChar;
      }
    });
  }

  function handleKeyClick(e) {
    const key = e.currentTarget;
    const englishKey = key.getAttribute('data-english');
    let sinhalaChar = '';

    // Get character based on current state
    switch(currentState) {
      case 'normal':
        sinhalaChar = key.getAttribute('data-sinhala');
        break;
      case 'shift':
        sinhalaChar = key.getAttribute('data-shifted') || key.getAttribute('data-sinhala');
        break;
      case 'altgr':
        sinhalaChar = key.getAttribute('data-altgr') || key.getAttribute('data-sinhala');
        break;
    }

    // Visual feedback
    key.classList.add('pressed');
    setTimeout(() => {
      key.classList.remove('pressed');
    }, 150);

    // Add character to text
    addCharacter(sinhalaChar, englishKey);
  }

  function handleKeyTouch(e) {
    e.preventDefault();
    const key = e.currentTarget;
    key.click();
  }

  function handleKeyboardInput(e) {
    if (!isTypingMode) return;

    const key = e.key;
    const keyElement = document.querySelector(`[data-english="${key}"]`);
    
    if (keyElement) {
      let sinhalaChar = '';
      
      // Get character based on current state and modifiers
      if (e.altKey) {
        sinhalaChar = keyElement.getAttribute('data-altgr') || keyElement.getAttribute('data-sinhala');
      } else if (e.shiftKey) {
        sinhalaChar = keyElement.getAttribute('data-shifted') || keyElement.getAttribute('data-sinhala');
      } else {
        sinhalaChar = keyElement.getAttribute('data-sinhala');
      }
      
      addCharacter(sinhalaChar, key);
      
      // Visual feedback
      keyElement.classList.add('pressed');
      setTimeout(() => {
        keyElement.classList.remove('pressed');
      }, 150);
    } else if (key === ' ') {
      // Handle space
      addCharacter(' ', 'Space');
    } else if (key === 'Enter') {
      // Handle enter
      addCharacter('\n', 'Enter');
    } else if (key === 'Backspace') {
      // Handle backspace
      removeLastCharacter();
    }
  }

  function addCharacter(sinhalaChar, englishKey) {
    if (sinhalaChar === ' ') {
      currentText += ' ';
    } else if (sinhalaChar === '\n') {
      currentText += '\n';
    } else if (sinhalaChar === '⌫') {
      removeLastCharacter();
      return;
    } else if (sinhalaChar && sinhalaChar !== englishKey) {
      currentText += sinhalaChar;
    } else {
      currentText += englishKey;
    }

    updateDisplay();
    
    // Show feedback
    showKeyFeedback(englishKey, sinhalaChar);
  }

  function removeLastCharacter() {
    if (currentText.length > 0) {
      currentText = currentText.slice(0, -1);
      updateDisplay();
    }
  }

  function updateDisplay() {
    demoTextDisplay.textContent = currentText || 'Click on keyboard keys to see Sinhala characters appear here...';
    demoInput.value = currentText;
  }

  function showKeyFeedback(englishKey, sinhalaChar) {
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.textContent = `${englishKey} → ${sinhalaChar}`;
    feedback.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--primary);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
      feedback.style.opacity = '1';
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(feedback);
      }, 300);
    }, 1000);
  }

  function clearText() {
    currentText = '';
    updateDisplay();
    
    // Visual feedback
    clearDemoBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      clearDemoBtn.style.transform = 'scale(1)';
    }, 150);
  }

  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    modeToggle.textContent = isDark ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('darkMode', isDark);
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
    // Ctrl/Cmd + K to focus demo input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      demoInput.focus();
    }
    
    // Ctrl/Cmd + L to clear text
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      clearText();
    }
  });

  // Add help tooltip
  const helpTooltip = document.createElement('div');
  helpTooltip.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem;
      font-size: 0.9rem;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      z-index: 1000;
    ">
      <strong>Keyboard Shortcuts:</strong><br>
      • Ctrl/Cmd + K: Focus input<br>
      • Ctrl/Cmd + L: Clear text<br>
      • Click keys or type directly<br>
      • Use state buttons to switch modes
    </div>
  `;
  
  // Show tooltip for first time users
  if (!localStorage.getItem('layoutHelpShown')) {
    document.body.appendChild(helpTooltip);
    setTimeout(() => {
      if (helpTooltip.parentNode) {
        helpTooltip.style.opacity = '0';
        setTimeout(() => {
          if (helpTooltip.parentNode) {
            document.body.removeChild(helpTooltip);
          }
        }, 500);
      }
    }, 5000);
    localStorage.setItem('layoutHelpShown', 'true');
  }

  // Add accessibility features
  keys.forEach(key => {
    const englishKey = key.getAttribute('data-english');
    const sinhalaChar = key.getAttribute('data-sinhala');
    key.setAttribute('aria-label', `Press ${englishKey} to type ${sinhalaChar}`);
    key.setAttribute('tabindex', '0');
    
    key.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        key.click();
      }
    });
  });

  // Add performance optimizations
  let animationFrameId;
  function optimizedUpdate() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(updateDisplay);
  }

  // Replace updateDisplay with optimized version
  const originalUpdateDisplay = updateDisplay;
  updateDisplay = optimizedUpdate;
}); 