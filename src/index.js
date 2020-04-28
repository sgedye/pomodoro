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
  const [ timeRemaining, setTimeRemaining ] = useState({minutes:25, seconds:0})
  const [ isPlaying, setIsPlaying] = useState(false)

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

  const [interv, setInterv] = useState()

  let updatedMinutes = timeRemaining.minutes, updatedSeconds = timeRemaining.seconds

  const resumeTimer = () => { //Resume / Start
    console.log('resumeTimer')
    runTimer()
    setInterv(setInterval(runTimer, 1000))
  }
  const runTimer = () => {
    console.log("runTimer")
    if (updatedSeconds <= 0) {
      if (updatedMinutes <= 0) {
        //times up
      } else {
        updatedMinutes--
        updatedSeconds += 60
      }
    }
    updatedSeconds--
    return setTimeRemaining({
      minutes: updatedMinutes,
      seconds: updatedSeconds,
    })
  }
  const pauseTimer = () => {
    console.log("pauseTimer")
    clearInterval(interv)
  }
  const resetTimer = () => {
    console.log("resetTimer")
    clearInterval(interv)
    setTimeRemaining([25, 0])
    setIsPlaying(false)
  }
  const playPause = (action) => {
    console.log(action)
    action === 'play' ? resumeTimer() : pauseTimer()
    setIsPlaying(!isPlaying)
  }
  // const runTimer = (action) => {
  //   console.log(action)
  //   let countdown
  //   let time = timeRemaining[0] * 60 * 1000 + timeRemaining[1] * 1000
  //   if (action === 'play') {
  //     countdown = setInterval(function() {
  //       time -= 1000
  //       let minutes = Math.floor(time / (60 * 1000))
  //       let seconds = Math.floor(time / 1000 - minutes * 60)
  //       setTimeRemaining([minutes, seconds])
  //       document.getElementById(
  //         "time-left"
  //       ).innerHTML = `${minutes
  //         .toString()
  //         .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  //       if (time <= 0) {
  //         // play sound, etc.
  //         clearInterval(countdown)
  //         action = 'pause'
  //       }
  //     }, 1000)
  //   } else {
  //     clearInterval(countdown)
  //     action = 'pause'
  //   }
  // }


/*
  // Simplified TIMER
  const runTimer = (action) => {
    let time = timeRemaining[0] * 60 * 1000 + timeRemaining[1] * 1000
 
    if (action === "play") {
      t = setInterval(() => {
        if (action === 'play') {
          time -= 1000
          console.log(time)
          if (time <= 0) {
            console.log("time's up!")
            action = 'pause'
          }
        } else {
          clearInterval(incrementer)
          incrementer = -1
        }
      }, 1000)
    }
  }


  const playPause = action => {
    setIsPlaying(!isPlaying)

    console.log("isPlay", isPlaying, action)
    runTimer(action)
    
    


    console.log("Is playing? ", isPlaying)
    console.log(timeRemaining)
  }

  const resetTimer = () => {
    console.log("resetTimer")
    setTimeRemaining([25,0])
    setIsPlaying(false)
    runTimer('pause')
  }
*/

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