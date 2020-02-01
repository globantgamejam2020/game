type ArrayFixed<T, L extends number> = [T, ...Array<T>] & { length: L }

type Point = [number, number];
type SwitchesState = ArrayFixed<ArrayFixed<boolean, 4>, 4>;
type ObjectState = ArrayFixed<ArrayFixed<boolean, 3>, 3>;
type Transformation = (state: ObjectState) => void;
type MachineConfiguration = Map<Point[], Transformation>;

const transformations: Transformation[] = [
    (state: ObjectState) => rotate(state, 1),
    (state: ObjectState) => rotate(state, 2),
    (state: ObjectState) => rotate(state, 3),
]

const objectStates = new Map<object, ObjectState>();
const machineConfigurations = new Map<object, MachineConfiguration>();

const transform = (switchesState: SwitchesState, machine: object, object: object) => {
    const objectState = objectStates.get(object)!;
    const machineConfiguration = machineConfigurations.get(machine)!;
    for (const [requiredActivations, action] of machineConfiguration.entries())
        if (allAreEnabled(requiredActivations, switchesState)) action(objectState);
}

const allAreEnabled = (requiredActivations: Point[], switchesState: SwitchesState) => {
    for (const [x, y] of requiredActivations)
        if (!switchesState[x][y]) return false;
    return true
}

const rotate = (state: ObjectState, times: number) => {
    const timesNeeded = times % 4;
    for (let i = 0; i < timesNeeded; i += 1) rotateOnce(state)
}

const rotateOnce = (matrix: ObjectState) => {
    for (let i = 0; i < 2; i++) {
        const value = matrix[0][i];
        matrix[0][i] = matrix[2 - i][0];
        matrix[2 - i][0] = matrix[2][2 - i];
        matrix[2][2 - i] = matrix[i][2]
        matrix[i][2] = value
    }
}