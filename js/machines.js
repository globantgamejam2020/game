const maxY = 3.5;
const firstMachineX = 200;
const machinesY = -300;
const secondMachineX = 600;
const machineGravity = 80;
const machineWidth = 329;
const machineHeight = 665;

const firstMachineName = "machine1";
const secondMachineName = "machine2";

var machines = [];

// TODO: Check whether object got inside a machine
function checkCollision(object) {
    for (const machine of machines)
        if (object.x === machine.position.x + 50) {
            game.sound.play('machineAction');
            console.log(object.matrix);
            machine.machineObject.transform(object.matrix)
            console.log(object.matrix);
        }
}

/**
 * Preload for machines
 */
function preloadMachines() {
    game.load.image(firstMachineName, 'assets/maquina.png');
    game.load.image(secondMachineName, 'assets/maquina.png');
}

/**
 * Create logic for machines
 */
function createMachines(machineObjects) {
    machines.push(game.add.sprite(firstMachineX, machinesY, firstMachineName));
    machines.push(game.add.sprite(secondMachineX, machinesY, secondMachineName));

    machines[0].scale.setTo(0.7, 0.7);
    machines[1].scale.setTo(0.7, 0.7);

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