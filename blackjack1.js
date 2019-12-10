
//gör en array med kort. 
let initialcards=[{value:1, symbol:'🂡'}, {value:2, symbol:'🂢'}, {value:3, symbol:'🂣'}, {value:4, symbol:'🂤'}
, {value:5, symbol:'🂥'},{value:6, symbol:'🂦'} , {value:7,symbol:'🂧'}, {value:8,symbol:'🂨'}
, {value:9,symbol:'🂩'}, {value:10, symbol:'🂪'}, {value:10,symbol:'🂫'}, {value:10,symbol:'🂭'}, {value:10,symbol:'🂮'}];

let cards = [];//tom array som 52 kort ska läggas i.

function makedeck(){
    cards=[];
    for(let i=0; i<4;i++) // array som loppar 4 gånger * 13 kort
    {

        for(let j=0; j<initialcards.length; j++)
        {

            cards.push(initialcards[j]);// på varje index i array, läggs ett kort in i cardsarray
        }

    }

   console.log(cards);

}

makedeck();

let deck=[];//ska innehålla blandade korten


function shuffleDeck()
{
let tmpDeck=[]; // tillfällig array för blandade kort.
    tmpDeck=cards.slice(0);
    let index;

    


    while(tmpDeck.length>0){
        index = Math.floor(Math.random() * tmpDeck.length);
        let c = tmpDeck.splice(index, 1);// plockar ut ett random kort varje gång
        deck.push(...c);// vi lägger till kortet vi plockat ut i deck arrayen.
        // loop som loopar igenom alla kort så länge det finns kort.
        

     
    };
    console.log(deck);
/*
    for(let i=0; i<deck.length; i++)
    {
        document.getElementById("output-area").innerHTML += ` ${deck[i].symbol}   `
    }
*/
    
}

    //shuffleDeck();


function drawCard(){
let storedcard=deck.shift(); // vi tar det första kortet i deckarrayen
    return storedcard;// functionen ska returnera det första kortet

}

//let card1=drawCard();
//let card2=drawCard();

//document.getElementById("output-area").innerHTML += ` ${card1.symbol} ${card2.symbol}   `


let dealer=[];
let player=[];

let outputArea=document.getElementById("output-area");
let winnerArea=document.getElementById("winner-area");
let newgame=document.getElementById("new-game-button");
let hit=document.getElementById("hit-button");
let stay=document.getElementById("stay-button");


let spelarepoäng=document.getElementById("spelarepoäng");//ny
let dealerpoäng=document.getElementById("dealerpoäng");
let playerScore;
let dealerScore;
hideGameButtons();








function showHand(hand, score)// 2 parametrar, vi kommer skicka in värden sedan med 
//antingen player eller dealer.

{
let cards="";

hand.forEach(function(value,index) {// player eller dealer går in med sina värden i loopen
    cards+=value.symbol;//kortena läggs till.
});

return `${cards} ${score}  <br/>`;//


}    

function dealintialCards(){
    //clearTable();

// vi lägger till två kort nedan.
    player.push(drawCard());
    player.push(drawCard());
    dealer.push(drawCard());
    dealer.push(drawCard());
    Calculte();
ShowHands();//sedan anropas showhands.
}

//dealintialCards();

function clearTable(){
    outputArea.innerHTML="";

}

function calculateHand(hand){

let score=0;

let resultcards=hand.find(card=>card.value===1)!==undefined;//metod för att ange att 
//ess = 1.

hand.forEach(function(card, index) {
    score+=card.value; //plussar på alla värden kortet har och läggs till score
});

if(resultcards&& score +10<=21){
   score+= 10; // om ess plus annat kort blir mindre än 21 ska ess anta 11 som värde.

}
console.log(resultcards, score);
return score;

};

function startNewGame(){
    showGameButtons();

    deck=[];// anger tomma decks för att tömma arrayen - annars byggs det bara på.
    player=[];
    dealer=[];
    winnerArea.innerHTML="";
clearTable();
shuffleDeck();
dealintialCards();


};

newgame.addEventListener("click",function(){
    startNewGame();//när man trycker på newgame - anropas startnewgame funktionen
    
    });

function Calculte()
{
    playerScore= calculateHand(player);
    dealerScore=calculateHand(dealer);
}
function ShowHands(stayed=false){
debugger;
    clearTable();

outputArea.innerHTML+= "dealer " + showHand(dealer, dealerScore) ;
    outputArea.innerHTML+= "player " + showHand(player, playerScore);

    

    let winner=determineWinner(stayed);
    winnerArea.innerHTML=winner;

    if(winner!=""){
        hideGameButtons();
    }
 }

 function dealAnotherCard(hand){

hand.push(drawCard()); // metod som kommer lägga till ett nytt kort till antingen
//dealer eller player.

 }
 
 hit.addEventListener("click", function(){
//klickevent för hit knappen.

dealAnotherCard(player);//kommer lägga till ett nytt kort för spelaren när man trycker
//på hit knappen.
Calculte();
ShowHands();

 } );

 stay.addEventListener("click", function(){
     
     hideGameButtons();
   // determineWinner(true);

    while(dealerScore<playerScore && playerScore<22 && dealerScore <22){
        dealAnotherCard(dealer);
        Calculte();
        //ShowHands(true);
    }
    ShowHands(true);
    
});

 function hasBlackJack(hand, score){//funnktion för att kolla om man får BJ.
//skickar in värden - player eller dealer.
if (hand.length== 2 && score==21 ){
return true;
}
};

function isBust(score){

if(score>21){
    return true; 
}

return false;
};



function determineWinner(stayed=false){
   
const dealerWins ="Dealer Wins!"
const playerWins="You Win!"
const draw="Draw"
let result = "";

if(isBust(playerScore)){
    
    result = dealerWins;
}
else if (isBust(dealerScore)){
    //spelarepoäng.innerHTML+="1";
    result =  playerWins;  
}
else if(dealer.length==5 && dealerScore<22){
    result =  dealerWins;
}
else if(dealerScore==playerScore && stayed){
    result =  draw;
}
else if(playerScore>dealerScore && stayed){
    //spelarepoäng.innerHTML+="1";
    result =  playerWins 
}
else if(dealerScore>playerScore && stayed){
    result =  dealerWins 
}
else{
    let dealerBJ=hasBlackJack(dealer, dealerScore);
    let playerBJ=hasBlackJack(player, playerScore);
    
    if(playerBJ && dealerBJ ==true){
        result =  draw;
    }
    if(playerBJ==true){
        
        result =  playerWins;
    }
    if(dealerBJ==true){
        result =  dealerWins;
    }
}

let count =0



if(result==playerWins){
   count ++;
   spelarepoäng.innerHTML+="|";
}
if(result==dealerWins){
    
    dealerpoäng.innerHTML+="|";
}
return result;

}




function showGameButtons(){

    newgame.style.display="none";
    hit.style.display="inline";
    stay.style.display="inline";



}
function hideGameButtons(){

    newgame.style.display="inline";
    hit.style.display="none";
    stay.style.display="none";



}




    
    
    
    
    
    
    
    
    
    
    










