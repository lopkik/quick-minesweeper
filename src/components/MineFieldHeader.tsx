import React from "react";
import { useGameStateStore } from "../gameStateStore";

export const MineFieldHeader = () => {
  const { gameSettings, flaggedSquares, secondsElapsed } = useGameStateStore();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "2rem",
      }}
    >
      <div>🚩 {gameSettings.mineCount - flaggedSquares}</div>
      <div>⏱️ {secondsElapsed}</div>
    </div>
  );
};
