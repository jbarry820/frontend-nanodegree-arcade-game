var isGameOver;

var Character = function() {
    'use strict';
    this.reset();
};

var Enemy = function(){
    this.sprite = 'images/enemy-bug.png';
}

Enemy.prototype = new Character();
function Enemy()

//Enemy = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;
//Enemy.sprite = 'images/enemy-bug.png';
Enemy.prototype.sprite = function() {
    this.sprite = 'images/enemy-bug.png';
}

Enemy.prototype.reset = function() {
    'use strict';
    this.col = -2;
    this.row = getRandomIntInclusive(1, 3);
    this.x = 101 * this.col;
    this.y = 83 * this.row;
    this.speed = getRandomIntInclusive(1, 6);
};

Enemy.prototype.update = function(dt) {
    'use strict';
    this.x = (this.x + this.speed);
    this.y = 83 * this.row;

    if (this.x > 505) {
        this.reset();
    }
    if (player.row === this.row && this.x + 101 > player.x) {
    if (player.row === this.row && (player.x >= this.x && player.x <= (this.x + 101))) {
        console.log(this.x, player.x);
        player.reset();
        this.reset();
    }
};

Enemy.prototype.render = function() {
    //'use strict';
    console.log(this.sprite);
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(){
    this.sprite = 'images/char-boy.png';
}

Player.prototype = new Character();
function Player()

Player.prototype.constructor = Player;

//Player.prototype = Object.create(Character.prototype);
//Player.prototype.constructor = Player;
Player.prototype.sprite = function() {
    this.sprite = 'images/char-boy.png';
};

Player.moveable = true;

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

Player.prototype.render = function() {
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

    if (this.row <= 0) this.reset();
};

var allEnemies = [];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
};

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
    document.getElementById('game-over').style.display = 'block';//block;
    document.getElementById('game-over-overlay').style.display = 'block';//block;
}

function getRandomIntInclusive(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
};
