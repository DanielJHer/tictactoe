"use strict";

const gameBoard = (() => {
  // starting conditions
  let boardArray = ["", "", "", "", "", "", "", "", ""];
  let symbol = "X";
  let currentPlayer;

  // selecting DOM elements
  const cells = document.querySelectorAll(".cell");
  const cellsArray = Array.from(cells);
  const player1Div = document.querySelector(".player1");
  const player2Div = document.querySelector(".player2");
  const winningMsg = document.querySelector(".winning-message");
  const restartBtn = document.querySelector("#restartBtn");
  const winText = document.querySelector(".winText");
  const form = document.querySelector("#form");
  const enterPlayerForm = document.querySelector(".enterPlayerForm");

  const startGame = () => {
    // starting round
    currentPlayer = player1Div;
    highlight(currentPlayer);

    // storing name as variable
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const player1Name = form.elements[0].value;
      const player2Name = form.elements[1].value;
      if (player1Name === "" || player2Name === "") {
        alert("Please enter your names!");
      } else {
        enterPlayerForm.classList.add("hide");
      }
      console.log(player1Div.innerHTML);

      // renders players names
      player1Div.innerHTML = "";
      player2Div.innerHTML = "";
      player1Div.insertAdjacentHTML("afterbegin", `${player1Name}`);
      player2Div.insertAdjacentHTML("afterbegin", `${player2Name}`);

      // adding game logic
      cellsArray.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          let index = cellsArray.indexOf(cell);
          if (boardArray[index] === "") {
            markCell(index);
            boardArray[index] = symbol;
            if (checkWinCondition()) {
              // Win or Lose
              symbol === "X"
                ? winText.insertAdjacentText(
                    "afterbegin",
                    `${player1Name} Wins!`
                  )
                : winText.insertAdjacentText(
                    "afterbegin",
                    `${player2Name} Wins!`
                  );
              endGame();
            } else if (boardArray.filter((elem) => elem).length === 9) {
              // Draw
              winText.insertAdjacentText("afterbegin", `It's a draw!`);
              endGame();
            } else {
              // Next turn
              changeTurn();
            }
          }
        });
      });
    });

    // restart button
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

  // changes the turn following a move
  const changeTurn = () => {
    symbol = symbol === "X" ? "O" : "X";
    removeHighlight(currentPlayer);
    currentPlayer = currentPlayer === player1Div ? player2Div : player1Div;
    highlight(currentPlayer);
  };

  // marks the div and adds to array
  const markCell = (index) => {
    boardArray[index] = symbol;

    let spanText = document.createElement("span");
    spanText.innerText = symbol;
    cells[index].appendChild(spanText);
  };

  // clears the array and gameboard for a restart
  const restartGame = () => {
    boardArray = ["", "", "", "", "", "", "", "", ""];
    winText.innerText = "";
    cells.forEach((square) => {
      square.innerHTML = "";
    });
  };

  // ends the game
  const endGame = () => {
    // display message
    winningMsg.classList.add("show");
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

// optimize highlight code
