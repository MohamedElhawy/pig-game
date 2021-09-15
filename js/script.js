// activate strict mode
"use strict";


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
let state = "running";




// rolling the dice function
function rollADice ()
{

    // check state of the game
    if ( state === "running" )
    {

        // initial visuals for player 1
        if (activePlayer === 0)
        {
            player1Container.style.filter = "brightness(1)";
            player2Container.style.filter = "brightness(0.7)";
        }


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
                let x = setInterval( ()=> {
                    diceImg.classList.add("hidden");
                    clearInterval(x);
                } , 500 );

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
                let x = setInterval( ()=> {
                    diceImg.classList.add("hidden");
                    clearInterval(x);
                } , 500 );
            }
            else
            {
                player2Score += randNumber;
                player2PointsScore.textContent = player2Score;
            }

        }

    }
    // game state : ended
    else if ( state === "ended")
    {
        return;
    }


}


rollDiceBtn.addEventListener("click" , rollADice );




// add score to the total score of a player by clicking the "hold" button
function holdScore ()
{

    // check game state
    if (state === "running")
    {
        
        // check active player
        // player 1
        if ( activePlayer === 0 )
        {
            player1TotalScore += player1Score;
            player1TotalPoints.textContent = player1TotalScore;
            player1Score = 0;
            player1PointsScore.textContent = player1Score;
            diceImg.classList.add("hidden");
        
            // if total score of a player reached 100 points, the player wins!(game rule)
            if ( player1TotalScore >= 20 )
            {
                player1Header.style.color = "white";
                player1TotalPointsContainer.style.fontSize = "35px";
                player1TotalPoints.textContent = `🏆Winner! score: ${player1TotalScore}`;
                diceImg.classList.add("hidden");
                player2Container.style.filter = "brightness(0.7)";
                player1Container.style.filter = "brightness(1.1)";
                state = "ended";
                return;
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
            diceImg.classList.add("hidden");
        
            // if total score of a player reached 100 points, the player wins!(game rule)
            if ( player2TotalScore >= 20 )
            {
                player2Header.style.color = "white";
                player2TotalPointsContainer.style.fontSize = "35px";
                player2TotalPoints.textContent = `🏆Winner! score: ${player2TotalScore}`;
                diceImg.classList.add("hidden");
                player1Container.style.filter = "brightness(0.7)";
                player2Container.style.filter = "brightness(1.1)";
                state = "ended";
                return;
            }


            activePlayer = 0;
            player2Container.style.filter = "brightness(0.7)";
            player1Container.style.filter = "brightness(1.1)";

        }


    }
    // game state : ended
    else if (state === "ended")
    {
        return;
    }


}


holdBtn.addEventListener("click" , holdScore);








// on clicking the new game button the game resets and the game state switches to "running"
function startingANewGame ()
{

    // reseting the game to initial values
    player1Container.style.filter = "brightness(1)";
    player2Container.style.filter = "brightness(1)";

    player1Header.style.color = "black";
    player2Header.style.color = "black";

    player1Score = 0;
    player1TotalScore = 0;
    player2Score = 0;
    player2TotalScore = 0;

    player1PointsScore.textContent = player1Score;
    player2PointsScore.textContent = player2Score;
    player1TotalPoints.textContent = player1TotalScore;
    player2TotalPoints.textContent = player2TotalScore;

    player1TotalPointsContainer.style.fontSize = "50px";
    player2TotalPointsContainer.style.fontSize = "50px";


    diceImg.classList.add("hidden");



    // initiallize player 1 as a starting player
    activePlayer = 0;
    
    // switch the game state back to "running(default)"
    state = "running";

}





newGameBtn.addEventListener("click" , startingANewGame );