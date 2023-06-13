import React from "react"

export const Square = () => {
  const [revealed, setRevealed] = React.useState(false)

  return (
    <div
      onClick={() => setRevealed(true)}
      style={{ backgroundColor: revealed ? "green" : "red" }}
    >
      Square
    </div>
  )
}
