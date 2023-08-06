import { useGameStateStore } from "@store/gameStateStore"

export const MineFieldHeader = () => {
  const { gameSettings, flaggedSquares, secondsElapsed } = useGameStateStore()
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "2rem",
        padding: "1rem 0.5rem",
      }}
    >
      <div>🚩 {gameSettings.mineCount - flaggedSquares}</div>
      <div>⏱️ {secondsElapsed}</div>
    </div>
  )
}
