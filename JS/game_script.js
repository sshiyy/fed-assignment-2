const man = document.getElementById('man');
const musicNote = document.getElementById('musicNote');

let isJumping = false;
let gameActive = false;
let checkGameOver;
let startTime;
let elapsedTime = 0;
let timerInterval;

fetchHighestScoreAndUpdateDisplay();

document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = document.getElementById('buttonContainer');
    const instructionMessage = document.getElementById('instructionMessage');

    // Create the start button element
    const startButton = document.createElement('button');
    startButton.id = 'startButton';
    startButton.textContent = 'Start Game';
    buttonContainer.insertBefore(startButton, instructionMessage);

    startButton.addEventListener('click', () => {
        startGame();
        startButton.style.display = 'none'; // Hide the start button
        instructionMessage.style.display = 'none'; // Hide the instructional message
    });
});
document.addEventListener('keydown', event => {
    if (event.code === 'Space' && !isJumping && gameActive) {
        jump();
    }
});

// Add an event listener for touch input
document.addEventListener('touchstart', event => {
    if (!isJumping && gameActive) {
        jump();
    }
});

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerText = "Score: " + elapsedTime;
    }, 1); // Update the timer every millisecond
}

function stopTimer() {
    clearInterval(timerInterval);
}

function jump() {
    if(isJumping) return; // Prevent double jump
    isJumping = true;
    man.classList.add('jump');
    
    const jumpSound = document.getElementById('jumpSound');
    jumpSound.play();

    setTimeout(() => {
        man.classList.remove('jump');
        isJumping = false; // Reset the jumping state only after the jump is complete
    }, 600); // Ensure this duration matches your jump animation duration
}

function startGame() {
    document.body.style.overflow = 'hidden';
    document.getElementById('game').style.display = 'block'; // Ensure the game container is visible

    // Reset or initialize necessary flags
    isJumping = false; // Ensure isJumping is false at the start of the game
    gameActive = true; // Indicate that the game is now active

    elapsedTime = 0;
    document.getElementById("timer").innerText = "Time: 0";

    startTimer();

    checkGameOver = setInterval(() => {
        const manTop = parseInt(window.getComputedStyle(man).getPropertyValue('bottom'));
        const noteLeft = parseInt(window.getComputedStyle(musicNote).getPropertyValue('left'));

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

    const dyingSound = document.getElementById('dyingSound');
    dyingSound.play();

    musicNote.style.animation = 'none';
    sendPointsToAPI(elapsedTime); // Send points to API
}

function resetGame() {
    document.body.style.overflow = '';
    const gameOverScreen = document.getElementById('gameOverScreen');
    if (gameOverScreen) {
        gameOverScreen.remove();
    }

    // Reset game elements and state
    man.classList.remove('jump');
    man.style.bottom = '0px'; // Reset man's position
    musicNote.style.right = '0px'; // Reset music note's position
    musicNote.style.animation = ''; // Reset any CSS animations

    // Reset game state variables
    isJumping = false;
    gameActive = false; // Set this to false to ensure it gets properly set in startGame
    elapsedTime = 0;
    document.getElementById("timer").innerText = "Time: 0";

    // Restart the game
    startGame();
}

//API 
function sendPointsToAPI(score) {
    // Get current date and time in ISO format
    const now = new Date().toISOString();

    // Prepare the data object with score and the current timestamp
    const data = { score: score, createdAt: now };

    const APIKEY = '65c1b8029510e8364c754629'; 
    const apiUrl = 'https://fedasg2-d40c.restdb.io/rest/game'; 

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': APIKEY,
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log('Score saved:', data))
    .catch(error => console.error('Error saving score:', error));
    fetchHighestScoreAndUpdateDisplay();
}


//highest score 
function fetchHighestScoreAndUpdateDisplay() {
    const APIKEY = '65c1b8029510e8364c754629'; // Use the same API key
    const apiUrl = 'https://fedasg2-d40c.restdb.io/rest/game'; // Use the same API endpoint

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': APIKEY,
            'Cache-Control': 'no-cache',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.length > 0) {
            const highestScore = data.reduce((max, item) => item.score > max ? item.score : max, data[0].score);
            document.getElementById("highestScoreDisplay").innerText = `Highest Score: ${highestScore}`;
        } else {
            document.getElementById("highestScoreDisplay").innerText = 'No scores found';
        }
    })
    .catch(error => console.error('Error fetching scores:', error));
}
