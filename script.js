// script.js

const gameBoard = document.getElementById('game-board');

const shuffleButton = document.getElementById('shuffle-button');

let tiles = [];

let emptyTileIndex = 15;

// Initialize the game

function initializeGame() {

    for (let i = 1; i <= 15; i++) {

        const tile = document.createElement('div');

        tile.classList.add('tile');

        tile.textContent = i;

        tile.addEventListener('click', () => moveTile(i));

        tiles.push(tile);

        gameBoard.appendChild(tile);

    }

    

    // Add empty tile

    const emptyTile = document.createElement('div');

    emptyTile.classList.add('tile', 'empty');

    tiles.push(emptyTile);

    gameBoard.appendChild(emptyTile);

    shuffleTiles();

}

// Move a tile if adjacent to the empty space

function moveTile(tileNumber) {

    const tileIndex = tiles.findIndex(tile => tile.textContent == tileNumber);

    const [tileRow, tileCol] = [Math.floor(tileIndex / 4), tileIndex % 4];

    const [emptyRow, emptyCol] = [Math.floor(emptyTileIndex / 4), emptyTileIndex % 4];

    if (Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol) === 1) {

        [tiles[tileIndex], tiles[emptyTileIndex]] = [tiles[emptyTileIndex], tiles[tileIndex]];

        renderBoard();

        emptyTileIndex = tileIndex;

        checkWinCondition();

    }

}

// Shuffle the tiles randomly

function shuffleTiles() {

    for (let i = 0; i < 100; i++) {

        const randomTileIndex = Math.floor(Math.random() * 15);

        moveTile(tiles[randomTileIndex].textContent);

    }

}

// Render the tiles on the game board

function renderBoard() {

    gameBoard.innerHTML = '';

    tiles.forEach(tile => gameBoard.appendChild(tile));

}

// Check if the puzzle is solved

function checkWinCondition() {

    let isSolved = true;

    for (let i = 0; i < 15; i++) {

        if (tiles[i].textContent != i + 1) {

            isSolved = false;

            break;

        }

    }

    if (isSolved) {

        document.getElementById('message').textContent = "Congratulations! You've solved the puzzle!";

    } else {

        document.getElementById('message').textContent = "";

    }

}

// Initialize the game and add event listeners

initializeGame();

shuffleButton.addEventListener('click', shuffleTiles);