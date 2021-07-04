import { useState, useRef } from "react";
import Countdown from "react-countdown";

import { Timers, Controls } from "./components";

import "./assets/index.css";
import templeBell from "./assets/temple-bell.mp3";
import { IconContext } from "react-icons";
import { FaPlay, FaPause, FaRedoAlt } from "react-icons/fa";

const timerMax = 3600;
const timerMin = 60;
const defaultBreak = 300;
const defaultSession = 1500;

export const App = () => {
  const [type, setType] = useState("session");
  const [breakLength, setBreakLength] = useState(defaultBreak); // time in seconds
  const [sessionLength, setSessionLength] = useState(defaultSession); // time in seconds
  const [secondsLeft, setSecondsLeft] = useState(defaultSession); // time in seconds
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const countdownRef = useRef(null);

  const changeTime = (id) => {
    if (!isPlaying) {
      console.log(id, type, secondsLeft);
      switch (id) {
        case "break-increment":
          type === "break" &&
            setSecondsLeft(Math.min(breakLength + 60, timerMax));
          setBreakLength((prev) => Math.min(prev + 60, timerMax));
          break;
        case "break-decrement":
          type === "break" &&
            setSecondsLeft(Math.max(breakLength - 60, timerMin));
          setBreakLength((prev) => Math.max(prev - 60, timerMin));
          break;
        case "session-increment":
          type === "session" &&
            setSecondsLeft(Math.min(sessionLength + 60, timerMax));
          setSessionLength((prev) => Math.min(prev + 60, timerMax));
          break;
        case "session-decrement":
          type === "session" &&
            setSecondsLeft(Math.max(sessionLength - 60, timerMin));
          setSessionLength((prev) => Math.max(prev - 60, timerMin));
          break;
        default:
          return;
      }
    }
  };

  const resetTimer = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setType("session");
    setBreakLength(defaultBreak);
    setSessionLength(defaultSession);
    setSecondsLeft(defaultSession);
  };

  // console.log("%c seconds: ", "color: purple; font-weight: bold;", secondsLeft);
  console.log("render", secondsLeft);

  const hitZero = () => {
    setSecondsLeft(0);
    console.log(`secLeft ${secondsLeft} - has hit zero.`);
    audioRef.current.play();
    // Reset the value of secondsLeft to break/session
    // Switch from break <==> session
    setTimeout(() => {
      type === "session"
        ? setSecondsLeft(breakLength)
        : setSecondsLeft(sessionLength);
      type === "session" ? setType("break") : setType("session");
    }, 999);
    // countdownRef.current.play();
  };

  const handlePlayPause = () => {
    isPlaying ? countdownRef.current.pause() : countdownRef.current.start();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div id="pomodoro">
      <h1>Pomodoro Timer</h1>
      <Timers
        breakLength={breakLength / 60}
        sessionLength={sessionLength / 60}
        handleChange={(id) => changeTime(id)}
      />

      <Countdown
        ref={countdownRef}
        date={Date.now() + secondsLeft * 1000}
        onComplete={hitZero}
        autoStart={isPlaying}
        onTick={() => setSecondsLeft((prev) => prev - 1)}
        key={`${type}-counter`}
        // controlled={true}
      />
      <div id="countdown">
        <div id="timer-label" style={{ textTransform: "capitalize" }}>
          {type}
        </div>
        <div id="time-left">
          {`0${Math.floor(secondsLeft / 60)}`.slice(-2)}:
          {`0${secondsLeft % 60}`.slice(-2)}
        </div>
      </div>
      <IconContext.Provider value={{ color: "blue", size: "1.4rem" }}>
        <button id="start_stop" onClick={handlePlayPause}>
          <FaPlay />
          <FaPause />
        </button>
        <button id="reset" onClick={resetTimer}>
          <FaRedoAlt />
        </button>
      </IconContext.Provider>
      <audio id="alarm-sound" ref={audioRef} src={templeBell}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </div>
  );
};
