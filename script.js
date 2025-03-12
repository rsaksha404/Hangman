let word = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxAttempts = 6;

const hangmanStages = [
    "\n\n\n\n\n___|___",
    "\n   |\n   |\n   |\n   |\n___|___",
    "   ______\n   |/   |\n   |\n   |\n   |\n___|___",
    "   ______\n   |/   |\n   |    O\n   |\n   |\n___|___",
    "   ______\n   |/   |\n   |    O\n   |    |\n   |\n___|___",
    "   ______\n   |/   |\n   |    O\n   |   /|\n   |\n___|___",
    "   ______\n   |/   |\n   |    O\n   |   /|\n   |   / \n___|___"
];

function startGame() {
    word = document.getElementById("custom-word").value.toLowerCase();
    if (!word.match(/^[a-z]+$/i)) {
        alert("Please enter a valid word using only letters.");
        return;
    }
    guessedLetters = [];
    wrongGuesses = 0;
    document.getElementById("custom-word").value = "";
    displayWord();
    updateGallows();
    document.getElementById("message").textContent = "";
    generateLetterButtons();
    document.addEventListener("keydown", handleKeyPress);
}

document.getElementById("custom-word").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        startGame();
    }
});

function displayWord() {
    const display = word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    document.getElementById("word-display").textContent = display;
}

function updateGallows() {
    document.getElementById("gallows").textContent = hangmanStages[wrongGuesses];
}

function handleGuess(letter) {
    if (!word) return;
    if (guessedLetters.includes(letter) || !letter.match(/[a-z]/i)) return;
    guessedLetters.push(letter);
    document.getElementById(letter).disabled = true;
    if (!word.includes(letter)) {
        wrongGuesses++;
    }
    displayWord();
    updateGallows();
    checkGameOver();
}

function handleKeyPress(event) {
    let letter = event.key.toLowerCase();
    if (letter.match(/[a-z]/) && !document.getElementById(letter)?.disabled) {
        handleGuess(letter);
    }
}

function checkGameOver() {
    if (wrongGuesses >= maxAttempts) {
        document.getElementById("message").textContent = `Game Over! The word was: ${word}`;
        document.removeEventListener("keydown", handleKeyPress);
    } else if (word.split('').every(letter => guessedLetters.includes(letter))) {
        document.getElementById("message").textContent = "You Win! 🎉";
        document.removeEventListener("keydown", handleKeyPress);
    }
}

function generateLetterButtons() {
    const lettersContainer = document.getElementById("letters-container");
    lettersContainer.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.id = letter.toLowerCase();
        button.className = "letter-button";
        button.onclick = () => handleGuess(letter.toLowerCase());
        lettersContainer.appendChild(button);
    });
}
