document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('exit-game').addEventListener('click', exitGame);

function startGame() {
    // Redirect to the game page
    window.location.href = "game.html";
}

function exitGame() {
    // Close the window or perform any other necessary action
    window.close();
}
