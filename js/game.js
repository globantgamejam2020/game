var game = new Phaser.Game(
    1200, 600,
    Phaser.CANVAS,
    'game-canvas',
    { preload: preload, create: create, render: render, update: update }
);

var debugText = '';
var bgMusic; // TODO
var anims = [];
var platforms = [];

const platformY = 400;

function preload() {
    preloadSwitches();
    preloadMachines();
    // this.load.audio('bg_music', 'sounds/bg-music.ogg'); // TODO: Music
    game.load.spritesheet('platform', 'assets/cinta.png', 201, 61, 2);
}

function create() {
    // TODO: Music
    // bgMusic = this.sound.add('background_music');
    // backgroundMusic.volume = 0.25;
    // bgMusic.play();

    platforms.push(game.add.sprite(-140, platformY, 'platform', 5));
    anims.push(platforms[0].animations.add('move'));
    anims[0].play(10, true);
    for (var i = 0; i < 30; i++) {
        platforms.push(game.add.sprite(140 * i, platformY, 'platform', 5));
        anims.push(platforms[i + 1].animations.add('move'));
        anims[i + 1].play(10, true);
    }

    // anim.onStart.add(animationStarted, this);
    // anim.onLoop.add(animationLooped, this);
    // anim.onComplete.add(animationStopped, this);

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