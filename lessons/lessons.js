// Lessons JavaScript Functionality
class LessonsManager {
  constructor() {
    this.currentCategory = null;
    this.currentLesson = null;
    this.lessonProgress = this.loadProgress();
    this.init();
  }

  init() {
    this.renderCategories();
    this.bindEvents();
  }

  loadProgress() {
    const saved = localStorage.getItem('lessonProgress');
    return saved ? JSON.parse(saved) : {};
  }

  saveProgress() {
    localStorage.setItem('lessonProgress', JSON.stringify(this.lessonProgress));
  }

  renderCategories() {
    const container = document.querySelector('.lessons-categories');
    if (!container) return;

    container.innerHTML = '';
    
    Object.entries(LESSONS_DATA).forEach(([key, category]) => {
      const categoryElement = this.createCategoryElement(key, category);
      container.appendChild(categoryElement);
    });
  }

  createCategoryElement(key, category) {
    const div = document.createElement('div');
    div.className = 'lesson-category';
    div.dataset.category = key;
    
    const icon = this.getCategoryIcon(key);
    
    div.innerHTML = `
      <h3>
        <span class="category-icon">${icon}</span>
        ${category.title}
      </h3>
      <p>${category.description}</p>
      <span class="lesson-count">${category.lessons.length} පාඩම්</span>
    `;
    
    return div;
  }

  getCategoryIcon(categoryKey) {
    const icons = {
      alphabet: '🔤',
      character_exercises: '⌨️',
      word_formation: '📝',
      advanced: '🚀'
    };
    return icons[categoryKey] || '📚';
  }

  renderLessons(categoryKey) {
    const category = LESSONS_DATA[categoryKey];
    if (!category) return;

    this.currentCategory = categoryKey;
    
    const container = document.querySelector('.lessons-list');
    if (!container) return;

    container.innerHTML = `
      <div class="lessons-list-header">
        <h2>${category.title}</h2>
        <button class="back-to-categories">← පසුගිය</button>
      </div>
      <div class="lessons-items">
        ${category.lessons.map(lesson => this.createLessonElement(lesson)).join('')}
      </div>
    `;

    container.classList.add('active');
    document.querySelector('.lessons-categories').style.display = 'none';
  }

