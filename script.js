const GAME_CHOICES = {
  rock: "rock",
  paper: "paper",
  scissors: "scissors",
};

const GAME_WINNERS = {
  [GAME_CHOICES.rock]: GAME_CHOICES.scissors,
  [GAME_CHOICES.paper]: GAME_CHOICES.rock,
  [GAME_CHOICES.scissors]: GAME_CHOICES.paper,
};

const ROUND_RESULTS = {
  PLAYER: "PLAYER",
  COMPUTER: "COMPUTER",
  TIE: "TIE",
};

const playButton = document.querySelector("button");
const choicesBoard = document.querySelector("#choices");
const score = {
  player: 0,
  computer: 0,
};

const getComputerChoice = () => {
  const choices = Object.values(GAME_CHOICES);
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const playRound = (player1, player2) => {
  if (player1 === player2) return ROUND_RESULTS.TIE;

  return GAME_WINNERS[player1] === player2
    ? ROUND_RESULTS.PLAYER
    : ROUND_RESULTS.COMPUTER;
};

const updateScore = (result) => {
  if (result === ROUND_RESULTS.PLAYER) {
    score.player++;
  } else if (result === ROUND_RESULTS.COMPUTER) {
    score.computer++;
  }
};

const checkWinner = () => {
  if (score.player === 5) {
    return ROUND_RESULTS.PLAYER;
  } else if (score.computer === 5) {
    return ROUND_RESULTS.COMPUTER;
  } else {
    return null;
  }
};

const finishGame = (winner) => {
  score.player = 0;
  score.computer = 0;
  choicesBoard.textContent = "";
  document.querySelector("#results").textContent = `WINNER: ${winner}`;
  document.querySelector("#player-score").textContent = score["player"];
  document.querySelector("#computer-score").textContent = score["computer"];

  document.body.appendChild(playButton);
};

const displayResults = (choice, computerChoice, result) => {
  const results = document.querySelector("#results");
  results.textContent = `PLAYER CHOICE: ${choice.toUpperCase()} vs COMPUTER CHOICE: ${computerChoice.toUpperCase()}, WINNER: ${result}`;

  document.querySelector("#player-score").textContent = score["player"];
  document.querySelector("#computer-score").textContent = score["computer"];
};

const playGame = () => {
  Object.values(GAME_CHOICES).forEach((choice) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice.toUpperCase();
    choiceButton.addEventListener("click", () => {
      const computerChoice = getComputerChoice();
      const result = playRound(choice, computerChoice);
      updateScore(result);
      displayResults(choice, computerChoice, result);
      const winner = checkWinner();

      if (winner) {
        finishGame(winner);
      }
    });
    choicesBoard.appendChild(choiceButton);
  });

  document.body.removeChild(playButton);
};

playButton.addEventListener("click", playGame);
