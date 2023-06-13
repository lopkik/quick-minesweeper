import { useState } from "react"
import { MineField } from "./components/MineField"

function App() {
  return (
    <div className='app'>
      <div className='app-header'>
        <button>Beginner (10x10 w/ 10 mines)</button>
        <button>Intermediate (16x16 w/ 40 mines)</button>
        <button>Expert (30x16 w/ 99 mines)</button>
      </div>
      <div className='app-body'>
        <MineField width={10} height={10} mineCount={20} />
      </div>
    </div>
  )
}

export default App
