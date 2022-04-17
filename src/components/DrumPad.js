import React from 'react'

const DrumPad = ({ click, sound }) => {

  return (
    <div
      onClick={event => click(event, sound.name)}
      className='drum-pad'
      id={sound.name}
    >
      <audio
        className='clip'
        id={sound.text}
        src={sound.audio}
        type='audio/mpeg'
      ></audio>
      {sound.text}
    </div>
  )
}

export default DrumPad
