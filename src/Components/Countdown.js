import React from 'react'
import styled from 'styled-components'

function Countdown(props) {
  let minutes = props.timeRemaining.minutes.toString().padStart(2, "0")
  let seconds = props.timeRemaining.seconds.toString().padStart(2, "0")
  return (
    <Container>
      <div id="timer-label">{props.type}</div>
      <div id="time-left">{`${minutes}:${seconds}`}</div>
    </Container>
  )
}

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

export default Countdown

