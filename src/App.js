import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './styles/style.css'
import DrumPad from './components/DrumPad'
import { drums, smoothPiano } from './utilities/audio'

const App = () => {
  const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
  

  // for future instrument switch, but for now no switch implemented
  const [soundSwitch, setSoundSwitch] = useState(false)

  // set up states for "units" with audio etc. and display
  const [units, setUnits] = useState(keys.map((key, index) => {
    const audio = soundSwitch ? drums : smoothPiano
    return {
      text: key,
      audio: audio[index].audio,
      name: audio[index].name
    }
  }))
  
  const [display, setDisplay] = useState('Start playing around!')


  // prepare objects array for units state. Function put inside
  // useEffect for future implementation of instreument switch
  // and prevent infinite loop
  // useEffect(() => {
  //   const audio = soundSwitch ? drums : smoothPiano
  //   setUnits(prev =>
  //     prev.map((key, index) => {
  //       return {
  //         text: key,
  //         audio: audio[index].audio,
  //         name: audio[index].name
  //       }
  //     })
  //   )
  // }, [soundSwitch])


  function handle(event) {
    units.map(unit => {
      if (event.key === unit.text || event.key.toUpperCase() === unit.text) {
        document.getElementById("display").innerText = unit.name
        document.getElementById(unit.name).querySelector("audio").play()
      }
    })
  }


  // add listener for keyboard events
  useEffect(() => {
    window.addEventListener("keydown", event => handle(event))
    return () => window.removeEventListener("keydown", event => handle(event))
  }, [])


  function handlePlay(event, name) {
    document.getElementById("display").innerText = name
    event.target.querySelector('audio').play()
  }


  // create array with drumpads to render
  const drumPads = units.map(unit => (
    <DrumPad key={nanoid()} click={handlePlay} sound={unit} />
  ))


  return (
    <div id='drum-machine'>
      <div id='display'>{display}</div>
      <div id='drum-pads-container'>{drumPads}</div>
      <div id='credentials-box'>
        <p>
          Concept bv{' '}
          <a href='https://freecodeCamp.com/' target='_blank'>
            FCC
          </a>{' '}
          | Build by{' '}
          <a href='https://github.com/etrigo/' target='_blank'>
            Etrigo
          </a>
        </p>
      </div>
    </div>
  )
}

export default App
