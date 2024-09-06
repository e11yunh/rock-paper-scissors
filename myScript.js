console.log("Hello World!");

const results_table = [
    ["Tie", "Win", "Loss"],
    ["Loss", "Tie", "Win"],
    ["Win", "Loss", "Tie"]
];

let arr = ["rock", "paper", "scissors"];

function getComputerChoice () {
    let comp_index = Math.floor(Math.random() * arr.length)
    let comp_choice = arr[comp_index]
    console.log(`Computer chose ${comp_choice}`)
    return comp_index;
};


function getHumanChoice () {
    let human_choice = prompt("Choose one: Rock / Paper / Scissors\n").toLowerCase()
    try {
        if (!arr.includes(human_choice)) {
            throw new Error("Invalid choice. Please only enter one of the following: Rock , Paper, or Scissors.")
        }
        console.log(`User picked ${human_choice}`)
        let human_index = arr.indexOf(human_choice)
        return human_index;
    } catch (error) {
        console.log(error.message)
        return null;
    }
};

let humanScore = 0;
let computerScore = 0;

function playRound(human_choice, comp_choice) {
    let result = results_table[comp_choice][human_choice]
    console.log(`It's a ${result}!`)
    switch(result) {
        case "Win":
            ++humanScore;
            break;
        case "Loss":
            ++computerScore;
            break;
    }
};


function playGame() {
    for (let i = 1; i <= 5; i++) {
        playRound(getHumanChoice(), getComputerChoice())
        console.log(`Current Score| Player: ${humanScore} | Computer: ${computerScore}`)
    }
    if (humanScore > computerScore) {
        console.log("Player wins! Congratulations!")
    }
    else if (computerScore > humanScore) {
        console.log("Computer wins! The world is doomed...")
    }
    else {
        console.log("It's a tie! The fate of the world remains murky.")
    }
    console.log(`Final Score| Player: ${humanScore} | Computer: ${computerScore}`)
}

playGame()




