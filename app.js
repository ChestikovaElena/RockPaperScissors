let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score_board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("Rock");
const paper_div = document.getElementById("Paper");
const scissors_div = document.getElementById("Scissors");
const lizard_div = document.getElementById("Lizard");
const spock_div = document.getElementById("Spock");
const gameResultEnum =  Object.freeze({"win": 1, "lose": 2, "draw": 3});
const gameRules = {
    Rock: {
        Rock: gameResultEnum.draw,
        Scissors: gameResultEnum.win,
        Paper: gameResultEnum.lose,
        Lizard: gameResultEnum.win,
        Spock: gameResultEnum.lose
    },
    Scissors: {
        Rock: gameResultEnum.lose,
        Scissors: gameResultEnum.draw,
        Paper: gameResultEnum.win,
        Lizard: gameResultEnum.win,
        Spock: gameResultEnum.lose
    },
    Paper: {
        Rock: gameResultEnum.win,
        Scissors: gameResultEnum.lose,
        Paper: gameResultEnum.draw,
        Lizard: gameResultEnum.lose,
        Spock: gameResultEnum.win
    },
    Lizard: {
        Rock: gameResultEnum.lose,
        Scissors: gameResultEnum.lose,
        Paper: gameResultEnum.win,
        Lizard: gameResultEnum.draw,
        Spock: gameResultEnum.win
    },
    Spock: {
        Rock: gameResultEnum.win,
        Scissors: gameResultEnum.win,
        Paper: gameResultEnum.lose,
        Lizard: gameResultEnum.lose,
        Spock: gameResultEnum.draw
    }
}

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
    const randomNumber = Math.floor(Math.random()*5);
    return choices[randomNumber];
}

function showScore() {
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
}

function showRoundResult(roundResult, userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
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

    result_p.innerHTML = `${userChoice}${smallUserWord} ${middleWord} ${computerChoice}${smallCompWord}. ${endWord}`;
    userChoice_div.classList.add(colorGlow_class);
    setTimeout(() => userChoice_div.classList.remove(colorGlow_class), glowTime);
    showScore();
}

function getRoundResult(userChoice, computerChoice) {
    return gameRules[userChoice][computerChoice];
}

function increaseScore(roundResult) {
    if (roundResult === gameResultEnum.win) {
        userScore++;
    }
    else if (roundResult === gameResultEnum.lose) {
        computerScore++;
    }
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    const roundResult = getRoundResult(userChoice, computerChoice);
    increaseScore(roundResult);
    showRoundResult(roundResult, userChoice, computerChoice);
}

function main() {
    rock_div.addEventListener('click', () => game("Rock"));
    paper_div.addEventListener('click', () => game("Paper"));
    scissors_div.addEventListener('click', () => game("Scissors"));
    lizard_div.addEventListener('click', () => game("Lizard"));
    spock_div.addEventListener('click', () => game("Spock"));
}

main();