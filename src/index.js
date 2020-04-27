import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import './index.css'

import Timers from './Components/Timers'
import Countdown from './Components/Countdown'
import Controls from './Components/Controls'

const Title = styled.h1`
  text-align: center;
`
const Footer = styled.p`
  text-align: center;
`

function App() {
  const [ type, setType] = useState('Session')   /* use setType when timer (timeRemaining === zero) */
  const [ breakLength, setBreakLength ] = useState(5)
  const [ sessionLength, setSessionLength ] = useState(25)
  const [ timeRemaining, setTimeRemaining ] = useState(25)
  const [ isPlaying, setIsPlaying] = useState(false)

  const changeTime = id => {
    const [type, change] = id.split('-')
    if (type === 'break' && change === 'increment' && breakLength < 60) {
      setBreakLength(breakLength + 1)
    } else if (type === 'break' && change === 'decrement' && breakLength > 0) {
      setBreakLength(breakLength - 1)
    } else if (type === 'session' && change === 'increment' && sessionLength < 60) {
      setSessionLength(sessionLength + 1)
    } else if (type === 'session' && change === 'decrement' && sessionLength > 0) {
      setSessionLength(sessionLength - 1)
    }
  }

  const playPause = () => {
    console.log("Is playing? ", isPlaying)
    setIsPlaying(!isPlaying)
  }
  const resetTimer = () => {
    console.log("resetTimer")
    setTimeRemaining(25)
    setIsPlaying(false)
  }

  return (
    <div id="pomodoro">
      <Title>Pomodoro</Title>
      <Timers breakLength={breakLength} sessionLength={sessionLength} handleChange={changeTime} />
      <Countdown type={type} timeRemaining={timeRemaining} />
      <Controls handleReset={resetTimer} handlePlayPause={playPause} />
      <Footer>Create by Shaunicles</Footer>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById("root"))