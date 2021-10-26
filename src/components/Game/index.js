import React, { useState } from "react";
import Board from "../Board";

const Game = (props) => {
  const [size, setSize] = useState(props.size);
  const [history, setHistory] = useState([
    {
      squares: Array(props.size * props.size).fill(null),
      position: 0
    }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isSorted, setIsSorted] = useState(true);
  
  const handleClick = (i) => {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? "X" : "O";
      setHistory(newHistory.concat([
        {
          squares: squares,
          position: i
        }
      ]));
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
  };
  
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0)
  };
  
  const sortHistory = () => {
    setIsSorted(!isSorted)
  };
  
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move #${move} (${1 + history[move].position % size},${1 + Math.floor(history[move].position / size)})`:
      'Go to game start';
    return (
      move === stepNumber ? (
        <li key={move}>
          <button onClick={() => jumpTo(move)}><strong>{desc}</strong></button>
        </li>
      ) : (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      )
    )
  });

  let status;
  if (winner) {
    status = "Winner: " + winner.winner;
  } else {
    if (current.squares.includes(null))
      status = "Next player: " + (xIsNext ? "X" : "O");
    else status = "Draw";
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
        squares={current.squares}
        size={size}
        winMoves={winner ? winner.winMoves : null}
        onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          {isSorted ? (<button onClick={() => sortHistory()}>Ascending</button>) 
          : (<button onClick={() => sortHistory()}>Descending</button>)}
        </div>
        <ol>{isSorted ? moves : [...moves].reverse()}</ol>
      </div>
    </div>
  );
}
  
  // ========================================
  
  function calculateWinner(squares) {
    let rowLength = Math.sqrt(squares.length);
  
    var i, j, count, winMoves = [];
    for (i = 0; i < squares.length; i++) {
      count = 0;
      winMoves = [];
      if (squares[i] !== null) {
        winMoves.push(i);
        // check win streak by row
        for (j = 1; j < 5; j++) {
          if (i + j > rowLength - 1 + Math.floor(i / rowLength) * rowLength)
            break;
          if (squares[i] === squares[i + j]) {
            count++;
            winMoves.push(i + j);
          }
        }
        
        if (count === 4)
          return {
            winner: squares[i],
            winMoves
          }
        count = 0;
        winMoves = [i];
  
        // check win streak by column
        for (j = 1; j < 5; j++) {
          if (squares[i] === squares[i + j*rowLength]) {
            count++;
            winMoves.push(i + j*rowLength);
          }
        }
  
        if (count === 4)
          return {
            winner: squares[i],
            winMoves
          }
        count = 0;
        winMoves = [i];
  
        // check win streak by first diagonal
        for (j = 1; j < 5; j++) {
          if (i + j*rowLength + j > rowLength - 1 + Math.floor((i + j*rowLength + j) / rowLength) * rowLength)
            break;
          if (squares[i] === squares[i + j*rowLength + j]) {
            count++;
            winMoves.push(i + j*rowLength + j);
          }
        }
        if (count === 4)
          return {
            winner: squares[i],
            winMoves
          }
        count = 0;
        winMoves = [i];
  
        // check win streak by second diagonal
        for (j = 1; j < 5; j++) {
          if (i + j*rowLength - j < Math.floor((i + j*rowLength - j) / rowLength) * rowLength)
            break;
          if (squares[i] === squares[i + j*rowLength - j]) {
            count++;
            winMoves.push(i + j*rowLength - j);
          }
        }
        if (count === 4)
          return {
            winner: squares[i],
            winMoves
          }
      }
    }
  
    return null;
}

export default Game;