const BOARD = document.getElementById("game-body");
const SYMBOLS = ["😀", "😭"];
const TIMEOUT = 400;
const TIMEOUT_GEN = 120;
let players = ["", ""];
let canPlay = false;
let playerTurn = 0;
// THE ABOVE CODE IS FOR VARIABLES

function generateBoard() {
// Takes the BOARD ELEMENT STYLE TO DISPLAY A BLOCK
  BOARD.style.display = "block";
  BOARD.innerHTML = ""; 
  let count = 0; // Declared a variable count and initialize it to 0

// Declared variable interval ,initialize it to a new internal object
  let interval = setInterval(() => {
/*Append(ADD) a button element to the BOARD element.
The button element has the onclick event hander set the the function putSymbol().
The button element also has the class attribute set to "game-button" and inner text to "⬜".*/ 
BOARD.innerHTML += `<button onclick="putSymbol(this)" class="game-button">⬜</button>`;
 
    count++; //Increment the count variable by 1
//if the count is greater than 8 clear the interval object and set the canPlay variable to true.
//It also gets all the button elements with the class attribute "game-button" and calls the classList.add() method on each button element to add the 'animate-btn' class to it.
    if (count > 8) {
      clearInterval(interval);
      canPlay = true;
      let buttonsAnimate = document.querySelectorAll(".game-button");
      buttonsAnimate.forEach((button) => {
        button.classList.add("animate-btn");
      });
    }
  }, TIMEOUT_GEN); // VARIABLES ON CO 4
}

function putSymbol(argthis) {
//Check if the current player is allowed to make a move nd if the cell is empty 
  if (canPlay && argthis.innerHTML == "⬜") {
  // if the two condition are meet the returns the following.
    argthis.innerHTML = `<span class="animate">${SYMBOLS[playerTurn]}</span>`;
    argthis.classList.add(`${playerTurn}`);
    argthis.classList.add("marked");
    if (!checkWinner()) changePlayer(); /*
  ? Calls the function checkWinner() to see if the current player has won the game
  ?The above code will change the color of the symbol on click and add the animate class to the span tag.
 ? if the current player has not won game the function calls the function changeplayer() to switch to the next players */
  
  }
}

changePlayer =() => {
  const PLAYER = document.getElementById("playerturn");
// !Gets the DOM ELEMENT IN THE ID playerturn
  playerTurn++; //! increments the playerTurn variable
  if (playerTurn > 1) /* TODO: CHANGED NUMBER TO 1 */ playerTurn = 0; //! if it value is greater than 1 sets it to 0 which ensures that player turn cicrles between 0 and 1
  if (PLAYER.style.display == "block"){ //? Checks if the playerturn element is visiable equal to [==] a block display
    PLAYER.innerHTML = `Player in turn: ${players[playerTurn]} ${SYMBOLS[playerTurn]}`;
  //! COD 58 updates the inner.HTML of the playerturn element with the text Player in turn: ${players[playerTurn]} ${SYMBOLS [playerTurn]}.
    }
  }

 checkWinner= (argthis) => {
   const WINNER = [ //? ARRAY CONTAINS ALL THE WINNING COMBINATIONS OF THE GAME
    [0, 1, 2], //!ROWS
    [3, 4, 5], //!ROWS
    [6, 7, 8], //!ROWS
    [0, 3, 6], //columns
    [1, 4, 7], //columns
    [2, 5, 8], //columns
    [0, 4, 8], //? Diagonals
    [2, 4, 6]  //?Diagonals
   ];
   const BUTTONS = document.querySelectorAll(".game-button");// Reference to all the buttons in the game board.
   for (i in WINNER) { // Buttons are then looped
     if (BUTTONS[WINNER[i][0]].classList.contains(`${playerTurn}`) &&
       BUTTONS[WINNER[i][1]].classList.contains(`${playerTurn}`) &&
       BUTTONS[WINNER[i][2]].classList.contains(`${playerTurn}`)) {
       canPlay = false;
       setTimeout(() => {
         endGame(0);
       }, TIMEOUT);
       BUTTONS[WINNER[i][0]].classList.add("winner");
       BUTTONS[WINNER[i][1]].classList.add("winner");
       BUTTONS[WINNER[i][2]].classList.add("winner");
       return true;
     }
   }
   
   checkDraw(BUTTONS); //Checks if the game is a draw if the game is a draw the function returns false.
   return false;
 }

