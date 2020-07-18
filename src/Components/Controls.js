import React from 'react'

import { IconContext } from 'react-icons'
import { FaPlay, FaPause, FaRedoAlt } from 'react-icons/fa'


function Controls(props) {
  return (
    <IconContext.Provider value={{ color: "blue", size: "1.2rem" }}>
      <div id="start_stop" onClick={() => props.handlePlayPause()}>
        <FaPlay />
        <FaPause />
      </div>
      <FaRedoAlt id="reset" onClick = {() => props.handleReset()} />
    </IconContext.Provider>
  )
}

export default Controls
