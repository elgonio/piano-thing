import './App.css';
import { Piano } from "react-etude-piano";
import { getMIDIMessage, getNoteName, setMidiHandler } from './midiUtils';
import React, { useState, useEffect } from 'react';
import { Piano as TonePiano } from '@tonejs/piano'
import { musicHelper } from './musicHelper';
import { flatKeySignatures, sharpKeySignatures } from './keySignatures';
import Select from 'react-select'
import * as keySignatureImages from './images/keySignatureImages';

const syntheticPiano = new TonePiano({
  velocities: 16
})
syntheticPiano.toDestination();



function App() {
  const [highlightedKeys, setHighlightedKeys] = useState([]);
  const [soundsLoaded, setSoundsLoaded] = useState(false);

  const loadPiano = () => {
    syntheticPiano.load().then(() => {
      console.log('piano sound loaded!');
      setSoundsLoaded(true);
    })

  }

  const updateSelectedKeySignature = (e) => {
    console.log(e.value);
    const isSharp = Object.keys(sharpKeySignatures).includes(e.value);
    const keySignature = isSharp ? sharpKeySignatures[e.value] : flatKeySignatures[e.value];
    musicHelper.keySignature = keySignature;
    musicHelper.isSharp = isSharp;
  }

  useEffect(() => {
    const processMidiMessage = (rawMidiMessage) => {
      const noteOnMessage = 144;
      const noteOffMessage = 128;
      const [command, note, velocity] = getMIDIMessage(rawMidiMessage);
      const noteName = getNoteName(note);
      const adjustedNoteName = musicHelper.adjustNoteToKeySignature(noteName);
      console.log('note and key adjusted note', noteName, adjustedNoteName);
      console.log([command, note, velocity, noteName])
      switch (command) {
        case noteOnMessage:
          syntheticPiano.keyDown({ note: adjustedNoteName, velocity: velocity / 127 })
          if (!highlightedKeys.includes(adjustedNoteName)) {
            setHighlightedKeys([...highlightedKeys, adjustedNoteName]);
          }
          break;
        case noteOffMessage:
          syntheticPiano.keyUp({ note: adjustedNoteName })
          const filteredKeys = highlightedKeys.filter((x) => x !== adjustedNoteName);
          setHighlightedKeys(filteredKeys);
          break;
        default:
          console.log('unsupported midi command', command)
      }

    }
    setMidiHandler(processMidiMessage);
  }, [highlightedKeys]);

  const options = [
    { value: 'CMajor', label: <div><img src={keySignatureImages.natural} height="40px" width="auto"/>C major / A minor</div> },
    { value: 'GMajor', label: <div><img src={keySignatureImages.oneSharp} height="40px" width="auto"/>G major / E minor</div> },
    { value: 'DMajor', label: <div><img src={keySignatureImages.twoSharps} height="40px" width="auto"/>D major / B minor</div> },
    { value: 'AMajor', label: <div><img src={keySignatureImages.threeSharps} height="40px" width="auto"/>A major / F# minor</div> },
    { value: 'EMajor', label: <div><img src={keySignatureImages.fourSharps} height="40px" width="auto"/>E major / C# minor</div> },
    { value: 'BMajor', label: <div><img src={keySignatureImages.fiveSharps} height="40px" width="auto"/>B major / G# minor</div> },
    { value: 'FSharpMajor', label: <div><img src={keySignatureImages.sixSharps} height="40px" width="auto"/>F# major / D# minor</div> },
    { value: 'CSharpMajor', label: <div><img src={keySignatureImages.sevenSharps} height="40px" width="auto"/>C# major / A# minor</div> },
    { value: 'FMajor', label: <div><img src={keySignatureImages.oneFlat} height="40px" width="auto"/>F major / D minor</div> },
    { value: 'BFlatMajor', label: <div><img src={keySignatureImages.twoFlats} height="40px" width="auto"/>B flat major / G minor</div> },
    { value: 'EFlatMajor', label: <div><img src={keySignatureImages.threeFlats} height="40px" width="auto"/>E flat major / C minor</div> },
    { value: 'AFlatMajor', label: <div><img src={keySignatureImages.fourFlats} height="40px" width="auto"/>A flat major / F minor</div> },
    { value: 'DFlatMajor', label: <div><img src={keySignatureImages.fiveFlats} height="40px" width="auto"/>D flat major / B flat minor</div> },
    { value: 'GFlatMajor', label: <div><img src={keySignatureImages.sixFlats} height="40px" width="auto"/>G flat major / E flat minor</div> },
    { value: 'CFlatMajor', label: <div><img src={keySignatureImages.sevenFlats} height="40px" width="auto"/>C flat major / A flat minor</div> },
  ]

  return (
    <section className="App">
      <Select options={options} placeholder='Choose a key signature' onChange={updateSelectedKeySignature}>

      </Select>
      { (!soundsLoaded) && <button onClick={loadPiano}>Load sound</button>}
      {
        soundsLoaded &&
        <section className="pianoContainer">
          <Piano start="A1" end="C8" highlight={highlightedKeys} />
        </section>
      }
    </section>

  );
}

export default App;
