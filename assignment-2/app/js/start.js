// load all the words in ../words.json with fetch
var wordsPairs = [];
const selectionWords = 33;
const pauseInSecs = 3;
const optionsCount = 4;
var state = -1;

var seenWords = {}
var wrongs = {}
var startTime = 0;
var questions = [];

fetch('../words.json').then(response => response.json()).then(data => {
    let words = data.commonWords;
    // Pick at random 33 pairs of words (select 2 indicies) from the list of words, and for each generate a boolean whether it is camel case or not.
    for (let i = 0; i < selectionWords*(optionsCount*optionsCount); i++) {
        // [word1, word2, isCamelCase]
        let pair = [];
        let index1 = Math.floor(rand() * words.length);
        let index2 = Math.floor(rand() * words.length);
        pair.push(words[index1]);
        pair.push(words[index2]);
        pair.push(rand() < 0.5);
        wordsPairs.push(pair);
    }
});
var displayMainText = document.getElementById('displayMainText');
var displayText = document.getElementById('displayText');

document.addEventListener('DOMContentLoaded', function() {
    // Fade in the instructions when the page loads
   
    displayMainText.innerHTML = "Press Enter to begin the data collection process. You will see displayed a series of phrases written in camel case and kebab case. You are required to read the phrase and then press the key associated with the correct word displayed. The phrases will appear in quick succession. The keys will be 1,2,3,4. there will be pauses in beetwen.";
    displayMainText.classList.add('fade-in');

    // Add an event listener for the Enter key on the entire page
    document.addEventListener('keydown', onKeyDownfunction);
});
let pushed = false;
let counting = false;
let correctWord = "";
let optionsArray = "";
async function onKeyDownfunction(event) {
    if (counting) return;
    if (pushed) return;
    if (event.key !== 'Enter' && state === -1) {
        return
    }
    if (state == -1) displayMainText.classList.remove('fade-in');
    if (state !== -1) {
        if (!didUserSelectCorrectly(event)) {
            wrongs[Number(event.key)] = true;
            updatePrompt();
            return;
        }
        onCorrect();
        if (state+1 > selectionWords) {
            let obj = {
                questions: questions,
                // from search params
                age: new URLSearchParams(window.location.search).get('age'),
                use_glasses: new URLSearchParams(window.location.search).get('use_glasses'),
                reading_impairment: new URLSearchParams(window.location.search).get('reading_impairment'),
                role: new URLSearchParams(window.location.search).get('role'),
            }
            if (!pushed) {
                pushed = true;
                await fetch('/metrics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(obj),
                });
            }
            displayText.innerHTML = "Thank you for participating in this study. You may now close the tab.";
            return;
        }
    }
    displayText.innerHTML = pauseInSecs;
    state++;
    counting=true;
    optionsArray = [];
    let correctIndex = Math.floor(rand() * wordsPairs.length);
    correctWord = wordsPairs[correctIndex];
    while (seenWords[correctIndex]) {
        correctIndex = Math.floor(rand() * wordsPairs.length);
        correctWord = wordsPairs[correctIndex];
    }
    seenWords[correctIndex] = true;
    // select 1 character from the correct word first and second element and then replace it with a random character
    for (let i = 0; i < optionsCount; i++) {
        let option = [...correctWord]
        let index1 = Math.floor(rand() * option[0].length);
        let index2 = Math.floor(rand() * option[1].length);
        option[0] = option[0].slice(0, index1) + String.fromCharCode(Math.floor(rand() * 26) + 97) + option[0].slice(index1 + 1);
        option[1] = option[1].slice(0, index2) + String.fromCharCode(Math.floor(rand() * 26) + 97) + option[1].slice(index2 + 1);
        optionsArray.push(option);
    }
    console.log(optionsArray)
    // insert correct word at random in the option array
    optionsArray[Math.floor(rand() * optionsArray.length)] = correctWord;
    // choose one at random to be the correct one
    count = pauseInSecs;
    wrongs = {};
    displayText.innerHTML = count + "<br>" + parseOption(correctWord, true);
    let cn = setInterval(function() {
        count--;
        displayText.innerHTML = count + "<br>" + parseOption(correctWord, true);
        if (count == 0) {
            startTime = new Date();
            counting = false;
            clearInterval(cn);
            updatePrompt();
        }
    }, 1000)
};

function parseOption(optionArray, space = false) {
    let isCamelCase = optionArray[2];
    if (space) {
        return optionArray[0] + " " + optionArray[1];
    }
    if (isCamelCase) {
        // first character of first word is lowercase and first character of second word is uppercase
        return optionArray[0][0].toLowerCase() + optionArray[0].slice(1) + optionArray[1][0].toUpperCase() + optionArray[1].slice(1);
    } 
    return optionArray[0] + "_" + optionArray[1];
}

function didUserSelectCorrectly(event) {
    console.log(event.key, correctWord, optionsArray)
    if (event.key === '1') {
        return correctWord === optionsArray[0];
    } else if (event.key === '2') {
        return correctWord === optionsArray[1];
    } else if (event.key === '3') {
        return correctWord === optionsArray[2];
    } else if (event.key === '4') {
        return correctWord === optionsArray[3];
    }
    return false;
}

function onCorrect() {
    let endTime = new Date();

    if (state < warmupCases) {
        return;
    }
    let wrongsArray = [];
    // iterate over wrongs map
    for (let key in wrongs) {
        wrongsArray.push({
            wrong_word: parseOption(optionsArray[Number(key)-1]),
            wrong_kind: optionsArray[Number(key)-1][2]
        });
    }
    
    questions.push({
        timer: endTime - startTime,
        correct_word: parseOption(correctWord),
        correct_kind: correctWord[2],
        wrongs: wrongsArray
    });


}

function updatePrompt() {
    displayText.innerHTML = parseOption(correctWord, true) + " <br>";
    // display the options in displayText
    for (let i = 0; i < optionsArray.length; i++) {

        displayText.innerHTML = `${displayText.innerHTML}
             <br> ${i + 1} . ${parseOption(optionsArray[i])} <span id=${"option-" + i}> ${wrongs[i+1]? " Wrong.": ""} </span>`;
        // if it is wrong make it red
        document.getElementById("option-" + i).style.color = wrongs[i+1]? "red": "black";
    }
}