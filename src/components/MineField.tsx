import React from "react"
import { Square } from "./Square"

interface MineFieldProps {
  width: number
  height: number
  mineCount: number
}

export const MineField = (props: MineFieldProps) => {
  const { width, height, mineCount } = props

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: `repeat(${width}, 1fr)` }}
    >
      {Array.from(new Array(height)).map(() => {
        return Array.from(new Array(width)).map(() => <Square />)
      })}
    </div>
  )
}
