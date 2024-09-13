console.log("Hello World!");

const results_table = [
    ["Tie", "Win", "Loss"],
    ["Loss", "Tie", "Win"],
    ["Win", "Loss", "Tie"]
];

let humanScore = 0;
let computerScore = 0;
let current_round = 0;
const max_rounds = 5;

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

function playRound(human_choice, comp_choice) {
    let result = results_table[comp_choice][human_choice]
    let result_text = `It's a ${result}!`
    const result_pane = document.querySelector('#result-pane')
    result_pane.textContent = result_text
    switch(result) {
        case "Win":
            ++humanScore;
            break;
        case "Loss":
            ++computerScore;
            break;
    }
};

function updateScore() {
    const player_score = document.querySelector("#player-score");
    const game_round = document.querySelector("#game-round");
    const computer_score = document.querySelector("#computer-score");

    player_score.textContent = `Player Score: ${humanScore}`;
    computer_score.textContent = `Computer Score: ${computerScore}`;
    game_round.textContent = `Round: ${current_round}`;

}

function playGame() {
    updateScore();
    nextRound();
};


function nextRound() {
    const buttons = document.querySelectorAll(".btn");

        buttons.forEach((button) => {
                button.addEventListener("click", function (e) {
                        if (current_round < max_rounds) {
                            current_round++;
                            let player_selection = e.currentTarget.id;
                            let player_index = arr.indexOf(player_selection);
                            playRound(player_index, getComputerChoice());
                            updateScore();
                        } else endGame();
                });
    });
};

function endGame() {
    const result_pane = document.querySelector('#result-pane');
    result_pane.textContent = "Game Ended. Thank you for playing.";

    const container = document.querySelector("#container");
    container.style.filter = "blur(2.5px)";
    container.style.pointerEvents = "none";


    const end_overlay = document.createElement("div");
    end_overlay.setAttribute("id", "end-overlay");

    const end_div = document.createElement("div");
    end_div.setAttribute("id", "end-container");
    
    const ending_text = document.createElement("p");
    ending_text.textContent = `Player Score: ${humanScore} | Computer Score: ${computerScore}`;
    const ending_sub = document.createElement("p");
    let win_text = "";

    if (humanScore > computerScore) {
        win_text = "Player Wins! Congratulations!";
    } else if (humanScore < computerScore) {
        win_text = "Player loses! The computer rises again!";
    } else if (humanScore === computerScore) {
        win_text = "It's a tie!";
    }

    ending_sub.textContent = win_text;

    end_div.appendChild(ending_text);
    end_div.appendChild(ending_sub);

    const reset_button = document.createElement("button");
    reset_button.setAttribute("id", "reset-btn");
    reset_button.textContent = "Restart Game";
    reset_button.addEventListener("click", () => {
        location.reload();
    });

    end_div.appendChild(reset_button);
    
    end_overlay.appendChild(end_div);

    document.body.appendChild(end_overlay);
};

document.addEventListener("DOMContentLoaded", () =>{
    playGame();
});




