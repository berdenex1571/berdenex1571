const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const timerText = document.querySelector(".timer-text b"); // Add timer display in your HTML
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const cyrillicLetters = [
    "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М",
    "Н", "О", "Ө", "Ү", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ",
    "Ы", "Ь", "Э", "Ю", "Я"
];

let currentWord, correctLetters, wrongGuessCount, timer;
const maxGuesses = 5;
const countdownTime = 10; // Time in seconds

numbers.forEach((number) => {
    const button = document.createElement("button");
    button.innerText = number;
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, number));
});

cyrillicLetters.forEach((letter) => {
    const button = document.createElement("button");
    button.innerText = letter;
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, letter));
});

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; 
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    clearInterval(timer); // Stop the countdown
    const modalText = isVictory ? `Та зөв хариулсан:` : 'Зөв хариу:';
    gameModal.querySelector("img").src = `${isVictory ? 'you win' : 'image'}.png`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Баяр хүргэе!' : 'Та ялагдлаа!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `game${wrongGuessCount}.jpg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "game0.jpg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
    startCountdown(); // Start the timer
}

const startCountdown = () => {
    let timeLeft = countdownTime;
    timerText.innerText = timeLeft;

    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver(false); // Game over if time runs out
        }
    }, 1000);
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
