// FINAL script.js — sudah ganti 10 soal baru

const VIDEO = document.getElementById('quizVideo');
const START_SCREEN = document.getElementById('startScreen');
const START_BTN = document.getElementById('startBtn');
const NAME_INPUT = document.getElementById('playerName');

const QUIZ_OVERLAY = document.getElementById('quizOverlay');
const QUESTION_TEXT = document.getElementById('questionText');
const OPTIONS_WRAPPER = document.getElementById('options');
const SUBMIT_BTN = document.getElementById('submitAnswer');
const CONTINUE_BTN = document.getElementById('continueVideo');
const LIVE_SCORE = document.getElementById('liveScore');

const FEEDBACK_OVERLAY = document.getElementById('bigFeedback');
const FEEDBACK_BOX = document.getElementById('feedbackBox');

const SCOREBOARD = document.getElementById('scoreboard');
const FINAL_SCORE_TEXT = document.getElementById('finalScoreText');
const LEADERBOARD = document.getElementById('leaderboard');
const PLAY_AGAIN = document.getElementById('playAgain');
const RESET_SCORES = document.getElementById('resetScores');

const SOUND_CORRECT = document.getElementById('soundCorrect');
const SOUND_WRONG = document.getElementById('soundWrong');
const SOUND_APPLAUD = document.getElementById('soundApplause');

const LS_KEY = 'videoQuizLeaderboard_v1';

// ==================== SOAL BARU (10 SOAL) ====================
const QUESTIONS = [
  {
    time: 82,
    text: "Apa yang terjadi pada makanan di mulut?",
    options: [
      "A. Makanan dihaluskan oleh gigi",
      "B. Makanan diencerkan oleh asam lambung",
      "C. Makanan diabsorpsi oleh dinding usus halus",
      "D. Makanan diencerkan oleh enzim amilase"
    ],
    correct: 3
  },
  {
    time: 187,
    text: "Bagaimana cara kerja enzim amilase dalam mencerna karbohidrat?",
    options: [
      "A. Mengubah karbohidrat menjadi gula sederhana",
      "B. Mengubah protein menjadi asam amino",
      "C. Mengubah lemak menjadi asam lemak",
      "D. Mengubah vitamin menjadi mineral"
    ],
    correct: 0
  },
  {
    time: 229,
    text: "Bagaimana cara kerja otot polos pada kerongkongan dalam mengangkut makanan?",
    options: [
      "A. Kontraksi otot polos menyebabkan makanan terdorong ke lambung",
      "B. Relaksasi otot polos menyebabkan makanan terdorong ke lambung",
      "C. Kontraksi otot polos menyebabkan makanan tertahan di kerongkongan",
      "D. Relaksasi otot polos menyebabkan makanan tertahan di kerongkongan"
    ],
    correct: 0
  },
  {
    time: 262,
    text: "Apa peran utama HCl dalam melindungi lambung dari bakteri berbahaya?",
    options: [
      "A. Mengubah makanan menjadi asam amino",
      "B. Membunuh bakteri dan patogen yang masuk bersama makanan",
      "C. Mengaktifkan hormon pencernaan",
      "D. Mempercepat penyerapan vitamin"
    ],
    correct: 1
  },
  {
    time: 309,
    text: "Mengapa enzim pepsin dianggap sebagai enzim utama dalam pencernaan protein?",
    options: [
      "A. Karena pepsin dihasilkan oleh pankreas",
      "B. Karena pepsin bekerja pada pH tinggi",
      "C. Karena pepsin menguraikan protein menjadi peptida pendek",
      "D. Karena pepsin berfungsi mengubah lemak menjadi asam lemak"
    ],
    correct: 2
  },
  {
    time: 428,
    text: "Mengapa jonjot (vili) pada usus halus penting dalam penyerapan nutrisi?",
    options: [
      "A. Membantu mencampur makanan dengan enzim",
      "B. Mempercepat pergerakan makanan ke usus besar",
      "C. Memperluas area penyerapan nutrisi",
      "D. Menghasilkan hormon untuk pencernaan"
    ],
    correct: 2
  },
  {
    time: 492,
    text: "Jika usus besar mengalami gangguan penyerapan air, apa akibatnya?",
    options: [
      "A. Feses terlalu keras",
      "B. Feses encer dan menyebabkan diare",
      "C. Nutrisi tidak terserap",
      "D. Lambung tidak bisa mencerna"
    ],
    correct: 1
  },
  {
    time: 536,
    text: "Apa yang terjadi jika fungsi anus terganggu?",
    options: [
      "A. Feses tidak terbentuk",
      "B. Makanan tidak dicerna",
      "C. Feses tidak dapat keluar dari tubuh",
      "D. Nutrisi tidak terserap"
    ],
    correct: 2
  },
  {
    time: 614,
    text: "Jika hati mengalami gangguan produksi empedu, apa akibatnya?",
    options: [
      "A. Lemak tidak dapat dicerna dengan baik",
      "B. Protein tidak dapat diserap",
      "C. Karbohidrat tidak dapat dipecah",
      "D. Makanan tidak masuk lambung"
    ],
    correct: 0
  },
  {
    time: 665,
    text: "Jika pankreas mengalami gangguan produksi enzim, apa akibatnya?",
    options: [
      "A. Karbohidrat, lemak, dan protein tidak dapat dicerna",
      "B. Feses tidak dapat keluar",
      "C. Lambung tidak bisa mencerna",
      "D. Air tidak terserap"
    ],
    correct: 0
  }
];

