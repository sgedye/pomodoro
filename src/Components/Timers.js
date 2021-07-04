import styled from "styled-components";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export const Timers = ({ breakLength, sessionLength, handleChange }) => {
  return (
    <Container>
      <Timer id="break-timer">
        <label id="break-label">Break Time</label>
        <Selectors>
          <button
            id="break-decrement"
            onClick={() => handleChange("break-decrement")}
          >
            <FaAngleDown />
          </button>
          <input
            id="break-length"
            type="text"
            size="2"
            value={breakLength}
            readOnly
          />
          <button
            id="break-increment"
            onClick={() => handleChange("break-increment")}
          >
            <FaAngleUp />
          </button>
        </Selectors>
      </Timer>
      <Timer id="session-timer">
        <label id="session-label">Session Time</label>
        <Selectors>
          <button
            id="session-decrement"
            onClick={() => handleChange("session-decrement")}
          >
            <FaAngleDown />
          </button>
          <input
            id="session-length"
            type="text"
            size="2"
            value={sessionLength}
            readOnly
          />
          <button
            id="session-increment"
            onClick={() => handleChange("session-increment")}
          >
            <FaAngleUp />
          </button>
        </Selectors>
      </Timer>
    </Container>
  );
};

const Container = styled.div`
  font-size: 1.2em;
`;

const Timer = styled.div`
  display: inline-block;
  margin: 20px 5px;
  padding: 20px 10px;
  min-width: 125px;
  label {
    display: inline-block;
    margin-bottom: 10px;
    font-weight: 500;
    text-shadow: -1px -1px 10px white, 1px 1px 2px white;
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
