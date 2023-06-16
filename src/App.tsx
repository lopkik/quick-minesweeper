import React from "react";
import { MineField } from "./components/MineField";
import { useGameStateStore } from "./gameStateStore";

function App() {
  const {
    board,
    gameStatus,
    revealedSquares,
    generateStartingBoard,
    setGameSettings,
  } = useGameStateStore();

  return (
    <div className="app">
      <div className="app-header">
        {gameStatus}
        {revealedSquares}
        <button
          onClick={() =>
            setGameSettings({ width: 10, height: 10, mineCount: 10 })
          }
        >
          Beginner (10x10 w/ 10 mines)
        </button>
        <button
          onClick={() =>
            setGameSettings({ width: 16, height: 16, mineCount: 40 })
          }
        >
          Intermediate (16x16 w/ 40 mines)
        </button>
        <button
          onClick={() =>
            setGameSettings({ width: 30, height: 16, mineCount: 99 })
          }
        >
          Expert (30x16 w/ 99 mines)
        </button>
        <button onClick={() => generateStartingBoard(4, 4)}>
          generate board
        </button>
      </div>
      <div className="app-body">
        <MineField board={board} />
      </div>
    </div>
  );
}

export default App;
