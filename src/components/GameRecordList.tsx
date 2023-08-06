import { useGameRecordStore } from "@/store/gameRecordStore"
import React from "react"

export const GameRecordList = () => {
  const gameRecords = useGameRecordStore((state) => state.gameRecords)

  return (
    <div>
      <h2>Past Games</h2>
      {gameRecords.map((gameRecord) => (
        <div className='grid gap-4 grid-cols-4'>
          <div>{gameRecord.boardCleared ? "✅" : "❌"}</div>
          <div>{gameRecord.boardSize}</div>
          <div>{gameRecord.gameDate.toLocaleDateString()}</div>
          <div>{gameRecord.timeTaken}</div>
        </div>
      ))}
    </div>
  )
}
