var suits = ["Spaced", "Diamonds", "Hearts", "Clubs"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "k"];
var deck = new Array();
var players = new Array();
var currentPlayer = 0;

function createDeck(){
    let deck = new Array();
    for(let i = 0; i < values.length; i++){
        for(let x = 0; x < suits.length; x++){

            var weight = parseInt(values[i]);
            if(values[i] == "J" || values[i] == "Q"|| values[i] == "K")
                weight = 10;
            if(values[i] == "A")
                weight = 11;
            var card = {Value: values[i], Suit: suits[x], Weight: weight};
            deck.push(card)
        }
    }
}

function createPlayers(num){
    players = new Array();
    for(let i = 1; i <= num; i++){
        var hand = new Array();
        var player ={ Name: 'Player' + i, Points: 0, Hand: hand};
        players.push(player);
    }
}
// need to adjust shuffle - not sure how to code it//
function shuffle(){
    for(let i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function dealHands(){
    for(let i = 0; i < 2; i++) {
        for(let x = 0; x < players.length; x++) {
            var card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }
    updateDeck();
}


function startGame(){
    document.getElementById('deal').value = 'Restart';
    document.getElementById("status").style.display="none";
    
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);


}

//rendering card function//

