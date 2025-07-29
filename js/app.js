// Sinhala sentences/words for each difficulty
const DATA = {
  easy: [
    'අම්මා', 'තාත්තා', 'පාසල', 'ගුරුතුමා', 'මිතුරා', 'පොත', 'දොර', 'කඩය', 'ගෙදර', 'මල්',
    'කුරුල්ලෝ', 'ගඟ', 'කිරි', 'ඇඳ', 'කුරුස', 'මීයා', 'පැන්', 'ඉස්කෝලේ', 'අයියා', 'නංගි'
  ],
  medium: [
    'අද පාසලට යන්න ඕනේ', 'මම පොතක් කියවන්නෙමි', 'ඔබ කොහෙද යන්නේ?', 'අපි ක්‍රීඩා කරමු',
    'මල් වගාව ලස්සනයි', 'මගේ මිතුරා හොඳයි', 'ඇය ගෙදර යයි', 'ඔහු කඩයට ගියේය',
    'අපි කිරි බොමු', 'ඔවුන් ගඟේ නානවා'
  ],
  hard: [
    'සිංහල භාෂාව ඉතා සරල හා ලස්සන භාෂාවකි', 'අපි සියලු දෙනා එකට වැඩ කළ යුතුය',
    'මගේ අයියා විශ්වවිද්‍යාලයෙහි ඉගෙන ගනී', 'ඔහුගේ මිතුරාගේ උපන්දිනය අදයි',
    'අපි පරිසරය ආරක්ෂා කළ යුතුය', 'ඔබේ සිහිනය සැබෑ කරගන්න',
    'මම කාලය නාස්ති නොකර වැඩ කරමි', 'ඇයගේ ගුරුවරයා ඉතා හොඳයි',
    'අපි එකිනෙකාට උදව් කළ යුතුය', 'ඔහුගේ අම්මා රසවත් කෑමක් පිසදමයි'
  ]
};

let currentSentence = '';
let startTime = null;
let timer = null;
let typedChars = 0;
let correctChars = 0;
let finished = false;
let totalCorrectChars = 0;
let totalTypedChars = 0;
let correctWords = 0;
let incorrectWords = 0;
let testStarted = false;
let wordsSoFar = 0;

const sentenceDisplay = document.getElementById('sentence-display');
const typingInput = document.getElementById('typing-input');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const feedback = document.getElementById('feedback');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const difficultySelect = document.getElementById('difficulty');
const modeToggle = document.getElementById('mode-toggle');
const timerDisplay = document.getElementById('timer-display');
const timeSelect = document.getElementById('time-select');
let countdown = null;
let timeLeft = 60;
const defaultTimerColor = timerDisplay.style.color || '';
const keyboardMethod = document.getElementById('keyboard-method');
const customTextSection = document.querySelector('.custom-text-section');
const customTextInput = document.getElementById('custom-text-input');
const wijesekaraSuggestToggle = document.getElementById('wijesekara-suggest-toggle');
const wijesekaraSuggestTooltip = document.getElementById('wijesekara-suggest-tooltip');
let wijesekaraSuggestOn = false;
const countdownSound = document.getElementById('countdown-sound');

// Wijesekara mapping (basic, for demonstration)
const WIJESEKARA_MAP = {
  'a': 'අ', 'A': 'ආ', 'b': 'බ', 'B': 'භ', 'c': 'ච', 'C': 'ඡ', 'd': 'ද', 'D': 'ධ',
  'e': 'එ', 'E': 'ඒ', 'f': 'ෆ', 'g': 'ග', 'G': 'ඝ', 'h': 'හ', 'H': 'ඨ', 'i': 'ඉ',
  'I': 'ඊ', 'j': 'ජ', 'J': 'ඣ', 'k': 'ක', 'K': 'ඛ', 'l': 'ල', 'L': 'ළ', 'm': 'ම',
  'n': 'න', 'N': 'ණ', 'o': 'ඔ', 'O': 'ඕ', 'p': 'ප', 'P': 'ඵ', 'q': 'ඤ', 'r': 'ර',
  'R': 'ඍ', 's': 'ස', 'S': 'ශ', 't': 'ත', 'T': 'ථ', 'u': 'උ', 'U': 'ඌ', 'v': 'ව',
  'w': 'ව', 'W': 'ඡ', 'x': 'ක්‍ෂ', 'y': 'ය', 'Y': 'ය', 'z': 'ඣ', 'Z': 'ඣ',
  // Add more for full layout
};

function wijesekaraTransliterate(input) {
  let out = '';
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    out += WIJESEKARA_MAP[c] || c;
  }
  return out;
}

