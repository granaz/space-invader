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
        bombCurrency: 30,
        invadersSpeed: 10,
        invadersDescendSpeed: 2,
        numberOfInvaders: 20,
        invadersContainer: 1
    }

    // Creating the elements;
    this.ship;
    this.arrayOfInvaders = [];

    this.createElements = () => {
        // Create the element Ship;
        if (gameState != "paused") this.ship = new Ship(50, 100);

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
        let direction = 1;

        let moveInterval = setInterval(() => {
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
                descendInvaders(this.arrayOfInvaders);
            } else if (this.configs.invadersContainer == -25) {
                direction = 1;

                // Descend the invaders;
                descendInvaders(this.arrayOfInvaders);
            }

            if (this.arrayOfInvaders.length == 0) {
                clearInterval(moveInterval);
            }

        }, this.configs.invadersSpeed * 10);

        function descendInvaders(arrayOfInvaders) {
            // Descend the invaders;
            for (let i = 0; i < arrayOfInvaders.length; i++) {
                arrayOfInvaders[i].move();
            }
        }
    }

    this.invadersAttack = () => {
        let attackInterval = setInterval(() => {
            for (let i = 0; i < this.arrayOfInvaders.length; i++) {
                let a = Math.floor(Math.random() * this.configs.bombCurrency),
                    b = Math.floor(Math.random() * this.configs.bombCurrency);

                if (a == b) {
                    this.arrayOfInvaders[i].fire();
                }
            }

            if (this.arrayOfInvaders.length == 0) {
                clearInterval(attackInterval);
            }
        }, 1000);
    }

    this.updateStatus = () => {
        $("#statusLevel").html(this.configs.level);
        $("#statusLives").html(this.configs.lives);
        $("#statusPoints").html(this.configs.points);
    }

    this.nextLevel = () => {
        gameState = "paused";

        // 3 seconds to start the new level
        setTimeout(() => {
            // Settings the configs to the next level;
            this.configs.level++;
            this.configs.bombSpeed++;
            this.configs.bombCurrency++;
            this.configs.invadersSpeed++;
            this.configs.invadersDescendSpeed++;
            this.configs.numberOfInvaders += 10;        

            //clear the map
            $(".laser").remove();
            $(".bomb").remove();

            // Initiliasing the new level;
            this.updateStatus();
            this.createElements();
            this.moveInvaders();
            this.invadersAttack();

            gameState = "running";

        }, 3000);
    }

    this.gameOver = () => {
        // Game Over, it will prepare the map to restart the game;
        gameState = "stopped";

        this.arrayOfInvaders = [];

        $("#shipBlock").remove();
        $(".invaderBlock").remove();
        $(".laser").remove();
        $(".bomb").remove();
    }
}