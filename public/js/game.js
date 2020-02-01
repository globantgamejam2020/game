var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-canvas', { preload: preload, create: create, render: render });

function preload() {

    // Switches
    game.load.image('switch-on', 'assets/switch_on.png');
    game.load.image('switch-off', 'assets/switch_off.png');

}

var debugText = '';

function create() {
    createSwitches();
}

function render() {

    if (debugText === '') {
        game.debug.text("Interact with the switches.", 32, 32);
    } else {
        game.debug.text(debugText, 32, 32);
    }

}