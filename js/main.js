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
        laserSpeed: 10,
        bombSpeed: 10,
        invadersSpeed: 10,
        invadersDescendSpeed: 10,
        numberOfInvaders: 20,
        invadersContainer: 1
    }

    // Creating the elements;
    this.ship;
    this.arrayOfInvaders = [];

    this.createElements = () => {
        // Create the element Ship;
        this.ship = new Ship(50, 100);

        // Create all the invaders;        
        let row = 4; // in %;
        let column = 0; // in %;

        for (let i = 1; i <= this.configs.numberOfInvaders; i++) {
            this.arrayOfInvaders.push(new Invader(column, row, i));

            // Changing the column;
            if (column == 90) {
                column = 0;
            } else {
                column += 10;
            }

            // Changing the row;
            if ((i % 10) === 0) row += 5;
        }
    }

    this.moveInvaders = () => {
        // Direction to where the invaders are going: 1=right, 0=left;
        let invaders = $("#blockOfInvaders .invaderBlock");
        let direction = 1;
        let invadersDescendSpeed = this.configs.invadersDescendSpeed;

        setInterval(() => {
            if (direction == 1) {
                $("#blockOfInvaders").css("left", this.configs.invadersContainer + "%");
                this.configs.invadersContainer++;
            } else {
                $("#blockOfInvaders").css("left", this.configs.invadersContainer + "%");
                this.configs.invadersContainer--;
            }

            if (this.configs.invadersContainer == 26) {
                direction = 0;

                // Descend the invaders;
                descendInvaders();
            } else if (this.configs.invadersContainer == -25) {
                direction = 1;

                // Descend the invaders;
                descendInvaders();
            }
        }, this.configs.invadersSpeed * 10);

        function descendInvaders() {
            // Descend the invaders;
            for (let i = 0; i < invaders.length; i++) {
                let currentTop = parseFloat($(invaders[i]).css("top"));

                $(invaders[i]).css("top", (currentTop + invadersDescendSpeed) + "px");
            }
        }
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
        // It must move the ship up to the edge of the map, then block it;
        if (direction == keyRight && (this.currentX + 1) != 101) {
            $(".shipBlock").css("left", (this.currentX + 1) + "%").css("left", "-=20px");
            this.currentX += 1;
        } else if (direction == keyLeft && (this.currentX + 1) != 5) {
            $(".shipBlock").css("left", (this.currentX - 1) + "%").css("left", "-=20px");
            this.currentX -= 1;
        }
    }

    // Fires the Ship Laser
    this.fire = () => {
        let shot = new Laser(this.currentX, this.currentY, Math.floor(Math.random() * 10000));

        shot.move();
    }

    // Render the first time...
    this.render(x, y);
}

/**
 * Invaders have 2 positions;
 * @param {integer} x 
 * @param {integer} y 
 * @param {integer} id
 */
function Invader(x, y, id) {
    // Current invader position;
    this.currentX = x;
    this.currentY = y;
    this.id = "invader" + id;

    this.render = (x, y) => {
        let spanHtml = "<span id='" + this.id + "' class='block invaderBlock' style='top: calc(" + y + "%); left: calc(" + x + "%);'></span>";
        $("#game #blockOfInvaders").append(spanHtml);
    }

    this.fire = () => {

    }

    // First Render...
    this.render(x, y);
}

/**
 * The Ship fires Lasers, it has 2 positions and id;
 * @param {integer} x 
 * @param {integer} y 
 * @param {integer} id 
 */
function Laser(x, y, id) {
    this.currentX = x;
    this.currentY = y;
    this.id = "laser" + id;

    this.render = (x, y) => {
        let spanHtml = "<span id='" + this.id + "' class='laser' style='top: calc(" + y + "% - 35px); left: calc(" + x + "% - 11px)'></span>";
        $("#game").append(spanHtml);
    }

    this.move = () => {
        let moveInterval = setInterval(() => {
            // Ascending the laser
            $("#" + this.id).css("top", (this.currentY - 1) + "%").css("top", "-=35px");
            this.currentY -= 1;

            if(this.currentY == 7){
                clearInterval(moveInterval);
                $("#"+this.id).remove();
            }

        }, thisGame.configs.laserSpeed * 10);
    }

    // First Render;
    this.render(x, y);
}

/**
 * The Invaders fires Bombs, it has 2 positions and speed;
 * @param {integer} x 
 * @param {integer} y 
 */
function Bomb(x, y) {

}