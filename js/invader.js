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

    this.move = () => {
        if (this.currentY >= 96) {
            thisGame.gameOver();

            return false;
        }

        $("#"+this.id).css("top", (this.currentY + thisGame.configs.invadersDescendSpeed) + "%");
        this.currentY += thisGame.configs.invadersDescendSpeed;
    }

    this.fire = () => {
        // Calculate X
        let x = [26, 31, 36, 41, 46, 51, 56, 61, 66, 71];
        for (let i = 0; i < x.length; i++) {
            x[i] += thisGame.configs.invadersContainer;
        }

        let shot = new Bomb(x[(this.currentX / 10)], this.currentY, Math.floor(Math.random() * 100000));

        let moveInterval = setInterval(() => {
            if (gameState == "stopped" || gameState == "paused") {
                clearInterval(moveInterval);
            }else{
                // Before move the bomb, verify if the bomb have hit the ship;
                let bombBoundaries = document.getElementById(shot.id).getBoundingClientRect(),
                    shipBoundaries = document.getElementById("shipBlock").getBoundingClientRect();
    
                if ((shipBoundaries.top) >= bombBoundaries.top && (shipBoundaries.top) <= (bombBoundaries.top + 10)) {
                    if ((bombBoundaries.left + 2.5) >= shipBoundaries.left && (bombBoundaries.left + 2.5) <= shipBoundaries.right) {
                        // Remove the bomb;
                        $("#" + shot.id).remove();
    
                        // Decresce one live;
                        thisGame.configs.lives -= 1;
    
                        // Update status
                        thisGame.updateStatus();
    
                        clearInterval(moveInterval);
                    }
                }
    
                shot.move();
    
                // If it hits the top, delete the laser and clear the interval;
                if (shot.currentY == 95) {
                    clearInterval(moveInterval);
                    $("#" + shot.id).remove();
                }
            }

        }, thisGame.configs.bombSpeed * 10);
    }

    // First Render...
    this.render(x, y);
}

/**
 * The Invaders fires Bombs, it has 2 positions and speed;
 * @param {integer} x 
 * @param {integer} y 
 */
function Bomb(x, y, id) {
    this.currentX = x;
    this.currentY = y;
    this.id = "bomb" + id;

    this.render = (x, y) => {
        let spanHtml = "<span id='" + this.id + "' class='bomb' style='top: calc(" + y + "% + 20px); left: calc(" + x + "%)'></span>";
        $("#game").append(spanHtml);
    }

    this.move = () => {
        // Ascending the laser
        $("#" + this.id).css("top", (this.currentY + 1) + "%").css("top", "+=20px");
        this.currentY += 1;
    }

    // First Render;
    this.render(x, y);
}