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

const getComputerChoice = () => {
  const choices = Object.values(GAME_CHOICES);
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const getHumanChoice = () => {
  const choice = prompt("Choose rock, paper, or scissors:");

  if (!choice || !Object.values(GAME_CHOICES).includes(choice.toLowerCase())) {
    alert("Please enter a valid choice");
    return getHumanChoice();
  }

  return choice.toLowerCase();
};

const playGame = () => {
  let humanScore = 0;
  let computerScore = 0;
  let turns = 1;

  const playRound = (player1, player2) => {
    if (player1 === player2) {
      console.log("It's a tie!");
      return;
    }

    if (GAME_WINNERS[player1] === player2) {
      console.log("You win!");
      return humanScore++;
    } else {
      console.log("You lose");
      return computerScore++;
    }
  };

  while (turns <= 5) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    console.log(`TURN ${turns}: ${humanChoice} vs ${computerChoice}`);
    playRound(humanChoice, computerChoice);
    turns++;
  }

  if (humanScore === computerScore) {
    console.log("It's a tie!");
  } else if (humanScore > computerScore) {
    console.log("You win the game!");
  } else {
    console.log(`You lose the game!`);
  }

  console.log(`YOUR SCORE: ${humanScore} vs COMPUTER SCORE: ${computerScore}`);
};

const button = document.querySelector("button");
button.addEventListener("click", playGame);
