'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden')

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

btnRoll.addEventListener('click', function () {
    //Generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `res/dice-${dice}.png`;
    if (dice !== 1) {
        //Add to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
        //switch to next player
        switchPlayer();
    }
});


btnHold.addEventListener('click', function () {
    //Add the current score to the total score of the player

    scores[activePlayer] += currentScore;
    currentScore = 0;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //Check if score is>10 and finish the game
    if (scores[activePlayer] >= 10) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceEl.classList.add('hidden');
        btnHold.classList.add('hidden');
        btnRoll.classList.add('hidden');
    }
    else {
        //switch to the next player
        switchPlayer();
    }

});

