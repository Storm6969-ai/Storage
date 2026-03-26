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


function drawCard(card = currentCards[getRandomNum(0, currentCards.length-1)]){ //GAMEPLAY FUNCTION: draws a card from the current deck, if card isn't there, nothing happens
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
    
    // Use total enemy value (including hidden first card)
    let totalEnemyValue = enemyCardsValue + enemyHiddenCardValue
    
    // Both equal = both lose
    if (playerCardsValue === totalEnemyValue){
        playerWonRound = undefined
    }
    // Player busted, enemy didn't
    else if (playerCardsValue > goal && totalEnemyValue <= goal){
        playerWonRound = false
    }
    // Enemy busted, player didn't
    else if (totalEnemyValue > goal && playerCardsValue <= goal){
        playerWonRound = true
    }
    // Neither busted: closest to goal wins
    else if (playerCardsValue <= goal && totalEnemyValue <= goal){
        playerWonRound = (Math.abs(goal - playerCardsValue) < Math.abs(goal - totalEnemyValue))
    }
    // Both busted: whoever is closer to goal wins (goes over less)
    else {
        playerWonRound = (Math.abs(goal - playerCardsValue) < Math.abs(goal - totalEnemyValue))
    }

    if(playerWonRound === undefined){
        console.log("BOTH lost")
        enemyHealth -= enemyRisk
        playerHealth -= playerRisk
    } else if (playerWonRound === true) {
        console.log("Player WON")
        enemyHealth -= enemyRisk
    } else {
        console.log("Player LOST")
        playerHealth -= playerRisk
    }
    
    roundInProgress = false
    updateDisplay()
    
    // Check if game is over
    if (playerHealth < 1){
        gameOver(false)
    } else if (enemyHealth < 1){
        gameOver(true)
    }
}


const deckCards = ['PlayingCard1', 'PlayingCard2', 'PlayingCard3', 'PlayingCard4', 'PlayingCard5', 'PlayingCard6', 'PlayingCard7', 'PlayingCard8', 'PlayingCard9', 'PlayingCard10', 'PlayingCard11']
const MAX_CARDS_PER_SIDE = 6

var playerHealth = 5
var playerRisk = 0
var playerCardsValue = 0
var playerCards = []
var playerStayed = false

var enemyHealth = 5
var enemyRisk = 0
var enemyCardsValue = 0
var enemyHiddenCardValue = 0
var enemyCards = []
var enemyStayed = false

var currentGoal
var playerTrumpCards = []
var enemyTrumpCards = []

var goal = 21
var currentCards
var gameActive = true
var roundInProgress = false
var currentTurn = 'player'

var myClasses = document.getElementsByClassName("currentgoal");

// Initialize the game
function gameInit(){
    goalReset()
    checkGoals()
    deckReset()
    startRound()
}

function startRound(){
    // Reset currentCards from deckCards at the beginning of every round
    deckReset()

    roundInProgress = true
    playerStayed = false
    enemyStayed = false
    playerCards = []
    enemyCards = []
    playerCardsValue = 0
    enemyCardsValue = 0
    enemyHiddenCardValue = 0
    playerRisk += 1
    enemyRisk += 1

    // Reset first card number placeholders
    document.getElementById('firstPlayerCardNumber').textContent = '?'
    document.getElementById('firstEnemyCardNumber').textContent = '?'

    // Deal two cards each at the start
    for (let i = 0; i < 2; i++) {
        let pCard = drawCard()
        if (pCard) {
            playerCards.push(pCard)
            let val = parseInt(pCard.replace('PlayingCard', ''))
            playerCardsValue += val
            if (i === 0) {
                document.getElementById('firstPlayerCardNumber').textContent = val
            }
        }

        let eCard = drawCard()
        if (eCard) {
            enemyCards.push(eCard)
            let val = parseInt(eCard.replace('PlayingCard', ''))
            if (i === 0) {
                enemyHiddenCardValue = val
                document.getElementById('firstEnemyCardNumber').textContent = '?'
            } else {
                enemyCardsValue += val
            }
        }
    }

    currentTurn = 'player'
    document.getElementById('enemyActionText').textContent = ''
    updateDisplay()
}

function drawCardForPlayer(){
    if (!gameActive || !roundInProgress || currentTurn !== 'player') return
    if (playerCards.length >= MAX_CARDS_PER_SIDE) return

    // Drawing breaks previous stay sequence
    playerStayed = false

    let card = drawCard()
    if (card) {
        playerCards.push(card)
        let cardValue = parseInt(card.replace('PlayingCard', ''))
        playerCardsValue += cardValue

        // Update first card display
        if (playerCards.length === 1) {
            document.getElementById('firstPlayerCardNumber').textContent = cardValue
        }

        updateCardDisplay()

        alert('Player draws a card')
        document.getElementById('enemyActionText').textContent = 'Player draws'

        // Check if player busts
        if (playerCardsValue > goal){
            playerStayed = true
            alert('Player busts')
            document.getElementById('enemyActionText').textContent = 'Player busted'
        }

        currentTurn = 'enemy'
        enemyTurn()
    }
}

function playerStay(){
    if (!gameActive || !roundInProgress || playerStayed || currentTurn !== 'player') return
    playerStayed = true
    currentTurn = 'enemy'
    alert('Player stays')
    document.getElementById('enemyActionText').textContent = 'Enemy to move'

    if (enemyCards.length >= MAX_CARDS_PER_SIDE || !currentCards || currentCards.length === 0) {
        enemyStayed = true
        checkRoundEnd()
        return
    }

    enemyTurn()
}

