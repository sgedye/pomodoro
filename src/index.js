import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from "styled-components"

import './index.css'

import Timers from './Components/Timers'
import Controls from './Components/Controls'

function App() {
  const [type, setType] = useState("Session")
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(1)
  const [interv, setInterv] = useState()
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 1, seconds: 0 })
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [isPlaying, setIsPlaying] = useState(false)
  // const [timerNotStarted, setTimerNotStarted] = useState(true)
  // const [ timeStamp, setTimeStamp] = useState(new Date())


///Use UseEffect to update everytime the count is updated.
  useEffect(() => {
    document.getElementById('timer-label').innerText = type
  }, [type])

  useEffect(() => {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft - minutes * 60
    const time = `0${minutes}`.slice(-2) + ":" + `0${seconds}`.slice(-2)

    document.getElementById("time-left").innerText = time
  }, [secondsLeft])

  useEffect(() => {
    console.log(isPlaying)
    if (isPlaying) {
      //run the timer
      // setTimeRemaining(prevState => ({prevState.minutes, prevState.seconds - 1}))
    } else {
      //pause the timer
    }
  }, [isPlaying])



  // Change code to only "deal with" seconds.
  //
  //
  //
  //    Continue below......
  //
  //
  //
  // Comment out timeRemaining




  // Setting the timer
  const changeTime = (id) => {
    console.log("changeTime", id)
    const [type, change] = id.split("-")
    if (type === "break" && change === "increment" && breakLength < 60) {
      setBreakLength(breakLength + 1)
    } else if (type === "break" && change === "decrement" && breakLength > 0) {
      setBreakLength(breakLength - 1)
    } else if (
      type === "session" &&
      change === "increment" &&
      sessionLength < 60
    ) {
      setSessionLength(sessionLength + 1)
      setTimeRemaining({ minutes: sessionLength + 1, seconds: 0 })
    } else if (
      type === "session" &&
      change === "decrement" &&
      sessionLength > 0
    ) {
      setSessionLength(sessionLength - 1)
      setTimeRemaining({ minutes: sessionLength - 1, seconds: 0 })
    }
  }


  const startTimer = () => {
    setIsPlaying(true)
    console.log("startTimer -- isPlaying: ", isPlaying)
    // run()
    setInterv(setInterval(run, 100))
  }
  const run = () => {
    // if (isPlaying) {
    let updatedMinutes = timeRemaining.minutes
    let updatedSeconds = timeRemaining.seconds
    // console.log("runTimer")
    if (updatedSeconds === 0) {
      if (updatedMinutes === 0) {
        console.log("HEY", updatedMinutes, updatedSeconds)
        setIsPlaying(false)
        clearInterval(setInterv)
        // resetTimer()
        countdownFinished()
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
    setTimeRemaining((prevState) => ({
      minutes: updatedMinutes,
      seconds: updatedSeconds,
    }))
    console.log('setTime updaded?', timeRemaining)
    // console.log(timeRemaining, updatedMinutes, updatedSeconds)
    // }
  }



  // const soundAlarm = () => {
  //   const alarm = new Audio("http://soundbible.com/mp3/Temple%20Bell-SoundBible.com-756181215.mp3")
  //   alarm.play()
  // }

  const stopTimer = () => {
    clearInterval(interv)
    setIsPlaying(false)
    console.log("pauseTimer -- isPlaying: ", isPlaying)
  }
  const resetTimer = () => {
    console.log("resetTimer")
    clearInterval(interv)
    setType("Session")
    setTimeRemaining({ minutes: sessionLength, seconds: 0 })
    setIsPlaying(false)
    console.log(timeRemaining, isPlaying)
  }
  const countdownFinished = () => {
    console.log("countDownFinished")
    clearInterval(interv)
    let resetMinutes = type === "Session" ? sessionLength : breakLength
    setTimeRemaining({ minutes: resetMinutes, seconds: 0 })
    type === "Session" ? setType("Break") : setType("Session")
    setIsPlaying(false)
    console.log(resetMinutes, timeRemaining, isPlaying)
  }
  const playPause = () => (isPlaying ? stopTimer() : startTimer())

  return (
    <div id="pomodoro" style={{ textAlign: "center" }}>
      <h1>Pomodoro</h1>
      <Timers
        breakLength={breakLength}
        sessionLength={sessionLength}
        handleChange={changeTime}
      />
      <Countdown>
        <div id="timer-label">{type}</div>
        <div id="time-left">00:00</div>
      </Countdown>{" "}
      <Controls
        isPlaying={isPlaying}
        handleReset={resetTimer}
        handlePlayPause={playPause}
      />
      <p>Create by Shaunicles</p>
      <button onClick={() => setType("ture")}>sdfsldkfj</button>
      <button onClick={() => setType("flase")}>isdf</button>
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
`

export default App

ReactDOM.render(<App />, document.getElementById("root"))







/*

  const playPause = () => {
    if (timerNotStarted) {
      console.log("starting Timer")
      let expiry = new Date()
      console.log("%c Date: ", "color: orange; font-weight: bold", expiry)
      // expiry.setMinutes(expiry.getMinutes() + timeRemaining.minutes)
      console.log("%c Date: ", "color: orange; font-weight: bold", expiry)

      // Promise.resolve(setTimeStamp(() => new Date(expiry))).then(() => {
      //   console.log({timeStamp, expiry})
      //   console.log()
      start()
      setTimerNotStarted(false)
      // })
      // console.log({ timeStamp, expiry }, "2")
    } else {
      console.log("play/pause", isRunning)
      isRunning ? pause() : resume()
    }
  }

  const expired = () => {
    console.log("%c expired", "font-weight: bold; color: red;", type)
    type === "Session" ? setType(() => "Break") : setType(() => "Session")
    console.log("%c expired", "font-weight: bold; color: green;", type)
    let switchMinutes = type === "Session" ? sessionLength : breakLength
    console.log(switchMinutes, "switchMinutes")
    setTimeRemaining(() => ({ minutes: switchMinutes, seconds: 0 }))
    console.log(timeRemaining, "timeRemaining")
  }
  if (type === "Break") {
    console.log("%c newType: ", "font-weight: bold; color: green;", type)
    console.log(
      "%c newTimeRemaining: ",
      "font-weight: bold; color: green;",
      timeRemaining
    )
  }

*/