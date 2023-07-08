import { MineField } from "./components/MineField"
import { useGameStateStore } from "./gameStateStore"
import { MineFieldHeader } from "./components/MineFieldHeader"
import { NewGameDialog } from "./components/NewGameDialog"

function App() {
  const setNewBoard = useGameStateStore((state) => state.setNewBoard)

  return (
    <div className='app'>
      <div className='app-header'>
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
      <NewGameDialog />
      <div className='app-body'>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "75% 25%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: "lightgray",
                padding: "1rem",
              }}
            >
              <MineFieldHeader />
              <MineField />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                border: "5px dotted gray",
                padding: "1rem",
                margin: "1rem",
              }}
            >
              <h2>
                <u>Help/About</u>
              </h2>
              <p>
                <b>Left Click</b> to reveal a square <br />
                <b>Left Click</b> a revealed square to reveal all surrounding
                squares (if the number of surrounding flags are greater than or
                equal to the number inside the revealed square)
              </p>
              <p>
                <b>Right Click</b> to flag an unrevealed square
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