function enemyTurn(){
    if (!gameActive || !roundInProgress || currentTurn !== 'enemy') return

    if (enemyStayed){
        checkRoundEnd()
        return
    }

    if (enemyCards.length >= MAX_CARDS_PER_SIDE) {
        enemyStayed = true
        document.getElementById('enemyActionText').textContent = 'Enemy max cards'
        checkRoundEnd()
        return
    }

    if (!currentCards || currentCards.length === 0) {
        enemyStayed = true
        document.getElementById('enemyActionText').textContent = 'Deck empty'
        checkRoundEnd()
        return
    }

    let totalValue = enemyCardsValue + enemyHiddenCardValue
    let drawChance = totalValue > 20 ? 0.2 : 0.7
    if (Math.random() < drawChance){
        let card = drawCard()
        if (card) {
            enemyStayed = false
            enemyCards.push(card)
            let cardValue = parseInt(card.replace('PlayingCard', ''))

            if (enemyCards.length === 1) {
                enemyHiddenCardValue = cardValue
                document.getElementById('firstEnemyCardNumber').textContent = '?'
            } else {
                enemyCardsValue += cardValue
            }

            updateCardDisplay()
            alert('Enemy draws a card')
            document.getElementById('enemyActionText').textContent = 'Enemy draws'

            totalValue = enemyCardsValue + enemyHiddenCardValue
            if (totalValue > goal){
                // Enemy over goal: still continues the same turnout rules
                enemyStayed = true
                document.getElementById('enemyActionText').textContent = 'Enemy over goal'
                checkRoundEnd()
                return
            }

            currentTurn = 'player'
            checkRoundEnd()
            return
        }
    }

    enemyStayed = true
    alert('Enemy stays')
    document.getElementById('enemyActionText').textContent = 'Enemy stays'
    checkRoundEnd()
}

function checkRoundEnd(){
    updateDisplay()

    // round finishes only if both have stayed consecutively
    if (playerStayed && enemyStayed){
        roundEnd()
        setTimeout(() => {
            if (gameActive) {
                startRound()
            }
        }, 2000)
    } else if (playerStayed && !enemyStayed){
        currentTurn = 'enemy'
        enemyTurn()
    } else if (!playerStayed && enemyStayed){
        currentTurn = 'player'
    }
}

function gameOver(playerWon){
    gameActive = false
    roundInProgress = false
    let message = playerWon ? "You WON the game!" : "You LOST the game!"
    alert(message)
    location.reload()
}



// console.log(goal)
// console.log(currentGoal)
// goalReset()
// console.log(goal)
// console.log(currentGoal)
// currentGoal = currentGoal - 7 
// console.log(goal)
// console.log(currentGoal)


// checkGoals()

function updateCardDisplay(){
    // Update player cards
    for (let i = 0; i < MAX_CARDS_PER_SIDE; i++){
        let cardElement = document.querySelector(`.player_PlayingCard_Place_${i + 1}`)
        if (i < playerCards.length){
            cardElement.style.display = 'block'
            // First card shows back_of_card image
            if (i === 0) {
                cardElement.style.backgroundImage = `url(pictures/back_of_card.png)`
            } else {
                cardElement.style.backgroundImage = `url(pictures/${playerCards[i]}.png)`
            }
        } else {
            cardElement.style.display = 'none'
        }
    }
    
    // Update enemy cards
    for (let i = 0; i < MAX_CARDS_PER_SIDE; i++){
        let cardElement = document.querySelector(`.enemy_PlayingCard_Place_${i + 1}`)
        if (i < enemyCards.length){
            cardElement.style.display = 'block'
            // First card shows back_of_card image
            if (i === 0) {
                cardElement.style.backgroundImage = `url(pictures/back_of_card.png)`
            } else {
                cardElement.style.backgroundImage = `url(pictures/${enemyCards[i]}.png)`
            }
        } else {
            cardElement.style.display = 'none'
        }
    }
    
    // Update scores
    document.getElementById('currentPlayerScore').textContent = playerCardsValue
    document.getElementById('currentEnemyCsore').textContent = enemyCardsValue
}

function updateDisplay(){
    updateCardDisplay()
    updateHealth()
}

function updateHealth(){
    // Update player health
    for (let i = 1; i <= 5; i++){
        let healthElement = document.querySelector(`.playerHealth:nth-child(${i})`)
        if (healthElement){
            healthElement.classList.remove('healthLive', 'healthAtRisk', 'healthLost')
            if (i <= playerHealth) {
                healthElement.classList.add('healthLive')
            } else {
                healthElement.classList.add('healthLost')
            }
        }
    }
    
    // Update enemy health
    for (let i = 1; i <= 5; i++){
        let healthElement = document.querySelector(`.enemyHealth:nth-child(${i})`)
        if (healthElement){
            healthElement.classList.remove('healthLive', 'healthAtRisk', 'healthLost')
            if (i <= enemyHealth) {
                healthElement.classList.add('healthLive')
            } else {
                healthElement.classList.add('healthLost')
            }
        }
    }
}

// Start the game when page loads
window.addEventListener('load', gameInit)






