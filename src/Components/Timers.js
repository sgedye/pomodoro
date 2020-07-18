import React from 'react';
import styled from 'styled-components';

import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

function Timers(props) {
  return (
    <Container>
      <Timer id="break-timer">
        <label id="break-label">Break Length</label>
        <Selectors>
          <FaAngleDown
            id="break-decrement"
            onClick={() => props.handleChange("break-decrement")}
          />
          <input id="break-length" type="text" size="2" value={props.breakLength} readOnly />
          <FaAngleUp
            id="break-increment"
            onClick={() => props.handleChange("break-increment")}
          />
        </Selectors>
      </Timer>
      <Timer id="session-timer">
        <label id="session-label">Session Length</label>
        <Selectors>
          <FaAngleDown
            id="session-decrement"
            onClick={() => props.handleChange("session-decrement")}
          />
          <input id="session-length" type="text" size="2" value={props.sessionLength} readOnly />
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
  padding: 20px 0;
`
const Timer = styled.div`
  display: inline-block;
  width: 50%;
  margin: 0 auto;
  text-align: center;
  background: lightblue;
`
const Selectors = styled.div`
  width: auto;
  & > input {
    text-align: center;
  }
`

export default Timers;
