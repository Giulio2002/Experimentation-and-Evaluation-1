// load all the words in ../words.json with fetch
var wordsPairs = [];
const warmupCases = 3;
const selectionWords = 1 + warmupCases;
const pauseInSecs = 3;
const optionsCount = 4;
var state = -1;

seenWords = {}
wrongs = {}

fetch('../words.json').then(response => response.json()).then(data => {
    let words = data.commonWords;
    // Pick at random 33 pairs of words (select 2 indicies) from the list of words, and for each generate a boolean whether it is camel case or not.
    for (let i = 0; i < selectionWords*(optionsCount*optionsCount); i++) {
        // [word1, word2, isCamelCase]
        let pair = [];
        let index1 = Math.floor(Math.random() * words.length);
        let index2 = Math.floor(Math.random() * words.length);
        pair.push(words[index1]);
        pair.push(words[index2]);
        pair.push(Math.random() < 0.5);
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
let counting = false;
let correctWord = "";
let optionsArray = "";
function onKeyDownfunction(event) {
    if (counting) return;

    if (state+1 >= selectionWords) {
        displayText.innerHTML = "Thank you for participating in this study. You may now close the tab.";
        return;
    }
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
    }
    displayText.innerHTML = pauseInSecs;
    state++;
    counting=true;
    optionsArray = [];
    let correctIndex = Math.floor(Math.random() * wordsPairs.length);
    correctWord = wordsPairs[correctIndex];
    console.log(correctWord)
    // select 1 character from the correct word first and second element and then replace it with a random character
    for (let i = 0; i < optionsCount; i++) {
        let option = [...correctWord]
        let index1 = Math.floor(Math.random() * option[0].length);
        let index2 = Math.floor(Math.random() * option[1].length);
        option[0] = option[0].slice(0, index1) + String.fromCharCode(Math.floor(Math.random() * 26) + 97) + option[0].slice(index1 + 1);
        option[1] = option[1].slice(0, index2) + String.fromCharCode(Math.floor(Math.random() * 26) + 97) + option[1].slice(index2 + 1);
        optionsArray.push(option);
    }
    // insert correct word at random in the option array
    optionsArray[Math.floor(Math.random() * optionsArray.length)] = correctWord;
    // choose one at random to be the correct one
    count = pauseInSecs;
    wrongs = {};
    displayText.innerHTML = count + "<br>" + parseOption(correctWord);
    let cn = setInterval(function() {
        count--;
        displayText.innerHTML = count + "<br>" + parseOption(correctWord);
        if (count == 0) {
            counting = false;
            clearInterval(cn);
            updatePrompt();
        }
    }, 1000)
};

function parseOption(optionArray) {
    let isCamelCase = optionArray[2];
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
    if (state < warmupCases) {
        return;
    }
}

function updatePrompt() {
    displayText.innerHTML = parseOption(correctWord) + " <br>";
    // display the options in displayText
    for (let i = 0; i < optionsArray.length; i++) {

        displayText.innerHTML = `${displayText.innerHTML}
             <br> ${i + 1} . ${parseOption(optionsArray[i])} <span id=${"option-" + i}> ${wrongs[i+1]? " Wrong.": ""} </span>`;
        // if it is wrong make it red
        document.getElementById("option-" + i).style.color = wrongs[i+1]? "red": "black";
    }
}