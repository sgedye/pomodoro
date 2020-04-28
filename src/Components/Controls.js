import React from 'react'

import { IconContext } from 'react-icons'
import { FaPlay, FaPause, FaRedoAlt } from 'react-icons/fa'


function Controls(props) {
  let playPause = props.isPlaying ? 'pause' : 'play'
  return (
    <IconContext.Provider value={{ color: "blue", size: "1.2rem" }}>
      <div id="start-stop" onClick={ () => props.handlePlayPause(playPause) }>
        <FaPlay />
        <FaPause />
      </div>
      <FaRedoAlt id='reset' onClick = {() => props.handleReset()} />
    </IconContext.Provider>
  )
}

export default Controls
