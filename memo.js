class AudioController {
  constructor() {
    this.bgMusic = new Audio(music);
    this.flipSound = new Audio("audio/click.mp3");
    this.matchSound = new Audio("audio/pareja.mp3");
    this.victorySound = new Audio("audio/victory.mp3");
    this.gameOverSound = new Audio("audio/game-over.mp3");
    this.bgMusic.volume = 0.4;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
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
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
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
      this.shuffleCards(this.cardsArray);
      this.countdown = this.startCountdown();
      this.busy = false;
    }, 100);
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }
  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }
  flipCard(card) {
    if (this.canFlipCard(card)) {
      this.audioController.flip();
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add("visible");

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }
  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck))
      this.cardMatch(card, this.cardToCheck);
    else this.cardMismatch(card, this.cardToCheck);

    this.cardToCheck = null;
  }
  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add("matched");
    card2.classList.add("matched");
    this.audioController.match();
    if (this.matchedCards.length === this.cardsArray.length) this.victory();
  }
  cardMismatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
    }, 500);
  }
  getCardType(card) {
    return card.getElementsByClassName("figure")[0].src;
  }
  startCountdown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining == 0) this.gameOver();
    }, 1000);
  }
  gameOver() {
    clearInterval(this.countdown);
    this.audioController.gameOver();
    finish("Game over");
  }
  victory() {
    clearInterval(this.countdown);
    this.audioController.victory();
    finish("Has ganado");
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }

  shuffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const randIndex = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[randIndex]] = [
        cardsArray[randIndex],
        cardsArray[i],
      ];
    }
    cardsArray = cardsArray.map((card, index) => {
      card.style.order = index;
    });
  }
}

function finish(cadena) {
  document.getElementById("game-over-text").classList.add("visible");
  document.getElementById("texto-final").textContent = cadena;
}

function ready() {
  let empezar = document.getElementById("empezar");
  let renove = document.getElementById("renove");
  let rellamar = document.getElementById("rellamar");
  let cards = Array.from(document.getElementsByClassName("card"));
  let game = new MixOrMatch(90, cards);

  empezar.addEventListener("click", () => {
    empezar.remove("visible");
    game.startGame();
  });

  renove.addEventListener("click", () => {
    empezar.remove("visible");
    game.startGame();
  });

  rellamar.addEventListener("click", () => {
    location.reload();
  });
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.flipCard(card);
    });
  });
}
