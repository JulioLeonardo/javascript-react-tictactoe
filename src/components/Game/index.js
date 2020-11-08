import { useState } from "react";
import calculateWinner from "../../utils/calculateWinner";
import Board from "../Board";
import "./styles.css";

export default function Game() {
  const [boardHistory, setBoardHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(boardHistory[stepNumber]);
  const currentBoard = boardHistory[stepNumber];

  const checkWinner = () => {};

  const handleClickHuman = (i) => {
    const timeInHistory = boardHistory.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    if (winner || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setBoardHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXisNext(!xIsNext);
  };

  const previousMove = () => {
    if (stepNumber !== 0) {
      setStepNumber(stepNumber - 1);
      setXisNext(xIsNext % 2 === 0);
    }
  };

  const startHumanVsHumanGame = () => {
    setStepNumber(0);
    setXisNext(true);
  };

  const startHumanVsAIgame = () => {};

  return (
    <div className="game">
      <div className="display-and-controls">
        <div className="display">
          <p>
            {winner
              ? "Winner: " + winner
              : currentBoard.includes(null)
              ? "Next Player: " + (xIsNext ? "X" : "O")
              : "We Have a Draw!!"}
          </p>
        </div>
        <div className="controls">
          <button onClick={() => previousMove()}>Previous Move</button>
          <button onClick={() => startHumanVsHumanGame()}>
            Start Human x Human Game
          </button>
          <button onClick={() => startHumanVsAIgame()}>
            Start Human x AI Game
          </button>
        </div>
      </div>
      <Board squares={currentBoard} onClick={handleClickHuman} />
    </div>
  );
}
