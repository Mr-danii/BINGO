const BOARD_SIZE = 5;
const WINNING_TOTAL = 5;

let currentPlayer = 1;

// Initialize player cards with random numbers (1-25)
function initializePlayerCards() {
    // Assign random numbers to buttons on both cards
    let allNumbers1 = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    let allNumbers2 = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

    document.querySelectorAll('#card-1 button').forEach((button, index) => {
        button.textContent = allNumbers1[index];
    });

    document.querySelectorAll('#card-2 button').forEach((button, index) => {
        button.textContent = allNumbers2[index];
    });
}

// Mark number on both cards
function markNumberInBothCards(number) {
    document.querySelectorAll('.bingo-card button').forEach(button => {
        if (parseInt(button.textContent) === number) {
            button.classList.add('marked');
        }
    });
}

// Check if current player has won
function checkWin() {
    const cardButtons = document.querySelectorAll(`#card-${currentPlayer} button`);
    let rows = 0, cols = 0, diag1 = 0, diag2 = 0;

    // Check rows and columns
    for (let i = 0; i < BOARD_SIZE; i++) {
        let rowCount = 0, colCount = 0;
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (cardButtons[i * BOARD_SIZE + j].classList.contains('marked')) rowCount++;
            if (cardButtons[j * BOARD_SIZE + i].classList.contains('marked')) colCount++;
        }
        if (rowCount === BOARD_SIZE) rows++;
        if (colCount === BOARD_SIZE) cols++;
    }

    // Check diagonals
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (cardButtons[i * BOARD_SIZE + i].classList.contains('marked')) diag1++;
        if (cardButtons[i * BOARD_SIZE + (BOARD_SIZE - 1 - i)].classList.contains('marked')) diag2++;
    }
    let newDiag1 = 0;
    let newDiag2 = 0;
    if(diag1 === BOARD_SIZE) newDiag1++;
    if(diag2 === BOARD_SIZE) newDiag2++;
    // Check total count of winning conditions
    return (rows + cols + newDiag1 + newDiag2) >= WINNING_TOTAL;
}

// Switch turns
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// Function to handle number selection and marking
function handleNumberSelection(event) {
    let button = event.target;
    if (button.tagName !== 'BUTTON' || button.classList.contains('marked')) return;

    // Get the number from button text
    let number = parseInt(button.textContent);

    // Mark the selected number on both cards
    markNumberInBothCards(number);

    // Check win conditions
    if (checkWin()) {
        document.getElementById('result').textContent = `Player ${currentPlayer} Wins!`;
        disableCards();
        return;
    }

    // Switch to the next player
    switchPlayer();
    updateTurnInfo();
    updateCardHover();
}

// Function to disable all cards
function disableCards() {
    document.querySelectorAll('.bingo-card button').forEach(button => button.style.pointerEvents = 'none');
}

// Function to update the turn information
function updateTurnInfo() {
    document.getElementById('turn-info').textContent = `Player ${currentPlayer}'s Turn`;
}

// Function to update card hover effect
function updateCardHover() {
    document.getElementById(`card-${currentPlayer === 1 ? 2 : 1}`).classList.add('hidden');
    document.getElementById(`card-${currentPlayer}`).classList.remove('hidden');
}

// Event listener for card clicks
document.querySelectorAll('.bingo-card button').forEach(button => {
    button.addEventListener('click', handleNumberSelection);
});

// Initial setup
initializePlayerCards();
updateTurnInfo();
updateCardHover();
