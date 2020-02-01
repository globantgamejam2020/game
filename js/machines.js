const maxY = 2.5;
const firstMachineX = 200;
const secondMachineX = 700;
const machineGravity = 80;
const machineWidth = 310;
const machineHeight = 310;

const firstMachineName = "machine1";
const secondMachineName = "machine2";

var machines = [];

// TODO: Check whether object got inside a machine
function checkCollision(x) {
    // --
}

/**
 * Preload for machines
 */
function preloadMachines() {
    game.load.image(firstMachineName, 'assets/machine1.png');
    game.load.image(secondMachineName, 'assets/machine2.png');
}

/**
 * Create logic for machines
 */
function createMachines() {
    machines.push(game.add.sprite(firstMachineX, 0, firstMachineName));
    machines.push(game.add.sprite(secondMachineX, 0, secondMachineName));

    game.physics.enable(machines[0], Phaser.Physics.ARCADE);
    game.physics.enable(machines[1], Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = machineGravity;
}

function updateMachines() {
    // Stop moving
    if (machines[0].deltaY >= maxY) {
        machines[0].body.moves = false;
        machines[1].body.moves = false;
    }
}