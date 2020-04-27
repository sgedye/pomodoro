import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
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

function Countdown() {
  return (
    <Container>
      <div id="timing">Session</div>
      <div id="time-left">25:00</div>
    </Container>
  )
}

export default Countdown

