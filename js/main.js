/**
 * Space Invaders
 * 
 * by: https://github.com/granaz
 */

const keyLeft = 37;
const keyRight = 39;
const keySpace = 32;

var gameState = "stopped";

function TheGame() {
    // change the gameState
    gameState = "running";

    // Initiliase all the configs...
    this.configs = {
        lives: 5,
        level: 1,
        laserSpeed: 1,
        bombSpeed: 1,
        invadersSpeed: 10,
        shipSpeed: 10,
        numberOfInvaders: 20
    }

    // Create the element Ship;
    let ship = new Ship(50, 100);

    // Create all the invaders;
    let arrayOfInvaders = [];
    let row = 4,
        column = 25; // in %;

    for (let i = 1; i <= this.configs.numberOfInvaders; i++) {
        arrayOfInvaders.push(new Invader(column, row));

        // Changing the column;
        if (column == 70) {
            column = 25;
        } else {
            column += 5;
        }

        // Changing the row;
        if ((i % 10) === 0) row += 5;
    }

    this.moveShip = function (direction) {
        ship.move(direction);        
    }
}

/** 
 * 
 * Elements, all that appears in the screen is a element.
 * All the positions are in %;
 *
 */

/**
 * The Ship has 2 positions;
 * @param {integer} x 
 * @param {integer} y 
 */
function Ship(x, y) {
    // Current invader position;
    this.currentX = x;
    this.currentY = y;

    // Render the Ship on the Screen;
    this.render = (x, y) => {
        let spanHtml = "<span class='block shipBlock' style='top: calc(" + y + "% - 25px); left: calc(" + x + "% - 20px);'></span>";
        $("#game").append(spanHtml);
    }

    // Moving the Ship;
    this.move = (direction) => {
        // It must move the ship until the edge of the map;
        

        if (direction == keyRight) {
            $(".shipBlock").css("left", (this.currentX + 1)+"%").css("left", "-=20px");
            this.currentX += 1;
        }else if(direction == keyLeft){
            $(".shipBlock").css("left", (this.currentX - 1)+"%").css("left", "-=20px");
            this.currentX -= 1;
        }
    }

    // Fires the Ship Laser
    this.fire = () => {

    }

    // Render the first time...
    this.render(x, y);
}

/**
 * Invaders have 2 positions and a level;
 * @param {integer} x 
 * @param {integer} y 
 */
function Invader(x, y) {
    // Current invader position;
    this.currentX = x;
    this.currentY = y;

    this.render = (x, y) => {
        let spanHtml = "<span class='block invaderBlock' style='top: calc(" + y + "%); left: calc(" + x + "%);'></span>";
        $("#game").append(spanHtml);
    }

    this.fire = () => {

    }

    // First Render...
    this.render(x, y);
}

/**
 * The Ship fires Lasers, it has 2 positions and speed;
 * @param {integer} x 
 * @param {integer} y 
 */
function Laser(x, y) {

}

/**
 * The Invaders fires Bombs, it has 2 positions and speed;
 * @param {integer} x 
 * @param {integer} y 
 */
function Bomb(x, y) {

}