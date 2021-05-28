import styled from "styled-components";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export const Timers = (props) => {
  return (
    <Container>
      <Timer id="break-timer">
        <label id="break-label">Break Time</label>
        <Selectors>
          <FaAngleDown
            id="break-decrement"
            onClick={() => props.handleChange("break-decrement")}
          />
          <input
            id="break-length"
            type="text"
            size="2"
            value={props.breakLength}
            readOnly
          />
          <FaAngleUp
            id="break-increment"
            onClick={() => props.handleChange("break-increment")}
          />
        </Selectors>
      </Timer>
      <Timer id="session-timer">
        <label id="session-label">Session Time</label>
        <Selectors>
          <FaAngleDown
            id="session-decrement"
            onClick={() => props.handleChange("session-decrement")}
          />
          <input
            id="session-length"
            type="text"
            size="2"
            value={props.sessionLength}
            readOnly
          />
          <FaAngleUp
            id="session-increment"
            onClick={() => props.handleChange("session-increment")}
          />
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
  svg {
    font-size: 1.4em;
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
`;
