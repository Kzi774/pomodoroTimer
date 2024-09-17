import { useState } from 'react'
import './App.css'
import PomodoroTimer from './components/PomodoroTimer'
import PomodoroTwo from './components/pomodoroTwo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PomodoroTimer />
    </>
  )
}

export default App
