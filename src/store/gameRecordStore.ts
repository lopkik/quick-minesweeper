import { create } from "zustand"

interface GameRecord {
  boardCleared: boolean
  gameDate: Date
  boardSize: string
  timeTaken: number
}

interface GameRecordStore {
  gameRecords: GameRecord[]
  addGameRecord: (
    boardCleared: boolean,
    boardSize: string,
    timeTaken: number
  ) => void
}

export const useGameRecordStore = create<GameRecordStore>((set) => ({
  gameRecords: [],
  addGameRecord: (
    boardCleared: boolean,
    boardSize: string,
    timeTaken: number
  ) => {
    set((state) => ({
      gameRecords: [
        ...state.gameRecords,
        {
          gameDate: new Date(Date.now()),
          boardCleared,
          boardSize,
          timeTaken,
        },
      ],
    }))
  },
}))
