(function () {
    /**
 * Check and set a global guard variable.
 * If this content script is injected into the same page again,
 * it will do nothing next time.
 */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    const EASY_TONE_ID = 'eLink'
    const SONG_CONTENT_ID = 'songContentTPL'
    const CONVERTED_SONG_CONTENT_ID = 'convertedsongContentTPL'
    // const IMAGE_URL = "https://www.tab4u.com/additions/chords_imgs/1_Eb.gif"
    // const IMAGE_EXTENSION = '.gif'

    // Guitar
    const TONE_CHANGE = Number(document.getElementById(EASY_TONE_ID).href.split('?')[1].replace('#song', '').replace('ton=', ''))
    const KEYS = ['F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#']
    const DUPLICATES = {
        'Gb': 'F#',
        'G#': 'Ab',
        'A#': 'Bb',
        'Cb': 'B',
        'Db': 'C#',
        'D#': 'Eb'
    }


    const convertChord = (chord, toneChange) => {
        // E, E#, Em, Ebm, Ebm7, F/E, Ebm5, E#5
        console.log(`Converting ${chord}`)

        if (chord.includes('/')) {
            return `${convertChord(chord.split('/')[0], toneChange)}/${convertChord(chord.split('/')[1], toneChange)}`
        }

        const is_minor = chord.includes('m')
        const is_7 = chord.includes('7')
        const is_5 = chord.includes('5')
        let strippedChord = chord.replace('m', '').replace('7', '').replace('5', '')
        console.log({ is_minor, is_7, is_5, strippedChord })
        if (Object.keys(DUPLICATES).includes(strippedChord)) {
            strippedChord = DUPLICATES[strippedChord]
        }

        console.log(`Final stripped chord: ${strippedChord}`)

        if (!KEYS.includes(strippedChord)) {
            console.error(`Unable to convert chord ${chord}`)
        }

        const chordIndex = TONE_CHANGE > 0 ? KEYS.indexOf(strippedChord) : KEYS.lastIndexOf(strippedChord)
        let newChord = KEYS[chordIndex + toneChange * 2]
        console.log(`New chord: ${newChord}`)

        if (is_minor) {
            newChord += 'm'
        }
        if (is_7) {
            newChord += '7'
        }
        if (is_5) {
            newChord += '5'
        }
        return newChord
    }

    const convertDOMChords = () => {
        const songContainer = document.getElementById(SONG_CONTENT_ID)
        const elements = songContainer.getElementsByTagName('span')
        songContainer.parentElement.innerHTML += `<div id=${CONVERTED_SONG_CONTENT_ID}></div>`
        songContainer.style.display = 'none'
        for (let element of elements) {
            const chord = element.innerHTML
            console.log(`Trying chord ${chord}`)
            try {
                const newChord = convertChord(chord, TONE_CHANGE)
                element.innerHTML = newChord
                console.log(`Chord is ${chord}, converted to ${newChord}`)
            } catch {
                console.log(`Unable to convert chord ${chord}`)
            }
        }
        console.log('Finished')
    }


    browser.runtime.onMessage.addListener((message) => {
        alert(`Yo ${message.command} ;`)
        if (message.command === 'simplify') {
            alert(document.getElementById(CONVERTED_SONG_CONTENT_ID))
            if(document.getElementById(CONVERTED_SONG_CONTENT_ID)) {
                document.getElementById(CONVERTED_SONG_CONTENT_ID).style.display = 'block'
                document.getElementById(SONG_CONTENT_ID) = 'none'
            } else {
                convertDOMChords()
            }
        } else if (message.command === 'reset') {
            document.getElementById(CONVERTED_SONG_CONTENT_ID).style.display = 'none'
            document.getElementById(SONG_CONTENT_ID) = 'block'
        }
    })

})();