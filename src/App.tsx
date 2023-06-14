import React from "react";
import { MineField } from "./components/MineField";
import { useGameStateStore } from "./gameStateStore";

function App() {
  const { board, generateBoard } = useGameStateStore();
  const [selectedDimensions, setSelectedDimensions] =
    React.useState<Dimensions>({ width: 10, height: 10 });

  return (
    <div className="app">
      <div className="app-header">
        <button
          onClick={() => setSelectedDimensions({ width: 10, height: 10 })}
        >
          Beginner (10x10 w/ 10 mines)
        </button>
        <button
          onClick={() => setSelectedDimensions({ width: 16, height: 16 })}
        >
          Intermediate (16x16 w/ 40 mines)
        </button>
        <button
          onClick={() => setSelectedDimensions({ width: 30, height: 16 })}
        >
          Expert (30x16 w/ 99 mines)
        </button>
        <button onClick={() => generateBoard(10, 10, 10, 4, 4)}>
          generate board
        </button>
      </div>
      <div className="app-body">
        <MineField board={board} width={10} height={10} mineCount={20} />
      </div>
    </div>
  );
}

export default App;
