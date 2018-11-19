/**
 * Space Invaders
 * 
 * by: https://github.com/granaz
 * 
 * Elements, all that appears in the screen is a element.
 * All the positions are in %;
 *
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
        points: 0,
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

            // Invaders start firing;
            this.arrayOfInvaders[i-1].fire();
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

    this.updateStatus = () => {
        $("#statusLevel").html(this.configs.level);
        $("#statusLives").html(this.configs.lives);
        $("#statusPoints").html(this.configs.points);
    }

    this.nextLevel = () => {

    }
}
