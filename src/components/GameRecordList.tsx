import React from "react"

export const GameRecordList = () => {
  const [difficultyLevel, setDifficultyLevel] =
    React.useState<DifficultyLevel>("BEGINNER")

  return (
    <div>
      <h2>{difficultyLevel} Games</h2>
    </div>
  )
}
