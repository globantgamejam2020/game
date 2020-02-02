/**
 * Handles all three switches and offers
 * utils methods for matrix conversion
 */

// Start position
const switchStartRow = 200;
const switchStartColumn = 250;

// Switches textures references
const switchOffTexture = "switch-off";
const switchOnTexture = "switch-on";

// Padding/margin
const setPadding = 200;
const switchHMargin = 50;
const switchVMargin = 50;

// Sets of switches
var switches = [];

/**
 * Preload for switches
 */
function preloadSwitches() {
    game.load.image(switchOnTexture, 'assets/switch_on.png');
    game.load.image(switchOffTexture, 'assets/switch_off.png');
}

/**
 * Toggles switches visibility
 * @param {*} setNumber 
 */
function toggleSwitches(setNumber) {
    switches[setNumber].alpha = switches[setNumber].alpha != 0 ? 0 : 1;
}

/**
 * Create a set of switches on the canvas
 * @param {*} switches 
 * @param {*} setNumber 
 */
function createSetOfSwitchesMachineA(switches) {
    var aSwitch;
    const machine = new MachineSumaResta();
    let actions = machine.getActions();
    for (var i = 0; i < 4; i++) {
        aSwitch = switches.create(switchStartColumn - 25 + (i * switchHMargin), switchStartRow, switchOffTexture);
        aSwitch.state = false;
        aSwitch.action = actions[i];
    }
    let variants = machine.getVariants();
    for (var i = 0; i < 9; i++) {
        if (i < 3) {
            aSwitch = switches.create(switchStartColumn + (i * switchHMargin), switchStartRow + switchVMargin, switchOffTexture);
        } else if (i < 6) {
            aSwitch = switches.create(switchStartColumn + ((i - 3) * switchHMargin), switchStartRow + switchVMargin * 2, switchOffTexture);
        } else {
            aSwitch = switches.create(switchStartColumn + ((i - 6) * switchHMargin), switchStartRow + switchVMargin * 3, switchOffTexture);
        }
        aSwitch.state = false;
        aSwitch.action = variants[i];
    }
    return machine;
}

function createSetOfSwitchesMachineB(switches) {
    var aSwitch;
    const machine = new MachineColorRotacion();
    const column = switchStartColumn - 25;
    let actions = machine.getActions();
    for (var i = 0; i < 4; i++) {
        aSwitch = switches.create(column + (i * switchHMargin), switchStartRow - 10, switchOffTexture);
        aSwitch.state = false;
        aSwitch.action = actions[i];
    }
    let variants = machine.getVariants();
    for (var i = 0; i < 8; i++) {
        if (i < 4) {
            aSwitch = switches.create(column + (i * switchHMargin), switchStartRow + switchVMargin, switchOffTexture);
        } else {
            aSwitch = switches.create(column + ((i - 4) * switchHMargin), switchStartRow + switchVMargin * 2, switchOffTexture);
        }
        aSwitch.state = false;
        aSwitch.action = variants[i];
    }
    return machine;
}

/**
 * Create and associate events for the switches
 * @param {*} switches 
 */
function createSwitchesEvents(switches) {
    switches.onChildInputUp.add(onSwitchUp, this);
}

/**
 * Create all switches
 */
function createSwitches() {
    let machines = [];
    switches.push(game.add.group());
    switches.push(game.add.group());

    switches[0].inputEnableChildren = true;
    machines.push(createSetOfSwitchesMachineA(switches[0]));
    createSwitchesEvents(switches[0]);

    switches[1].inputEnableChildren = true;
    machines.push(createSetOfSwitchesMachineB(switches[1]));
    createSwitchesEvents(switches[1]);
    return machines;
}

/**
 * Event on up
 * @param {*} aSwitch 
 */
function onSwitchUp(aSwitch) {
    updateSwitchState(aSwitch.action());
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