  createLessonElement(lesson) {
    const progress = this.lessonProgress[lesson.id] || { status: 'not-started', accuracy: 0, attempts: 0 };
    const statusClass = progress.status;
    
    return `\
      <div class="lesson-item" data-lesson-id="${lesson.id}">
        <h4>
          ${lesson.title}
          <span class="lesson-status ${statusClass}">
            ${this.getStatusText(progress.status)}
          </span>
        </h4>
        <p>${lesson.description}</p>
        <div class="lesson-hint">
          <strong>Keyboard Hints:</strong><br>
          <div class="keyboard-hints">
            <div class="keyboard-hint-item">
              <span class="keyboard-hint-label">Phonetic:</span>
              <span class="keyboard-hint-value">${lesson.keyboard_hints.phonetic}</span>
            </div>
            <div class="keyboard-hint-item">
              <span class="keyboard-hint-label">Wijesekara:</span>
              <span class="keyboard-hint-value">${lesson.keyboard_hints.wijesekara}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getStatusText(status) {
    const texts = {
      'not-started': 'ආරම්භ නොකළ',
      'in-progress': 'පවතී',
      'completed': 'සම්පූර්ණ'
    };
    return texts[status] || 'ආරම්භ නොකළ';
  }

  renderPractice(lessonId) {
    const category = LESSONS_DATA[this.currentCategory];
    const lesson = category.lessons.find(l => l.id === lessonId);
    
    if (!lesson) return;

    this.currentLesson = lesson;
    
    const container = document.querySelector('.lesson-practice');
    if (!container) return;

    container.innerHTML = `
      <div class="lesson-practice-header">
        <h2>${lesson.title}</h2>
        <p>${lesson.description}</p>
      </div>
      
      <div class="lesson-content">
        <strong>Content to Practice:</strong><br>
        ${lesson.content}
      </div>
      
      <div class="lesson-practice-area">
        <h4>Practice Text</h4>
        <div class="lesson-practice-text" id="practice-text">
          ${lesson.practice}
        </div>
        <textarea 
          class="lesson-practice-input" 
          id="practice-input" 
          placeholder="Type the text above here..."
        ></textarea>
      </div>
      
      <div class="lesson-progress">
        <h4>Progress</h4>
        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
        </div>
      </div>
      
      <div class="lesson-stats">
        <div class="lesson-stat">
          <span class="stat-value" id="accuracy-stat">0</span>
          <span class="stat-label">Accuracy</span>
        </div>
        <div class="lesson-stat">
          <span class="stat-value" id="speed-stat">0</span>
          <span class="stat-label">WPM</span>
        </div>
        <div class="lesson-stat">
          <span class="stat-value" id="attempts-stat">0</span>
          <span class="stat-label">Attempts</span>
        </div>
      </div>
      
      <div class="lesson-controls">
        <button class="lesson-btn secondary" id="back-to-lessons">← පසුගිය</button>
        <button class="lesson-btn primary" id="start-practice">Start Practice</button>
        <button class="lesson-btn secondary" id="reset-practice">Reset</button>
      </div>
    `;

    container.classList.add('active');
    document.querySelector('.lessons-list').classList.remove('active');
    
    this.bindPracticeEvents();
  }

  bindPracticeEvents() {
    const practiceInput = document.getElementById('practice-input');
    const practiceText = document.getElementById('practice-text');
    const startBtn = document.getElementById('start-practice');
    const resetBtn = document.getElementById('reset-practice');
    const backBtn = document.getElementById('back-to-lessons');

    let practiceStarted = false;
    let startTime = null;
    let timer = null;

    startBtn.addEventListener('click', () => {
      if (!practiceStarted) {
        practiceStarted = true;
        startTime = Date.now();
        practiceInput.disabled = false;
        practiceInput.focus();
        startBtn.textContent = 'Practice Active';
        startBtn.disabled = true;
        
        // Start timer for WPM calculation
        timer = setInterval(() => {
          this.updatePracticeStats();
        }, 1000);
      }
    });

    resetBtn.addEventListener('click', () => {
      practiceInput.value = '';
      practiceInput.disabled = true;
      practiceStarted = false;
      startTime = null;
      startBtn.textContent = 'Start Practice';
      startBtn.disabled = false;
      this.resetPracticeStats();
      if (timer) clearInterval(timer);
    });

    backBtn.addEventListener('click', () => {
      this.showLessonsList();
    });

    practiceInput.addEventListener('input', () => {
      if (!practiceStarted) return;
      
      const input = practiceInput.value;
      const target = this.currentLesson.practice;
      
      // Calculate accuracy
      let correct = 0;
      const minLength = Math.min(input.length, target.length);
      
      for (let i = 0; i < minLength; i++) {
        if (input[i] === target[i]) correct++;
      }
      
      const accuracy = minLength > 0 ? Math.round((correct / minLength) * 100) : 0;
      
      // Update progress bar
      const progress = Math.min((input.length / target.length) * 100, 100);
      document.getElementById('progress-fill').style.width = progress + '%';
      
      // Update accuracy
      document.getElementById('accuracy-stat').textContent = accuracy;
      
      // Check if completed
      if (input === target) {
        this.completeLesson();
      }
    });
  }

  updatePracticeStats() {
    if (!startTime) return;
    
    const practiceInput = document.getElementById('practice-input');
    const input = practiceInput.value;
    const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
    
    if (elapsed > 0) {
      const words = input.trim().split(/\s+/).filter(Boolean).length;
      const wpm = Math.round(words / elapsed);
      document.getElementById('speed-stat').textContent = wpm;
    }
  }

  resetPracticeStats() {
    document.getElementById('progress-fill').style.width = '0%';
    document.getElementById('accuracy-stat').textContent = '0';
    document.getElementById('speed-stat').textContent = '0';
  }

  completeLesson() {
    const practiceInput = document.getElementById('practice-input');
    const accuracy = parseInt(document.getElementById('accuracy-stat').textContent);
    const wpm = parseInt(document.getElementById('speed-stat').textContent);
    
    // Update progress
    if (!this.lessonProgress[this.currentLesson.id]) {
      this.lessonProgress[this.currentLesson.id] = { attempts: 0, accuracy: 0, wpm: 0 };
    }
    
    this.lessonProgress[this.currentLesson.id].attempts++;
    this.lessonProgress[this.currentLesson.id].accuracy = Math.max(
      this.lessonProgress[this.currentLesson.id].accuracy, 
      accuracy
    );
    this.lessonProgress[this.currentLesson.id].wpm = Math.max(
      this.lessonProgress[this.currentLesson.id].wpm, 
      wpm
    );
    
    if (accuracy >= 80) {
      this.lessonProgress[this.currentLesson.id].status = 'completed';
    } else {
      this.lessonProgress[this.currentLesson.id].status = 'in-progress';
    }
    
    this.saveProgress();
    
    // Show completion message
    if (typeof showToast === 'function') {
      showToast(`Lesson completed! Accuracy: ${accuracy}%, WPM: ${wpm}`);
    }
    
    // Update lesson status in the list
    setTimeout(() => {
      this.showLessonsList();
    }, 2000);
  }

  showLessonsList() {
    document.querySelector('.lesson-practice').classList.remove('active');
    document.querySelector('.lessons-list').classList.add('active');
    document.querySelector('.lessons-categories').style.display = 'grid';
    
    // Re-render lessons to show updated status
    this.renderLessons(this.currentCategory);
  }

  bindEvents() {
    // Category click events
    document.addEventListener('click', (e) => {
      if (e.target.closest('.lesson-category')) {
        const category = e.target.closest('.lesson-category').dataset.category;
        this.renderLessons(category);
      }
      
      if (e.target.closest('.lesson-item')) {
        const lessonId = e.target.closest('.lesson-item').dataset.lessonId;
        this.renderPractice(lessonId);
      }
      
      if (e.target.closest('.back-to-categories')) {
        document.querySelector('.lessons-list').classList.remove('active');
        document.querySelector('.lessons-categories').style.display = 'grid';
      }
    });
  }
}

// Initialize lessons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Load lessons data
  const script = document.createElement('script');
  script.src = 'lessons/lessons-data.js';
  script.onload = () => {
    new LessonsManager();
  };
  document.head.appendChild(script);
}); 