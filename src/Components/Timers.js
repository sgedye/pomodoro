import React from 'react'
import styled from 'styled-components'

import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

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

function Timers() {
  return (
    <Container>
      <Timer id="break-timer">
        <label id="break-label">Break Length</label>
        <Selectors>
          <FaAngleDown id="break-decrement"/>
          <input id="break-length" type="text" size="2" value="5" />
          <FaAngleUp id="break-increment"/>
        </Selectors>
      </Timer>
      <Timer id="session-timer">
        <label id="session-label">Session Length</label>
        <Selectors>
          <FaAngleDown id="session-decrement"/>
          <input id="session-length" type="text" size="2" value="25" />
          <FaAngleUp id="session-increment"/>
        </Selectors>
      </Timer>
    </Container>
  )
}

export default Timers
