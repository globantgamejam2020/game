/**
 * Handles object creation and rendering
 * based on a 3x3 matrix representing the
 * object current state
 */
const posLimit = 1200;
const posStep = 2;
const objSize = 30;
const objectCount = 3;

const objX = -300;
const objectDistance = -550;
const objY = 337;

/**
 * Create object reference
 */
function createObjects() {
    for (let i = 0; i < objectCount; i += 1) {
        const object = { x: objX + objectDistance * i, matrix: copy(levels[currentLevel].entrada), solution: levels[currentLevel].salida, size: objSize };
        objects.push(object);
        object.graphics = game.add.graphics(0, 0);
    }
}

function copy(matrix) {
    const result = [];
    for (let i = 0; i < 3; i += 1) {
        const line = [];
        for (let j = 0; j < 3; j += 1)
            line.push({ ...matrix[i][j] });
        result.push(line);
    }
    return result;
}

/**
 * Update object based on a 3x3 matrix
 * @param {*} matrix 
 */
function updateObject(object) {
    const matrix = object.matrix;
    if (object.x >= posLimit) {
        resetObject(object);
        return;
    }
    object.x = object.x + posStep;
    object.graphics.clear();
    const size = object.size;
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (matrix[c][r].active) {
                object.graphics.beginFill(matrix[c][r].color);
                object.graphics.drawRect((size * r) + object.x, objY + (size * c), size, size);
            }
        }
    }
    object.graphics.endFill();
}

function resetObject(object) {
    object.graphics.clear();
    object.x = -350;
    object.matrix = copy(levels[currentLevel].entrada);
}