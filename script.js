const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("p");
const btn = document.querySelector(".btn");
let start = false;



const player1 = "O";
const player2 = "X"
let currentPlayer = player1;


const Gameboard = (() => {

    const board = ["", "", "", "", "", "", "", "", ""]

    const getBoard = () => {
        return board;
    }

    const updateBoard = (index) => {
        if (board[index] !== "") return
        board[index] = currentPlayer; 
    }

    const isBoardFull = () => {
        return board.every(cell => cell !== "");
    }

    const printBoard = () => console.log(board);

    const resetBoard = () => {
        board.fill("");
    }

    return {getBoard, updateBoard, isBoardFull, printBoard, resetBoard}
})();


const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1
}

const updateStatusText = (message) => {
   statusText.textContent = message
}


const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

const resetGame = () => {
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = player1;
    Gameboard.resetBoard();
    Gameboard.printBoard();
    btn.textContent = "Start";
    btn.style.backgroundColor = "rgb(3, 201,169)";
    btn.classList.remove("reset");
    btn.classList.add("start");
    updateStatusText("Click Start to Play")
    start = false;
}

const startGame = () => {
    if (Gameboard.getBoard().every(item => item === "")) {
        updateStatusText(`Player ${currentPlayer}'s turn`);
        btn.style.backgroundColor = "red";
        btn.textContent = "Reset";
        btn.classList.remove("start");
        btn.classList.add("reset");
        start = true;
    }
}

cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        if (! start) return;
        if (cell.textContent || checkWinner()) return;
        cell.textContent = currentPlayer;
        Gameboard.updateBoard(cell.id);
        Gameboard.printBoard();

        //Check for a Winner
        if (checkWinner()) {
            updateStatusText(`Player ${currentPlayer} wins!`)
            console.log(`Game Over. Player ${currentPlayer} wins`)
            return;
        }

        //Check for a draw
        if (Gameboard.isBoardFull()) {
            updateStatusText("Draw Game!");
            return;
        }

        switchPlayer();
        updateStatusText(`Player ${currentPlayer}'s turn`);
    })
})

btn.addEventListener("click", () => {
    if (btn.classList.contains("reset")) {
        resetGame();
    } else {
        startGame();
    }
})