// --- Sinhala Phonetic Transliteration ---
// Basic mapping for common Sinhala sounds
const PHONETIC_MAP = [
  ['aa', 'ආ'], ['ae', 'ඇ'], ['ai', 'ඓ'], ['au', 'ඖ'],
  ['a', 'අ'], ['b', 'බ'], ['ch', 'ච'], ['d', 'ද'], ['dh', 'ධ'], ['e', 'එ'], ['ee', 'ඊ'], ['ei', 'ඒ'],
  ['g', 'ග'], ['h', 'හ'], ['i', 'ඉ'], ['ii', 'ඊ'], ['j', 'ජ'], ['k', 'ක'], ['l', 'ල'], ['m', 'ම'],
  ['n', 'න'], ['ng', 'ඞ'], ['o', 'ඔ'], ['oo', 'ඕ'], ['p', 'ප'], ['r', 'ර'], ['s', 'ස'], ['t', 'ත'],
  ['th', 'ථ'], ['u', 'උ'], ['uu', 'ඌ'], ['v', 'ව'], ['w', 'ව'], ['y', 'ය'], ['sh', 'ශ'], ['gn', 'ඥ'],
  ['ṭ', 'ට'], ['ḍ', 'ඩ'], ['ṇ', 'ණ'], ['ḷ', 'ළ'], ['ś', 'ෂ'], ['f', 'ෆ'], ['z', 'ඤ'],
  // Vowel signs (matra)
  ['aa', 'ා'], ['ae', 'ැ'], ['ai', 'ෛ'], ['au', 'ෞ'], ['e', 'ෙ'], ['ee', 'ී'], ['ei', 'ේ'], ['i', 'ි'], ['ii', 'ී'], ['o', 'ො'], ['oo', 'ෝ'], ['u', 'ු'], ['uu', 'ූ'],
  // Special
  ['ṃ', 'ං'], ['ḥ', 'ඃ'], ['ṁ', 'ං'], ['ṅ', 'ං'],
];

function transliterateToSinhala(input) {
  let text = input;
  // Sort by length to match longest first
  PHONETIC_MAP.sort((a, b) => b[0].length - a[0].length);
  for (const [en, si] of PHONETIC_MAP) {
    const re = new RegExp(en, 'g');
    text = text.replace(re, si);
  }
  return text;
}

function updateProgressBar() {
  const val = typingInput.value;
  const total = currentSentence.length;
  const percent = Math.min((val.length / total) * 100, 100);
  document.getElementById('progress-bar').style.width = percent + '%';
}

function renderSentenceDisplay() {
  const val = typingInput.value;
  let html = '';
  for (let i = 0; i < currentSentence.length; i++) {
    if (i < val.length) {
      if (val[i] === currentSentence[i]) {
        html += `<span class='correct-char'>${currentSentence[i]}</span>`;
      } else {
        html += `<span class='mistake-char'>${currentSentence[i]}</span>`;
      }
    } else {
      html += `<span class='pending-char'>${currentSentence[i]}</span>`;
    }
  }
  sentenceDisplay.innerHTML = html;
  updateProgressBar();
}

// --- Replace input with Sinhala in real-time, based on method ---
typingInput.addEventListener('keydown', (e) => {
  if (!testStarted && !finished && e.key.length === 1 && typingInput.value.length === 0) {
    // Auto start on first key if not started
    startBtn.style.display = 'none';
    startBtn.disabled = true;
    startTest();
    testStarted = true;
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    if (finished) return;

    const val = typingInput.value;
    if (val.length === 0) return;

    // Calculate word count before clearing input
    let words = 0;
    if (val.trim().length > 0) {
      words = val.trim().split(/\s+/).filter(Boolean).length;
    }
    wordsSoFar += words;
    document.getElementById('word-count').textContent = wordsSoFar;

    if (val === currentSentence) {
      correctWords++;
    } else {
      incorrectWords++;
    }

    totalCorrectChars += val.split('').filter((char, i) => char === currentSentence[i]).length;
    totalTypedChars += currentSentence.length;

    const elapsed = (Date.now() - startTime) / 1000 / 60;
    const wpm = elapsed > 0 ? Math.round(((totalCorrectChars / 5) / elapsed)) : 0;
    const accuracy = totalTypedChars > 0 ? Math.round((totalCorrectChars / totalTypedChars) * 100) : 0;

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;

    currentSentence = pickSentence();
    typingInput.value = '';
    renderSentenceDisplay();
    updateProgressBar();
    // Do not reset word count here; keep cumulative value
  }
});

