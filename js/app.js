var isGameOver;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

var Character = function() {
    'use strict';
    this.reset();
};

Character.prototype.render = function() {
    'use strict';
    if(isGameOver) {
        enemy.reset();
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function Enemy() {
    Character.call(this);
    this.sprite = 'images/enemy-bug.png';
}

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.reset = function() {
    'use strict';
    this.col = -2;
    this.row = getRandomIntInclusive(1, 3);
    this.x = TILE_WIDTH * this.col;
    this.y = TILE_HEIGHT * this.row;
    this.speed = getRandomIntInclusive(1, 6);
};

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

function Player() {
    Character.call(this);
    this.sprite = 'images/char-boy.png';
    this.moveable = true;
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.moveable) {
        this.x = TILE_WIDTH * this.col;
        this.y = TILE_HEIGHT * this.row;
    }
    if (this.y < TILE_HEIGHT && this.moveable) {
        this.moveable = false;
        return true;
    }
};

Player.prototype.render = function() {
    if(isGameOver) {
        document.getElementById('game-over').style.display = 'none';//I added
        document.getElementById('game-over-overlay').style.display = 'none';//I added
    }
    if (this.y <= TILE_HEIGHT) {
        gameOver();
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.col = 2;
    this.row = 5;
    this.x = TILE_WIDTH * this.col;
    this.y = TILE_HEIGHT * this.row;
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
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
}

function getRandomIntInclusive(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}
