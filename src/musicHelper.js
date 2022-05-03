import { theory } from "etude";
import { sharpKeySignatures } from "./keySignatures";
const musicHelper = {
    keySignature: sharpKeySignatures.CMajor,
    isSharp: true,
    adjustNoteToKeySignature: (noteName) => {
        const modifier = musicHelper.isSharp ? 1 : -1;
        const noteLetter = noteName.slice(0, noteName.length - 1).trim();
        const noteValue = theory.Pitch.fromString(noteName).value.getProgramNumber();
        const adjustedLetter = musicHelper.keySignature.indexOf(noteLetter) > -1 ? theory.Pitch.fromProgramNumber(noteValue + modifier).value.toString().split('(')[0] : noteName;
        return adjustedLetter;
    },

}

export { musicHelper }