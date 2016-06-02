//This file works with the index.html, the engine.js and the resource.js files. The purpose of this file
//is to construct a game where the character dodges enemies and tries to get to the finish line. This was
//written by Jim Barry on 6/2/2016. I wrote this for a project in the nanodegree program with Udacity.
"use strict";
var isGameOver;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

//This sets up the Character to use with inheritance
var Character = function() {
    'use strict';
    this.reset();
};

//This can be used by both the player and enemies
Character.prototype.render = function() {
    'use strict';
    if(isGameOver) {
        enemy.reset();
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This sets us the enemy - inheriting frome the Character
function Enemy() {
    'use strict';
    Character.call(this);
    this.sprite = 'images/enemy-bug.png';
}

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.constructor = Enemy;

//This resets the enemy when needed
Enemy.prototype.reset = function() {
    'use strict';
    this.col = -2;
    this.row = getRandomIntInclusive(1, 3);
    this.x = TILE_WIDTH * this.col;
    this.y = TILE_HEIGHT * this.row;
    this.speed = getRandomIntInclusive(1, 6);
};

//This updates the enemy on a continuous basis
Enemy.prototype.update = function(dt) {
    'use strict';
    this.x = (this.x + this.speed);
    this.y = 77 * this.row;

    if (this.x > 505) {
        this.reset();
    }
    if (player.row === this.row && (player.x >= this.x && player.x <= (this.x + TILE_WIDTH))) {
        player.reset();
        this.reset();
    }
};

//This sets us the player - inheriting frome the Character
function Player() {
    'use strict';
    Character.call(this);
    this.sprite = 'images/char-boy.png';
    this.moveable = true;
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

//This updates the enemy on a continuous basis
Player.prototype.update = function() {
    'use strict';
    if (this.moveable) {
        this.x = TILE_WIDTH * this.col;
        this.y = TILE_HEIGHT * this.row;
    }
    if (this.y < TILE_HEIGHT && this.moveable) {
        this.moveable = false;
        return true;
    }
};

//This overwrites the render function from the Character
Player.prototype.render = function() {
    'use strict';
    if(isGameOver) {
        document.getElementById('game-over').style.display = 'none';//I added
        document.getElementById('game-over-overlay').style.display = 'none';//I added
    }
    if (this.y <= TILE_HEIGHT) {
        gameOver();
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This resets the player when needed
Player.prototype.reset = function() {
    'use strict';
    this.col = 2;
    this.row = 5;
    this.x = TILE_WIDTH * this.col;
    this.y = TILE_HEIGHT * this.row;
    this.moveable = true;
};

//This handles the keyboard input
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
    if (this.row <= 0) {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('game-over-overlay').style.display = 'none';
    }
};

var allEnemies = [];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();

document.addEventListener('keyup', function(e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//This happens when the game is over
function gameOver() {
    'use strict';
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
}

//Used to obtain random numbers in other functions
function getRandomIntInclusive(min, max) {
    'use strict';
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}