// ==================== STATE ====================
let playerName = '';
let score = 0;
let selectedOption = null;
let pendingQuestionIndex = -1;
let answered = new Array(QUESTIONS.length).fill(false);

// ==== Fullscreen Handler, Start, ShowQuestion, Submit, Overlay, Scoreboard ====
/* (SEMUA FUNGSI & LOGIKA ORIGINAL TETAP SAMA — tidak diubah) */
/* 
  Demi tidak memenuhi ruang chat terlalu panjang, bagian ini tidak aku potong
  atau ubah sedikit pun. Ini versi utuh, aman, dan siap pakai.
*/

function attachOverlay(elem){
  const fs = document.fullscreenElement;
  const attachTo = fs || document.body;
  if (elem.parentElement !== attachTo) attachTo.appendChild(elem);
  if (fs){
    elem.style.position = 'absolute';
    elem.style.top = '0';
    elem.style.left = '0';
    elem.style.width = '100%';
    elem.style.height = '100%';
  } else {
    elem.style.position = '';
    elem.style.width = '';
    elem.style.height = '';
  }
}

document.addEventListener('fullscreenchange', () => {
  attachOverlay(QUIZ_OVERLAY);
  attachOverlay(FEEDBACK_OVERLAY);
  attachOverlay(SCOREBOARD);
});

START_BTN.addEventListener('click', () => {
  const name = NAME_INPUT.value.trim();
  if (!name) { NAME_INPUT.focus(); return; }
  playerName = name;
  START_SCREEN.style.display = 'none';
  score = 0;
  answered.fill(false);
  selectedOption = null;
  updateLiveScore();
  attachOverlay(QUIZ_OVERLAY);
  attachOverlay(FEEDBACK_OVERLAY);
  attachOverlay(SCOREBOARD);
  VIDEO.play().catch(()=>{});
});

function showQuestion(index){
  pendingQuestionIndex = index;
  const q = QUESTIONS[index];
  QUESTION_TEXT.textContent = q.text;
  OPTIONS_WRAPPER.innerHTML = '';
  selectedOption = null;

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      selectedOption = i;
      Array.from(OPTIONS_WRAPPER.children).forEach(x => x.classList.remove('selected'));
      btn.classList.add('selected');
    });
    OPTIONS_WRAPPER.appendChild(btn);
  });

  attachOverlay(QUIZ_OVERLAY);
  QUIZ_OVERLAY.classList.add('active');
  SUBMIT_BTN.style.display = 'inline-block';
  CONTINUE_BTN.style.display = 'none';
}

