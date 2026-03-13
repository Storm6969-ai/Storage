function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function giveCard(){
    
}
function givePlayerCard(){
  
}

var playerCards = 0
var enemyCards = 0
var playingCards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10', 'card11']

function startGame() {
  givePlayerCard()
  giveEnemyCard()
}






var whatCard = getRandomInt(0, 11)

console.log(whatCard)
