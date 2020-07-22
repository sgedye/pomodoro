import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import './assets/index.css'
import Timers from './components/Timers'
import Controls from './components/Controls'
import templeBell from './assets/temple-bell.mp3'

function App() {
  const timerMax = 3600;
  const timerMin = 60;
  const defaultBreak = 300;
  const defaultSession = 1500;
  const [type, setType] = useState("Session")
  const [breakLength, setBreakLength] = useState(defaultBreak)
  const [sessionLength, setSessionLength] = useState(defaultSession)
  const [interv, setInterv] = useState()
  const [secondsLeft, setSecondsLeft] = useState(defaultSession)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(null);

  useEffect(() => {
    if (secondsLeft === 0) {
      audioRef.current.play()
    }
    if (secondsLeft < 0) {
      if (type === "Session") {
        setSecondsLeft(() => breakLength);
        setType(() => "Break")
      } else {
        setSecondsLeft(() => sessionLength)
        setType(() => "Session")
      }
    }
  }, [secondsLeft, sessionLength, breakLength, type])

  const changeTime = id => {
    const [type, change] = id.split("-")
    if (type === "break" && change === "increment" && breakLength < timerMax) {
      setBreakLength(breakLength => breakLength + 60)
    } else if (type === "break" && change === "decrement" && breakLength > timerMin) {
      setBreakLength(breakLength => breakLength - 60)
    } else if (type === "session" && change === "increment" && sessionLength < timerMax) {
      setSessionLength(sessionLength => sessionLength + 60)
      setSecondsLeft(sessionLength => sessionLength + 60)
    } else if (type === "session" && change === "decrement" && sessionLength > timerMin) {
      setSessionLength(sessionLength => sessionLength - 60)
      setSecondsLeft(sessionLength => sessionLength - 60)
    }
  }
  const startTimer = () => {
    setIsPlaying(() => true)
    setInterv(() => setInterval(run, 1000))
  }
  const run = () => setSecondsLeft(secondsLeft => secondsLeft - 1);
  const stopTimer = () => {
    clearInterval(interv)
    setIsPlaying(() => false)
  }
  const resetTimer = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    clearInterval(interv);
    setIsPlaying(() => false);
    setType(() => "Session");
    setBreakLength(() => defaultBreak);
    setSessionLength(() => defaultSession);
    setSecondsLeft(() => defaultSession);
  }
  const playPause = () => (isPlaying ? stopTimer() : startTimer())

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft - minutes * 60
  const time = `0${minutes}`.slice(-2) + ":" + `0${seconds}`.slice(-2)
  console.log("%c type|time: ", "color: purple; font-weight: bold;", type, time)
  return (
    <div id="pomodoro">
      <h1>Pomodoro Timer</h1>
      <Timers
        breakLength={breakLength / 60}
        sessionLength={sessionLength / 60}
        handleChange={changeTime}
      />
      <div id="countdown">
        <div id="timer-label">{type}</div>
        <div id="time-left">{time}</div>
      </div>
      <Controls
        isPlaying={isPlaying}
        handleReset={resetTimer}
        handlePlayPause={playPause}
      />
      <audio id="alarm-sound" ref={audioRef} src={templeBell}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById("root"))