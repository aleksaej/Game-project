const cards = document.querySelectorAll('.memory-card');

let flippedCards = false;
let boardlocked = false;
let firstCard, secondCard;
let matchedCards = 0; 
const flipCard = e => {
    if (boardlocked) return;
    const target = e.target.parentElement;

    if (target === firstCard) return;

    target.classList.add('flip');

    console.log(target.dataset.animal);

    if (!flippedCards) {
        flippedCards = true;
        firstCard = target;
    } else {
        flippedCards = false;
        secondCard = target;
        chekForMatch();
    }
};

const chekForMatch = () => {
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        disableCards();
        matchedCards += 2; 
        if (matchedCards === cards.length) {
            setTimeout(() => {
                alert("Good game");
                resetGame();
            }, 1000);
        }
    } else {
        unflipCards();
    }
};

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};

const unflipCards = () => {
    boardlocked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
};

const resetBoard = () => {
    [flippedCards, boardlocked] = [false, false];
    [firstCard, secondCard] = [null, null];
};

cards.forEach(card => {
    card.addEventListener('click', flipCard);
    const random = Math.floor(Math.random() * cards.length);
    card.style.order = random;
});

const restartGame = () => {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    setTimeout(() => {
        cards.forEach(card => card.style.order = Math.floor(Math.random() * cards.length));
    }, 1000);

    resetBoard();
    matchedCards = 0; 
};