typingInput.addEventListener('input', (e) => {
  if (!testStarted && !finished && typingInput.value.length > 0) {
    // Auto start on first input if not started
    startBtn.style.display = 'none';
    startBtn.disabled = true;
    startTest();
    testStarted = true;
  }
  if (finished) return;
  const caret = typingInput.selectionStart;
  let sinhala = typingInput.value;
  if (keyboardMethod.value === 'phonetic') {
    sinhala = transliterateToSinhala(typingInput.value);
  } else if (keyboardMethod.value === 'wijesekara') {
    sinhala = wijesekaraTransliterate(typingInput.value);
  } else if (keyboardMethod.value === 'unicode') {
    sinhala = typingInput.value;
  }
  typingInput.value = sinhala;
  typingInput.setSelectionRange(caret, caret);
  renderSentenceDisplay();
  updateProgressBar();
  // Real-time cumulative word count
  let words = 0;
  if (typingInput.value.trim().length > 0) {
    words = typingInput.value.trim().split(/\s+/).filter(Boolean).length;
  }
  document.getElementById('word-count').textContent = wordsSoFar + words;
});

function pickSentence() {
  const level = difficultySelect.value;
  if (level === 'custom') {
    const customText = customTextInput.value.trim();
    if (customText) {
      const sentences = customText.split(/[\n\.?!]+/).filter(s => s.trim().length > 0);
      return sentences[Math.floor(Math.random() * sentences.length)];
    }
    return "Please enter some custom text to practice.";
  }
  const arr = DATA[level];
  return arr[Math.floor(Math.random() * arr.length)];
}

function resetStats() {
  wpmDisplay.textContent = '0';
  accuracyDisplay.textContent = '0';
  feedback.textContent = '';
  document.getElementById('word-count').textContent = '0';
  wordsSoFar = 0;
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

// Fix timer initialization and start button functionality
function resetTimer() {
  clearInterval(countdown);
  timeLeft = parseInt(timeSelect.value, 10);
  timerDisplay.textContent = formatTime(timeLeft);
  timerDisplay.style.color = defaultTimerColor;
  if (countdownSound) countdownSound.pause();
  // Ensure timer display is visible and properly formatted
  timerDisplay.style.display = 'inline-block';
}

function startTimer(resumeMode = false) {
  if (!resumeMode) {
    resetTimer();
  }
  clearInterval(countdown);
  
  // Ensure timer starts immediately
  timerDisplay.textContent = formatTime(timeLeft);
  
  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);
    
    // Add visual feedback for timer
    if (timeLeft <= 10) {
      timerDisplay.style.color = '#e11d48';
      timerDisplay.classList.add('pulse');
      if (countdownSound) {
        countdownSound.currentTime = 0;
        countdownSound.play().catch(e => console.log('Audio play failed:', e));
      }
    } else {
      timerDisplay.style.color = defaultTimerColor;
      timerDisplay.classList.remove('pulse');
    }
    
    localStorage.setItem('testTimeLeft', timeLeft);
    
    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = '00:00';
      timerDisplay.style.color = defaultTimerColor;
      timerDisplay.classList.remove('pulse');
      if (countdownSound) countdownSound.pause();
      endTest();
    }
  }, 1000);
}

function startTest() {
  console.log('Start test called'); // Debug log
  
  // Reset all states
  finished = false;
  testStarted = true;
  wordsSoFar = 0;
  
  // Pick new sentence
  currentSentence = pickSentence();
  renderSentenceDisplay();
  updateProgressBar();
  
  // Reset input
  typingInput.value = '';
  typingInput.disabled = false;
  typingInput.focus();
  
  // Reset timing and stats
  startTime = Date.now();
  totalCorrectChars = 0;
  totalTypedChars = 0;
  correctWords = 0;
  incorrectWords = 0;
  resetStats();
  
  // Update UI
  startBtn.style.display = 'none';
  startBtn.disabled = true;
  timeSelect.disabled = true;
  
  // Save state and start timer
  saveTestState();
  
  // Ensure timer starts properly
  console.log('Starting timer with timeLeft:', timeLeft); // Debug log
  startTimer();
  
  // Show feedback
  feedback.textContent = 'Test started! Start typing...';
}

// Enhanced start button event listener
startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Start button clicked'); // Debug log
  
  // Ensure button is properly disabled
  startBtn.disabled = true;
  startBtn.style.display = 'none';
  
  // Start the test
  startTest();
});

// Fix restart button functionality
restartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Restart button clicked'); // Debug log
  
  // Reset everything
  clearInterval(countdown);
  resetTimer();
  resetStats();
  
  // Reset UI
  startBtn.style.display = 'inline-block';
  startBtn.disabled = false;
  timeSelect.disabled = false;
  typingInput.disabled = true;
  typingInput.value = '';
  
  // Clear feedback
  feedback.textContent = '';
  
  // Clear test state
  clearTestState();
  
  // Reset sentence display
  currentSentence = '';
  renderSentenceDisplay();
  updateProgressBar();
});

