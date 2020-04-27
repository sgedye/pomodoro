import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import './index.css'

import Timers from './Components/Timers'
import Countdown from './Components/Countdown'
import Controls from './Components/Controls'

const Title = styled.h1`
  text-align: center;
`

const Footer = styled.p`
  text-align: center;
`

function App() {
  return (
    <div id="pomodoro">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Title>Pomodoro</Title>
      <Timers />
      <Countdown />
      <Controls />
      <Footer>Create by Shaunicles</Footer>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById("root"))