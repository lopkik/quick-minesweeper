import React from "react";
import { Square } from "./Square";

interface MineFieldProps {
  board: BoardSquare[][];
  width: number;
  height: number;
  mineCount: number;
}

export const MineField = (props: MineFieldProps) => {
  const { board, width, height, mineCount } = props;

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: `repeat(${width}, 1fr)` }}
    >
      {board.map((row, y) => {
        return row.map(({ isRevealed, value }, x) => (
          <Square
            key={`${x}-${y}`}
            x={x}
            y={y}
            isRevealed={isRevealed}
            value={value}
          />
        ));
      })}
    </div>
  );
};
