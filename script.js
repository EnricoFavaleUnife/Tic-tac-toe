let rows = document.querySelectorAll(".row");
let cells = document.querySelectorAll(".cell");
let board = Array.from({ length: 3 }, () => Array(3).fill(null));

rows.forEach((row, r) => (row.id = r));

cells.forEach((cell, id) => (cell.id = id %3));

let crossPlaying = true;

let OVictories = XVictories = 0
let OVictoriesElement = document.querySelector(".circled-victories");
let XVictoriesElement = document.querySelector(".crossed-victories");

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

function checkWin(player) { 
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
}

function resetTable () {
    cells.forEach((cell) => {
        if (!cell.classList.contains("idle"))

            if (cell.classList.contains("crossed")) cell.classList.remove("crossed");
            if (cell.classList.contains("circled")) cell.classList.remove("circled");

            cell.classList.add("idle");
    });
}

function winningHandler (player) {
    if (player === "X") {
        XVictories++;
        XVictoriesElement.innerHTML = XVictories;
    }

    if (player === "O") {
        OVictories++;
        OVictoriesElement.innerHTML = OVictories;
    }
}

setInterval(()=>{
    if (checkWin("X")) {
        alert("Cross Won!")
        winningHandler("X")
    }
    else if (checkWin("O")) {
        alert("Circle Won!")
        winningHandler("O")
    }

    if(checkWin("X") || checkWin("O")) {
        crossPlaying="false"
        board = Array.from({ length: 3 }, () => Array(3).fill(null));

        resetTable();
    }

},20)