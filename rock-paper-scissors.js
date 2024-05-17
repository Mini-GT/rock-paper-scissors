document.body.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    playerMoves("rock");
  } else if (e.key === "p") {
    playerMoves("paper");
  } else if (e.key === "s") {
    playerMoves("scissors");
  } else if (e.key === "a") {
    autoplay();
  } else if (e.key === " ") {
    showResetQuestion();
  }
});

let setIntervalClass;
let isAutoPlaying = false;
let storePlayerMoves =
  JSON.parse(localStorage.getItem("playerMove")) || "scissors";
let storeComputerMoves =
  JSON.parse(localStorage.getItem("computerMove")) || "scissors";
let storeResult = JSON.parse(localStorage.getItem("result")) || "";
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const elementsHTML = {
  playerMove: document.querySelector(".playerMove"),
  computerMove: document.querySelector(".computerMove"),
  scores: document.querySelector(".scores-output"),
  auto: document.querySelector(".autoPlay-btn"),
  resetBtn: document.querySelector(".reset-btn"),
};

const { resetBtn, auto, scores, playerMove, computerMove } = elementsHTML;

auto.addEventListener('click', () => {
  autoplay();
});

resetBtn.addEventListener('click', () => {
  showResetQuestion();
});

renderElement();

function playerMoves(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You Lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    };
  };

  if (result === "You Win") {
    score.wins++;
  } else if (result === "You Lose") {
    score.losses++;
  } else if (result === "Tie") {
    score.ties++;
  };

  storePlayerMoves = playerMove;
  storeComputerMoves = computerMove;
  storeResult = result;
  localStorage.setItem("score", JSON.stringify(score));
  localStorage.setItem("playerMove", JSON.stringify(storePlayerMoves));
  localStorage.setItem("computerMove", JSON.stringify(storeComputerMoves));
  localStorage.setItem("result", JSON.stringify(storeResult));
  document.querySelector(".result").innerHTML = `${result}`;
  renderElement();
};

function renderElement() {
  scores.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  playerMove.innerHTML = `You <img class="playMove" src="/projects/images/${storePlayerMoves}-emoji.png" alt="scissors">`;
  computerMove.innerHTML = `<img class="compMove" src="/projects/images/${storeComputerMoves}-emoji.png" alt="scissors"> Computer`;
  document.querySelector(".result").innerHTML = storeResult;
};

function pickComputerMove() {
  const randomNum = Math.random();
  let computerMove = "";

  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = "rock";
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = "paper";
  } else if (randomNum >= 2 / 3 && randomNum <= 1) {
    computerMove = "scissors";
  };
  return computerMove;
};

function clearResultandMoves(result, moves) {
  document.querySelector(`.${result}`).innerHTML = "";
  document.querySelector(`.${moves}`).innerHTML = "";
};

function autoplay(move) {
  if (!isAutoPlaying) {
    isAutoPlaying = true;
    auto.innerText = "Stop Auto";
    setIntervalClass = setInterval(() => {
      const playerMove = move || pickComputerMove();
      playerMoves(playerMove);
    }, 1000);
  } else {
    isAutoPlaying = false;
    auto.innerText = "Auto Play";
    clearInterval(setIntervalClass);
  };
};

function resetScore() {
  localStorage.removeItem('playerMove');
  localStorage.removeItem('computerMove');
  localStorage.removeItem('result');
  localStorage.removeItem('score');
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
  storePlayerMoves = 'scissors';
  storeComputerMoves = 'scissors';
  renderElement();
};

function showResetQuestion() {
  const container = document.querySelector('.askReset');
  container.innerHTML = `<p>Are you sure you want to reset score?</p>
  <button class="yesBtn">Yes</button>
  <button class="noBtn">No</button>`;

  const noBtn = document.querySelector('.noBtn');
  const yesBtn = document.querySelector('.yesBtn');

  noBtn.addEventListener('click', () => {
    container.innerHTML = ' ';
    return;
  });

  yesBtn.addEventListener('click', () => {
    resetScore();
    container.innerHTML = ' ';
  });
};



