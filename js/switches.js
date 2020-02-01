// Sets of switches
var switches1, switches2, switches3;

const setPadding = 250;
const switchStartRow = 150;
const switchStartColumn = 64;
const switchHMargin = 64;
const switchVMargin = 75;

/**
 * Create a set of switches on the canvas
 * @param {*} switches 
 * @param {*} setNumber 
 */
function createSetOfSwitches(switches, setNumber) {
    var aSwitch;
    for (var i = 0; i < 9; i++) {
        if (i < 3)
            aSwitch = switches.create((switchStartColumn + (setPadding * setNumber)) + (switchHMargin * i), switchStartRow, 'switch-on');
        else if (i < 6)
            aSwitch = switches.create((switchStartColumn + (setPadding * setNumber)) + (switchHMargin * (i - 3)), switchStartRow + (switchVMargin), 'switch-on');
        else
            aSwitch = switches.create((switchStartColumn + (setPadding * setNumber)) + (switchHMargin * (i - 6)), switchStartRow + (switchVMargin * 2), 'switch-on');
        aSwitch.name = `switch${setNumber}-child-` + i;
        aSwitch.state = true;
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
    switches1 = game.add.group();
    switches2 = game.add.group();
    switches3 = game.add.group();

    // This will automatically inputEnable all children added to both Groups
    switches1.inputEnableChildren = true;
    switches2.inputEnableChildren = true;
    switches3.inputEnableChildren = true;

    // Add set of switches
    createSetOfSwitches(switches1, 0);
    createSetOfSwitches(switches2, 1);
    createSetOfSwitches(switches3, 2);

    // Add events
    createSwitchesEvents(switches1);
    createSwitchesEvents(switches2);
    createSwitchesEvents(switches3);
}

/**
 * Event on down
 * @param {*} sprite 
 */
function onSwitchDown (sprite) {
    // debugText = "onDown: " + sprite.name;
    // sprite.tint = 0x00ff00;
}

/**
 * Event on over
 * @param {*} sprite 
 */
function onSwitchOver (sprite) {
    // debugText = "onOver: " + sprite.name;
    // sprite.tint = 0xff0000;
}

/**
 * Event on out
 * @param {*} sprite 
 */
function onSwitchOut (sprite) {
    // sprite.tint = 0xffffff;
}

/**
 * Event on up
 * @param {*} sprite 
 */
function onSwitchUp (sprite) {

    sprite.state = !sprite.state;

    if (sprite.state) {
        sprite.loadTexture('switch-on');
    } else {
        sprite.loadTexture('switch-off');
    }

    debugText = `onUp - Changed switch ${sprite.name} state to ${sprite.state}`;

    // sprite.tint = 0xffffff;

}