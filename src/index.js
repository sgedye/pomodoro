import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useTimer } from 'react-timer-hook'
import styled from 'styled-components'

import './index.css'

import Timers from './Components/Timers'
// import Countdown from './Components/Countdown'
import Controls from './Components/Controls'


function App() {
  const [ type, setType] = useState('Session')   /* use setType when timer (timeRemaining === zero) */
  const [ breakLength, setBreakLength ] = useState(5)
  const [ sessionLength, setSessionLength ] = useState(1)
  const [ interv, setInterv ] = useState()
  const [ timeRemaining, setTimeRemaining ] = useState({minutes:1, seconds:0})

  // Setting the timer
  const changeTime = id => {
    console.log('changeTime', id)
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
  const setTimer = setMinutes => {
    setTimeRemaining({minutes: setMinutes, seconds: 0})
  }


  let expiryTimestamp = new Date()
  expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + timeRemaining.minutes)
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1)
  
  const {
    seconds, minutes, isRunning, start, pause, resume, restart
  } = useTimer({ expiryTimestamp, onExpire: () => expired() })

  console.log('isRunning: ', isRunning);  
  
  const playPause = () => isRunning ? pause() : resume();
  
  const expired = () => {
    console.log("expired", type)
    type === "Session" ? setType("Break") : setType("Session")
    console.log(type, 'type')
    let switchMinutes = type === "Session" ? sessionLength : breakLength
    setTimeRemaining({ minutes: switchMinutes, seconds: 0 })
  }


  // const soundAlarm = () => {
  //   const alarm = new Audio("http://soundbible.com/mp3/Temple%20Bell-SoundBible.com-756181215.mp3")
  //   alarm.play()
  // }
  
  // document.onload(() => pause())

  const time = `0${minutes}`.slice(-2) + ':' + `0${seconds}`.slice(-2);

  return (
    <div id="pomodoro" style={{ textAlign: "center" }}>
      <h1>Pomodoro</h1>
      <Timers breakLength={breakLength} sessionLength={sessionLength} handleChange={changeTime} />
      <Countdown>
        <div id="timer-label">{type}</div>
        <div id="time-left">{time}</div>
      </Countdown>
      <Controls handlePlayPause={playPause} handleRestart={restart} />
      <p>Create by Shaunicles</p>
    </div>
  )
}

const Countdown = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px 0;
  background: yellow;
  border: 2px solid purple;
  border-radius: 20px;
  text-align: center;
  & > div {
    font-size: 1.8em;
    font-weight: bold;
  }
`;

export default App;

ReactDOM.render(<App />, document.getElementById("root"));