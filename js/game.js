var game = new Phaser.Game(
    1024, 598,
    Phaser.CANVAS,
    'game-canvas',
    { preload: preload, create: create, render: render, update: update },
    true
);

var currentLevel = -1;
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

var goalObject;

var gameStarted = false;
var enterGame, splash, speaker;

const platformY = 400;

function startGame(trigger) {
    game.physics.arcade.gravity.y = machineGravity;
    gameStarted = true;
    enterGame.alpha = 0;
    splash.alpha = 0;

    // Background music
    bgMusic = game.sound.add('bg_music');
    bgMusic.loop = true;
    bgMusic.volume = 0.25;
    bgMusic.play();
}

function preload() {
    preloadSwitches();
    preloadMachines();

    game.load.audio('bg_music', 'sounds/fabricaEspacial.wav');
    game.load.audio('switchAction', 'sounds/switchAction.mp3');
    game.load.audio('machineAction', 'sounds/machineAction.mp3');
    game.load.image('bottom', 'assets/bottom.png');
    game.load.image('marco', 'assets/marco.png');
    game.load.image('back_simple', 'assets/back_simple.png');
    game.load.image('rrr_splash', 'assets/RRR.png');
    game.load.image('enter_game', 'assets/enter_game.png');
    game.load.image('enter_game', 'assets/RRR_VICTORIA.png');
    game.load.image('enter_game', 'assets/RRR_DERROTA.png');

    game.load.spritesheet('platform', 'assets/cinta.png', 201, 61, 2);
    game.load.spritesheet('speaker-anim', 'assets/speaker.png', 154, 158, 2);
}

function create() {

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
    createMachines();
    const machineObjects = createSwitches();
    for (let i = 0; i < machineObjects.length; i += 1) {
        machines[i].machineObject = machineObjects[i];
    }

    splash = game.add.image(0, 0, 'rrr_splash');
    game.add.image(0, 0, 'marco');

    enterGame = game.add.sprite(350, 410, 'enter_game', 5);
    enterGame.inputEnabled = true;
    enterGame.onInputUp.add(startGame, this);
    // enterGame.inputEnableChildren = true;
    // enterGame.onChildInputUp.add(startGame, this);

    speaker = game.add.sprite(790, 410, 'speaker-anim', 5);
    speaker.animations.add('play-sound');
    speaker.play(10, true); // TODO: fix
    navigateToNextLevel();
}

function updateGoalObject() {
    if (!gameStarted || (goalObject && goalObject.level === currentLevel)) return;
    if (goalObject) goalObject.graphics.destroy();
    const matrix = levels[currentLevel].salida
    goalObject = { level: currentLevel, matrix };
    goalObject.graphics = game.add.graphics(0, 0);

    const size = 20;
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (matrix[c][r].active) {
                goalObject.graphics.beginFill(matrix[c][r].color);
                goalObject.graphics.drawRect((size * r) + 735, 492 + (size * c), size, size);
            }
        }
    }
    goalObject.graphics.endFill();
}

function update() {
    if (!gameStarted) {
        startGame(undefined);
    } else {
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
}

function render() {
    if (debugText === '') {
        // game.debug.text("Interact with the switches.", 32, 32);
    } else {
        game.debug.text(debugText, 32, 32);
    }
}

function navigateToNextLevel() {
    currentLevel += 1;
    if (currentLevel === end) {
        showSuccess();
    }
    updateGoalObject();
    createObjects();
    countInt = 35;
}

function showSuccess() {
    game.add.sprite(0, 0, 'RRR_VICTORIA', 5);
}