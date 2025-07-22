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
const keyboardMethod = document.getElementById('keyboard-method');
const customTextSection = document.querySelector('.custom-text-section');
const customTextInput = document.getElementById('custom-text-input');

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
}

// --- Replace input with Sinhala in real-time, based on method ---
typingInput.addEventListener('input', (e) => {
  if (finished) return;
  const caret = typingInput.selectionStart;
  let sinhala = typingInput.value;
  if (keyboardMethod.value === 'phonetic') {
    sinhala = transliterateToSinhala(typingInput.value);
  } else if (keyboardMethod.value === 'wijesekara') {
    sinhala = wijesekaraTransliterate(typingInput.value);
  } else if (keyboardMethod.value === 'unicode') {
    // Unicode: do not change input, just use as-is
    sinhala = typingInput.value;
  }
  typingInput.value = sinhala;
  typingInput.setSelectionRange(caret, caret);
  renderSentenceDisplay();
  const val = typingInput.value;
  const elapsed = (Date.now() - startTime) / 1000 / 60;
  let currentCorrect = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i] === currentSentence[i]) {
      currentCorrect++;
    }
  }
  const sessionCorrectChars = totalCorrectChars + currentCorrect;
  const wpm = elapsed > 0 ? Math.round((sessionCorrectChars / 5) / elapsed) : 0;
  wpmDisplay.textContent = wpm;
  const sessionTypedChars = totalTypedChars + val.length;
  const accuracy = sessionTypedChars > 0 ? Math.round((sessionCorrectChars / sessionTypedChars) * 100) : 0;
  accuracyDisplay.textContent = accuracy;
  let feedbackMsg = '';
  if (val === currentSentence) {
    totalCorrectChars += currentCorrect;
    totalTypedChars += val.length;
    currentSentence = pickSentence();
    typingInput.value = '';
    renderSentenceDisplay();
    if (currentSentence.includes("Please enter")) {
      endTest();
      feedbackMsg = 'Please add custom text first.';
    } else {
      feedbackMsg = 'Great!';
      if (lastFeedback !== 'Great!') successSound.play();
    }
  } else if (currentSentence.startsWith(val)) {
    feedbackMsg = '';
  } else {
    feedbackMsg = 'Incorrect!';
    if (lastFeedback !== 'Incorrect!') errorSound.play();
  }
  feedback.textContent = feedbackMsg;
  lastFeedback = feedbackMsg;
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
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function resetTimer() {
  clearInterval(countdown);
  timeLeft = parseInt(timeSelect.value, 10);
  timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
  resetTimer();
  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = '00:00';
      endTest();
    }
  }, 1000);
}

function startTest() {
  finished = false;
  currentSentence = pickSentence();
  renderSentenceDisplay();
  typingInput.value = '';
  typingInput.disabled = false;
  typingInput.focus();
  startTime = Date.now();
  totalCorrectChars = 0;
  totalTypedChars = 0;
  resetStats();
  startBtn.style.display = 'none';
  restartBtn.style.display = 'inline-block';
  startTimer();
}

function endTest() {
  finished = true;
  typingInput.disabled = true;
  feedback.textContent = 'Finished!';
  clearInterval(countdown);
  const wpm = parseInt(wpmDisplay.textContent, 10);
  const accuracy = parseInt(accuracyDisplay.textContent, 10);
  if (wpm > 0) {
    saveToLeaderboard(wpm, accuracy);
    renderLeaderboard();
  }
}

startBtn.addEventListener('click', startTest);
restartBtn.addEventListener('click', startTest);
difficultySelect.addEventListener('change', () => {
  if (difficultySelect.value === 'custom') {
    customTextSection.style.display = 'block';
  } else {
    customTextSection.style.display = 'none';
  }
  startTest();
});
timeSelect.addEventListener('change', resetTimer);

// Dark/Light mode toggle
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  modeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Mobile: focus input on sentence click
sentenceDisplay.addEventListener('click', () => {
  typingInput.focus();
});

// Sound feedback
const successSound = new Audio('assets/success.mp3');
const errorSound = new Audio('assets/error.mp3');
let lastFeedback = '';

// Initial state
resetStats();
startBtn.style.display = 'inline-block';
restartBtn.style.display = 'none';
resetTimer(); 