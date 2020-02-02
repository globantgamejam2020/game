var game = new Phaser.Game(
    1024, 598,
    Phaser.CANVAS,
    'game-canvas',
    { preload: preload, create: create, render: render, update: update },
    true
);

var currentLevel = 0;
var objects = [];

var debugText = '';
var bgMusic;
var anims = [];
var platforms = [];
var count;
var countInt = 0;

var bottom;

var platformX = 0;
var platformStep = 2;

const platformY = 400;

function preload() {
    preloadSwitches();
    preloadMachines();
    game.load.audio('bg_music', 'sounds/fabricaEspacial.wav');
    game.load.spritesheet('platform', 'assets/cinta.png', 201, 61, 2);
    game.load.image('bottom', 'assets/bottom.png');
    game.load.image('marco', 'assets/marco.png');
    game.load.image('back_simple', 'assets/back_simple.png');
}

function create() {


    // Background music
    bgMusic = game.sound.add('bg_music');
    bgMusic.loop = true;
    bgMusic.volume = 0.25;
    bgMusic.play();

    game.add.image(0, 0, 'back_simple');
    bottom = game.add.sprite(20, 420, 'bottom');
    bottom.scale.setTo(0.95, 0.95);

    // Add platforms animation
    for (var i = 1; i < 5; i++) {
        platforms.push(game.add.sprite(140 * (-i), platformY, 'platform', 5));
        anims.push(platforms[i - 1].animations.add('move'));
        anims[i - 1].play(10, true);
    }
    for (var i = 0; i < 30; i++) {
        platforms.push(game.add.sprite(140 * i, platformY, 'platform', 5));
        anims.push(platforms[i + 4].animations.add('move'));
        anims[i + 4].play(10, true);
    }

    createEdges();

    count = game.add.text(670, 543, countInt, { fontSize: '15px', fill: '#000' });
    createObjects();
    objects.push({ x: objX, matrix: levels[currentLevel].entrada })
    createMachines();
    const machineObjects = createSwitches()
    for (let i = 0; i < machineObjects.length; i += 1) {
        machines[i].machineObject = machineObjects[i];
    }

    game.add.image(0, 0, 'marco');
    // game.add.sprite(0, 0, 'marco')
}

function update() {

    updateMachines();
    for (const object of objects) {
        checkCollision(object);
        updateObject(object);
    }

    platformX += platformStep;
    // console.log(platformX);
    if (platformX >= 278) {
        // Reset platforms
        platformX = 0;
        for (var i = 1; i < 5; i++)
            platforms[i - 1].x = 140 * (-i);
        for (var i = 0; i < 30; i++)
            platforms[i + 4].x = 140 * i;
    } else {
        // Update platforms movement
        for (let platform of platforms)
            platform.x += platformStep;
    }
}

function render() {
    if (debugText === '') {
        // game.debug.text("Interact with the switches.", 32, 32);
    } else {
        game.debug.text(debugText, 32, 32);
    }
}