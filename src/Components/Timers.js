import styled from "styled-components";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export const Timers = ({ breakLength, sessionLength, handleChange }) => {
  return (
    <TimerWrapper>
      <Timer id="break-timer">
        <label id="break-label">Break Time</label>
        <Selectors>
          <ButtonDown
            id="break-decrement"
            onClick={() => handleChange("break-decrement")}
          >
            <FaAngleDown />
          </ButtonDown>
          <input
            id="break-length"
            type="text"
            size="2"
            value={breakLength}
            disabled
          />
          <ButtonUp
            id="break-increment"
            onClick={() => handleChange("break-increment")}
          >
            <FaAngleUp />
          </ButtonUp>
        </Selectors>
      </Timer>
      <Timer id="session-timer">
        <label id="session-label">Session Time</label>
        <Selectors>
          <ButtonDown
            id="session-decrement"
            onClick={() => handleChange("session-decrement")}
          >
            <FaAngleDown />
          </ButtonDown>
          <input
            id="session-length"
            type="text"
            size="2"
            value={sessionLength}
            disabled
          />
          <ButtonUp
            id="session-increment"
            onClick={() => handleChange("session-increment")}
          >
            <FaAngleUp />
          </ButtonUp>
        </Selectors>
      </Timer>
    </TimerWrapper>
  );
};

const TimerWrapper = styled.div`
  width: 300px;
  margin: 20px auto;
  font-size: 1.2em;
  display: flex;
`;

const Timer = styled.div`
  display: inline-block;
  padding: 20px 10px;
  width: 50%;

  input {
    font-size: 1rem;
    color: black;
    background-color: white;
  }
  label {
    font-size: 1.25rem;
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    text-shadow: -1px -1px 10px white, 1px 1px 2px white;
  }
  &:first-of-type {
    margin-right: 1rem;
  }
`;

const ButtonDown = styled.button`
  &:active {
    transform: translateY(1px);
  }
`;

const ButtonUp = styled.button`
  &:active {
    transform: translateY(-1px);
  }
`;

const Selectors = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  input {
    text-align: center;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin: 0 3px;
  }
  button {
    border: 0;
    background-color: transparent;
    font-size: 1.8rem;
    display: flex;
  }
`;
