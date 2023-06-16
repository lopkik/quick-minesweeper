import { useGameStateStore } from "../gameStateStore";

interface SquareProps extends BoardSquare {
  x: number;
  y: number;
}

export const Square = (props: SquareProps) => {
  const { isRevealed, isFlagged, value, surroundingFlagCount, x, y } = props;
  const {
    gameStatus,
    generateStartingBoard,
    revealSquare,
    revealSurroundingSquares,
    toggleIsFlaggedAt,
    checkWinCondition,
  } = useGameStateStore();

  return (
    <div
      onClick={() => {
        if (gameStatus === "WAITING_TO_BEGIN") {
          generateStartingBoard(x, y);
          revealSquare(x, y);
        } else if (gameStatus === "RUNNING") {
          if (isRevealed && surroundingFlagCount >= value) {
            revealSurroundingSquares(x, y);
          } else if (!isFlagged) {
            revealSquare(x, y);
            checkWinCondition();
          }
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (gameStatus === "RUNNING" && !isRevealed)
          toggleIsFlaggedAt(x, y, isFlagged);
      }}
      style={{
        backgroundColor: isRevealed ? "green" : "red",
        width: 50,
        height: 50,
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: isFlagged ? "bold" : "normal",
        cursor: "pointer",
      }}
    >
      {value === -1 ? "BBB" : value}
      f: {surroundingFlagCount}
    </div>
  );
};
