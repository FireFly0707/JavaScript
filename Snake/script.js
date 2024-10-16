
const gameBoard = document.getElementById('gameBoard');
document.addEventListener('keydown', handleKeyPress);

// Przygotowanie planszy do gry
for (let i = 0; i < 16 * 16; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell'); // Dodanie klasy 'cell' do każdej komórki
    gameBoard.appendChild(cell);
}
var snakeLength = 1;
var snakePositionX = 8;
var snakePositionY = 8;
var snakeDirection = 'up';
var tail = [];
function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            changeDirection('up');
            break;
        case 'ArrowDown':
            changeDirection('down');
            break;
        case 'ArrowLeft':
            changeDirection('left');
            break;
        case 'ArrowRight':
            changeDirection('right');
            break;
    }
    
}
function changeDirection(newDirection) {
    snakeDirection = newDirection;
}
function moveSnake() {
    if(tail.length != 0) {
        tail.pop();
    }
        
    tail.push([snakePositionX, snakePositionY]);
    switch (snakeDirection) {
        case 'up':
            snakePositionY -= 1;
            break;
        case 'down':
            snakePositionY += 1;
            break;
        case 'left':
            snakePositionX -= 1;
            break;
        case 'right':
            snakePositionX += 1;
            break;
    }
    
}
function printSnake() {
    const cellIndex = getCellIndex(snakePositionX, snakePositionY);
    const cell = gameBoard.children[cellIndex];
    cell.classList.add('snake');
}
const gridSize = 16;

// Funkcja do obliczenia indeksu
function getCellIndex(row, col) {
    return row * gridSize + col; // Obliczanie pozycji w jednowymiarowej tablicy
}

setInterval(moveSnake, 1000);