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
    Events: {
        playerPositionUpdate: new Event("PlayerPositionUpdate"),
        gameStateUpdate: new Event("GameStateUpdate")
    },
    State: {
        tileValues: {
            0: {
                0: 0
            }
        },
        lose: (value) => {
            value = value || Game.Player.value;
            this.state = value < 10 || value > 10 ? (dispatchEvent("GameStateUpdate"), 1) : 0; 
        },
        state: 0
    },
    Graphics: {
        playerWidth: 50, 
        playerHeight: 50,
        grid: [10, 10]
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
    let inc = 0; 
    if (Game.State.tileValues[pos.x][pos.y] !== undefined) {
        inc = Game.State.tileValues[pos.x][pos.y] * -2;
    } else {
        inc = Math.floor(Math.random() * 10);
    }
    // const inc = Game.State.tileValues[pos.x][pos.y] ? Game.State.tileValues[pos.x][pos.y] * -2 : Math.floor(Math.random() * 10);
    Game.State.tileValues[pos.x][pos.y] = inc; 
    Game.Player.value += inc;
    dispatchEvent(Game.Events.playerPositionUpdate);
}

// Game Events

document.onkeyup = keyHandler;
document.addEventListener("PlayerPositionUpdate", () => { Game.State.lose();  });
document.addEventListener("GameStateUpdate", () => { return loseSequence() })

// Graphics

function setup() {
    createCanvas(displayWidth, displayHeight);        
} 

function draw() {
    background(250); 

    // Player
    fill(color(255, 0, 0));
    noStroke(0);
    rect(((displayWidth / 2) - (Game.Graphics.playerWidth / 2)) + Game.Player.pos.x * 50, ((displayHeight / 2) - (Game.Graphics.playerHeight / 2)) - Game.Player.pos.y * 50, Game.Graphics.playerWidth, Game.Graphics.playerHeight);
}

function movePlayer() {

}

function loseSequence() {
    
}
