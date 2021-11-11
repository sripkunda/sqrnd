// Game Properties 

const Game = {
    Player: {
        pos: {
            x: 0, 
            y: 0
        },
        value: 0,
        tiles: 0,
    },
    State: {
        tileValues: {
            0: {
                0: 0
            }
        },
        state: 0,
        time: 0,
    },
    Graphics: {
        playerWidth: 50, 
        playerHeight: 50,
        playerX: 0, 
        playerY: 0,
        randomStartX: Math.random() * window.innerWidth * 0.6, 
        randomStartY: Math.random() * window.innerHeight * 0.6, 
        playerStep: 50,
        easing: 0.3,
        frameRate: 30,
		Colors: {
			background: [10, 10, 10],
			player: [255, 255, 255],
			originTile: [150, 150, 150], 
			targetTile: [150, 150, 150],
			visitedTile: [50, 50, 50], 
		}
    },
    Rules: {
        lowerValueBound: 0, 
        upperValueBound: 200,
        incrementAmount: -5,
    }
}

const controls = {
    UP: {
        keys: [38, 87], 
        action: () => {move(() => {
            Game.Player.pos.y += 1
        })}
    },
    DOWN: {
        keys: [40, 83], 
        action: () => {move(() => { 
            Game.Player.pos.y -= 1
        })}
    },
    LEFT: {
        keys: [37, 65],
        action: () => {move(() => {
            Game.Player.pos.x -= 1
        })}
    },
    RIGHT: {
        keys: [39, 68],
        action: () => {move(() => {
            Game.Player.pos.x += 1
        })}
    }
};

const keyHandler = (key) => {
    Object.keys(controls).forEach(k => {
        if (controls[k].keys.indexOf(key.keyCode) > -1) controls[k].action();
    });
};

// Game Mechanics 

function move(act) {
    if (Game.State.state > 0) return; 
    act(); 
    const pos = Game.Player.pos;
    if (!Game.State.tileValues[pos.x]) Game.State.tileValues[pos.x] = {};
    const inc = Game.State.tileValues[pos.x][pos.y] !== undefined ? Game.State.tileValues[pos.x][pos.y] * Game.Rules.incrementAmount : Math.floor(Math.random() * 10);
    Game.State.tileValues[pos.x][pos.y] = inc; 
    Game.Player.value += inc;
    loseSequence();
}

// Game Events

document.onkeydown = keyHandler;

// Graphics

const getX = (n) => {
    return ((n || Game.Player.pos.x) * Game.Graphics.playerStep) + Game.Graphics.randomStartX;
}

const getY = (n) => {
    return (- 1 * (n || Game.Player.pos.y) * Game.Graphics.playerStep) + Game.Graphics.randomStartY;
}

function setup() {
    createCanvas(displayWidth, displayHeight);   
    frameRate(Game.Graphics.frameRate);
    Game.Graphics.playerX = getX(); 
    Game.Graphics.playerY = getY(); 
} 

function draw() {

	const colors = Game.Graphics.Colors; 

    background(...colors.background);     
    noStroke(0);

    Game.Player.tiles = 0; 

    Object.keys(Game.State.tileValues).forEach(x => {
        Object.keys(Game.State.tileValues[x]).forEach(y => {
			const c = x == 0 && y == 0 ? color(...colors.originTile) : color(...colors.visitedTile);
            fill(c)
            rect(getX(x), getY(y), Game.Graphics.playerHeight, Game.Graphics.playerWidth);
            Game.Player.tiles++; 
        }); 
    });

    // Capture target values
    const targetX = getX(); 
    const targetY = getY();

    fill(color(...colors.targetTile))
    rect(targetX, targetY, Game.Graphics.playerWidth, Game.Graphics.playerHeight);

    const dx = targetX - Game.Graphics.playerX; 
    const dy = targetY - Game.Graphics.playerY;

    Game.Graphics.playerX += dx * Game.Graphics.easing; 
    Game.Graphics.playerY += dy * Game.Graphics.easing; 

    fill(color(...colors.player));
    rect(Game.Graphics.playerX, Game.Graphics.playerY, Game.Graphics.playerWidth, Game.Graphics.playerHeight);
    textSize(30);
    text(Game.Player.value, Game.Graphics.playerX, Game.Graphics.playerY);

    text(`Score: ${Game.Player.tiles}`, 50, 50);
    text(`Time: ${Math.floor(Game.State.time / 100)}${Game.State.state > 0 ? " (YOU LOST)" : ""}` , 50, 100);
    
    Game.State.time += Game.State.state < 1 ? deltaTime : 0;
}

function loseSequence() {
    if (Game.Player.value < Game.Rules.lowerValueBound || Game.Player.value > Game.Rules.upperValueBound)
        Game.State.state = 1; 
}