function endTest() {
  finished = true;
  testStarted = false;
  wordsSoFar = 0;
  typingInput.disabled = true;
  feedback.textContent = 'Finished!';
  clearInterval(countdown);
  clearTestState();
  const wpm = parseInt(wpmDisplay.textContent, 10);
  const accuracy = parseInt(accuracyDisplay.textContent, 10);
  if (wpm > 0) {
    saveToLeaderboard(wpm, accuracy);
    renderLeaderboard();
  }
  showSessionReport();
  timeSelect.disabled = false;
}

// Remove all references to restartBtn
// --- Persistent User Settings (localStorage) ---
// Save on change

difficultySelect.addEventListener('change', () => {
  localStorage.setItem('difficulty', difficultySelect.value);
  if (difficultySelect.value === 'custom') {
    customTextSection.style.display = 'block';
  } else {
    customTextSection.style.display = 'none';
  }
  clearTestState();
  startBtn.style.display = 'inline-block';
  startBtn.disabled = false;
  resetStats();
  resetTimer();
});

timeSelect.addEventListener('change', () => {
  localStorage.setItem('time', timeSelect.value);
  clearTestState();
  startBtn.style.display = 'inline-block';
  startBtn.disabled = false;
  resetStats();
  resetTimer();
});

keyboardMethod.addEventListener('change', () => {
  localStorage.setItem('keyboardMethod', keyboardMethod.value);
  if (keyboardMethod.value === 'wijesekara') {
    wijesekaraSuggestToggle.style.display = 'inline-block';
  } else {
    wijesekaraSuggestToggle.style.display = 'none';
    wijesekaraSuggestTooltip.style.display = 'none';
  }
});

customTextInput.addEventListener('input', () => {
  localStorage.setItem('customText', customTextInput.value);
});

// Restore on load
window.addEventListener('DOMContentLoaded', function() {
  const savedDifficulty = localStorage.getItem('difficulty');
  if (savedDifficulty) difficultySelect.value = savedDifficulty;
  const savedTime = localStorage.getItem('time');
  if (savedTime) timeSelect.value = savedTime;
  const savedKeyboard = localStorage.getItem('keyboardMethod');
  if (savedKeyboard) keyboardMethod.value = savedKeyboard;
  const savedCustomText = localStorage.getItem('customText');
  if (savedCustomText) customTextInput.value = savedCustomText;
  // Show/hide custom text section
  if (difficultySelect.value === 'custom') {
    customTextSection.style.display = 'block';
  } else {
    customTextSection.style.display = 'none';
  }
  // Theme and premium already handled below
  // Restore dark mode
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    modeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    modeToggle.textContent = '🌙';
  }
  // Restore test state if running
  const testState = localStorage.getItem('testState');
  if (testState === 'running') {
    restoreTestState();
  } else {
    resetStats();
    startBtn.style.display = 'inline-block';
    startBtn.disabled = false;
    resetTimer();
  }
});

function saveTestState() {
  localStorage.setItem('testState', 'running');
  localStorage.setItem('testStartTime', startTime);
  localStorage.setItem('testTimeLeft', timeLeft);
  localStorage.setItem('testCurrentSentence', currentSentence);
  localStorage.setItem('testTypedInput', typingInput.value);
  localStorage.setItem('testTotalCorrectChars', totalCorrectChars);
  localStorage.setItem('testTotalTypedChars', totalTypedChars);
  localStorage.setItem('testCorrectWords', correctWords);
  localStorage.setItem('testIncorrectWords', incorrectWords);
}
function clearTestState() {
  localStorage.removeItem('testState');
  localStorage.removeItem('testStartTime');
  localStorage.removeItem('testTimeLeft');
  localStorage.removeItem('testCurrentSentence');
  localStorage.removeItem('testTypedInput');
  localStorage.removeItem('testTotalCorrectChars');
  localStorage.removeItem('testTotalTypedChars');
  localStorage.removeItem('testCorrectWords');
  localStorage.removeItem('testIncorrectWords');
}
function restoreTestState() {
  finished = false;
  testStarted = true;
  currentSentence = localStorage.getItem('testCurrentSentence') || pickSentence();
  renderSentenceDisplay();
  updateProgressBar();
  typingInput.value = localStorage.getItem('testTypedInput') || '';
  typingInput.disabled = false;
  typingInput.focus();
  startTime = parseInt(localStorage.getItem('testStartTime'), 10) || Date.now();
  totalCorrectChars = parseInt(localStorage.getItem('testTotalCorrectChars'), 10) || 0;
  totalTypedChars = parseInt(localStorage.getItem('testTotalTypedChars'), 10) || 0;
  correctWords = parseInt(localStorage.getItem('testCorrectWords'), 10) || 0;
  incorrectWords = parseInt(localStorage.getItem('testIncorrectWords'), 10) || 0;
  wpmDisplay.textContent = Math.round(((totalCorrectChars / 5) / (((Date.now() - startTime) / 1000) / 60))) || '0';
  accuracyDisplay.textContent = totalTypedChars > 0 ? Math.round((totalCorrectChars / totalTypedChars) * 100) : '0';
  feedback.textContent = '';
  timeLeft = parseInt(localStorage.getItem('testTimeLeft'), 10) || parseInt(timeSelect.value, 10);
  timerDisplay.textContent = formatTime(timeLeft);
  timerDisplay.style.color = defaultTimerColor;
  startBtn.style.display = 'none';
  startBtn.disabled = true;
  startTimer(true); // resume mode
}

