let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score_board");
const result_p = document.querySelector(".result > p");
const choices_div = document.querySelector(".choices");
const gameResultEnum =  Object.freeze({"win": 1, "lose": 2, "draw": 3});
const resultLogs_div = document.querySelector(".result-logs");
const buttonStart = document.getElementById('startPlay');
const popUp = document.querySelector(".choice-type-game");
const headTop = document.getElementById("header-h1");
const countOfElements = 5;
let typeOfGame = 0;
let historyLog = [];
let roundNumber = 0;
let roundResult = 1;
let computerChoice = 0;
const sign = [
    {
        name: "Rock",
        rules: {
            0: gameResultEnum.draw,
            1: gameResultEnum.win,
            2: gameResultEnum.lose,
            3: gameResultEnum.win,
            4: gameResultEnum.lose
        },
        source: "images/rock.png"
    },
    {
        name: "Scissors",
        rules: {
            0: gameResultEnum.lose,
            1: gameResultEnum.draw,
            2: gameResultEnum.win,
            3: gameResultEnum.win,
            4: gameResultEnum.lose
        },
        source: "images/scissors.png"
    },
    {
        name: "Paper",
        rules: {
            0: gameResultEnum.win,
            1: gameResultEnum.lose,
            2: gameResultEnum.draw,
            3: gameResultEnum.lose,
            4: gameResultEnum.win
        },
        source: "images/paper.png"
    },
    {
        name: "Lizard",
        rules: {
            0: gameResultEnum.lose,
            1: gameResultEnum.lose,
            2: gameResultEnum.win,
            3: gameResultEnum.draw,
            4: gameResultEnum.win
        },
        source: "images/lizard.png"
    },
    {
        name: "Spock",
        rules: {
            0: gameResultEnum.win,
            1: gameResultEnum.win,
            2: gameResultEnum.lose,
            3: gameResultEnum.lose,
            4: gameResultEnum.draw
        },
        source: "images/spock.png"
    }
];

function showScore() {
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
}

function showRoundResult(roundResult, userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(sign[userChoice].name);
    let middleWord = '';
    let endWord = '';
    let colorGlow_class = '';
    const glowTime = 300;

    switch (roundResult) {
        case gameResultEnum.win: 
            middleWord = "beats";
            endWord = "You win!";
            colorGlow_class = 'green-glow';
            break;
        case gameResultEnum.lose: 
            middleWord = "lose to";
            endWord = "You lost...";
            colorGlow_class = 'red-glow'
            break;
        case gameResultEnum.draw: 
            middleWord = "equals";
            endWord = "It's draw.";
            colorGlow_class = 'grey-glow';
            break;
    }

    result_p.innerHTML = `${sign[userChoice].name}${smallUserWord} ${middleWord} ${sign[computerChoice].name}${smallCompWord}. ${endWord}`;
    userChoice_div.classList.add(colorGlow_class);
    setTimeout(() => userChoice_div.classList.remove(colorGlow_class), glowTime);
    showScore();
}

function getRoundResult(userChoice, computerChoice) {
    return sign[userChoice].rules[computerChoice];
}

function increaseScore(roundResult) {
    if (roundResult === gameResultEnum.win) {
        userScore++;
    }
    else if (roundResult === gameResultEnum.lose) {
        computerScore++;
    }
}

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random()*sign.length);
    return randomNumber;
}

function saveHistory(userChoice, computerChoice) {
    historyLog[roundNumber] = {
        userSign: userChoice,
        compSign: computerChoice
    };
}

function getSourceSignByHistoryItem(historyLogItem, player) {
    let itemSign = (player == 1) ? historyLogItem.userSign : historyLogItem.compSign;
    return sign[itemSign].source;
}

function showHistoryItem() {
    let round_div = document.createElement("div");
    round_div.className = "result-logs-item";
    resultLogs_div.appendChild(round_div);

    let home_text = document.createElement("div");
    round_div.appendChild(home_text);
    home_text.innerHTML = `Раунд ${roundNumber}:`;
    home_text.className = "result-logs-item--element";
    
    let imgUser = document.createElement("img");
    round_div.appendChild(imgUser);
    imgUser.src = getSourceSignByHistoryItem(historyLog[roundNumber-1], 1);
    imgUser.className = "result-logs-item--element";

    let middle_text = document.createElement("div");
    round_div.appendChild(middle_text);
    middle_text.className = "result-logs-item--element";
    let resultIndex= getRoundResult(historyLog[roundNumber-1].userSign, historyLog[roundNumber-1].compSign);
    switch (resultIndex) {
        case gameResultEnum.win: 
            middle_text.innerHTML = "beats";
            break;
        case gameResultEnum.lose: 
            middle_text.innerHTML = "lose to";
            break;
        case gameResultEnum.draw: 
            middle_text.innerHTML = "equals";
            break;
    }

    let imgComp = document.createElement("img");
    round_div.appendChild(imgComp);
    imgComp.src = getSourceSignByHistoryItem(historyLog[roundNumber-1], 2);
}

