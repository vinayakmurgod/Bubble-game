var randomHitValue = 0;
var timer = 60;
var score = 0;
var highScore = 0;

var scoreList = JSON.parse(localStorage.getItem("scores"));

// get scores list from localStorage
if (!scoreList) {
  scoreList = [];
}

// get panel body
const pbody = document.getElementsByClassName("pbody")[0];

// play game
pbody.onclick = (bubble) => {
  bubbleValue = Number(bubble.target.innerText);
  if (randomHitValue === bubbleValue) {
    increaseScore();
    getNewHit();
    makeBubbles();
  } else {
    if (score > 0) {
      decreaseScore();
      getNewHit();
      makeBubbles();
    }
  }
};

// Hit
const getNewHit = () => {
  //   Get timer value
  const hitValue = document.getElementById("#hitValue");
  //   genarate random number
  randomHitValue = Math.floor(Math.random() * 25);

  hitValue.innerHTML = randomHitValue;
};

// Timer
const startTimer = () => {
  //   Get timer value
  const timervalue = document.getElementById("#timerValue");

  const timerInt = setInterval(() => {
    if (timer > 0) {
      timer--;
      timervalue.innerHTML = timer;
    } else {
      clearInterval(timerInt);
      // push score into scorelist
      scoreList.push(score);
      // add score list into localStorage
      localStorage.setItem("scores", JSON.stringify(scoreList));
      // find high score from score list
      const highScore = Math.max(...scoreList);
      // add score list into localStorage
      localStorage.setItem("highscore", JSON.stringify(highScore));

      // show game over with high score
      pbody.innerHTML = `<div><h3 style='color:#264926'>Game Over</h3></br><h1 style='color:#264926'>High score  ${highScore}</h1><br><button class="btn">Play again</button></div>`;

      // restart game
      const restart = document.getElementsByClassName("btn")[0];
      restart.onclick = () => location.reload();
    }
  }, 1000);
};

// highscore

const gethighScore = (newscore) => {
  highScore = JSON.parse(localStorage.getItem("highscore"));

  // get high score from localStorage
  if (!highScore) {
    highScore = 0;
  }

  const highscoreValue = document.getElementById("#highScoreValue");
  highscoreValue.innerText = highScore;
};

// bubbles
const makeBubbles = () => {
  // create bubble div loop with random numbers
  var clutter = "";
  for (let i = 1; i <= 120; i++) {
    let randomNum = Math.floor(Math.random() * 25);
    clutter += `<div class="bubble">${randomNum}</div>`;
    //   console.log(randomNum);
  }
  // append bubble div
  pbody.innerHTML = clutter;
};

//score
const increaseScore = () => {
  score += 10;
  const scoreValue = document.getElementById("#scoreValue");
  scoreValue.innerText = score;
};

const decreaseScore = () => {
  score -= 10;
  const scoreValue = document.getElementById("#scoreValue");
  scoreValue.innerText = score;
};

getNewHit();
startTimer();
gethighScore();
makeBubbles();
