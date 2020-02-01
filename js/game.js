var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-canvas', { preload: preload, create: create, render: render });

function preload() {

    // Switches
    game.load.image('switch-on', 'assets/switch_on.png');
    game.load.image('switch-off', 'assets/switch_off.png');

}

var debugText = '';
var switches1, switches2, switches3;

function create() {

    switches1 = game.add.group();
    switches2 = game.add.group();
    switches3 = game.add.group();

    // This will automatically inputEnable all children added to both Groups
    switches1.inputEnableChildren = true;
    switches2.inputEnableChildren = true;
    switches3.inputEnableChildren = true;

    // Create 10 Sprites per Group
    var aSwitch;
    for (var i = 0; i < 10; i++) {
        aSwitch = switches1.create(64 + (64 * i), 150, 'switch-on');
        aSwitch.name = 'switch1-child-' + i;
        aSwitch.state = true;
    }

    // Add events
    switches1.onChildInputUp.add(onUp, this);
    switches1.onChildInputDown.add(onDown, this);
    switches1.onChildInputOver.add(onOver, this);
    switches1.onChildInputOut.add(onOut, this);

}

function onDown (sprite) {
    // debugText = "onDown: " + sprite.name;
    // sprite.tint = 0x00ff00;
}

function onOver (sprite) {
    // debugText = "onOver: " + sprite.name;
    // sprite.tint = 0xff0000;
}

function onOut (sprite) {
    // sprite.tint = 0xffffff;
}

function onUp (sprite) {

    sprite.state = !sprite.state;

    if (sprite.state) {
        sprite.loadTexture('switch-on');
    } else {
        sprite.loadTexture('switch-off');
    }

    debugText = `onUp - Changed switch ${sprite.name} state to ${sprite.state}`;

    // sprite.tint = 0xffffff;

}

function render() {

    if (debugText === '') {
        game.debug.text("Interact with the switches.", 32, 32);
    } else {
        game.debug.text(debugText, 32, 32);
    }

}