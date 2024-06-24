
let rows = document.querySelectorAll(".row");
let cells = document.querySelectorAll(".cell");
let board = Array.from({ length: 3 }, () => Array(3).fill(null));

rows.forEach((row, r) => (row.id = r));

cells.forEach((cell, id) => (cell.id = id %3));

let crossPlaying = true;

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!cell.classList.contains("idle")) return;

    let curRow = parseInt(cell.parentElement.id);
    let curCell = parseInt(cell.id);

    let currentPlayer = crossPlaying ? "X" : "O";
    let playerClass = crossPlaying ? "crossed" : "circled";

    board[curRow][curCell] = currentPlayer;
    cell.classList.add(playerClass);
    cell.classList.remove("idle");

    crossPlaying = !crossPlaying;
  });
});

const checkWin = (player) => { 
    const winningCombos = [
        // Horizontal
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Vertical
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Cross
        [[0, 0], [1, 1], [2, 2]],
        [[2, 0], [1, 1], [0, 2]]
    ];

    return winningCombos.some(
        combo=>combo.every(
            ([x,y])=> board[x][y] === player))
};

setInterval(()=>{
    if(checkWin("X"))
    {
        alert("Cross Won!")
    }
    else if(checkWin("O"))
    {
         alert("Circle Won!")
    }

    if(checkWin("X") || checkWin("O"))
        {
            crossPlaying="false"
             board = Array.from({ length: 3 }, () => Array(3).fill(null));
        }
},20)
    