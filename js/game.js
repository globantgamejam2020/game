var game = new Phaser.Game(
    1200, 600,
    Phaser.CANVAS,
    'game-canvas',
    { preload: preload, create: create, render: render, update: update }
);

var debugText = '';
var bgMusic; // TODO

function preload() {
    preloadSwitches();
    preloadMachines();
    // this.load.audio('bg_music', 'sounds/bg-music.ogg'); // TODO: Music
    // this.load.spritesheet('platform', 'assets/platform.png', { frameWidth: 119, frameHeight: 24 }); // TODO: Platform

}

function create() {
    // TODO: Music
    // bgMusic = this.sound.add('background_music');
    // backgroundMusic.volume = 0.25;
    // bgMusic.play();

    createObject();
    createMachines();
    createSwitches();
}

function update() {

    // TODO: test, remove
    var randMatrix = [
        [
            [{color: 0xfff, active: true}, {color: 0x4b, active: false}, {color: 0xfff, active: true}],
            [{color: 0xfff, active: false}, {color: 0x4b, active: true}, {color: 0x4b, active: true}],
            [{color: 0xfff, active: true}, {color: 0xfff, active: true}, {color: 0xFFFF00, active: true}]
        ],
        [
            [{color: 0xfff, active: true}, {color: 0xfff, active: true}, {color: 0xfff, active: true}],
            [{color: 0x4b, active: true}, {color: 0x4b, active: true}, {color: 0xfff, active: true}],
            [{color: 0xfff, active: true}, {color: 0xfff, active: true}, {color: 0xFFFF00, active: true}]
        ],
        [
            [{color: 0xfff, active: false}, {color: 0xfff, active: true}, {color: 0xfff, active: true}],
            [{color: 0xFFFF00, active: false}, {color: 0x4b, active: true}, {color: 0x4b, active: false}],
            [{color: 0xfff, active: true}, {color: 0xfff, active: true}, {color: 0xFFFF00, active: true}]
        ]
    ]

    updateMachines();

    // TODO: Test. Use actual matrix.
    updateObject(randMatrix[Math.floor(Math.random() * 2)]);
}

function render() {
    if (debugText === '') {
        game.debug.text("Interact with the switches.", 32, 32);
    } else {
        game.debug.text(debugText, 32, 32);
    }
}