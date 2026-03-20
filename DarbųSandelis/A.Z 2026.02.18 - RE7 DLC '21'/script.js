function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function remove(array, value){ //speed up function: draws a card from the current deck, if card isn't there, nothing happens
  if (array.includes(value)){
    array.splice(array.indexOf(value), 1);
    return array;
  } else {
    return false
  }
}
function drawCard(card = currentCards[getRandomInt(0, currentCards.length-1)]){ //speed up function: draws a card from the current deck, if card isn't there, nothing happens
  if (currentCards.includes(card)){
    remove(currentCards, card)
    return card
  } else {
    return false
  }
}
let whichPlayerTrumpCard = playerTrumpCards[getRandomInt(0, playerTrumpCards.length-1)]


var playerTrumpCards = []
var enemyTrumpCards = []
var playerRisk = 0
var enemyRisk = 0
var goal = 21
var deckCards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10', 'card11']
var currentCards

function deckReset(){currentCards = deckCards}
deckReset()

function giveCard() {
  const randomCard = getRandomInt(0, currentCards.length-1)
  return currentCards[randomCard]
}



function drawCard(card){ //speed up function: draws a card from the current deck, if card isn't there, nothing happens
  if (currentCards.includes(card)){
    remove(currentCards, card)
    return card
  } else {
    return false
  }
}
function removePlayerTC(){ // speed up function: removes trump card from player
  
  return playerTrumpCards
}

function drawTrumpCard(){
  const i = getRandomInt(0, trumpCards.length - 1)
  return trumpCards[i]
}


function trumpCardFunction_raiseRisk(raiseRiskBy){
  let playedByPlayer = false   // change later
  if (playedByPlayer) {
    enemyRisk += raiseRiskBy
  } else {
    playerRisk += raiseRiskBy
  }
}


const trumpCard_OneUp = function trumpCard_OneUp(){canTrumpCardBeOnTable(true), trumpCardFunction_raiseRisk(1)} // add On Table effect
const trumpCard_TwoUp = function trumpCard_TwoUp(){canTrumpCardBeOnTable(true), trumpCardFunction_raiseRisk(2)} // add On Table effect
const trumpCard_TwoUpPLUS = function trumpCard_TwoUp(){canTrumpCardBeOnTable(true), trumpCardFunction_raiseRisk(2), drawTrumpCard} // add On Table effect
const trumpCard_2Card = function trumpCard_2Card(){return drawCard('card2')}
const trumpCard_3Card = function trumpCard_3Card(){return drawCard('card3')}
const trumpCard_4Card = function trumpCard_4Card(){return drawCard('card4')}
const trumpCard_5Card = function trumpCard_5Card(){return drawCard('card5')}
const trumpCard_6Card = function trumpCard_6Card(){return drawCard('card6')}
const trumpCard_7Card = function trumpCard_7Card(){return drawCard('card7')}

const trumpCard_TrumpSwitch = function trumpCard_TrumpSwitch(){
  if (playedByPlayer) {
    let removableTrumpCard = playerTrumpCards[getRandomInt(0, playerTrumpCards.length-1)]
    x = remove(playerTrumpCards, removableTrumpCard)
    console.log('Removed:', x)
    remove(playerTrumpCards, removableTrumpCard)
    playerTrumpCards.push(trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)])
  } else {
    remove(enemyTrumpCards, getRandomInt(0, enemyTrumpCards.length-1))
    remove(enemyTrumpCards, getRandomInt(0, enemyTrumpCards.length-1))
    enemyTrumpCards.push(trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)])
  }
}

const trumpCard_TrumpSwitchPLUS = function trumpCard_TrumpSwitchPLUS(){
  if (playedByPlayer) {
    remove(playerTrumpCards, getRandomInt(0, playerTrumpCards.length-1))
    playerTrumpCards.push(trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)])
  } else {
    remove(enemyTrumpCards, getRandomInt(0, enemyTrumpCards.length-1))
    enemyTrumpCards.push(trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)], trumpCards[getRandomInt(0, trumpCards.length-1)])
  }
}



