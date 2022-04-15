import React, { useState, useEffect } from 'react'
import DrumPad from './components/DrumPad'
import './styles/style.css'
import { drums, smoothPiano } from './utilities/audio'
import useKeypress from 'react-use-keypress'
import { nanoid } from 'nanoid'

const App = () => {
  // const keys = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c']
  const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
  const [units, setUnits] = useState(keys)
  const [display, setDisplay] = useState("Start playing around!")

  const [soundSwitch, setSoundSwitch] = useState(true)

  useEffect(() => {
    const audio = soundSwitch ? drums : smoothPiano
    setUnits(prev =>
      prev.map((key, index) => {
        return {
          text: key,
          audio: audio[index].audio,
          name: audio[index].name
        }
      })
    )
  }, [soundSwitch])
  console.log(units)

  
  // function to play audio from click and keypress
  function playAudio (targetKey) {
    console.log(targetKey)
    units.map(unit => {
      if (unit.text === targetKey) {
        const a = new Audio(unit.audio)
        a.play()
        setDisplay(unit.name)
      }
    })
  }


  // create array with drumpads to render
  const drumPads = units.map(unit => (
    <DrumPad key={nanoid()} click={playAudio} sound={unit} />
  ))


  // listen to keypress to play audio
  useKeypress(keys.map(key => key.toLowerCase()), event => {
    console.log(event.key)
    playAudio(event.key.toUpperCase())
  })


  return (
    <div id='drum-machine'>
      <div id='display'>
        {display}
      </div>
      <div id='drum-pads-container'>{drumPads}</div>
    </div>
  )
}

export default App
