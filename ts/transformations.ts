type ArrayFixed<T, L extends number> = [T, ...Array<T>] & { length: L }

type Point = [number, number];
type SwitchesState = ArrayFixed<ArrayFixed<boolean, 4>, 4>;
type ObjectState = ArrayFixed<ArrayFixed<boolean, 3>, 3>;
type MachineConfiguration = Map<Point[], (state: ObjectState) => ObjectState>;

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