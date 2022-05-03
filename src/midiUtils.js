import { theory } from "etude";
import { musicHelper } from "./musicHelper";
var globalMidiAccess;

const getNoteName = (noteNumber) => {
    console.log('noteNumber', noteNumber)
    const noteName = theory.Pitch.fromProgramNumber(noteNumber).value.toString().split('(')[0];
    return noteName;
}

const getMIDIMessage = (midiMessage) => {
    const [command, note, velocity] = midiMessage.data;
    return [command, note, velocity]
}

const setMidiHandler = (successFunction) => {
    if (globalMidiAccess) {
        for (var input of globalMidiAccess.inputs.values()) {
            input.onmidimessage = successFunction;
        }
        return
    }

    if (navigator.requestMIDIAccess) {
        console.log('This browser supports WebMIDI!');
    } else {
        console.log('WebMIDI is not supported in this browser.');
    }

    navigator.requestMIDIAccess()
        .then(
            (midiAccess) => {
                for (var input of midiAccess.inputs.values()) {
                    input.onmidimessage = successFunction;
                }
                globalMidiAccess = midiAccess;
            },
            () => {
                throw new Error('MIDI is not available')
            });

}


export { getMIDIMessage, setMidiHandler, getNoteName }