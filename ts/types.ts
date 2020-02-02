export type CellState = { color: string, active: boolean };

export interface Machine {
    getActions(): (() => void)[];

    getVariants(): (() => void)[];

    transform(objectState: CellState[][]): void;
}
