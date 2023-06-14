type GameStatus = "WAITING_TO_BEGIN" | "RUNNING" | "WON" | "LOST";

interface BoardSquare {
  isRevealed: boolean;
  // value = -1 represents a mine
  // value = 0 thru 8 represents the number of bombs surrounding this square
  value: number;
}

interface Dimensions {
  width: number;
  height: number;
}
