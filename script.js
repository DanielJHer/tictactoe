"use strict";

const gameBoard = (() => {
  let boardArray = ["X", "", "", "", "", "", "", "", ""];
  let symbol = "X";
  let isPlaying = false;
  let currentPlayer = "Player 1";

  const squares = document.querySelectorAll(".cell");
  const squaresArray = Array.from(squares);

  const startGame = () => {
    isPlaying = true;
    // currentPlayer = player1;
    // currentPlayer.makeGlow();

    squaresArray.forEach((square) => {
      square.addEventListener("click", (e) => {
        let index = squaresArray.indexOf(square);
        if (isPlaying && boardArray[index] === "") {
          fillSquare(index);
          if (checkWinCondition()) {
            // Win
            isPlaying = false;
            endGame();
          } else if (boardArray.filter((elem) => elem.length === 9)) {
            // Draw
            isPlaying = false;
            endGame();
          } else {
            // Did not win
            changeTurn();
          }
        }
      });
    });
  };

  // ends the game
  const endGame = () => {
    // display winner message
    alert(`${currentPlayer} has Won!`);
    // render reset button
    const resetBtn = document.createElement("button");
    const mainGrid = document.querySelector(".main-grid");
    mainGrid.appendChild(resetBtn);
    resetBtn.addEventListener("click", (e) => {
      setTimeout(clearBoard(), 1800);
      resetBtn.classList.add("remove");
    });
  };

  // changes the turn following a move
  const changeTurn = () => {
    symbol = symbol === "x" ? "o" : "x";
    currentPlayer.removeGlow();
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentPlayer.makeGlow();
  };

  // marks the div
  const fillSquare = (index) => {
    boardArray[index] = symbol;

    let spanText = document.createElement("span");
    spanText.classList.add("text");
    spanText.innerText = symbol;
    squares[index].appendChild(spanText);
  };

  // clears the array for a restart
  const clearBoard = () => {
    boardArray = ["", "", "", "", "", "", "", "", ""];
    squares.forEach((square) => {
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
    } else {
      return false;
    }
  };

  return { startGame };
})();

gameBoard.startGame();

const factoryPlayer = ((name, sideID, type) => {
  const makeGlow = () => {
    isSecureContext;
  };
  return {};
})();
