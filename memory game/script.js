const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

// Items
const items = [
    { name: "", image: "blueshell.png"  },
    { name: "", image: "bobomb.png" },
    { name: "", image: "bulletbill.png" },
    { name: "", image: "coin.png" },
    { name: "", image: "goomba.png" },
    { name: "", image: "luigi.png" },
    { name: "", image: "mario.png" },
    { name: "", image: "mushroom.png" },
    { name: "", image: "peach.png" },
    { name: "", image: "question.png" },
    { name: "", image: "star.png" },
    { name: "", image: "thwomp.png" },
  ];
  
  //Initialisation Timer
  let seconds = 0,
  minutes = 0;

  // INitialisation conteur moves  and win 

  let movesCount = 0 ,
     winCount = 0;
  
/// Timer 
const timeGenerator = () => {
    seconds += 1;
    //minutes logic
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
   //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};


setInterval(timeGenerator, 1000);

//For calculating moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
  };

  //Pick random objects from the items array
const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist
    size = (size * size) / 2;
    //Random object selection
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      //once selected remove the object from temp array
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
  };

  const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        /*
            Create Cards
            before => front side (contains question mark)
            after => back side (contains actual image);
            data-card-values is a custom attribute which stores the names of the cards to match later
          */
        gameContainer.innerHTML += `
         <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
            <img src="${cardValues[i].image}" class="image" style="width: 70px; height: 100px"/></div>
         </div>
         `;
      }
      //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
    }
  


  //Initialize values and func calls
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);

  };
  initializer();