/**
 * Handles object creation and rendering
 * based on a 3x3 matrix representing the
 * object current state
 */
const posLimit = 1200;
const posStep = 2;
const objSize = 30;

const objX = -80;
const objY = 337;

/**
 * Create object reference
 */
function createObjects() {
    var graphics = game.add.graphics(0, 0);
    window.graphics = graphics;
}

/**
 * Update object based on a 3x3 matrix
 * @param {*} matrix 
 */
function updateObject(object) {
    const matrix = object.matrix;
    object.x = object.x >= posLimit ? objX : object.x + posStep;
    // console.log(object.x);
    graphics.clear();
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (matrix[c][r].active) {
                graphics.beginFill(matrix[c][r].color);
                graphics.drawRect((objSize * r) + object.x, objY + (objSize * c), objSize, objSize);
            }
        }
    }
    graphics.endFill();
}