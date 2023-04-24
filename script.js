'use strict';

const playerOneEl = document.querySelector('.player--0');
const playerTwoEl = document.querySelector('.player--1');

const diceImgEl = document.querySelector('.dice');

const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

let actPlayer, actPlrCurScoreEl, actPlrTotScoreEl;

let gameRun = true;
const scoreToWin = 10;

function diceRandom() {
  return Math.trunc(Math.random() * 6) + 1;
}

function showGeneratedDiceImg(diceNum) {
  diceImgEl.classList.contains('hidden')
    ? diceImgEl.classList.remove('hidden')
    : null;

  diceImgEl.src = `dice-${diceNum}.png`;
}

function rollDice() {
  const diceNum = diceRandom();
  diceNum === 1
    ? (showGeneratedDiceImg(diceNum), resetCurrentScore(), switchPlayer())
    : (showGeneratedDiceImg(diceNum), addToCurrentScore(diceNum));
}

function addToCurrentScore(diceNum) {
  actPlrCurScoreEl.textContent = Number(actPlrCurScoreEl.textContent) + diceNum;
}

function addToTotalScore() {
  actPlrTotScoreEl.textContent =
    Number(actPlrTotScoreEl.textContent) + Number(actPlrCurScoreEl.textContent);
  // reset current score
  actPlrCurScoreEl.textContent = 0;
  // check if there is the winner
  checkTheWinner(Number(actPlrTotScoreEl.textContent))
    ? (actPlayer.classList.remove('player--active'),
      actPlayer.classList.add('player--winner'),
      diceImgEl.classList.add('hidden'),
      (gameRun = false))
    : switchPlayer();
}

function resetCurrentScore() {
  console.log('1 on dice! Your bad 😁');
  actPlrCurScoreEl.textContent = 0;
}

function checkTheWinner(score) {
  return score >= scoreToWin ? true : false;
}

function getCurActPlrData() {
  actPlayer = document.querySelector('.player--active');
  actPlrCurScoreEl = actPlayer.querySelector('.current-score');
  actPlrTotScoreEl = actPlayer.querySelector('.score');
}

function switchPlayer() {
  playerOneEl.classList.toggle('player--active');
  playerTwoEl.classList.toggle('player--active');

  // assigning variables with new data after players switch
  getCurActPlrData();
}

// reset data on load
(function startNewGame() {
  // hide dice
  diceImgEl.classList.add('hidden');
  // active player data init
  getCurActPlrData();
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
})();

newGameButton.addEventListener('click', () => location.reload());
rollDiceButton.addEventListener('click', () => (gameRun ? rollDice() : null));
holdButton.addEventListener('click', () =>
  gameRun ? addToTotalScore() : null,
);
