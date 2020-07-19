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
  // const [ interv, setInterv ] = useState()
  const [ timeRemaining, setTimeRemaining ] = useState({minutes:1, seconds:0})
  const [ timerNotStarted, setTimerNotStarted] = useState(true)
  // const [ timeStamp, setTimeStamp] = useState(new Date())
  // console.log(new Date(2020, 6, 19, 17, 12, 3), 'bluaaah')


  // Setting the timer
  const changeTime = id => {
    console.log('changeTime', id)
    const [type, change] = id.split('-')
    if (type === 'break' && change === 'increment' && breakLength < 60) {
      setBreakLength(breakLength + 1)
    } else if (type === 'break' && change === 'decrement' && breakLength > 0) {
      setBreakLength(breakLength - 1)
    } else if (type === 'session' && change === 'increment' && sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      setTimeRemaining({ minutes: sessionLength + 1, seconds: 0 })
    } else if (type === 'session' && change === 'decrement' && sessionLength > 0) {
      setSessionLength(sessionLength - 1)
      setTimeRemaining({ minutes: sessionLength - 1, seconds: 0 })
    }
    // document.getElementById()
  }
  let expiryTimestamp = new Date()
  expiryTimestamp = expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + timeRemaining.minutes)

  const {
    seconds, minutes, isRunning, start, pause, resume, restart
  } = useTimer({ expiryTimestamp, onExpire: () => expired() })
  
  const playPause = () => {
    if (timerNotStarted) {
      console.log('starting Timer')
      let expiry = new Date()
      console.log('%c Date: ', 'color: orange; font-weight: bold', expiry)
      // expiry.setMinutes(expiry.getMinutes() + timeRemaining.minutes)
      console.log('%c Date: ', 'color: orange; font-weight: bold', expiry)

      // Promise.resolve(setTimeStamp(() => new Date(expiry))).then(() => {
      //   console.log({timeStamp, expiry})
      //   console.log()
        start()
        setTimerNotStarted(false)       
      // })
      // console.log({ timeStamp, expiry }, "2")
    } else {
      console.log('play/pause', isRunning)
      isRunning ? pause() : resume();
    }
  }
  
  const expired = () => {
    console.log("%c expired", "font-weight: bold; color: red;", type)
    type === "Session" ? setType(() => "Break") : setType(() => "Session")
    console.log("%c expired", "font-weight: bold; color: green;", type)
    let switchMinutes = (type === "Session") ? sessionLength : breakLength
    console.log(switchMinutes, 'switchMinutes')
    setTimeRemaining(() => ({ minutes: switchMinutes, seconds: 0 }))
    console.log(timeRemaining, 'timeRemaining')

  }
  if (type === "Break") {
    console.log("%c newType: ", "font-weight: bold; color: green;", type)
    console.log("%c newTimeRemaining: ", "font-weight: bold; color: green;", timeRemaining)
  }

  console.log('%c Minutes, Seconds', 'font-weigth: bold; color: red;', minutes, seconds)
  // const soundAlarm = () => {
  //   const alarm = new Audio("http://soundbible.com/mp3/Temple%20Bell-SoundBible.com-756181215.mp3")
  //   alarm.play()
  // }
  
  // document.onload(() => pause())

  const time = `0${timeRemaining.minutes}`.slice(-2) + ':' + `0${timeRemaining.seconds}`.slice(-2);

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