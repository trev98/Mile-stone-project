class AudioController {
    constructor() {
        this.backGroundMusic = new Audio('assets/audio/Simple .mp3');
        this.matchSound = new Audio('assets/audio/cracking-a-cold-one-43752.mp3');
        this.flipSound = new Audio('assets/audio/whoosh-6316.mp3');
        this.victorySound = new Audio('assets/audio/shakuhachi-stretching-25-41799.mp3');
        this.gameOverSound = new Audio('assets/audio/bonk-sound-effect-36055.mp3');
        this.backGroundMusic.volume = 0.5;
        this.backGroundMusic.loop = true;
    }
        startMusic() {
            this.backGroundMusic.play();
        }

        stopMusic() {
            this.backGroundMusic.pause();
            this.backGroundMusic.currentTime = 0;
        }
        flip() {
            this.flipSound.play();
        }
        match() {
            this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
this.timeRemaining = totalTime;
this.timer = document.getElementById('time-remaining');
this.ticker = document.getElementById('flips');
this.audioController = new AudioController();
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards(){
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card) {
 if(this.canFlipCard(card)) {
    this.audioController.flip();
    this.totalClicks++;
    this.ticker.innerText = this.totalClicks;
    card.classList.add('visible');

    if(this.cardToCheck)
    this.checkForCardMatch(card);
    else
    this.cardToCheck = card;
}
    }
checkForCardMatch(card) {
    if(this.getCardType(card) === this.getCardType(this.cardToCheck))
    this.cardMatch(card, this.cardToCheck);
    else
    this.cardMisMatch(card, this.cardToCheck);

    this.cardToCheck = null;
}
cardMatch(card1, card2) {
this.matchedCards.push(card1);
this.matchedCards.push(card2);
card1.classList.add('matched');
card2.classList.add('matched');
this.audioController.match();
if(this.matchedCards.length === this.cardsArray.length)
this.victory();
}

cardMisMatch(card1, card2) {
this.busy = true;
setTimeout(() => {
    card1.classList.remove('visible');
    card2.classList.remove('visible');
    this.busy = false;
}, 1000);
}

getCardType(card) {
        return card.getElementsByClassName('card-word')[0].src;
}
    
startCountDown() {
    return setInterval(() => {
this.timeRemaining--;
this.timer.innerText = this.timeRemaining;
if(this.timeRemaining === 0)
this.gameOver();
    }, 1000);
}
gameOver() {
    clearInterval(this.countDown);
    this.audioController.gameOver();
    document.getElementById('game-over-text').classList.add('visible');
}

victory() {
    clearInterval(this.countDown);
    this.audioController.victory();
    document.getElementById('victory-text').classList.add('visible');
}

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
let rndmIndex = Math.floor(Math.random() * (i+1));
this.cardsArray[rndmIndex].style.order = i;
this.cardsArray[i].style.order = rndmIndex;
        }
    } 
//All 3 statements are false which will return true. If the statement is true, card will flip. Boolean
    canFlipCard(card) {
        return!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}   
function ready() { 
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(120, cards);
    //initialize the game
overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        overlay.classList.remove('visible');
        game.startGame();
    });
});

cards.forEach(card => {
    card.addEventListener('click', () => {
game.flipCard(card);
    });
});
}

if(document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}



