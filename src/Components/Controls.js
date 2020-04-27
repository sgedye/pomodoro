import React from 'react'

import { IconContext } from 'react-icons'
import { FaPlay, FaPause, FaRedoAlt } from 'react-icons/fa'


function Controls(props) {
  console.log(props)
  return (
    <IconContext.Provider value={{ color: "blue", size: "1.2rem" }}>
      <div id="start-stop" onClick={() => props.handlePlayPause()}>
        <FaPlay />
        <FaPause />
      </div>
      <FaRedoAlt id='reset' onClick = {() => props.handleReset()} />
    </IconContext.Provider>
  )
}

export default Controls
