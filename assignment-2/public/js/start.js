// load all the words in ../words.json with fetch
const selectionWords = 29
const pauseInSecs = 3
const optionsCount = 4
var state = -1

var seenWords = {}
var wrongs = {}
var startTime = 0
var questions = []

var startQs = []

let wordsPerQuestion = 0

const WORDS_INCREMENT = 2
const WORDS_INCREMENT_INTERVAL = 10
var words
var warmupCases = 4
function getRandomPair() {
    let pair = []
    let indexes = []
    let isCamelCase = rand() < 0.5
    let f = []
    for (let j = 0; j < wordsPerQuestion; j++) {
        let index = Math.floor(rand() * words.length)
        while (indexes.includes(index)) {
            index = Math.floor(rand() * words.length)
        }
        indexes.push(index)
        f.push(words[index])
    }

    pair.push(f)
    pair.push(isCamelCase)
    return pair
}

fetch('../words.json')
    .then((response) => response.json())
    .then((data) => {
        words = data.commonWords
    })

var displayMainText = document.getElementById('displayMainText')
var displayText = document.getElementById('displayText')

document.addEventListener('DOMContentLoaded', function () {
    // Fade in the instructions when the page loads

    displayMainText.innerHTML =
        'Press Enter to begin the data collection process. You will see displayed a series of phrases written in camel case and kebab case. You are required to read the phrase and then press the key associated with the correct word displayed. The phrases will appear in quick succession. The keys will be 1,2,3,4. there will be pauses in beetwen.'
    displayMainText.classList.add('fade-in')

    // Add an event listener for the Enter key on the entire page
    document.addEventListener('keydown', onKeyDownfunction)
})
let pushed = false
let counting = false
let correctWord = ''
let optionsArray = ''

function changeListRandomCharacter(word) {
    // change one character in the word
    let index = Math.floor(rand() * word.length)
    let newChar = String.fromCharCode(Math.floor(rand() * 26) + 97)
    word = word.slice(0, index) + newChar + word.slice(index + 1)
    return word
}
async function onKeyDownfunction(event) {
    if (counting) return
    if (pushed) return
    if (event.key !== 'Enter' && state === -1) {
        return
    }
    if (
        state !== -1 &&
        event.key !== '1' &&
        event.key !== '2' &&
        event.key !== '3' &&
        event.key !== '4'
    ) {
        return
    }
    if (state === -1) displayMainText.classList.remove('fade-in')
    if (state !== -1) {
        if (!didUserSelectCorrectly(event)) {
            wrongs[Number(event.key)] = true
            updatePrompt()
            return
        }
        onCorrect()
        if (state + 1 > selectionWords) {
            let obj = {
                questions: questions,
                // from search params
                age: new URLSearchParams(window.location.search).get('age'),
                use_glasses: new URLSearchParams(window.location.search).get(
                    'use_glasses'
                ),
                reading_impairment: new URLSearchParams(
                    window.location.search
                ).get('reading_impairment'),
                role: new URLSearchParams(window.location.search).get('role'),
            }
            if (!pushed) {
                pushed = true
                await fetch('/metrics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(obj),
                })
            }
            displayText.innerHTML =
                'Thank you for participating in this study. You may now close the tab.'
            console.log(startQs)
            return
        }
    }
    displayText.innerHTML = pauseInSecs
    if (state === -1 || warmupCases === 0) {
        state++
    } else {
        state = 1
        warmupCases--
    }
    counting = true
    if (
        wordsPerQuestion == 0 ||
        (state % WORDS_INCREMENT_INTERVAL == 0 && warmupCases === 0)
    ) {
        wordsPerQuestion += WORDS_INCREMENT
    }
    optionsArray = []
    correctWord = getRandomPair()

    // select 1 character from the correct word first and second element and then replace it with a random character
    for (let i = 0; i < optionsCount; i++) {
        let option = [...correctWord]
        option[0] = [...correctWord[0]]
        // now modity two random chartacters for each word
        let index1 = Math.floor(rand() * option[0].length)
        let index2 = Math.floor(rand() * option[0].length)
        while (index1 == index2) {
            index2 = Math.floor(rand() * option[0].length)
        }
        // change one
        option[0][index1] = changeListRandomCharacter(option[0][index1])
        option[0][index2] = changeListRandomCharacter(option[0][index2])
        console.log(option[0][index1], option[0][index2])
        optionsArray.push(option)
    }
    // insert correct word at random in the option array
    optionsArray[Math.floor(rand() * optionsArray.length)] = correctWord
    startQs.push({options: optionsArray, correct: correctWord})
    // choose one at random to be the correct one
    count = pauseInSecs
    wrongs = {}
    displayText.innerHTML = count + '<br>' + parseOption(correctWord, true)
    let cn = setInterval(function () {
        count--
        displayText.innerHTML = count + '<br>' + parseOption(correctWord, true)
        if (count == 0) {
            startTime = new Date()
            counting = false
            clearInterval(cn)
            updatePrompt()
        }
    }, 1000)
}

function parseOption(optionArray, space = false) {
    // there are n words
    // optionArray[0] is the list of words
    // optionArray[1] is whether it is camel case or not
    let str = ''
    let first = true
    for (const element of optionArray[0]) {
        if (optionArray[1]) {
            // make the first word upper case
            let tmp = element[0].toUpperCase() + element.slice(1)
            if (first) {
                first = false
                str += element + (space ? ' ' : '')
                continue
            }
            str += tmp + (space ? ' ' : '')
        } else {
            str += element + (space ? ' ' : '-')
        }
    }
    // remove last index if optionarray[1] is false and space is false
    if (!optionArray[1] && !space) {
        str = str.slice(0, str.length - 1)
    }

    return str
}

function didUserSelectCorrectly(event) {
    console.log(event.key, correctWord, optionsArray)
    if (event.key === '1') {
        return correctWord === optionsArray[0]
    } else if (event.key === '2') {
        return correctWord === optionsArray[1]
    } else if (event.key === '3') {
        return correctWord === optionsArray[2]
    } else if (event.key === '4') {
        return correctWord === optionsArray[3]
    }
    return false
}

function onCorrect() {
    let endTime = new Date()

    let wrongsArray = []
    // iterate over wrongs map
    for (let key in wrongs) {
        wrongsArray.push({
            wrong_word: parseOption(optionsArray[Number(key) - 1]),
            wrong_kind: optionsArray[Number(key) - 1][2],
        })
    }

    questions.push({
        timer: endTime - startTime,
        correct_word: parseOption(correctWord),
        correct_kind: correctWord[2],
        wrongs: wrongsArray,
        wordsCount: wordsPerQuestion,
    })
}

function updatePrompt() {
    displayText.innerHTML = parseOption(correctWord, true) + ' <br>'
    // display the options in displayText
    for (let i = 0; i < optionsArray.length; i++) {
        displayText.innerHTML = `${displayText.innerHTML}
             <br> ${i + 1} . ${parseOption(optionsArray[i])} <span id=${
                 'option-' + i
             }> ${wrongs[i + 1] ? ' Wrong.' : ''} </span>`
        // if it is wrong make it red
        document.getElementById('option-' + i).style.color = wrongs[i + 1]
            ? 'red'
            : 'black'
    }
}
