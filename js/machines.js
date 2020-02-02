const maxY = 3.45;
const firstMachineX = 200;
const machinesY = -300;
const secondMachineX = 600;
const machineGravity = 80;
const machineWidth = 329;
const machineHeight = 665;

const edgeXOffset = 217.6;
const edgeY = -43;

const firstMachineName = "machine1";
const secondMachineName = "machine2";

var machines = [];
var edges = [];

/**
 * 
 * @param {*} object 
 */
function checkCollision(object) {
    for (const machine of machines)
        if (object.x === machine.position.x + 50) {
            game.sound.play('machineAction');
            machine.machineObject.transform(object.matrix)
        }
}

/**
 * Preload for machines
 */
function preloadMachines() {
    game.load.image('palito', 'assets/palito.png');
    game.load.image(firstMachineName, 'assets/maquina_1.png');
    game.load.image(secondMachineName, 'assets/maquina_2.png');
}

/**
 * 
 */
function createEdges() {
    edges.push(game.add.sprite(firstMachineX + edgeXOffset, edgeY, 'palito'));
    edges.push(game.add.sprite(secondMachineX + edgeXOffset, edgeY, 'palito'));

    edges[0].scale.setTo(0.7, 0.7);
    edges[1].scale.setTo(0.7, 0.7);

    game.physics.enable(edges[0], Phaser.Physics.ARCADE);
    game.physics.enable(edges[1], Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = machineGravity;
}

/**
 * Create logic for machines
 */
function createMachines() {

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
        edges[0].body.moves = false;
        edges[1].body.moves = false;
    }
}