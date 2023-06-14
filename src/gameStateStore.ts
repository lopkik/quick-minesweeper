import { create } from "zustand";
import { initialBoard } from "./constants";

interface GameState {
  gameStatus: GameStatus;
  board: BoardSquare[][];
  generateBoard: (
    width: number,
    height: number,
    mineCount: number,
    startXIndex: number,
    startYIndex: number
  ) => void;
}

export const useGameStateStore = create<GameState>((set) => ({
  gameStatus: "WAITING_TO_BEGIN",
  board: initialBoard,
  generateBoard: (
    width: number,
    height: number,
    mineCount: number,
    startXIndex: number,
    startYIndex: number
  ) => {
    // Randomly generates bomb coords such that none are on the first square clicked
    // or any surrounding squares
    const bombCoordsSet = new Set<string>();
    const coordsInRangeOfStart = getSurroundingCoords(
      startXIndex,
      startYIndex,
      width,
      height
    );
    coordsInRangeOfStart.add(`${startXIndex}-${startYIndex}`);
    while (bombCoordsSet.size < mineCount) {
      const bombX = Math.floor(Math.random() * width);
      const bombY = Math.floor(Math.random() * height);
      if (!coordsInRangeOfStart.has(`${bombX}-${bombY}`))
        bombCoordsSet.add(`${bombX}-${bombY}`);
    }

    // Generates new board with only bombs marked
    const newBoard: BoardSquare[][] = [];
    for (let y = 0; y < height; y++) {
      newBoard[y] = [];
      for (let x = 0; x < width; x++) {
        newBoard[y].push({
          isRevealed: false,
          value: bombCoordsSet.has(`${x}-${y}`) ? -1 : 0,
        });
      }
    }

    // Tallies bombcount for each square surrounding a bomb
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (newBoard[y][x].value === -1) {
          const coordsAroundBomb = getSurroundingCoords(x, y, width, height);
          coordsAroundBomb.forEach((coord) => {
            const [coordX, coordY] = coord.split("-").map(Number);
            if (newBoard[coordY][coordX].value > -1)
              newBoard[coordY][coordX].value += 1;
          });
        }
      }
    }
    set({ board: newBoard });
  },
}));

const getSurroundingCoords = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const surroundingCoordsSet = new Set<string>();

  if (x - 1 >= 0) {
    if (y - 1 >= 0) surroundingCoordsSet.add(`${x - 1}-${y - 1}`);
    if (y + 1 < height) surroundingCoordsSet.add(`${x - 1}-${y + 1}`);
    surroundingCoordsSet.add(`${x - 1}-${y}`);
  }

  if (y - 1 >= 0) surroundingCoordsSet.add(`${x}-${y - 1}`);
  if (y + 1 < height) surroundingCoordsSet.add(`${x}-${y + 1}`);

  if (x + 1 < width) {
    if (y - 1 >= 0) surroundingCoordsSet.add(`${x + 1}-${y - 1}`);
    if (y + 1 < height) surroundingCoordsSet.add(`${x + 1}-${y + 1}`);
    surroundingCoordsSet.add(`${x + 1}-${y}`);
  }

  return surroundingCoordsSet;
};
