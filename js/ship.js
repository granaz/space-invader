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
        let spanHtml = "<span id='shipBlock' class='block' style='top: calc(" + y + "% - 25px); left: calc(" + x + "% - 20px);'></span>";
        $("#game").append(spanHtml);
    }

    // Moving the Ship;
    this.move = (direction) => {
        // It must move the ship up to the edge of the map, then block it;
        if (direction == keyRight && (this.currentX + 1) != 101) {
            $("#shipBlock").css("left", (this.currentX + 1) + "%").css("left", "-=20px");
            this.currentX += 1;
        } else if (direction == keyLeft && (this.currentX + 1) != 5) {
            $("#shipBlock").css("left", (this.currentX - 1) + "%").css("left", "-=20px");
            this.currentX -= 1;
        }
    }

    // Fires the Ship Laser
    this.fire = () => {
        let shot = new Laser(this.currentX, this.currentY, Math.floor(Math.random() * 100000));

        let moveInterval = setInterval(() => {
            if (gameState == "stopped" || gameState == "paused") {
                clearInterval(moveInterval);
            } else {
                let laserBoundaries = document.getElementById(shot.id).getBoundingClientRect();
                let invaders = thisGame.arrayOfInvaders;

                // Verify if the laser is touching one invader;
                for (let i = 0; i < invaders.length; i++) {
                    let invaderBoundaries = document.getElementById(invaders[i].id).getBoundingClientRect();

                    // Calculate top Varition before the Boundaries;
                    if ((invaderBoundaries.top + 20) >= laserBoundaries.top && (invaderBoundaries.top + 20) <= (laserBoundaries.top + 10)) {
                        if ((laserBoundaries.left + 2.5) >= invaderBoundaries.left && (laserBoundaries.left + 2.5) <= invaderBoundaries.right) {
                            $("#" + shot.id).remove();
                            $("#" + invaders[i].id).remove();

                            // Clear interval
                            clearInterval(moveInterval);

                            // Remove element from arrayofinvaders;
                            thisGame.arrayOfInvaders.splice(i, 1);

                            // Incresce the points by level;
                            thisGame.configs.points += 10 * thisGame.configs.level;

                            // Update status
                            thisGame.updateStatus();                            

                            break;
                        }
                    }
                }

                // If it's not hitting anything, move the laser shot;
                shot.move();

                // If it hits the top, delete the laser and clear the interval;
                if (shot.currentY == 6) {
                    clearInterval(moveInterval);
                    $("#" + shot.id).remove();
                }
            }
        }, thisGame.configs.laserSpeed * 10);
    }

    // Render the first time...
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
        // Ascending the laser
        $("#" + this.id).css("top", (this.currentY - 1) + "%").css("top", "-=35px");
        this.currentY -= 1;
    }

    // First Render;
    this.render(x, y);
}