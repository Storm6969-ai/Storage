function getRandomNum(min, max) { // SPEED UP FUNCTION: gets a random number from the biggest and smallest num of an array
  min = Math.ceil(min); max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function remove(array, value){ //SPEED UP FUNCTION: removes a value from an array
  if (array.includes(value)){
    array.splice(array.indexOf(value), 1);
    return array;
  } else {return false}
}


function drawCard(card = currentCards[getRandomInt(0, currentCards.length-1)]){ //GAMEPLAY FUNCTION: draws a card from the current deck, if card isn't there, nothing happens
  if (currentCards.includes(card)){
    remove(currentCards, card)
    return card
  } else {
    return false
  }
}
function deckReset(){ // GAMEPLAY FUNCTION: resets the current deck
    currentCards = [].concat(deckCards)
}
function goalReset(){ // GAMEPLAY FUNCTION: resets the current goal
    currentGoal = 0 + goal
}
function checkGoals(){ // GAMEPLAY FUNCTION: checks and rewrites the goals upon changes
    for (var i = 0; i < myClasses.length; i++) {
    myClasses[i].textContent = currentGoal;
    }
}
function roundEnd(){ // finishes the round
    let playerWonRound
    if ((currentGoal <= playerCardsValue) && (playerCardsValue < enemyCardsValue)){
        playerWonRound = true
    } else if ((currentGoal >= playerCardsValue) && (playerCardsValue > enemyCardsValue)) {
        playerWonRound = true
    } else if ((currentGoal >= playerCardsValue) && (currentGoal < enemyCardsValue)){
        playerWonRound = true
    } else if (playerCardsValue == enemyCardsValue){
        playerWonRound = undefined
    } else {
        playerWonRound = false
    }

    if(playerWonRound == undefined){
        console.log("BOTH lost")
    } else if (playerWonRound == true) {
        console.log("Player WON")
    } else {
        console.log("Player LOST")
    }

    if (playerWonRound == true){
        enemyHealth -= enemyRisk
    } else if (playerWonRound == false){
        playerHealth -= playerRisk
    } else {
        enemyHealth -= enemyRisk
        playerHealth -= playerRisk
    }
}


const deckCards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10', 'card11']

var playerHealth = 5
var playerRisk = 0
var playerCardsValue = 0

var enemyHealth = 5
var enemyRisk = 0
var enemyCardsValue = 0

var currentGoal
var playerTrumpCards = []
var enemyTrumpCards = []



var goal = 21
var currentCards


var myClasses = document.getElementsByClassName("currentgoal");



// console.log(goal)
// console.log(currentGoal)
// goalReset()
// console.log(goal)
// console.log(currentGoal)
// currentGoal = currentGoal - 7 
// console.log(goal)
// console.log(currentGoal)


// checkGoals()






