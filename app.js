// game values
let min=1,max=10,winningNum=getWinningNum(min,max),guessesLeft=3;

//ui elements
const game=document.getElementById('game'),minNum=document.querySelector('.min-num'),maxNum=document.querySelector('.max-num'),guessBtn=document.querySelector('#guess-btn');
const guessInput=document.querySelector('#guess-input'),message=document.querySelector('.message');

//assign ui min and max
minNum.textContent=min;
maxNum.textContent=max;

//play again event listener
game.addEventListener('mousedown',function(e){
    if(e.target.className==='play-again'){
        window.location.reload();
    }
})

//listen for guess
guessBtn.addEventListener('click',function(){
    let guess=parseInt(guessInput.value);

    //validate
    if(isNaN(guess) || guess<=min || guess>=max){
        setMessage(`please enter a number between ${min} and ${max}.`,'red');
    }

    //check if 1
    if(guess===winningNum){
        //disable input
        guessInput.disabled=true;
        //change border color
        guessInput.style.borderColor='green';
        //set message
        setMessage(`${winningNum} is correct! You WIN!`,'green');
        gameOver();
    }else{
        //wrong number
        guessesLeft-=1;
        if(guessesLeft===0){
            //game over - lost
            //disable input
            guessInput.disabled=true;
            //change border color
            guessInput.style.borderColor='red';
            //set message
            setMessage(`Game over you lost, the correct number was ${winningNum}.`,'red');
            gameOver();
        }else{
            //game continues answer is wrong
            guessInput.style.borderColor='red';
            guessInput.value='';
            setMessage(`Guess is incorrect.Guesses left = ${guessesLeft}`,'red');
        }
    }
})

//game over
function gameOver(){
    guessBtn.value='Play Again';
    guessBtn.className+='play-again';
}

//set message
function setMessage(msg,color){
    message.style.color=color;
    message.textContent=msg;
}

//get winning number
function getWinningNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}