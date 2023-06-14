import React from "react";

interface SquareProps extends BoardSquare {
  x: number;
  y: number;
}

export const Square = (props: SquareProps) => {
  const { isRevealed, value } = props;

  return (
    <div
      style={{
        backgroundColor: isRevealed ? "green" : "red",
        width: 50,
        height: 50,
        border: "1px solid black",
      }}
    >
      {value === -1 ? "BBB" : value}
    </div>
  );
};
