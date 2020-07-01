let lifeNum = 3;

//superclass
class mainGame {

    constructor(x, y){
    // Variables applied to each of our instances go here,
        this.x = x;  
        this.y = y;
    }

    // Draw the enemy on the screen, required method for game   
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends mainGame {
    
    constructor(x, y, speed) {
        
        super(x, y, speed);
        this.speed = speed;     
            
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x <= 707) {
            this.x += this.speed * dt;
        } else {
            this.x = -101;
        }
        
        //handle collision enemy with player with pythagoras theorem  
        let xAxis = player.x - this.x;
        let yAxis = player.y - this.y;   

        let distance = Math.sqrt( xAxis*xAxis + yAxis*yAxis);
        if (Math.round(distance) <= 60) {
            player.x = 303;
            player.y = 373.5;
            lifeNum = lifeNum - 1;

            calculateLives(lifeNum);
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends mainGame {

    constructor(x,y) {
        
        super(x,y);

        //load the image
        this.sprite = 'images/char-boy.png';                
    }

    update() {
        //set player to initial position when he reach the grass
        if (this.y == -41.5){
            this.x = 303;
            this.y = 373.5 ;       

            increaseScore();        

            levelUp();
        }
    }

    handleInput(key) {
        if (key === 'left' && player.x > 0) {
            this.x = this.x - 101;
        } else if (key === 'right' && player.x < 606) {
            this.x = this.x + 101;
        } else if (key === 'up' && player.y > -41.5) {
            this.y = this.y - 83;
        } else if (key === 'down' && player.y < 373.5) {
            this.y =this.y + 83;      
        }          
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy = new Enemy(0, 48, 150);
const enemy1 = new Enemy(0, 131, 200);
const enemy2 = new Enemy(0, 214, 250);
const enemy3 = new Enemy(101, 131, 300);
const enemy4 = new Enemy(101, 48, 350);

let allEnemies = [ enemy, enemy1, enemy2, enemy3, enemy4 ];

const player = new Player(303, 373.5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
let allowedKeys;
document.addEventListener('keyup', keyupListener);

function keyupListener(e) {
    allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

//play again button
document.getElementById("button").addEventListener('click', function(){
    //close modal
    toggleModal();

    //set player at initial position
    player.x = 303;
    player.y = 373.5;

    //set speed for enemies
    for (let i = 0; i < allEnemies.length; i++){
        allEnemies[0].speed = 150;
        allEnemies[1].speed = 200;
        allEnemies[2].speed = 250;
        allEnemies[3].speed = 300;
        allEnemies[4].speed = 350;
    }
    //set player move
    document.addEventListener('keyup', keyupListener);     

    //reset score panel
    resetScorePanel();

});

function calculateLives(num){
    //lose a life
    if (lifeNum == 2){
        document.getElementById("no3").style.display = "none";
    }
    if (lifeNum == 1){
        document.getElementById("no2").style.display = "none";
    }   

    //losing the last life
    if (lifeNum <= 0){
        document.getElementById("no1").style.display = "none";
        
        //modal appears
        toggleModal();
        document.getElementById("modal").querySelector("p").innerHTML = "Your score was " + scoreCounter + " points";
        
        //enemies stop moving
        for (let i = 0; i < allEnemies.length; i++){
            allEnemies[i].speed = 0;
        } 

        //player stops moving
        document.removeEventListener('keyup', keyupListener);                       
    }         
}

function toggleModal() {
  const modal = document.getElementById("modal");

  if (modal.style.visibility == "visible") {
    modal.style.visibility = "hidden";
  } else {
    modal.style.visibility = "visible";
  }
}

function resetScorePanel(){
    scoreCounter = 0;
    lifeNum = 3;
    level = 1;

    scoreDisplay.innerHTML = scoreCounter;
    levelDisplay.innerHTML = 1;

    document.getElementById("no3").style.display = "inline-block";
    document.getElementById("no2").style.display = "inline-block";
    document.getElementById("no1").style.display = "inline-block";
}

let scoreCounter = 0;
const scoreDisplay = document.getElementById("score-counter");
function increaseScore(){
    scoreCounter = scoreCounter + 1000;
    scoreDisplay.innerHTML = scoreCounter;
}

let level = 1;
const levelDisplay = document.getElementById("level-counter");
function levelUp(){
    if (scoreCounter % 2 === 0){
        //update level
        level += 1;
        levelDisplay.innerHTML = level;
        //increase speed 
        for (let i = 0; i < allEnemies.length; i++){
            allEnemies[i].speed = allEnemies[i].speed + 100;
        } 
    }
}