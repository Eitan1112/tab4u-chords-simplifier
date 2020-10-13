// DOM
const SIDEBAR_ID = 'shpa'
const EASY_TONE_ID = 'eLink'

// Guitar
const EASY_TONE = document.getElementById(EASY_TONE_ID).href.split('?')[1].replace('#song', '').replace('ton=', '')
const DEFAULT_SONG_KEY = 'E'
const KEYS = ['F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#']
const DUPLICATES = {
    'Gb': 'F#',
    'G#': 'Ab',
    'A#': 'Bb',
    'Cb': 'B',
    'Db': 'C#',
    'D#': 'Eb'
}

// Logue.net
const URL = 'http://www.logue.net/cgi-bin/xp/5.3'

const convertDOMChords = () => {
    
}

const convertChord = (chord, toneChange) => {
    // E, E#, Em, Ebm, Ebm7, F/E, Ebm5, E#5
    alert('Starting')
    const is_minor = chord.includes('m')
    const is_7 = chord.includes('7')
    const is_5 = chord.includes('5')
    let strippedChord = chord.replace('m', '').replace('7', '').replace('5', '')
    alert(`Stripped Chord: ${strippedChord}`)
    if(Object.keys(DUPLICATES).includes(strippedChord)) {
        strippedChord = DUPLICATES[strippedChord]
    }
    alert(`Stripped Unduplicate Chord: ${strippedChord}`)

    let newChord = KEYS[KEYS.indexOf(strippedChord) + toneChange]
    alert(`New Chord: ${newChord}`)

    if(is_minor) {
        newChord += 'm'
    }
    if(is_7) {
        newChord += '7'
    }
    if(is_5) {
        newChord += '5'
    }
    return newChord
}

const injectButton = () => {
    const button = `
    <div class="lItem npt" onclick="hello">
        <span>
            <a href="#">
                <span class="iconInMenuIS">
                </span>
                הפשט אקורדים בחינם!
            </a>
        </span>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/@tonaljs/tonal/browser/tonal.min.js"></script>
    `

    document.getElementById(SIDEBAR_ID).innerHTML += button
}

const main = () => {
    injectButton()
}

main()