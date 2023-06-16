import { useGameStateStore } from "../gameStateStore";
import { Square } from "./Square";

interface MineFieldProps {
  board: BoardSquare[][];
}

export const MineField = (props: MineFieldProps) => {
  const { board } = props;
  const { width } = useGameStateStore((state) => state.gameSettings);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: `repeat(${width}, 1fr)` }}
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
