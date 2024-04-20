const cards = document.querySelectorAll(".card");

var hasFlipped = false;
var lockBoard = false;
var firstCard, secondCard;
var matchedCards = 0;
const resetButton = document.getElementById("resetButton");

function flip() {
    if (lockBoard || this === firstCard) return;
    
    this.classList.toggle("flip");

    if (!hasFlipped) {
        // First click
        hasFlipped = true;
        firstCard = this;
    } else {
        // Second click
        secondCard = this;
        matchCheck();
    }
}

function matchCheck() {
    lockBoard = true; 
    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();
        matchedCards += 2;
        if (matchedCards === cards.length) {
            displayVictoryMsg();
        }
    } else {
        setTimeout(() => {
            unflipCards();
        }, 1000);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    resetBoard();
}

function unflipCards() {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
}

function shuffle() {
    cards.forEach(card => {
        var randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
};

function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function displayVictoryMsg() {
    setTimeout(() => {
        alert("Congratulations! You've matched all the cards!");
    }, 1000);
}

function resetGame() {
    setTimeout(()=>{
        shuffle();
    },500)
    cards.forEach(card => {
        card.classList.remove("flip");
    });
    cards.forEach(card => {
        card.addEventListener("click", flip);
    });
    matchedCards = 0;
    resetBoard();
    
    
    
}

cards.forEach(card => card.addEventListener('click', flip));
resetButton.addEventListener('click', resetGame);

document.addEventListener("DOMContentLoaded", function() {
    shuffle(); 
});


