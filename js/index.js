//on load
window.addEventListener("load", init);
// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const difficultySelect = document.getElementById("difficultySelect");

let game = {
  difficulty: {
    easy: 5,
    intermediate: 3,
    hard: 2
  }
};

let difficulty = game.difficulty[difficultySelect.value];

difficultySelect.addEventListener("change", function(e) {
  difficulty = game.difficulty[e.target.value];
});

let time = difficulty;
let score = 0;
let isPlaying;

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition"
];

function init() {
  //load word
  pickWord(words);
  //start matching
  wordInput.addEventListener("input", startMatch);

  //call countdown every second
  setInterval(countdown, 1000);
  //Check status
  setInterval(checkStatus, 50);
}

//matching function
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = difficulty;
    pickWord(words);
    wordInput.value = "";
    score++;
    difficultySelect.setAttribute("disabled", "disabled");
  }

  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
  timeDisplay.innerHTML = time;
}

//check words for match
function matchWords() {
  return currentWord.innerHTML === wordInput.value.toLowerCase()
    ? (message.innerHTML = "Correct!")
    : (message.innerHTML = "");
}

//pick and render random word
function pickWord(words) {
  seconds.innerHTML = time;
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randomIndex];
}

//countdown and render
function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

//Check Game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = `Game Over! You scored ${
      scoreDisplay.innerHTML
    } points!`;
    score = -1;
    difficultySelect.removeAttribute("disabled");
  }
}
