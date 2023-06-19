import { MineField } from "./components/MineField";
import { useGameStateStore } from "./gameStateStore";
import { MineFieldHeader } from "./components/MineFieldHeader";

function App() {
  const { setNewBoard } = useGameStateStore();

  return (
    <div className="app">
      <div className="app-header">
        <button onClick={() => setNewBoard(10, 10, 10)}>
          Beginner (10x10 w/ 10 mines)
        </button>
        <button onClick={() => setNewBoard(16, 16, 40)}>
          Intermediate (16x16 w/ 40 mines)
        </button>
        <button onClick={() => setNewBoard(30, 16, 99)}>
          Expert (30x16 w/ 99 mines)
        </button>
      </div>
      <div className="app-body">
        <div style={{ backgroundColor: "lightgray", padding: "1rem" }}>
          <MineFieldHeader />
          <MineField />
        </div>
      </div>
    </div>
  );
}

export default App;
