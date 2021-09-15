// activate strict mode
"use strict";

// attribution
console.log("Icons made by https://www.freepik.com");

// catch dom objects
const newGameBtn = document.getElementById("newGameBtn");
const rollDiceBtn = document.getElementById("rollDiceBtn");
const holdBtn = document.getElementById("holdBtn");
const diceImg = document.getElementById("diceImg");
const player1PointsScore = document.getElementById("player1PointsScore");
const player1TotalPoints = document.getElementById("player1TotalPoints");
const player1TotalPointsContainer = document.getElementById("player1TotalPointsContainer");
const player2TotalPointsContainer = document.getElementById("player2TotalPointsContainer");
const player1Header = document.querySelector(".player1-header");
const player2Header = document.querySelector(".player2-header");
const player2PointsScore = document.getElementById("player2PointsScore");
const player2TotalPoints = document.getElementById("player2TotalPoints");
const player1Container = document.getElementById("player1Container");
const player2Container = document.getElementById("player2Container");



// declaring global variables
let player1Score = 0;
let player1TotalScore = 0;
let player2Score = 0;
let player2TotalScore = 0;
let activePlayer = 0;




// rolling the dice function
function rollADice ()
{

    // generated random number from 1 to 6
    let randNumber =  Math.trunc(Math.random() * 6) + 1;

    // display different dices depend on different numbers from 1 to 6
    diceImg.style.backgroundImage = `url("../resources/assets/dice${randNumber}.png")`;

    // display the dice for the first time
    if ( diceImg.classList.contains("hidden") )
    {
        diceImg.classList.remove("hidden");
    }


    // check active player
    // player 1
    if ( activePlayer === 0 )
    {
        // add value of the dice to the score of the player and display it 
        // if the dice number one came reset the score to zero (game law)
        if ( randNumber === 1 )
        {
            player1Score = 0;
            player1PointsScore.textContent = player1Score;
            activePlayer = 1;
            player1Container.style.filter = "brightness(0.7)";
            player2Container.style.filter = "brightness(1.1)";
        }
        else
        {
            player1Score += randNumber;
            player1PointsScore.textContent = player1Score;
        }
    }
    // player 2
    else if ( activePlayer === 1 )
    {

        // add value of the dice to the score of the player and display it 
        // if the dice number one came reset the score to zero (game law)
        if ( randNumber === 1 )
        {
            player2Score = 0;
            player2PointsScore.textContent = player2Score;
            activePlayer = 0;
            player2Container.style.filter = "brightness(0.7)";
            player1Container.style.filter = "brightness(1.1)";
        }
        else
        {
            player2Score += randNumber;
            player2PointsScore.textContent = player2Score;
        }

    }


}


rollDiceBtn.addEventListener("click" , rollADice );




// add score to the total score of a player by clicking the "hold" button
function holdScore ()
{

    // check active player
    // player 1
    if ( activePlayer === 0 )
    {
        player1TotalScore += player1Score;
        player1TotalPoints.textContent = player1TotalScore;
        player1Score = 0;
        player1PointsScore.textContent = player1Score;
    
        // if total score of a player reached 100 points, the player wins!(game rule)
        if ( player1TotalScore >= 100 )
        {
            player1Header.style.color = "white";
            player1TotalPointsContainer.style.fontSize = "35px";
            player1TotalPoints.textContent = `🏆Winner! score: ${player1TotalScore}`;
            diceImg.classList.add("hidden");
            player2Container.style.filter = "brightness(0.7)";
            player1Container.style.filter = "brightness(1.1)";
        }


        activePlayer = 1;
        player1Container.style.filter = "brightness(0.7)";
        player2Container.style.filter = "brightness(1.1)";

    }
    // player 2
    else if ( activePlayer === 1 )
    {
        player2TotalScore += player2Score;
        player2TotalPoints.textContent = player2TotalScore;
        player2Score = 0;
        player2PointsScore.textContent = player2Score;
    
        // if total score of a player reached 100 points, the player wins!(game rule)
        if ( player2TotalScore >= 100 )
        {
            player2Header.style.color = "white";
            player2TotalPointsContainer.style.fontSize = "35px";
            player2TotalPoints.textContent = `🏆Winner! score: ${player2TotalScore}`;
            diceImg.classList.add("hidden");
            player1Container.style.filter = "brightness(0.7)";
            player2Container.style.filter = "brightness(1.1)";
        }


        activePlayer = 0;
        player2Container.style.filter = "brightness(0.7)";
        player1Container.style.filter = "brightness(1.1)";

    }


}




holdBtn.addEventListener("click" , holdScore);