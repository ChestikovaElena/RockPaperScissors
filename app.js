let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score_board");
const result_p = document.querySelector(".result > p");
const choices_div = document.querySelector(".choices");
const gameResultEnum =  Object.freeze({"win": 1, "lose": 2, "draw": 3});
const historyLog = [];
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

function game(userChoice) {
    const computerChoice = getComputerChoice();
    console.log(computerChoice);
    const roundResult = getRoundResult(userChoice, computerChoice);
    increaseScore(roundResult);
    showRoundResult(roundResult, userChoice, computerChoice);

}

function main() {
    for (let i = 0; i < sign.length; i++) {
        const sign_div = document.getElementById(sign[i].name);
        sign_div.addEventListener('click', () => game(i));
    }
}

function createElementsDiv() {
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
    main();
}

createElementsDiv();