import { create } from "zustand";
import { BOMB_VALUE, initialBoard } from "./constants";

let intervalId: number | undefined;
interface GameState {
  board: BoardSquare[][];
  gameSettings: GameSettings;
  gameStatus: GameStatus;
  revealedSquares: number;
  flaggedSquares: number;
  secondsElapsed: number;
  checkWinCondition: () => void;
  generateStartingBoard: (startXIndex: number, startYIndex: number) => void;
  revealSquare: (x: number, y: number) => void;
  revealSurroundingSquares: (x: number, y: number) => void;
  toggleIsFlaggedAt: (x: number, y: number, prevIsFlagged: boolean) => void;
  setGameSettings: (newGameSettings: GameSettings) => void;
  startTimer: () => void;
  stopTimer: () => void;
  setNewBoard: (width: number, height: number, mineCount: number) => void;
}

export const useGameStateStore = create<GameState>((set, get) => ({
  board: initialBoard,
  gameSettings: {
    width: 10,
    height: 10,
    mineCount: 10,
  },
  gameStatus: "WAITING_TO_BEGIN",
  revealedSquares: 0,
  flaggedSquares: 0,
  secondsElapsed: 0,
  checkWinCondition: () => {
    const {
      revealedSquares,
      gameSettings: { width, height, mineCount },
    } = get();
    if (width * height - revealedSquares === mineCount) {
      get().stopTimer();
      // flag any remaining unflagged bombs and win game
      set((state) => {
        const newBoard = [...state.board];
        for (let y = 0; y < get().gameSettings.height; y++) {
          for (let x = 0; x < get().gameSettings.width; x++) {
            if (newBoard[y][x].value === -1) newBoard[y][x].isFlagged = true;
          }
        }
        return {
          ...state,
          board: newBoard,
          flaggedSquares: state.gameSettings.mineCount,
          gameStatus: "WON",
        };
      });
    }
  },
  generateStartingBoard: (startXIndex, startYIndex) => {
    const { width, height } = get().gameSettings;
    const bombCoordsSet = generateBombCoords(startXIndex, startYIndex);

    // Generates new board with only bombs marked
    const newBoard: BoardSquare[][] = [];
    for (let y = 0; y < height; y++) {
      newBoard[y] = [];
      for (let x = 0; x < width; x++) {
        newBoard[y].push({
          isRevealed: false,
          isFlagged: false,
          value: bombCoordsSet.has(`${x}-${y}`) ? -1 : 0,
          surroundingFlagCount: 0,
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

    set({ board: newBoard, gameStatus: "RUNNING" });
  },
  revealSquare: (x, y) => {
    const board = get().board;
    if (board[y][x].isFlagged) return;
    if (board[y][x].value === BOMB_VALUE) {
      get().stopTimer();
      // lose the game, reveal all bombs
      set((state) => {
        const newBoard = [...state.board];
        for (let y = 0; y < get().gameSettings.height; y++) {
          for (let x = 0; x < get().gameSettings.width; x++) {
            if (newBoard[y][x].value === -1) newBoard[y][x].isRevealed = true;
          }
        }
        return {
          ...state,
          board: newBoard,
          gameStatus: "LOST",
        };
      });
    } else if (board[y][x].value === 0 && !board[y][x].isRevealed) {
      set((state) => {
        const newBoard = [...state.board];
        newBoard[y][x].isRevealed = true;
        return {
          ...state,
          board: newBoard,
          revealedSquares: state.revealedSquares + 1,
        };
      });
      const surroundingCoords = getSurroundingCoords(
        x,
        y,
        board[0].length,
        board.length
      );
      surroundingCoords.forEach((coord) => {
        const [nextX, nextY] = coord.split("-").map(Number);
        if (!board[nextY][nextX].isRevealed) get().revealSquare(nextX, nextY);
      });
    } else {
      if (!board[y][x].isRevealed)
        set((state) => {
          const newBoard = [...state.board];
          newBoard[y][x].isRevealed = true;
          return {
            ...state,
            board: newBoard,
            revealedSquares: state.revealedSquares + 1,
          };
        });
    }
  },
  revealSurroundingSquares: (x, y) => {
    const { width, height } = get().gameSettings;
    const surroundingCoords = getSurroundingCoords(x, y, width, height);
    surroundingCoords.forEach((coord) => {
      const [adjacentX, adjacentY] = coord.split("-").map(Number);
      get().revealSquare(adjacentX, adjacentY);
    });
  },
  toggleIsFlaggedAt: (x, y, prevIsFlagged) => {
    const surroundingCoords = getSurroundingCoords(
      x,
      y,
      get().gameSettings.width,
      get().gameSettings.height
    );
    set({
      board: get().board.map((row, newBoardY) => {
        return row.map((square, newBoardX) => {
          if (newBoardX === x && newBoardY === y) {
            return { ...square, isFlagged: !prevIsFlagged };
          } else if (surroundingCoords.has(`${newBoardX}-${newBoardY}`)) {
            return {
              ...square,
              surroundingFlagCount: prevIsFlagged
                ? square.surroundingFlagCount - 1
                : square.surroundingFlagCount + 1,
            };
          } else {
            return square;
          }
        });
      }),
      flaggedSquares: prevIsFlagged
        ? get().flaggedSquares - 1
        : get().flaggedSquares + 1,
    });
  },
  setGameSettings: (newGameSettings) => {
    set({ gameSettings: newGameSettings });
  },
  startTimer: () => {
    if (!intervalId) {
      intervalId = setInterval(
        () => set((state) => ({ secondsElapsed: state.secondsElapsed + 1 })),
        1000
      );
    }
  },
  stopTimer: () => {
    clearInterval(intervalId);
    intervalId = undefined;
  },
  setNewBoard: (width, height, mineCount) => {
    const newBoard: BoardSquare[][] = [];
    for (let y = 0; y < height; y++) {
      newBoard[y] = [];
      for (let x = 0; x < width; x++) {
        newBoard[y].push({
          isRevealed: false,
          isFlagged: false,
          value: 0,
          surroundingFlagCount: 0,
        });
      }
    }

    get().stopTimer();
    set({
      board: newBoard,
      gameSettings: { width, height, mineCount },
      gameStatus: "WAITING_TO_BEGIN",
      revealedSquares: 0,
      flaggedSquares: 0,
      secondsElapsed: 0,
    });
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

// Randomly generates bomb coords such that none are on the first square clicked
// or any surrounding squares
const generateBombCoords = (startXIndex: number, startYIndex: number) => {
  const { gameSettings } = useGameStateStore.getState();
  const bombCoordsSet = new Set<string>();
  const coordsInRangeOfStart = getSurroundingCoords(
    startXIndex,
    startYIndex,
    gameSettings.width,
    gameSettings.height
  );
  coordsInRangeOfStart.add(`${startXIndex}-${startYIndex}`);
  while (bombCoordsSet.size < gameSettings.mineCount) {
    const bombX = Math.floor(Math.random() * gameSettings.width);
    const bombY = Math.floor(Math.random() * gameSettings.height);
    if (!coordsInRangeOfStart.has(`${bombX}-${bombY}`))
      bombCoordsSet.add(`${bombX}-${bombY}`);
  }
  return bombCoordsSet;
};
