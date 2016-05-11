var isGameOver;

// Enemies our player must avoid
var Enemy = function() {
    'use strict';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.reset = function() {
    'use strict';
    this.col = -2;
    this.row = getRandomIntInclusive(1, 3);
    this.x = 101 * this.col;
    this.y = 83 * this.row;
    this.speed = getRandomIntInclusive(1, 6);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    'use strict';
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.speed);
    //console.log(this.x);
    this.y = 83 * this.row;

    if (this.x > 505) {
        this.reset();
    }
    if (player.row === this.row && this.x + 101 > player.x) {
        player.reset();
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    'use strict';
    // Reset the enemy if the game is over
    //if(isGameOver) {
    //    enemy.reset();
    //}
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    'use strict';
    this.reset();
    this.sprite = 'images/char-boy.png';
    this.moveable = true;
};

Player.prototype.update = function() {
    if (this.moveable) {
        this.x = 101 * this.col;
        this.y = 83 * this.row;
    }
    if (this.y < 83 && this.moveable) {
        this.moveable = false;
        return true;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    // Reset the player if the game is over
    //if(isGameOver) {
      //  player.reset();
    if (this.y <= 83) {
        gameOver();
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.col = 2;
    this.row = 5;
    this.x = 101 * this.col;
    this.y = 83 * this.row;
    this.moveable = true;
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
            this.col--;
            break;
        case "up":
            this.row--;
            break;
        case "right":
            this.col++;
            break;
        case "down":
            this.row++;
            break;
    }
    if (this.col < 0) this.col = 0;
    if (this.col > 4) this.col = 4;
    if (this.row > 5) this.row = 5;
    //Player wins the game reset
    //if (this.row <= 0) this.reset;
    if (this.row <= 0) this.reset;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Game over
function gameOver() {
    //player.reset();
    //enemy.reset();
    document.getElementById('game-over').style.display = 'block';//block;
    document.getElementById('game-over-overlay').style.display = 'block';//block;
    //isGameOver = true;
    //reset();
}

//This function is used to generate x and y coordinates between
// 0 and 1 with a noneven distribution.
function getRandomIntInclusive(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
};
