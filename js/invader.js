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
        console.log("firing");
    }

    // First Render...
    this.render(x, y);
}

/**
 * The Invaders fires Bombs, it has 2 positions and speed;
 * @param {integer} x 
 * @param {integer} y 
 */
function Bomb(x, y) {

}