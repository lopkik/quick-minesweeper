import React from "react"
import { useGameStateStore } from "../store/gameStateStore"

export const NewGameDialog = () => {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const gameStatus = useGameStateStore((state) => state.gameStatus)
  const resetBoard = useGameStateStore((state) => state.resetBoard)

  React.useEffect(() => {
    if (dialogRef.current && (gameStatus === "WON" || gameStatus === "LOST"))
      dialogRef.current?.showModal()
  }, [gameStatus])

  return (
    <dialog ref={dialogRef}>
      <div
        className='dialog-content-container'
        onClick={() => dialogRef.current?.close()}
      >
        <div className='dialog-content' onClick={(e) => e.preventDefault()}>
          <h2>{gameStatus === "WON" ? "YOU WON B)" : "YOU LOST :("}</h2>
          <button
            onClick={() => {
              dialogRef.current?.close()
              resetBoard()
            }}
          >
            PLAY AGAIN?
          </button>
        </div>
      </div>
    </dialog>
  )
}