// Dark/Light mode toggle
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  modeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  // Save to localStorage
  localStorage.setItem('darkMode', document.body.classList.contains('dark') ? 'true' : 'false');
});

const modeToggleMobile = document.getElementById('mode-toggle-mobile');
if (modeToggleMobile) {
  modeToggleMobile.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    modeToggleMobile.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    modeToggle.textContent = modeToggleMobile.textContent;
    localStorage.setItem('darkMode', document.body.classList.contains('dark') ? 'true' : 'false');
  });
}
// Keep both buttons in sync on load
if (localStorage.getItem('darkMode') === 'true') {
  if (modeToggleMobile) modeToggleMobile.textContent = '☀️';
  if (modeToggle) modeToggle.textContent = '☀️';
} else {
  if (modeToggleMobile) modeToggleMobile.textContent = '🌙';
  if (modeToggle) modeToggle.textContent = '🌙';
}

// Mobile: focus input on sentence click
sentenceDisplay.addEventListener('click', () => {
  typingInput.focus();
});

// Sound feedback
const successSound = new Audio('assets/success.mp3');
const errorSound = new Audio('assets/error.mp3');
let lastFeedback = '';

// Help Modal
const helpBtn = document.getElementById('help-btn');
const helpModal = document.getElementById('help-modal');
const closeModalHelp = document.querySelector('.close-modal-help');

// About Modal
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const closeModalAbout = document.querySelector('.close-modal-about');

const mainContent = document.querySelector('main');

helpBtn.addEventListener('click', () => {
  helpModal.style.display = 'flex';
  mainContent.classList.add('blur-background');
  if (keyboardMethod.value === 'wijesekara') {
    phoneticGuide.style.display = 'none';
    wijesekaraGuide.style.display = 'block';
  } else {
    phoneticGuide.style.display = 'block';
    wijesekaraGuide.style.display = 'none';
  }
});

aboutBtn.addEventListener('click', () => {
  aboutModal.style.display = 'flex';
  mainContent.classList.add('blur-background');
});

closeModalHelp.addEventListener('click', () => {
  helpModal.style.display = 'none';
  mainContent.classList.remove('blur-background');
});

closeModalAbout.addEventListener('click', () => {
  aboutModal.style.display = 'none';
  mainContent.classList.remove('blur-background');
});

window.addEventListener('click', (e) => {
  if (e.target === helpModal) {
    helpModal.style.display = 'none';
    mainContent.classList.remove('blur-background');
  }
  if (e.target === aboutModal) {
    aboutModal.style.display = 'none';
    mainContent.classList.remove('blur-background');
  }
});

// Initial state
resetStats();
startBtn.style.display = 'inline-block';
startBtn.disabled = false;
resetTimer();

