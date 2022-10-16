var suits = ["Spaced", "Diamonds", "Hearts", "Clubs"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "k"];
var deck = new Array();
var players = new Array();
var currentPlayer = 0;
var seq = 0;
var count = 0;

function createDeck(){
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
    console.log('testing deck', deck)
}


function createPlayers(num){
    console.log('createPlayers has been run', seq +1)
    players = new Array();
    for(let i = 1; i <= num; i++){
        var hand = new Array();
        var player ={ Name: 'Player' + i, Points: 0, Hand: hand};
        players.push(player);
    }
}
//needed major help. too confusing. should be creating the players.//
function createPlayersUI() {
    console.log('createPlayersUI has been run', seq +1)
    document.querySelector('.players').innerHTML = '';
    for(let i = 0; i < players.length; i++){
        

        var div_player = document.createElement('div');
        var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div');
        var div_points = document.createElement('div')

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        div_playerid.innerHTML = 'Player' + players[i].id;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.querySelector('.players').appendChild(div_player);



    }
}
// need to adjust shuffle - not sure how to code it //
function shuffle(){
    console.log('shuffle has been run', seq +1)
    for(let i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function dealHands(){
    console.log('dealHand has been run', seq +1)
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

function updatePoints(){
    console.log('updatePoints, update point has been ran')
    for (let i = 0; i < players.length; i++){
        getPoints(i)
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}


function startGame(){
    console.log('startGame has been run', seq +1)
    document.getElementById('deal').value = 'Restart';
    document.getElementById("status").style.display="none";
    
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

//rendering card function//

function hitMe(){
    console.log('hitMe has been run', seq +1)
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);

    updatePoints();
    updateDeck();
    check();
}

function stay(){
    console.log('stay has been run', seq +1)
    if(currentPlayer != players.length-1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    } else {
        end();
    
    }
}

function updateDeck(){
    console.log('updateDeck ran', seq +1)
}


function end(){
    console.log('end has been run', seq +1)
    var winner = -1;
    var score = 0;

    for(let i = 0; i < player.length; i++){
        if (players[i].Points > score && players[i].Points < 22) {
            winner = i;
        }
        score = player[i].Points;
    }
    document.getElementById('status').innerHTML = 'Winner: Player' + players[winner].ID;
    document.getElementById("status").style.display = 'inline-block';
}

function renderCard(card, player) {
    console.log('renderCard has been run', seq +1)
    var hand = document.getElementById('hand_' + player);
    console.log('testing hand', hand, 'testing player', player, 'testing card', card)
    hand.appendChild(getCardUI(card));
    
}

function getCardUI(card){
    console.log('getCardUI has been run', seq +1)
    let el = document.createElement('div');
    let icon = '';
    if(card.Suit == 'Hearts')
    icon='&hearts;';
    else if (card.Suit == 'Spades')
    icon='&spades;';
    else if (card.Suit == 'Diamonds')
    icon='&diams;';
    else 
    icon = '&clubs;';

    el.className = 'card';
    el.innerHTML = card.Value + '<br/>' + icon;
    return el;
}

function getPoints(player){
    console.log('getPoints has been run', seq +1)
    let points = 0;
    for (let i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}


function check() {
    console.log('check has been run', seq +1)
    if(players[currentPlayer].Points > 21){
        document.getElementById('status').innerHTML = 'Player:' + players[currentPlayer].ID + 'Lost';
        end();
    }
}

window.addEventListener('load', function(){
    console.log('loading has been run', seq +1)
    createDeck();
    shuffle();
    createPlayers(1);
});

function countCard(card){
    let msg = '';

    switch (card){
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            count++
        case 7: 
        case 8: 
        case 9: 
            count = count;
        case 10:
        case "J":
        case "Q":
        case "K":
        case "A":
            count--;
            break;

    }

    if(count === 5) msg = "Count: 5 (Bet)";
    else if (count === 0) msg = "Count: 0 (Hold)";
    else if (count === -5) msg = "Count: -5 (Hold)";
    else if (count === -1) msg = "Count: -1 (Hold)";
    else if (count === 1) msg = "Count: 1 (Bet)";

    return msg;
    // attatch it to the game // 
}