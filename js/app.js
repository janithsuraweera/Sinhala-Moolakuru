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

// --- Replace input with Sinhala in real-time ---
typingInput.addEventListener('input', (e) => {
  if (finished) return;
  // Save caret position
  const caret = typingInput.selectionStart;
  // Transliterate
  const sinhala = transliterateToSinhala(typingInput.value);
  typingInput.value = sinhala;
  // Restore caret
  typingInput.setSelectionRange(caret, caret);
  // Continue with normal logic
  if (!startTime) startTime = Date.now();
  const val = typingInput.value;
  typedChars = val.length;
  let correct = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i] === currentSentence[i]) correct++;
  }
  correctChars = correct;
  // Accuracy
  const accuracy = typedChars ? Math.round((correctChars / typedChars) * 100) : 0;
  accuracyDisplay.textContent = accuracy;
  // WPM
  const elapsed = (Date.now() - startTime) / 1000 / 60;
  const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
  wpmDisplay.textContent = wpm;
  // Feedback
  if (val === currentSentence) {
    feedback.textContent = 'Great!';
    endTest();
  } else if (currentSentence.startsWith(val)) {
    feedback.textContent = '';
  } else {
    feedback.textContent = 'Incorrect!';
  }
});

function pickSentence() {
  const level = difficultySelect.value;
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
  sentenceDisplay.textContent = currentSentence;
  typingInput.value = '';
  typingInput.disabled = false;
  typingInput.focus();
  startTime = null;
  typedChars = 0;
  correctChars = 0;
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
  // Save to leaderboard
  const wpm = parseInt(wpmDisplay.textContent, 10);
  const accuracy = parseInt(accuracyDisplay.textContent, 10);
  if (wpm > 0 && accuracy > 0) {
    saveToLeaderboard(wpm, accuracy);
    renderLeaderboard();
  }
}

startBtn.addEventListener('click', startTest);
restartBtn.addEventListener('click', startTest);
difficultySelect.addEventListener('change', () => {
  if (!finished) startTest();
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

// Initial state
resetStats();
startBtn.style.display = 'inline-block';
restartBtn.style.display = 'none';
resetTimer(); 