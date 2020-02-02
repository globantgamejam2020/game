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
function createObject() {
    var objects = game.add.graphics(0, 0);
    window.objects = objects;
}

/**
 * Update object based on a 3x3 matrix
 * @param {*} matrix 
 */
function updateObject(matrix) {
    objectPos += posStep;
    objects.clear();
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (objectPos >= posLimit)
                objectPos = 0;
            if (matrix[c][r].active) {
                objects.beginFill(matrix[c][r].color); // TODO: Change for actual object color
                objects.drawRect(objX + (objSize * r) + objectPos, objY + (objSize * c), objSize, objSize);
            }
        }
    }
    objects.endFill();
}