checkDraw =(buttonsArg)=> {
  let marked = 0; // USED TO TRACK THE NUMBER OF BUTTONS THAT HAVE BEEN MARKED
  for (i = 0; i < buttonsArg.length; i++) {
    if (buttonsArg[i].classList.contains("marked")) marked++;
  }
  if(marked >= 9){ //! if the code is greater or equal to 9 the code inside the if statement will be excecuted.
    setTimeout(() => { // Creates a timer that will execute the function endGame() after a specific time.
      endGame(1);// For ending the game and declaring a winner
    },TIMEOUT);
  }
}
  

endGame= (type) => { //INDICATES WHETHER THE GAME HAS ENDED IN A DRAW TYPE=1 OR IF SOMEONE WON TYPE =0; 
  let cardmsg = document.getElementById("card-message"); //* the function gets a reference to the card-message and game-modal elements.
//! card-message is used to display a message to a user such as a DRAW OR PLAYER X WON 
//! game-modal used to hide the game board and show a the message
  document.getElementById("game-modal").style.display = "flex"; //STYLE SETTING FLEX{MAKES IT VISIBALE TO THE USER}
  cardmsg.innerHTML = "";
  cardmsg.innerHTML = `<p>Draw</p>`;
  if (type == 0) {
    //!0 MEANS SOMEONW HAS WON
    cardmsg.innerHTML = `<p>${SYMBOLS[playerTurn]} ${players[playerTurn]} won ${SYMBOLS[playerTurn]}</p>`;
  }
}

function reset() { //* Function is responsible for reseting the game.
  generateBoard();//! Reset function calls upon this function to create a new board with empty cells.
  canPlay = true;//! indicates that the game is ready to be played again .
  changePlayer();//!  canPlay function calls upon this function to change the player turn.
  document.getElementById("game-modal").style.display = "none"; //! sets style to none which hides the element.
}

function setPlayerName() {
  const TIMEOUT_1 = TIMEOUT_GEN * 15;// const var represents the amount of time in milseconds to wait before hiding the warning if the players names are not different.
  let inputs = document.querySelectorAll(".inputplayer");

//! THE PART OF THE CODE CHECKS IF THE PLAYER NAMES ARE DIFFERENT.
  if (inputs[0].value != inputs[1].value) {
  //* the playersa array is an array of two strings one for each players name.
    players[0] = inputs[0].value;
    players[1] = inputs[1].value;
  } 
//! if the they ARE the same the function displays an error message.
  else {
    let warning = document.getElementById("input-warning"); // REFER TO HTML 
    warning.style.visibility = "visible";
    setTimeout(() => {
      warning.style.visibility = "hidden";
    }, TIMEOUT_1);
  }

  if (players[0] != "" && players[1] != "") {
    inputs.forEach((inp) => {
      inp.style.display = "none";
    });
    document.getElementById("playerbtn").style.display = "none"; // USED TO START THE GAME

    document.getElementById(
      "playerinfo" //*? THIS CREATES A PARAGRAPH ELEMENT 
    ).innerHTML += `<p id="player-callback">Player setup successful</p>`;
    generateBoard(); //creates a new board
    setTimeout(() => { //*? delays the execution of the next block of code  which gives the user a chance to see the message that was just added to paragraph(playerinfo div)
      document.getElementById("player-callback").style.display = "none"; // CO 157 TO 160 is executed after TIMOUE_1 miliseconds
      document.getElementById("playerturn").style.display = "block";
      document.getElementById(
        "playerturn"
      ).innerHTML = `Player in turn: ${players[playerTurn]} ${SYMBOLS[playerTurn]}`;// the text indicates whose turn it is to play
    }, TIMEOUT_1);
  }
}
