import React from "react";
import Square from "../Square";

const Board = ({ squares, size, winMoves, onClick}) =>
  {
    const renderSquare = (i) => {
      return (
        <Square
          key={i}
          value={squares[i]}
          highlight={winMoves && winMoves.includes(i)}
          onClick={() => onClick(i)}
        />
      );
    }
  
    let newSquares = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(renderSquare(i * size + j));
      }
      newSquares.push(<div key={i} className="board-row">{row}</div>);
    }
    return (
      <div>{newSquares}</div>
    );
    
}

export default Board;