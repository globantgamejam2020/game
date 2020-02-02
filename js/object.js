/**
 * Handles object creation and rendering
 * based on a 3x3 matrix representing the
 * object current state
 */
const posLimit = 1200;
const posStep = 2;
const objSize = 30;

const objX = -110;
const objY = 337;

// Current object position
var objectPos = 0;

/**
 * Reset object position
 */
function resetObjectPos() {
    objectPos = 0;
}

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
    objectPos += posStep;
    object.x += posStep;
    graphics.clear();
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (objectPos >= posLimit)
                objectPos = 0;
            if (matrix[c][r].active) {
                graphics.beginFill(matrix[c][r].color); // TODO: Change for actual object color
                graphics.drawRect(objX + (objSize * r) + objectPos, objY + (objSize * c), objSize, objSize);
            }
        }
    }
    graphics.endFill();
}