function playRound(userChoice) {
    computerChoice = getComputerChoice();
    roundResult = getRoundResult(userChoice, computerChoice);
    increaseScore(roundResult);
    saveHistory(userChoice, computerChoice);
    roundNumber++;
}

function game(userChoice) {
    playRound(userChoice);
    showRoundResult(roundResult, userChoice, computerChoice);
    showHistoryItem();
}

function main() {
    for (let i = 0; i < sign.length; i++) {
        const sign_div = document.getElementById(sign[i].name);
        sign_div.addEventListener('click', () => game(i));
    }
}

function createElementsDiv(typeOfGame) {
    if (typeOfGame == 1) {
        for (let i = 0; i < sign.length; i++) {
            let sign_div = document.createElement("div");
            sign_div.id = sign[i].name;
            sign_div.className = "choice";

            let sign_img = document.createElement("img");
            sign_img.src = sign[i].source;
            sign_img.alt = sign[i].name;

            sign_div.appendChild(sign_img);
            choices_div.appendChild(sign_div);
        };
        headTop.innerHTML = "Камень Ножницы Бумага Ящерица Спок";
        main();
    }
    else {
        let textHead = '';
        for (let i = 0; i < countOfElements; i++) {
            let sign_div = document.createElement("div");
            sign_div.id = pokemons[i].name;
            sign_div.className = "choice";

            let sign_img = document.createElement("img");
            sign_img.src = pokemons[i].source;
            sign_img.alt = pokemons[i].name;

            sign_div.appendChild(sign_img);
            choices_div.appendChild(sign_div);
            textHead = `${textHead}${pokemons[i].name}`;
        }
        headTop.innerHTML = textHead;
    }
}

function createElementDiv(typeOfGame, name, source) {
    // let textHead = '';
    let sign = document.createElement("div");
    sign.id = name;
    sign.className = "choice__wrapper";

    let sign_div = document.createElement("div");
    sign_div.className = "choice";

    let sign_img = document.createElement("img");
    sign_img.src = source;
    sign_img.alt = name;

    let sign_title = document.createElement("h2");
    sign_title.innerHTML = name;
    sign_title.className = "choice--title";

    sign_div.appendChild(sign_img);
    sign.appendChild(sign_div);
    sign.appendChild(sign_title);
    choices_div.appendChild(sign);
}

function createArrayRandomNumber() {
    let numReserve = []
    while (numReserve.length < countOfElements) {
        let randomNumber = Math.ceil(Math.random() * 800);
        let found = false;
        for (let i = 0; i < numReserve.length; i++) {
            if (numReserve[i] === randomNumber){
            found = true;
            break;
            }
        }
        if (!found) { numReserve[numReserve.length]=randomNumber; }
    }
    return numReserve;
}

function displayPageTitle() {
    let headText = '';
    for (let i = 0; i <sign.length; i++) {
        headText += sign[i].name;
    };
    headTop.textContent =headText;
}

function createArrayOfPokemons() {
    let numReserve = createArrayRandomNumber();
    getResponse(numReserve);
    displayPageTitle();
}

const onStartGetResponse = () => {
    headTop.innerText = `Загрузка ...`;
}

async function getResponse(numReserve) {
    onStartGetResponse();
    let headText = ` `;
    for (let i = 0; i < numReserve.length; i++) {
        const number = numReserve[i];
        let adress = `https://pokeapi.co/api/v2/pokemon-form/${number}`;
        await fetch(adress)
            .then(response => response.json())
            .then(data => {
                headText += ` ${data.name}`;
                createElementDiv(2, data.name,data.sprites["front_shiny"]);
                sign[i].name = data.name;
                sign[i].source = data.sprites["front_shiny"];
            });
    };
    headTop.innerText = headText;
    main();
}

function startPlay() {
    console.log(typeOfGame);
    if(typeOfGame == 1){
        popUp.classList.add('choice-type-game-hover');
        createElementsDiv(typeOfGame);
    }
    else{
        popUp.classList.add('choice-type-game-hover');
        createArrayOfPokemons();
    }
}

function setTypeOfGame(typeOfGameValue) {
    // if (typeOfGame == 2) {
    //     countOfElements = 5;
    // }
    typeOfGame = typeOfGameValue;
}

buttonStart.addEventListener('click', startPlay);