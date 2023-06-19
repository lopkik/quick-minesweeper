import { useGameStateStore } from "../gameStateStore";
import { Square } from "./Square";

export const MineField = () => {
  const { width } = useGameStateStore((state) => state.gameSettings);
  const board = useGameStateStore((state) => state.board);

  return (
    <div
      className="minefield"
      style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
    >
      {board.map((row, y) => {
        return row.map(
          ({ isRevealed, isFlagged, value, surroundingFlagCount }, x) => (
            <Square
              key={`${x}-${y}`}
              x={x}
              y={y}
              isRevealed={isRevealed}
              isFlagged={isFlagged}
              value={value}
              surroundingFlagCount={surroundingFlagCount}
            />
          )
        );
      })}
    </div>
  );
};
