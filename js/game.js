var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'game-canvas', { preload: preload, create: create, render: render, update: update });

var debugText = '';

function preload() {
    preloadSwitches();

    // TODO: move to machines.js
}

function create() {
    createSwitches();
    createObject();
}

function update() {
    // TODO: Test. Use actual matrix.
    updateObject([
        [{color: 0xfff, active: true}, {color: 0xFFFF00, active: true}, {color: 0xfff, active: true}],
        [{color: 0xfff, active: true}, {color: 0x4b, active: true}, {color: 0xfff, active: false}],
        [{color: 0xfff, active: true}, {color: 0xfff, active: true}, {color: 0xFFFF00, active: true}]
    ]);
}

function render() {
    if (debugText === '') {
        game.debug.text("Interact with the switches.", 32, 32);
    } else {
        game.debug.text(debugText, 32, 32);
    }
}