// Session Report Modal
function showSessionReport() {
  const wpm = parseInt(wpmDisplay.textContent, 10);
  const accuracy = parseInt(accuracyDisplay.textContent, 10);
  const cpm = Math.round((totalCorrectChars / ((Date.now() - startTime) / 1000)) * 60) || 0;
  // Determine level and illustration
  let level = 'Turtle';
  let emoji = '🐢';
  let heading = "You're a Turtle.";
  let summary = `Well... You type with the speed of <b>${wpm} WPM</b> (${cpm} CPM). Your accuracy was <b>${accuracy}%</b>. It could be better!`;
  if (wpm >= 40 && accuracy >= 90) {
    level = 'Cheetah';
    emoji = '🐆';
    heading = "You're a Cheetah!";
    summary = `Amazing! You type with the speed of <b>${wpm} WPM</b> (${cpm} CPM). Your accuracy was <b>${accuracy}%</b>. Lightning fast!`;
  } else if (wpm >= 25 && accuracy >= 80) {
    level = 'Lion';
    emoji = '🦁';
    heading = "You're a Lion!";
    summary = `Great! You type with the speed of <b>${wpm} WPM</b> (${cpm} CPM). Your accuracy was <b>${accuracy}%</b>. Keep it up!`;
  } else if (wpm >= 15 && accuracy >= 60) {
    level = 'Fox';
    emoji = '🦊';
    heading = "You're a Fox!";
    summary = `Good! You type with the speed of <b>${wpm} WPM</b> (${cpm} CPM). Your accuracy was <b>${accuracy}%</b>. Getting better!`;
  }
  document.getElementById('report-illustration').innerHTML = `<span style="font-size:3.5rem;">${emoji}</span>`;
  document.getElementById('report-heading').textContent = heading;
  document.getElementById('report-summary').innerHTML = summary;
  document.getElementById('report-wpm').textContent = wpm;
  document.getElementById('report-cpm').textContent = cpm;
  document.getElementById('report-accuracy').textContent = accuracy;
  document.getElementById('session-report-modal').style.display = 'flex';
  mainContent.classList.add('blur-background');
  startBtn.disabled = true;
}

// Modal Restart Button
const modalRestartBtn = document.getElementById('modal-restart-btn');
modalRestartBtn.addEventListener('click', () => {
  document.getElementById('session-report-modal').style.display = 'none';
  mainContent.classList.remove('blur-background');
  startBtn.disabled = false;
  startTest();
});

// Close Session Report Modal
const closeModalReport = document.querySelector('.close-modal-report');
closeModalReport.addEventListener('click', () => {
  document.getElementById('session-report-modal').style.display = 'none';
  mainContent.classList.remove('blur-background');
  startBtn.disabled = false;
});

window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('session-report-modal')) {
    document.getElementById('session-report-modal').style.display = 'none';
    mainContent.classList.remove('blur-background');
    startBtn.disabled = false;
  }
});

// Show/hide suggestion toggle only for Wijesekara
keyboardMethod.addEventListener('change', () => {
  if (keyboardMethod.value === 'wijesekara') {
    wijesekaraSuggestToggle.style.display = 'inline-block';
  } else {
    wijesekaraSuggestToggle.style.display = 'none';
    wijesekaraSuggestTooltip.style.display = 'none';
  }
});

// Toggle suggestion ON/OFF
wijesekaraSuggestToggle.addEventListener('click', () => {
  wijesekaraSuggestOn = !wijesekaraSuggestOn;
  wijesekaraSuggestToggle.textContent = wijesekaraSuggestOn ? '🔔' : '🔕';
  if (!wijesekaraSuggestOn) {
    wijesekaraSuggestTooltip.style.display = 'none';
  }
});
wijesekaraSuggestToggle.textContent = '🔕';

// Show suggestion tooltip on keydown/input (Wijesekara mode only)
typingInput.addEventListener('keydown', (e) => {
  if (keyboardMethod.value === 'wijesekara' && wijesekaraSuggestOn && e.key.length === 1) {
    const mapped = WIJESEKARA_MAP[e.key] || '';
    if (mapped) {
      wijesekaraSuggestTooltip.textContent = `"${e.key}" → "${mapped}"`;
      wijesekaraSuggestTooltip.style.display = 'inline-block';
      wijesekaraSuggestTooltip.style.background = '#fffbe7';
      wijesekaraSuggestTooltip.style.border = '1px solid #fbbf24';
      wijesekaraSuggestTooltip.style.padding = '2px 8px';
      wijesekaraSuggestTooltip.style.borderRadius = '6px';
      wijesekaraSuggestTooltip.style.marginLeft = '4px';
      setTimeout(() => {
        wijesekaraSuggestTooltip.style.display = 'none';
      }, 1200);
    } else {
      wijesekaraSuggestTooltip.style.display = 'none';
    }
  }
});

// Premium activation logic
const activatePremiumBtn = document.getElementById('activate-premium-btn');
const premiumModal = document.getElementById('premium-modal');
const closeModalPremium = document.querySelector('.close-modal-premium');
const premiumCodeInput = document.getElementById('premium-code-input');
const submitPremiumCode = document.getElementById('submit-premium-code');
const premiumFeedback = document.getElementById('premium-feedback');
const customKeyboardSection = document.getElementById('custom-keyboard-section');
const customKeyboardMapping = document.getElementById('custom-keyboard-mapping');
const saveCustomKeyboard = document.getElementById('save-custom-keyboard');
const customThemeSection = document.getElementById('custom-theme-section');
const customThemeSelect = document.getElementById('custom-theme-select');
const logoutPremiumBtn = document.getElementById('logout-premium-btn');

