// Start position
const switchStartRow = 150;
const switchStartColumn = 64;

// Switches textures references
const switchOffTexture = "switch-off";
const switchOnTexture = "switch-on";

// Padding/margin
const setPadding = 250;
const switchHMargin = 50;
const switchVMargin = 50;

// Sets of switches
var switches = [];

/**
 * Return reference to a switch
 * @param {*} r row
 * @param {*} c column
 */
function locateSwitch(setNumber, r, c) {
    var children = switches[setNumber].children;
    for (var i = 0; i < children.length; i++) {
        var coords = children[i].coords;
        if (coords[0] == r && coords[1] == c)
            return children[i];
    }
    return undefined;
}

/**
 * Updates set of switches based on a matrix of states
 * @param {*} setNumber 
 * @param {*} matrix 
 */
function matrixToSwitches(setNumber, matrix) {
    var aSwitch;
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 4; c++) {
            aSwitch = locateSwitch(setNumber, r, c);
            if (aSwitch) {
                aSwitch.state = matrix[r][c];
                updateSwitchState(aSwitch);
            }
        }
    }
}

/**
 * Convert a specific set of switches sprites to boolean arrays
 * @param {*} setNumber 
 */
function switchesToMatrix(setNumber) {
    var matrix = [];
    var row = [];
    var children = switches[setNumber].children;
    var cutRows = [3, 7, 11, 15];
    for (var i = 0; i < children.length; i++) {
        row.push(children[i].state);
        // Cut row and add to matrix
        if (cutRows.includes(i)) {
            matrix.push(row);
            row = [];
        }
    }
    return matrix;  
}

/**
 * Create a set of switches on the canvas
 * @param {*} switches 
 * @param {*} setNumber 
 */
function createSetOfSwitches(switches, setNumber) {
    var aSwitch;
    for (var i = 0; i < 16; i++) {
        if (i < 4) {
            aSwitch = switches.create(switchStartColumn + (i * switchHMargin) + (setPadding * setNumber), switchStartRow, switchOffTexture);
            aSwitch.coords = [0, i];
        } else if (i < 8) {
            aSwitch = switches.create(switchStartColumn + ((i - 4) * switchHMargin) + (setPadding * setNumber), switchStartRow + switchVMargin, switchOffTexture);
            aSwitch.coords = [1, i - 4];
        } else if (i < 12) {
            aSwitch = switches.create(switchStartColumn + ((i - 8) * switchHMargin) + (setPadding * setNumber), switchStartRow + switchVMargin * 2, switchOffTexture);
            aSwitch.coords = [2, i - 8];
        } else {
            aSwitch = switches.create(switchStartColumn + ((i - 12) * switchHMargin) + (setPadding * setNumber), switchStartRow + switchVMargin * 3, switchOffTexture);
            aSwitch.coords = [3, i - 12];
        }
        aSwitch.name = `switch${setNumber}-child-` + i;
        aSwitch.state = false;
        aSwitch.id = [setNumber, i];
    }
}

/**
 * Create and associate events for the switches
 * @param {*} switches 
 */
function createSwitchesEvents(switches) {
    switches.onChildInputUp.add(onSwitchUp, this);
    switches.onChildInputDown.add(onSwitchDown, this);
    switches.onChildInputOver.add(onSwitchOver, this);
    switches.onChildInputOut.add(onSwitchOut, this);
}

/**
 * Create all switches
 */
function createSwitches() {
    switches.push(game.add.group());
    switches.push(game.add.group());
    switches.push(game.add.group());

    for (var i = 0; i < switches.length; i++) {
        // This will automatically inputEnable all children added to both Groups
        switches[i].inputEnableChildren = true;

        // Add set of switches
        createSetOfSwitches(switches[i], i);

        // Add events
        createSwitchesEvents(switches[i]);
    }
}

/**
 * Event on down
 * @param {*} aSwitch 
 */
function onSwitchDown (aSwitch) {
    // debugText = "onDown: " + aSwitch.name;
    // aSwitch.tint = 0x00ff00;
}

/**
 * Event on over
 * @param {*} aSwitch 
 */
function onSwitchOver (aSwitch) {
    // debugText = "onOver: " + aSwitch.name;
    // aSwitch.tint = 0xff0000;
}

/**
 * Event on out
 * @param {*} aSwitch 
 */
function onSwitchOut (aSwitch) {
    // aSwitch.tint = 0xffffff;
}

/**
 * Event on up
 * @param {*} aSwitch 
 */
function onSwitchUp (aSwitch) {
    aSwitch.state = !aSwitch.state;
    updateSwitchState(aSwitch);

    debugText = `onUp - Changed switch ${aSwitch.name} (${aSwitch.id}) state to ${aSwitch.state}`;
}

/**
 * Updates switch texture based on state
 */
function updateSwitchState(aSwitch) {
    if (aSwitch.state) {
        aSwitch.loadTexture(switchOnTexture);
    } else {
        aSwitch.loadTexture(switchOffTexture);
    }
}