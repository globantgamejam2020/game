/**
 * Handles object creation and rendering
 * based on a 3x3 matrix representing the
 * object current state
 */
const posLimit = 1200;
const posStep = 2;
const objSize = 30;
const objectCount = 3;

const objX = -450;
const objectDistance = -550;
const objY = 337;

/**
 * Create object reference
 */

function initializeObjects() {
    for (let i = 0; i < objectCount; i += 1) {
        const object = { graphics: game.add.graphics(0, 0), size: objSize };
        objects.push(object);
    }
}

function createObjects() {
    for (let i = 0; i < objects.length; i += 1) {
        objects[i].x = objX + objectDistance * i;
        objects[i].matrix = copy(levels[currentLevel].entrada);
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
    if (checkSolution(object)) {
        navigateToNextLevel();
    };
    object.graphics.clear();
    object.x = -370;
    object.matrix = copy(levels[currentLevel].entrada);
    countInt -= 1;
    if (countInt === 0) {
        showYouLose();
    }
}

function checkSolution(object) {
    if (!goalObject || !goalObject.matrix) return;
    let solved = true;
    let i = 0;
    let j = 0;

    while (i < 3 && solved) {
        while (j < 3 && solved) {
            solved = object.matrix[i][j].active === goalObject.matrix[i][j].active && object.matrix[i][j].color === goalObject.matrix[i][j].color;
            j++;
        }
        i++;
    }
    return solved;
}