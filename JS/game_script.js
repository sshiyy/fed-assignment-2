const man = document.getElementById('man');
const musicNote = document.getElementById('musicNote');

let isJumping = false;
let gameActive = false;
let checkGameOver;
let startTime;
let elapsedTime = 0;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startGame);
});

document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !isJumping && gameActive) {
    jump();
  }
});

// Function to start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerText = "Time: " + elapsedTime;
    }, 1); // Update the timer every millisecond
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

function jump() {
  isJumping = true;
  man.classList.add('jump');
  // Play the jump sound
  const jumpSound = document.getElementById('jumpSound');
  jumpSound.play();

  setTimeout(() => {
    man.classList.remove('jump');
    isJumping = false;
  }, 600);
}

function startGame() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    // Reset the timer
    elapsedTime = 0;
    document.getElementById("timer").innerText = "Time: 0";

    gameActive = true;
    startTimer();
    checkGameOver = setInterval(() => {
        const manTop = parseInt(window.getComputedStyle(man).getPropertyValue('bottom'));
        const noteLeft = parseInt(window.getComputedStyle(musicNote).getPropertyValue('left'));
    
        musicNote.style.animation = ''; // Reset the animation here if needed
    
        if (noteLeft < 50 && noteLeft > 0 && manTop < 30) {
          gameOver();
        }
    }, 10);
}

function gameOver() {
    stopTimer();

    gameActive = false;
    clearInterval(checkGameOver);

  const gameOverScreen = document.createElement('div');
  gameOverScreen.setAttribute('id', 'gameOverScreen');
  gameOverScreen.innerHTML = `
    <div class="game-over-message">Game Over!</div>
    <button id="restartButton">Restart Game</button>
  `;
  document.getElementById('game').appendChild(gameOverScreen);
  document.getElementById('restartButton').addEventListener('click', resetGame);
  // Play the dying sound
  const dyingSound = document.getElementById('dyingSound');
  dyingSound.play();
  
  // Stop the music note animation
  const musicNote = document.getElementById('musicNote');
  musicNote.style.animation = 'none';
}

function resetGame() {
  const gameOverScreen = document.getElementById('gameOverScreen');
  if (gameOverScreen) {
    gameOverScreen.remove();
  }

  man.classList.remove('jump');
  man.style.bottom = '0px'; // Reset the position of the man
  musicNote.style.right = '0px'; // Reset the position of the music note

  isJumping = false;
  startGame();
}

// Initial game setup or start
startGame();
