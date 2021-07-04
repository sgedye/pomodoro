import { useState, useRef } from "react";
import Countdown from "react-countdown";

import { Timers, Controls } from "./components";

import styled from "styled-components";
import templeBell from "./assets/temple-bell.mp3";

import "./assets/index.css";

const timerMax = 3600;
const timerMin = 60;
const defaultBreak = 300;
const defaultSession = 1500;

export const App = () => {
  const [type, setType] = useState("session");
  const [breakLength, setBreakLength] = useState(defaultBreak);
  const [sessionLength, setSessionLength] = useState(defaultSession);
  const [secondsLeft, setSecondsLeft] = useState(defaultSession);
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
    countdownRef.current.pause();
    setType("session");
    setBreakLength(defaultBreak);
    setSessionLength(defaultSession);
    setSecondsLeft(defaultSession);
  };

  const hitZero = () => {
    setSecondsLeft(0);
    audioRef.current.play();
    setTimeout(() => {
      type === "session"
        ? setSecondsLeft(breakLength)
        : setSecondsLeft(sessionLength);
      type === "session" ? setType("break") : setType("session");
    }, 999);
  };

  const playPause = () => {
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

      <CountdownWrapper id="countdown">
        <Countdown
          ref={countdownRef}
          date={Date.now() + secondsLeft * 1000}
          onComplete={hitZero}
          autoStart={isPlaying}
          onTick={() => setSecondsLeft((prev) => prev - 1)}
          key={`${type}-counter`}
        />
        <div id="timer-label" style={{ textTransform: "capitalize" }}>
          {type}
        </div>
        <div id="time-left">
          {`0${Math.floor(secondsLeft / 60)}`.slice(-2)}:
          {`0${secondsLeft % 60}`.slice(-2)}
        </div>
      </CountdownWrapper>

      <Controls handlePlayPause={playPause} handleReset={resetTimer} />

      <audio id="beep" ref={audioRef} src={templeBell}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </div>
  );
};

const CountdownWrapper = styled.div`
  span {
    display: none;
  }
`;
