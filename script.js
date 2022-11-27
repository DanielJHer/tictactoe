"use strict";

const gameBoard = (() => {
  let boardArray = ["", "", "", "", "", "", "", "", ""];
  let symbol = "X";
  let currentPlayer;

  const cells = document.querySelectorAll(".cell");
  const cellsArray = Array.from(cells);
  const player1 = document.querySelector(".player1");
  const player2 = document.querySelector(".player2");
  const winningMsg = document.querySelector(".winning-message");
  const restartBtn = document.querySelector("#restartBtn");
  const winText = document.querySelector(".winText");

  const startGame = () => {
    // starting round
    currentPlayer = player1;
    highlight(currentPlayer);

    // adding eventlisteners and game logic
    cellsArray.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        let index = cellsArray.indexOf(cell);
        if (boardArray[index] === "") {
          markCell(index);
          boardArray[index] = symbol;
          if (checkWinCondition() && symbol === "X") {
            // Win
            winText.insertAdjacentText("afterbegin", `Player 1 Wins!`);
            endGame();
          } else if (checkWinCondition() && symbol === "O") {
            // Lose
            winText.insertAdjacentText("afterbegin", `Player 2 Wins!`);
            endGame();
          } else if (boardArray.filter((elem) => elem).length === 9) {
            // Draw
            winText.insertAdjacentText("afterbegin", `It's a draw!`);
            endGame();
          } else {
            // Lose turn
            changeTurn();
          }
        }
      });
    });

    restartBtn.addEventListener("click", (e) => {
      winningMsg.classList.remove("show");
      restartGame();
      changeTurn();
    });
  };

  // highlights current player
  const highlight = (player) => {
    player.classList.add("highlight");
  };

  const removeHighlight = (player) => {
    player.classList.remove("highlight");
  };

  // ends the game
  const endGame = () => {
    // display winner message
    winningMsg.classList.add("show");
  };

  // changes the turn following a move
  const changeTurn = () => {
    symbol = symbol === "X" ? "O" : "X";
    removeHighlight(currentPlayer);
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    highlight(currentPlayer);
  };

  // marks the div and adds to array
  const markCell = (index) => {
    boardArray[index] = symbol;

    let spanText = document.createElement("span");
    spanText.innerText = symbol;
    cells[index].appendChild(spanText);
  };

  // clears the array for a restart
  const restartGame = () => {
    boardArray = ["", "", "", "", "", "", "", "", ""];
    winText.innerText = "";
    cells.forEach((square) => {
      square.innerHTML = "";
    });
  };

  // checks if there's a win
  const checkWinCondition = () => {
    if (
      (boardArray[0] === symbol &&
        boardArray[1] === symbol &&
        boardArray[2] === symbol) ||
      (boardArray[3] === symbol &&
        boardArray[4] === symbol &&
        boardArray[5] === symbol) ||
      (boardArray[6] === symbol &&
        boardArray[7] === symbol &&
        boardArray[8] === symbol) ||
      (boardArray[0] === symbol &&
        boardArray[3] === symbol &&
        boardArray[6] === symbol) ||
      (boardArray[1] === symbol &&
        boardArray[4] === symbol &&
        boardArray[7] === symbol) ||
      (boardArray[2] === symbol &&
        boardArray[5] === symbol &&
        boardArray[8] === symbol) ||
      (boardArray[0] === symbol &&
        boardArray[4] === symbol &&
        boardArray[8] === symbol) ||
      (boardArray[2] === symbol &&
        boardArray[4] === symbol &&
        boardArray[6] === symbol)
    ) {
      return true;
    }
  };

  return { startGame };
})();

gameBoard.startGame();

// change win message to reflect winning player
