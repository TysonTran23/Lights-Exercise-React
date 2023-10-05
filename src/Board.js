import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());
  console.log(board);
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    //Create a array with 5 spots (rows)
    //For each row, insert a column up to 5
    //For each cell, if a random number is less than 0.25, light up the cell, if it's false, keep the cell turned off
    let board = Array.from({ length: nrows }).map((row) => {
      return Array.from({ length: ncols }).map(
        (cell) => Math.random() < chanceLightStartsOn
      );
    });
    return board;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // For every cell on the game board, if the light is turn off, return true, if the light is still on return false
    // If returned True, you win, if False, keep playing
    return board.every((row) =>
      row.every((cell) => (cell === false ? true : false))
    );
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      //For every row on the gameboard, copy that row
      let copyBoard = oldBoard.map((row) => row.slice());

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copyBoard);
      flipCell(y, x - 1, copyBoard);
      flipCell(y, x + 1, copyBoard);
      flipCell(y + 1, x, copyBoard);
      flipCell(y - 1, x, copyBoard);

      // TODO: return the copy
      return copyBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return <h1>You win!</h1>;
  }

  // make table board
  let tableBoard = [];
  //Create rows
  for (let y = 0; y < nrows; y++) {
    let rows = [];
    //Create columns
    for (let x = 0; x < ncols; x++) {
      //
      let coordinate = `${y}-${x}`;
      rows.push(
        <Cell
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coordinate)}
        />
      );
    }
    tableBoard.push(<tr>{rows}</tr>);
  }
  console.log(tableBoard)
  // TODO
  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
