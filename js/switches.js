/**
 * Handles all three switches and offers
 * utils methods for matrix conversion
 */

// Start position
const switchStartRow = -122;
const switchStartColumn = 275;

// Switches textures references
const switchOffTexture = "switch-on";
const switchOnTexture = "switch-off";

// Padding/margin
const setPadding = 50;
const switchHMargin = 35;
const switchVMargin = 40;

// Sets of switches
var switches = [];

/**
 * Preload for switches
 */
function preloadSwitches() {
    game.load.image(switchOnTexture, 'assets/switch_off.png');
    game.load.image(switchOffTexture, 'assets/switch_on.png');

    game.load.image('SW_SUMAR_01', 'assets/SW_SUMAR_01.png');
    game.load.image('SW_RESTAR_01', 'assets/SW_RESTAR_01.png');
    game.load.image('SW_POWER_01', 'assets/SW_POWER_01.png');
    game.load.image('SW_RESET_01', 'assets/SW_RESET_01.png');
    game.load.image('SW_COLOR_01', 'assets/SW_COLOR_01.png');
    game.load.image('SW_GIRAR_01', 'assets/SW_GIRAR_01.png');

    game.load.image('SW_SUMAR_02', 'assets/SW_SUMAR_02.png');
    game.load.image('SW_RESTAR_02', 'assets/SW_RESTAR_02.png');
    game.load.image('SW_POWER_02', 'assets/SW_POWER_02.png');
    game.load.image('SW_RESET_02', 'assets/SW_RESET_02.png');
    game.load.image('SW_COLOR_02', 'assets/SW_COLOR_02.png');
    game.load.image('SW_GIRAR_02', 'assets/SW_GIRAR_02.png');
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
        aSwitch = switches.create(switchStartColumn - 25 + (i * switchHMargin), switchStartRow, actions[i].getSwitchOffTexture());
        aSwitch.state = false;
        aSwitch.functions = actions[i];
    }
    let variants = machine.getVariants();
    for (var i = 0; i < 9; i++) {
        if (i < 3) {
            aSwitch = switches.create(switchStartColumn + (i * (switchHMargin + 5)) - 15, switchStartRow + 63 + switchVMargin, switchOffTexture);
        } else if (i < 6) {
            aSwitch = switches.create(switchStartColumn + ((i - 3) * (switchHMargin + 5)) - 15, switchStartRow + 63 + switchVMargin * 2, switchOffTexture);
        } else {
            aSwitch = switches.create(switchStartColumn + ((i - 6) * (switchHMargin + 5)) - 15, switchStartRow + 63 + switchVMargin * 3, switchOffTexture);
        }
        aSwitch.state = false;
        aSwitch.functions = variants[i];
    }
    return machine;
}

function createSetOfSwitchesMachineB(switches) {
    var aSwitch;
    const machine = new MachineColorRotacion();
    const column = switchStartColumn + 350;
    let actions = machine.getActions();
    for (var i = 0; i < 4; i++) {
        aSwitch = switches.create(column + (i * switchHMargin) + 15, switchStartRow, actions[i].getSwitchOffTexture());
        aSwitch.state = false;
        aSwitch.functions = actions[i];
    }
    let variants = machine.getVariants();
    for (var i = 0; i < 6; i++) {
        if (i < 3) {
            aSwitch = switches.create(column + (i * (switchHMargin + 10)) + 22, switchStartRow + switchVMargin + 15, switchOffTexture);
        } else {
            aSwitch = switches.create(column + ((i - 3) * (switchHMargin + 10)) + 22, switchStartRow + switchVMargin * 2 + 35, switchOffTexture);
        }
        aSwitch.state = false;
        aSwitch.functions = variants[i];
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

    // Initially enable gravity for switches
    game.physics.enable(switches[0], Phaser.Physics.ARCADE);
    game.physics.enable(switches[1], Phaser.Physics.ARCADE);
    // game.physics.arcade.gravity.y = machineGravity;

    return machines;
}

/**
 * Event on up
 * @param {*} aSwitch 
 */
function onSwitchUp(aSwitch) {
    game.sound.play('switchAction');
    aSwitch.functions.action();
    updateSwitches();
}

function updateSwitches() {
    for (const switchGroup of switches) {
        switchGroup.children.forEach(switchObject => {
            const value = switchObject.functions.getValue();
            if (value === switchObject.state) return;
            switchObject.state = value;
            updateSwitchState(switchObject);
        });
    }
}

/**
 * Updates switch texture based on state
 */
function updateSwitchState(aSwitch) {
    if (aSwitch.state) {
        aSwitch.loadTexture(aSwitch.functions.getSwitchOnTexture());
        // aSwitch.loadTexture(switchOnTexture);
    } else {
        aSwitch.loadTexture(aSwitch.functions.getSwitchOffTexture());
        // aSwitch.loadTexture(switchOffTexture);
    }
}
