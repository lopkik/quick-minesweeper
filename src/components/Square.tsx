import { BOMB_VALUE } from "../constants";
import { useGameStateStore } from "../gameStateStore";

interface SquareProps extends BoardSquare {
  x: number;
  y: number;
}

const getTextFromValue = (value: number) => {
  if (value === BOMB_VALUE) return "💣";
  if (value === 0) return "";
  return `${value}`;
};

const getBackgroundColor = (isRevealed: boolean, value: number) => {
  if (isRevealed && value === BOMB_VALUE) return "red";
  return "#bdbdbd";
};

export const Square = (props: SquareProps) => {
  const { isRevealed, isFlagged, value, surroundingFlagCount, x, y } = props;
  const {
    gameStatus,
    generateStartingBoard,
    revealSquare,
    revealSurroundingSquares,
    toggleIsFlaggedAt,
    checkWinCondition,
    startTimer,
  } = useGameStateStore();

  return (
    <div
      className="square"
      onClick={() => {
        if (gameStatus === "WAITING_TO_BEGIN") {
          generateStartingBoard(x, y);
          revealSquare(x, y);
          startTimer();
        } else if (gameStatus === "RUNNING") {
          if (isRevealed && surroundingFlagCount >= value) {
            revealSurroundingSquares(x, y);
          } else if (!isFlagged) {
            revealSquare(x, y);
          }
          checkWinCondition();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (gameStatus === "RUNNING" && !isRevealed)
          toggleIsFlaggedAt(x, y, isFlagged);
      }}
      data-is-revealed={isRevealed}
      data-value={value}
      style={{
        backgroundColor: getBackgroundColor(isRevealed, value),
      }}
    >
      {isFlagged && <span>🚩</span>}
      {isRevealed && <span>{getTextFromValue(value)}</span>}
    </div>
  );
};
