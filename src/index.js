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
  const [ sessionLength, setSessionLength ] = useState(1)
  const [ interv, setInterv ] = useState()
  const [ timeRemaining, setTimeRemaining ] = useState({minutes:1, seconds:0})
  const [ isPlaying, setIsPlaying] = useState(false)

  // Setting the timer
  const changeTime = id => {
    const [type, change] = id.split('-')
    if (type === 'break' && change === 'increment' && breakLength < 60) {
      setBreakLength(breakLength + 1)
      // setTimer(breakLength + 1)
    } else if (type === 'break' && change === 'decrement' && breakLength > 0) {
      setBreakLength(breakLength - 1)
      // setTimer(breakLength - 1)
    } else if (type === 'session' && change === 'increment' && sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      setTimer(sessionLength + 1)
    } else if (type === 'session' && change === 'decrement' && sessionLength > 0) {
      setSessionLength(sessionLength - 1)
      setTimer(sessionLength - 1)
    }
  }
  const setTimer = setMinutes => setTimeRemaining({minutes: setMinutes, seconds: 0})

  let updatedMinutes = timeRemaining.minutes, updatedSeconds = timeRemaining.seconds

  const startTimer = () => {
    setIsPlaying(true)
    run()
    //setInterv(setInterval(run, 100))
  }
  const run = () => {
    //if (isPlaying) {
      console.log("runTimer")
      if (updatedSeconds === 0) {
        if (updatedMinutes === 0) {
          setIsPlaying(false)
          clearInterval(interv)
          resetTimer()
          // return null
          // setInterv(clearInterval(interv))
          // setIsPlaying(false)
          // soundAlarm()
          // setTimeout(switchTimer, 5000)
        } else {
          updatedMinutes--
          updatedSeconds += 60
        }
      }
      if (updatedSeconds > 0) {
        updatedSeconds--
      }
      return setTimeRemaining({ minutes: updatedMinutes, seconds: updatedSeconds })
    //}
  }
  const soundAlarm = () => {
    const alarm = new Audio("http://soundbible.com/mp3/Temple%20Bell-SoundBible.com-756181215.mp3")
    alarm.play()
  }
  const switchTimer = () => {
    type === "Session" ? setType("Break") : setType("Session")
    let switchMinutes = type === "Session" ? sessionLength : breakLength
    setTimeRemaining({ minutes: switchMinutes, seconds: 0 })
    console.log('hi')

  }
  const stopTimer = () => {
    console.log("pauseTimer")
    setIsPlaying(false)
    clearInterval(interv)
  }
  const resetTimer = () => {
    console.log("resetTimer")
    clearInterval(interv)
    let resetMinutes = (type === 'Session') ? sessionLength : breakLength
    setTimeRemaining({minutes: resetMinutes, seconds: 0})
    setIsPlaying(false)
    console.log(resetMinutes, timeRemaining, isPlaying)
  }
  const playPause = () => {
    isPlaying ? stopTimer() : startTimer()
  }

  return (
    <div id="pomodoro">
      <Title>Pomodoro</Title>
      <Timers breakLength={breakLength} sessionLength={sessionLength} handleChange={changeTime} />
      <Countdown type={type} timeRemaining={timeRemaining} />
      <Controls isPlaying={isPlaying} handleReset={resetTimer} handlePlayPause={playPause} />
      <Footer>Create by Shaunicles</Footer>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById("root"))