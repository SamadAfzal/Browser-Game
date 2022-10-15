var suits = ["Spaced", "Diamonds", "Hearts", "Clubs"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "k"];
var deck = new Array()

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

