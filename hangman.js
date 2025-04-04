const hangmanimg = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessestext = document.querySelector(".guess-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gamemodel = document.querySelector(".game-model");
const playagainbtn = document.querySelector(".play-again");

let currentword, correctLetters, wrongGuess;
const maxguesses=6;
const resetgame = () =>
{
    correctLetters=[];
    wrongGuess=0;
    wordDisplay.innerHTML=currentword.split("").map(()=>`<li class="letter"></li>`).join("");
    hangmanimg.src = `hangman-${wrongGuess}.svg`; 
    guessestext.innerText = `${wrongGuess} / ${maxguesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gamemodel.classList.remove("show");
}

const getrandomword = () =>
{   //selecting random word and hint from the wordlist
    const {word,hint}=wordList[Math.floor(Math.random() * wordList.length)];
    currentword = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetgame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
       const modelText = isVictory?`you found the word:` : `the correct word was:`;
       gamemodel.querySelector("img").src = `${isVictory?`victory`:`lost`}.gif`;
       gamemodel.querySelector("h4").innerHTML = `${isVictory?`congratulations!`:`Game Over`}`;
       gamemodel.querySelector("p").innerHTML = `${modelText}<b>${currentword}</b>`;
       gamemodel.classList.add("show");
    },300);    
}
const initGame = (button, clickedLetter) => {
    //checking if clickedLetter exists in the currentword
    if(currentword.includes(clickedLetter))
    {
       [...currentword].forEach((letter, index) => {
       
        if(letter === clickedLetter)
        {
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText=letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    });
    }
    else {
      wrongGuess++;
      hangmanimg.src = `hangman-${wrongGuess}.svg`;
    }
    button.disabled = true;
    guessestext.innerText = `${wrongGuess} / ${maxguesses}`;
    
    if(wrongGuess===maxguesses) return gameOver(false);
    if(correctLetters.length===currentword.length) return gameOver(true);
}
//creating keyboard buttons
for( let i=97; i<=122; i++)
{
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e=>initGame(e.target,String.fromCharCode(i)));
}

getrandomword();
playagainbtn.addEventListener("click",getrandomword);