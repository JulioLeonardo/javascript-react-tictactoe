import { useState } from "react";
import calculateWinner from "../../utils/calculateWinner";
import Board from "../Board";
import "./styles.css";

export default function Game() {
  const [boardHistory, setBoardHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [humanGame, setHumanGame] = useState(true);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(boardHistory[stepNumber]);
  const currentBoard = boardHistory[stepNumber];

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

  const bestMove = (squares) => {
    let squareValue = true;
    let index;

    while (squareValue) {
      console.log("eu 2", index);
      const random = Math.floor(Math.random() * 9);
      if (!squares[random]) {
        index = random;
        console.log("eu", index);
        squareValue = false;
      }
    }
    console.log(index);
    return index;
  };

  const AImove = (squares) => {
    const move = bestMove(squares);
    squares[move] = "O";
    setBoardHistory([...boardHistory, squares]);
    setStepNumber(boardHistory.length);
    setXisNext(!xIsNext);
  };

  const handleClickAI = (i) => {
    const timeInHistory = boardHistory.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    if (winner || squares[i]) return;
    squares[i] = "X";
    setBoardHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXisNext(!xIsNext);
    AImove(squares);
  };

  const previousMove = () => {
    if (stepNumber !== 0) {
      setStepNumber(stepNumber - 1);
      setXisNext(xIsNext % 2 === 0);
    }
  };

  const startHumanVsHumanGame = () => {
    setHumanGame(true);
    setStepNumber(0);
    setXisNext(true);
  };

  const startHumanVsAIgame = () => {
    setHumanGame(false);
    setStepNumber(0);
    setXisNext(true);
  };

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
          {humanGame && (
            <button onClick={() => previousMove()}>Previous Move</button>
          )}
          <button onClick={() => startHumanVsHumanGame()}>
            Start Human x Human Game
          </button>
          <button onClick={() => startHumanVsAIgame()}>
            Start Human x AI Game
          </button>
        </div>
      </div>
      {humanGame ? (
        <Board squares={currentBoard} onClick={handleClickHuman} />
      ) : (
        <Board squares={currentBoard} onClick={handleClickAI} />
      )}
    </div>
  );
}
