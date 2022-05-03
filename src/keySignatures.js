const keySignatures = {
    CMajor: ['F#'],
    GMajor: ['F#', 'C#'],
    DMajor: ['F#', 'C#', 'G#'],
    AMajor: ['F#', 'C#', 'G#', 'D#'],
    EMajor: ['F#', 'C#', 'G#', 'D#', 'A#'],
    BMajor: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    FSharpMajor: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    CSharpMajor: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'],
    AMinor: ['F#'],
    EMinor: ['F#', 'C#'],
    BMinor: ['F#', 'C#', 'G#'],
    FSharpMinor: ['F', 'C#', 'G#', 'D#'],
    CSharpMinor: ['F#', 'C#', 'G#', 'D#', 'A#'],
    GSharpMinor: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    DSharpMinor: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    ASharpMinor: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'],
}

const scaleArrays = {
    majorScale: [2, 2, 1, 2, 2, 2, 1],
    minorScale: [2, 1, 2, 2, 1, 2, 2],
    harmonicMinorScale: [2, 1, 2, 2, 1, 3, 1],
    melodicMinorScale: [2, 1, 2, 2, 2, 2, 1],
    wholeToneScale: [2, 2, 2, 2, 2, 2, 2],
    wholeHalfScale: [2, 1, 2, 2, 2, 2, 1],
    wholeHalfFlatScale: [2, 1, 2, 2, 1, 2, 2],
    wholeHalfSharpScale: [2, 2, 1, 2, 2, 2, 1],
    wholeHalfFlatSharpScale: [2, 2, 1, 2, 1, 2, 2],
    diminishedScale: [2, 1, 2, 1, 2, 1, 2],
    augmentedScale: [3, 1, 2, 1, 2, 1, 2],
    majorPentatonicScale: [2, 2, 3, 2, 3],
    minorPentatonicScale: [3, 2, 2, 3, 2],
    majorBluesScale: [2, 1, 2, 2, 3, 2],
    minorBluesScale: [3, 2, 1, 2, 2, 3],
}

const sharpKeySignatures = {
    CMajor: [],
    GMajor: ['F'],
    DMajor: ['F', 'C'],
    AMajor: ['F', 'C', 'G'],
    EMajor: ['F', 'C', 'G', 'D'],
    BMajor: ['F', 'C', 'G', 'D', 'A'],   
    FSharpMajor: ['F', 'C', 'G', 'D', 'A', 'E'],
    CSharpMajor: ['F', 'C', 'G', 'D', 'A', 'E', 'B'],
}

const flatKeySignatures = {
    CMajor: [],
    FMajor: ['B'],
    BbMajor: ['B', 'E'],
    EbMajor: ['B', 'E', 'A'],
    AbMajor: ['B', 'E', 'A', 'D'],
    DbMajor: ['B', 'E', 'A', 'D', 'G'],
    GbMajor: ['B', 'E', 'A', 'D', 'G', 'C'],
    CbMajor: ['B', 'E', 'A', 'D', 'G', 'C', 'F'],
}
//function to generate all midi notes in a given scale
const generateMidiNotes = (startingNoteValue, scaleArray) => {
    const maxValue = 127 - 4; //127 is the highest note value, 2 is the highest step value
    const scale = [];
    let currValue = startingNoteValue;
    while (currValue < maxValue) {
        for (let i = 0; i < scaleArray.length; i++) {
            if (currValue > 127) break;
            scale.push(currValue);
            currValue += scaleArray[i];
        }
    }
    return scale;
}

export { keySignatures, scaleArrays, generateMidiNotes, sharpKeySignatures, flatKeySignatures}