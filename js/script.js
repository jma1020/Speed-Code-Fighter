// const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const RANDOM_QUOTE_API_URL = `<div>\n\u00a0\u00a0\u00a0window\n</div>`;
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", startGame);

function startGame() {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  let correct = true;
  arrayQuote.forEach((characterSpan, i) => {
    const character = arrayValue[i];
    if (character == " ") {
      console.log("나는 띄어쓰기");
    } else if (character == "\n") {
      console.log("나는 엔터");
    } else if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) renderNewQuote();
}

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  // const quote = await getRandomQuote();
  const quote = RANDOM_QUOTE_API_URL;
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
var timeLimit = 60;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = Math.floor((new Date() - startTime) / 1000);

    if (timer.innerText > timeLimit) {
      timer.innerText = "You lose 👎";
      quoteInputElement.removeEventListener("input", startGame);
    }
  }, 1000);
}

renderNewQuote();