const trumpCard_Shield = function trumpCard_Shield(){canTrumpCardBeOnTable(true), trumpCardFunction_raiseRisk(-1)} // add On Table effect
const trumpCard_ShieldPLUS = function trumpCard_ShieldPLUS(){canTrumpCardBeOnTable(true), trumpCardFunction_raiseRisk(-2)} // add On Table effect

const trumpCard_GoFor17 = function trumpCard_GoFor17(){goal = 17}
const trumpCard_GoFor24 = function trumpCard_GoFor24(){goal = 24}
const trumpCard_GoFor27 = function trumpCard_GoFor27(){goal = 27}


function repeat(item, count) {
  return Array(count).fill(item)
}
var trumpCards = (
  [
  // trumpCard_OneUp,
  // trumpCard_TwoUp,
  // trumpCard_TwoUpPLUS,
  // trumpCard_Remove,
  // trumpCard_Return,
  // trumpCard_Exchange,
  // trumpCard_TrumpSwitch,
  // trumpCard_TrumpSwitchPLUS,
  // trumpCard_Shield,
  // trumpCard_ShieldPLUS,
  // trumpCard_Destroy,
  // trumpCard_DestroyPLUS,
  // trumpCard_DestroyPLUSPLUS,
  // trumpCard_PerfectDraw,
  // trumpCard_PerfectDrawPLUS,
  // trumpCard_UltimateDraw,
  // trumpCard_Harvest,
  // trumpCard_LoveYourEnemy,
  // trumpCard_ShieldAssault,
  // trumpCard_ShieldAssaultPLUS,
  // trumpCard_Happiness,
  // trumpCard_Desire,
  // trumpCard_DesirePLUS,
  // trumpCard_MindShift,
  // trumpCard_MindShiftPLUS,
  // trumpCard_Conjure,
  // trumpCard_Curse,
  // trumpCard_BlackMagic,
  // trumpCard_Escape,
  // trumpCard_Twenty-One-Up,
  // trumpCard_Oblivion,
  // trumpCard_DeadSilence,
  // trumpCard_Desperation
  ]
  .concat(
    repeat(trumpCard_OneUp, 6),
    repeat(trumpCard_TwoUp, 4),
    repeat(trumpCard_TwoUpPLUS, 2),
    repeat(trumpCard_GoFor17, 2),
    repeat(trumpCard_GoFor24, 2),
    repeat(trumpCard_GoFor27, 2),
    repeat(trumpCard_2Card, 2),
    repeat(trumpCard_3Card, 2),
    repeat(trumpCard_4Card, 2),
    repeat(trumpCard_5Card, 2),
    repeat(trumpCard_6Card, 2),
    repeat(trumpCard_7Card, 2),
  )
)

  // .concat()
  // .concat(repeat(trumpCard_TwoUp, 4))
  // .concat(repeat(trumpCard_GoFor17, 1))
  // .concat(repeat(trumpCard_GoFor24, 1))


// function givePlayerCard(){
  
// }


// function startGame() {
//   givePlayerCard()
//   giveEnemyCard()
// }

// trumpCard_OneUp()
// console.log(giveCard())
// trumpCard_GoFor17()
// console.log(goal)
// console.log('EnemyRisk:', enemyRisk, 'PlayerRisk:', playerRisk)
// var playedByPlayer = true

// console.log('Prim Trump Cards:', playerTrumpCards)

// // console.log('Trump Cards:', trumpCards)
// playerTrumpCards = playerTrumpCards.concat(trumpCard_OneUp, trumpCard_GoFor17, trumpCard_3Card);

// console.log('Player Trump Cards after receiving some TC:', playerTrumpCards)
// playerTrumpCards.remove()
// // trumpCard_TrumpSwitch()
// console.log('Player Trump Cards after Trump Swtich:', playerTrumpCards)
// // console.log(trumpCard_7Card())
// // console.log(currentCards)
// trumpCard_TrumpSwitch()
console.log(playerTrumpCards)
playerTrumpCards.push(drawTrumpCard, drawTrumpCard, drawTrumpCard)


console.log(playerTrumpCards)