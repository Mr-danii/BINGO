// Generate options for number of cards (2 to 8)
const numCardsSelect = document.getElementById('num-cards');
for (let i = 2; i <= 8; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} Card${i > 1 ? 's' : ''}`;
    numCardsSelect.appendChild(option);
}

// Generate options for number of rounds (1 to 15)
const numRoundsSelect = document.getElementById('num-rounds');
for (let i = 1; i <= 15; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} Round${i > 1 ? 's' : ''}`;
    numRoundsSelect.appendChild(option);
}

// Handle form submission
document.getElementById('game-setup').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get selected values
    let numCards = numCardsSelect.value;
    let numRounds = numRoundsSelect.value;
    
    // Redirect to game start with selected options (replace with your logic)
    window.location.href = `bingo-game.html?cards=${numCards}&rounds=${numRounds}`;
});
