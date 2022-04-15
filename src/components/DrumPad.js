import React from 'react'

const DrumPad = ({ click, sound }) => {
  
  return (
    <div
      // key={sound.id}
      onClick={event => click(sound.text)}
      className='drum-pad'
      id={sound.name}
    >
      <audio className='clip' id={sound.text} src={sound.audio}></audio>
      {sound.text}
    </div>
  )
}

export default DrumPad
