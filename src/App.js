import React, { useState, useEffect } from 'react'
import useKeypress from 'react-use-keypress'
import { nanoid } from 'nanoid'
import './styles/style.css'
import DrumPad from './components/DrumPad'
import { drums, smoothPiano } from './utilities/audio'

const App = () => {
  // const keys = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c']
  const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']


  // set up states for "units" with audio etc. and display
  const [units, setUnits] = useState(keys)
  const [display, setDisplay] = useState('Start playing around!')


  // for future instrument switch, but for now no switch implemented
  const [soundSwitch, setSoundSwitch] = useState(true)


  // prepare objects array for units state. Function put inside
  // useEffect for future implementation of instreument switch
  // and prevent infinite loop
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
  // console.log(units)


  // function to play audio from click or keypress and also set display state
  function playAudio (targetKey) {
    // console.log(targetKey)
    units.map(unit => {
      if (unit.text === targetKey) {
        // console.log(unit)
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
  // react-use-keypress dependencie: https://www.npmjs.com/package/react-use-keypress
  useKeypress(
    keys.map(key => key.toLowerCase()),
    event => {
      // console.log(event.key)
      playAudio(event.key.toUpperCase())
    }
  )


  return (
    <div id='drum-machine'>
      <div id='display'>{display}</div>
      <div id='drum-pads-container'>{drumPads}</div>
    </div>
  )
}

export default App
