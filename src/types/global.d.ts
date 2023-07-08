declare global {
  type GameStatus = "WAITING_TO_BEGIN" | "RUNNING" | "WON" | "LOST"

  interface GameSettings {
    width: number
    height: number
    mineCount: number
  }

  interface BoardSquare {
    isRevealed: boolean
    isFlagged: boolean
    // value = -1 represents a mine
    // value = 0 thru 8 represents the number of bombs surrounding this square
    value: number
    surroundingFlagCount: number
  }

  interface Dimensions {
    width: number
    height: number
  }
}

export {}
