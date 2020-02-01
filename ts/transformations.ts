enum Locations {
    CENTER,
    CORNERS,
    ROW_0,
    ROW_1,
    ROW_2,
    COL_0,
    COL_1,
    COL_2,
}

enum Rotations {
    ROTATE_90 = 1,
    ROTATE_180 = 2,
    ROTATE_270 = 3,
}

enum Colors {
    red = "#ff0000",
}

type Variant = Locations | Rotations | Colors;
type Point = [number, number];

type SwitchesState = [Point, Point[]];
export type ObjectState = (string | undefined)[][];

type Transformation = (state: ObjectState, variants: Variant[]) => void;
type MachineConfiguration = Map<Point, [Transformation, Map<Point, Variant>]>

const transformations: Transformation[] = [];

export const applyTransformations = (switchesState: SwitchesState, configuration: MachineConfiguration, object: ObjectState) => {
    const [transformationCoordinates, variantsCoordinates] = switchesState;
    const [transformation, variantsConfiguration] = configuration.get(transformationCoordinates)!;
    const variants = variantsCoordinates.map(v => variantsConfiguration.get(v)!);
    transformation(object, variants);
};

export const getMachineConfiguration = () => {
    const result = new Map();

    let coordinates = [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 0], [1, 1], [1, 2], [1, 3],
        [2, 0], [2, 1], [2, 2], [2, 3],
        [3, 0], [3, 1], [3, 2], [3, 3],
    ].sort(() => Math.random() - 0.5);

    for (const transformation of transformations) {
        result.set(coordinates.pop()!, transformation);
    }


};