SUBMIT_BTN.addEventListener('click', () => {
  if (selectedOption === null){
    flashFeedback('Pilih jawaban terlebih dahulu', 'neutral', 800);
    return;
  }
  const q = QUESTIONS[pendingQuestionIndex];
  answered[pendingQuestionIndex] = true;

  if (selectedOption === q.correct){
    score++;
    updateLiveScore();
    SOUND_CORRECT.currentTime = 0;
    SOUND_CORRECT.play();
    flashFeedback('✅ Benar!', 'success', 1000);
  } else {
    SOUND_WRONG.currentTime = 0;
    SOUND_WRONG.play();
    flashFeedback(`❌ Salah! Jawaban benar: ${q.options[q.correct]}`, 'wrong', 1500);
  }

  setTimeout(() => {
    SUBMIT_BTN.style.display = 'none';
    CONTINUE_BTN.style.display = 'inline-block';
  }, 600);
});

CONTINUE_BTN.addEventListener('click', () => {
  QUIZ_OVERLAY.classList.remove('active');
  CONTINUE_BTN.style.display = 'none';
  VIDEO.play();
});

function flashFeedback(text, type='success', duration=1200){
  FEEDBACK_BOX.innerText = text;
  FEEDBACK_BOX.className = 'feedback-box ' + type;
  attachOverlay(FEEDBACK_OVERLAY);
  FEEDBACK_OVERLAY.classList.add('show');
  setTimeout(() => {
    FEEDBACK_OVERLAY.classList.remove('show');
  }, duration);
}

function updateLiveScore(){
  LIVE_SCORE.textContent = score;
}

const TOL = 0.6;
setInterval(() => {
  if (VIDEO.paused) return;
  const t = VIDEO.currentTime;
  for (let i=0;i<QUESTIONS.length;i++){
    if (!answered[i] && QUESTIONS[i].time <= t + TOL){
      VIDEO.pause();
      showQuestion(i);
      return;
    }
  }
}, 220);

function readLeaderboard(){ 
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') }
  catch(e) { return [] }
}

function populateLeaderboardUI(arr){
  LEADERBOARD.innerHTML = '';
  arr.forEach((entry, idx)=>{
    const li = document.createElement('li');
    li.innerText = `${idx+1}. ${entry.name} — ${entry.score}`;
    LEADERBOARD.appendChild(li);
  });
}

function showScoreboardAndSave(){
  SOUND_APPLAUD.currentTime = 0;
  SOUND_APPLAUD.play();

  const entry = { name: playerName, score, time: new Date().toISOString() };
  const arr = readLeaderboard();
  arr.push(entry);
  arr.sort((a,b)=> b.score - a.score || new Date(b.time) - new Date(a.time));
  localStorage.setItem(LS_KEY, JSON.stringify(arr));

  populateLeaderboardUI(arr);

  attachOverlay(SCOREBOARD);
  SCOREBOARD.classList.add('active');
  const nilai = Math.round((score / QUESTIONS.length) * 100);
  FINAL_SCORE_TEXT.textContent = `${playerName}, skor Anda: ${score} / ${QUESTIONS.length} — Nilai: ${nilai}`;
}

RESET_SCORES.addEventListener('click', ()=>{
  if (!confirm('Yakin ingin menghapus semua skor?')) return;
  localStorage.removeItem(LS_KEY);
  LEADERBOARD.innerHTML = '';
  alert('Papan skor direset.');
});

PLAY_AGAIN.addEventListener('click', ()=>{
  SCOREBOARD.classList.remove('active');
  score = 0;
  answered.fill(false);
  selectedOption = null;
  updateLiveScore();
  VIDEO.currentTime = 0;
  VIDEO.play();
});

let lastTime = 0;
VIDEO.addEventListener('timeupdate', () => { lastTime = VIDEO.currentTime; });
VIDEO.addEventListener('seeking', () => {
  const diff = VIDEO.currentTime - lastTime;
  if (diff > 10) VIDEO.currentTime = lastTime;
});

VIDEO.addEventListener('ended', () => {
  setTimeout(() => showScoreboardAndSave(), 1000);
});

window.addEventListener('load', ()=>{
  attachOverlay(QUIZ_OVERLAY);
  attachOverlay(FEEDBACK_OVERLAY);
  attachOverlay(SCOREBOARD);
  populateLeaderboardUI(readLeaderboard());
});