function isPremium() {
  return localStorage.getItem('premium') === 'true';
}

function showPremiumFeatures() {
  const adContainer = document.getElementById('ad-container');
  const premiumBadge = document.querySelector('#activate-premium-btn .premium-badge');
  const activePremiumBadge = document.getElementById('active-premium-badge');
  if (isPremium()) {
    customKeyboardSection.style.display = 'block';
    customThemeSection.style.display = 'block';
    activatePremiumBtn.style.display = 'none';
    logoutPremiumBtn.style.display = 'inline-block';
    document.getElementById('premium-badge').style.display = 'inline-block';
    if (adContainer) adContainer.style.display = 'none';
    if (premiumBadge) premiumBadge.style.display = 'none';
    if (activePremiumBadge) activePremiumBadge.style.display = 'block';
  } else {
    customKeyboardSection.style.display = 'none';
    customThemeSection.style.display = 'none';
    activatePremiumBtn.style.display = 'inline-block';
    logoutPremiumBtn.style.display = 'none';
    document.getElementById('premium-badge').style.display = 'none';
    if (adContainer) adContainer.style.display = 'flex';
    if (premiumBadge) premiumBadge.style.display = 'inline-flex';
    if (activePremiumBadge) activePremiumBadge.style.display = 'none';
  }
}

activatePremiumBtn.addEventListener('click', () => {
  premiumModal.style.display = 'flex';
  mainContent.classList.add('blur-background');
  premiumFeedback.textContent = '';
  premiumCodeInput.value = '';
});
closeModalPremium.addEventListener('click', () => {
  premiumModal.style.display = 'none';
  mainContent.classList.remove('blur-background');
});
window.addEventListener('click', (e) => {
  if (e.target === premiumModal) {
    premiumModal.style.display = 'none';
    mainContent.classList.remove('blur-background');
  }
});
submitPremiumCode.addEventListener('click', () => {
  const code = premiumCodeInput.value.trim();
  if (code === '123456') {
    localStorage.setItem('premium', 'true');
    premiumFeedback.style.color = '#22c55e';
    premiumFeedback.textContent = 'Premium activated!';
    setTimeout(() => {
      premiumModal.style.display = 'none';
      mainContent.classList.remove('blur-background');
      showPremiumFeatures();
    }, 800);
  } else {
    premiumFeedback.style.color = '#e11d48';
    premiumFeedback.textContent = 'Invalid code!';
  }
});

// Custom Keyboard Layout (Premium)
saveCustomKeyboard.addEventListener('click', () => {
  const mappingStr = customKeyboardMapping.value.trim();
  localStorage.setItem('customKeyboardMapping', mappingStr);
  alert('Custom keyboard layout saved!');
});

// Custom Theme (Premium)
customThemeSelect.addEventListener('change', () => {
  const theme = customThemeSelect.value;
  localStorage.setItem('customTheme', theme);
  applyCustomTheme(theme);
});

function applyCustomTheme(theme) {
  document.body.classList.remove('theme-blue', 'theme-green', 'theme-pink', 'theme-dark');
  if (theme === 'blue') document.body.classList.add('theme-blue');
  else if (theme === 'green') document.body.classList.add('theme-green');
  else if (theme === 'pink') document.body.classList.add('theme-pink');
  else if (theme === 'dark') document.body.classList.add('dark');
  else document.body.classList.remove('dark');
}

// On load, show premium features if activated
showPremiumFeatures();
// Load custom theme if set
if (isPremium()) {
  const theme = localStorage.getItem('customTheme') || 'default';
  customThemeSelect.value = theme;
  applyCustomTheme(theme);
}
// Load custom keyboard mapping if set
if (isPremium()) {
  const mappingStr = localStorage.getItem('customKeyboardMapping') || '';
  customKeyboardMapping.value = mappingStr;
}

logoutPremiumBtn.addEventListener('click', () => {
  localStorage.removeItem('premium');
  // Optionally remove custom features
  // localStorage.removeItem('customKeyboardMapping');
  // localStorage.removeItem('customTheme');
  showPremiumFeatures();
  showToast('Premium logged out!');
});

// --- Leaderboard Persistence ---
function saveToLeaderboard(wpm, accuracy) {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  leaderboard.push({ wpm, accuracy, date: new Date().toLocaleString() });
  leaderboard.sort((a, b) => b.wpm - a.wpm); // Highest WPM first
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 10)));
}

function renderLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  const tbody = document.querySelector('#leaderboard tbody');
  tbody.innerHTML = '';
  leaderboard.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i + 1}</td><td>${row.wpm}</td><td>${row.accuracy}</td><td>${row.date}</td>`;
    tbody.appendChild(tr);
  });
}

// Render leaderboard on load
window.addEventListener('DOMContentLoaded', renderLeaderboard);

// Restart button logic - Enhanced version already exists above
// restartBtn.addEventListener('click', () => {
//   // Fully reset to default state
//   testStarted = false;
//   finished = false;
//   typingInput.value = '';
//   typingInput.disabled = false;
//   resetStats();
//   resetTimer();
//   startBtn.style.display = 'inline-block';
//   startBtn.disabled = false;
//   clearInterval(countdown);
//   feedback.textContent = '';
//   // Optionally clear test state from localStorage
//   clearTestState();
//   document.getElementById('word-count').textContent = '0';
//   wordsSoFar = 0;
//   sentenceDisplay.textContent = 'මෙහි වචන/වක්‍ය පෙන්වයි';
//   timeSelect.disabled = false;
// });

const resetLeaderboardBtn = document.getElementById('reset-leaderboard-btn');
const resetModal = document.getElementById('reset-modal');
const resetPasswordInput = document.getElementById('reset-password-input');
const resetErrorMsg = document.getElementById('reset-error-msg');
const resetConfirmBtn = document.getElementById('reset-confirm-btn');
const resetCancelBtn = document.getElementById('reset-cancel-btn');
const closeModalReset = document.querySelector('.close-modal-reset');

if (resetLeaderboardBtn) {
  resetLeaderboardBtn.addEventListener('click', () => {
    resetModal.style.display = 'flex';
    resetPasswordInput.value = '';
    resetErrorMsg.textContent = '';
    setTimeout(() => { resetPasswordInput.focus(); }, 100);
  });
}
if (resetCancelBtn) {
  resetCancelBtn.addEventListener('click', () => {
    resetModal.style.display = 'none';
    resetErrorMsg.textContent = '';
    resetPasswordInput.value = '';
  });
}
if (closeModalReset) {
  closeModalReset.addEventListener('click', () => {
    resetModal.style.display = 'none';
    resetErrorMsg.textContent = '';
    resetPasswordInput.value = '';
  });
}
if (resetConfirmBtn) {
  resetConfirmBtn.addEventListener('click', () => {
    const pw = resetPasswordInput.value.trim();
    if (pw === '123456') {
      localStorage.removeItem('leaderboard');
      resetModal.style.display = 'none';
      resetErrorMsg.textContent = '';
      resetPasswordInput.value = '';
      showToast('Leaderboard has been reset!');
      renderLeaderboard();
    } else {
      resetErrorMsg.textContent = 'Incorrect password. Please try again.';
      resetPasswordInput.value = '';
      resetPasswordInput.focus();
    }
  });
}

const saveLeaderboardBtn = document.getElementById('save-leaderboard-btn');
saveLeaderboardBtn.addEventListener('click', () => {
  window.print();
});

// Leaderboard Modal Popup logic
const reportLeaderboardLink = document.getElementById('report-leaderboard-link');
const leaderboardModal = document.getElementById('leaderboard-modal');
const closeModalLeaderboard = document.querySelector('.close-modal-leaderboard');
const leaderboardModalTableBody = document.querySelector('#leaderboard-modal-table tbody');

if (reportLeaderboardLink && leaderboardModal) {
  reportLeaderboardLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Populate leaderboard modal table
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboardModalTableBody.innerHTML = '';
    leaderboard.forEach((row, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i + 1}</td><td>${row.wpm}</td><td>${row.accuracy}</td><td>${row.date}</td>`;
      leaderboardModalTableBody.appendChild(tr);
    });
    leaderboardModal.style.display = 'flex';
  });
}
if (closeModalLeaderboard && leaderboardModal) {
  closeModalLeaderboard.addEventListener('click', () => {
    leaderboardModal.style.display = 'none';
  });
}
window.addEventListener('click', (e) => {
  if (e.target === leaderboardModal) {
    leaderboardModal.style.display = 'none';
  }
});

// Save Report as PDF logic
const reportSaveBtn = document.getElementById('report-save-btn');
if (reportSaveBtn) {
  reportSaveBtn.addEventListener('click', () => {
    // Add a print class to body for @media print
    document.body.classList.add('print-report-modal');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('print-report-modal');
    }, 500);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = 'block';
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => { toast.style.display = 'none'; }, 350);
  }, 2200);
} 