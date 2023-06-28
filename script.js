const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const selection = document.getElementById('my-selection');
const questionImage = document.getElementById('cpu-selection');
const playButton = document.getElementById('play-button');
const resetButton = document.getElementById('reset-button');
const title = document.getElementById('title');

let currentImageIndex = 0;
let isPlaying = false;
let playerSelection;
let cpuSelection;

const options = [
  { choice: 'rock', image: './assets/rock.svg', beats: ['scissors'] },
  { choice: 'paper', image: './assets/paper.svg', beats: ['rock'] },
  { choice: 'scissors', image: './assets/scissors.svg', beats: ['paper'] }
];

function play() {
  isPlaying = true;

  playButton.style.display = 'none';
  resetButton.style.display = 'block';
  resetButton.disabled = true;

  disableOptions();
  changeQuestionImage();

  setTimeout(() => {
    stopImageRotation();
    title.textContent = determineWinner();
  }, 2000);
}

function resetGame() {
  playButton.disabled = true;
  questionImage.src = './assets/question.svg';
  selection.src = './assets/question.svg';
  currentImageIndex = 0;
  resetButton.style.display = 'none';
  playButton.style.display = 'block';
  title.textContent = "Rock paper scissors";

  enableOptions();
}

function determineWinner() {
  const winningCondition = options.find(condition => condition.choice === playerSelection);

  if (winningCondition.choice === cpuSelection) {
    return 'Tie';
  } else if (winningCondition.beats.includes(cpuSelection)) {
    return 'You Won!';
  } else {
    return 'You Lost';
  }
}

function changeQuestionImage() {
  if (isPlaying) {
    currentImageIndex = (currentImageIndex + 1) % options.length;
    questionImage.src = options[currentImageIndex].image;
    setTimeout(changeQuestionImage, 100);
  }
}

function stopImageRotation() {
  isPlaying = false;
  const randomIndex = Math.floor(Math.random() * options.length);
  questionImage.src = options[randomIndex].image;
  cpuSelection = options[randomIndex].choice;
  resetButton.disabled = false;
}

function selectOption(option, optionName) {
  playButton.disabled = false;
  selection.src = option.src;
  playerSelection = optionName;
}

function enableOptions() {
  rock.setAttribute('onclick', "selectOption(rock, 'rock')");
  paper.setAttribute('onclick', "selectOption(paper, 'paper')");
  scissors.setAttribute('onclick', "selectOption(scissors, 'scissors')");
  
  rock.classList.remove('disabled');
  paper.classList.remove('disabled');
  scissors.classList.remove('disabled');
}

function disableOptions() {
  rock.removeAttribute('onclick');
  paper.removeAttribute('onclick');
  scissors.removeAttribute('onclick');

  rock.classList.add('disabled');
  paper.classList.add('disabled');
  scissors.classList.add('disabled');
}
