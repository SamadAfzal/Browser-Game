var suits = ["Spaced", "Diamonds", "Hearts", "Clubs"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck = new Array();
var players = new Array();
var currentPlayer = 0;
var seq = 0;
var count = 0;
var card = 0;
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


function createPlayers(num)
{
    players = new Array();
    for(var i = 1; i <= num; i++)
    {
        var hand = new Array();
        var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}

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

        div_playerid.innerHTML = players[i].Name;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.querySelector('.players').appendChild(div_player);



    }
}

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
    document.getElementById('start').value = 'Restart';
    document.getElementById("status").style.display="none";
    //document.getElementById('countCardMsg').innerHTML =" ";//
    
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands();
    document.getElementById('player_' + currentPlayer).classList.add('active');
    //document.getElementById("status").style.display="none"//
}

//rendering card function//

function hitMe(){
    console.log('hitMe has been run', seq +1)
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    console.log( 'check hand', players[currentPlayer].Hand )
    let allCardsArr = players[ 0 ].Hand.concat( players[ 1].Hand );
    if ( allCardsArr.length ) {
        countCard(allCardsArr );
    }
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
    // var winner = 1;
    var score = 0;

    for(let i = 0; i < players.length; i++){

        if (( players[i].Points > score && players[i].Points < 22 ) || players[ i ].Points === 21 ) {
            // winner = i;
            document.getElementById("status").innerHTML = 'Winner: ' + players[i].Name;
        // } else if ( players[i].Points > 21 ) {
        //     winner = i + 1
        }
        score = players[i].Points;
    }

    console.log( 'players array', players );
    // document.getElementById("status").innerHTML = 'Winner: ' + players[winner].Name;
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
    // if ( players[currentPlayer].Hand.length ) {
    //     countCard(players[currentPlayer].Hand.length );
    // }
    console.log("check players", players[currentPlayer].Points)
    console.log('check has been run', seq +1)
    if(players[currentPlayer].Points > 21) {
        document.getElementById('status').innerHTML = `${players[currentPlayer].Name} Lost`;
        end();
    }
}

//every time hit, push card into array
//map or do a for loop on every card in the array, 
//then check if 2-6, count++
//return count

function countCard( cards ){
    console.log('cards', cards)
    console.log("count card is being read")
    let msg = '';

    for ( let i = 0; i < cards.length; i++ ) {
        // if( cards[i].Value === ( '2' || '3' || '4' || '5' || '6' )) {
        //     count++
        //     console.log('count', count)
        // } else if ( cards[i].Value === ( '7' || '8' || '9' )) {
        //     count = count
        //     console.log('count', count)
        // } else if ( cards[i].Value === ( '10' || "J" || "Q" || "K" || "A" ) ) {
        //     count--
        //     console.log('count', count)
        // }
        if( 1 < cards[i].Weight && cards[i].Weight < 7) {
            count++

        } else if ( 6 < cards[i].Weight && cards[i].Weight < 10) {
            count = count

        } else if ( 9 < cards[i].Weight  && cards[i].Weight < 12 ) {
            count--

        }
    }
    
    // switch (cards ){
    //     case 2:
    //     case 3:
    //     case 4:
    //     case 5:
    //     case 6:
    //         count++
    //     case 7: 
    //     case 8: 
    //     case 9: 
    //         count = count;
    //     case 10:
    //     case "J":
    //     case "Q":
    //     case "K":
    //     case "A":
    //         count--;
    //         break;

    // }
    console.log( 'count', count );

    if(count > 0 ) msg = `${count} (Bet)`;
    else if (count === 0) msg = `${count} (Hold)`;
    else if (count < 0 ) msg = `${count} (Hold)`;
    // else if (count === -1) msg = "-1 (Hold)";
    // else if (count === 1) msg = "1 (Bet)";
    
    document.getElementById('countCardMsg').innerHTML=`${msg}`;
    return msg;
    // attatch it to the game // 
}