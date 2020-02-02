export type CellState = { color: string, active: boolean };

export interface Machine {
    getActions(): (() => void)[];

    getVariants(): (() => void)[];

    transform(objectState: CellState[][]): void;
}

const levels = [
    {
        entrada: [
            [{ color: 'white', active: true }, { color: 'white', active: true }, { color: 'white', active: true }],
            [{ color: 'white', active: true }, { color: 'white', active: true }, { color: 'white', active: true }],
            [{ color: 'white', active: true }, { color: 'white', active: true }, { color: 'white', active: true }]
        ],
        salida: [
            [{ color: 'white', active: false }, { color: 'white', active: true }, { color: 'white', active: false }],
            [{ color: 'white', active: false }, { color: 'white', active: true }, { color: 'white', active: false }],
            [{ color: 'white', active: true }, { color: 'white', active: true }, { color: 'white', active: true }]
        ]
    },
    {
        entrada: [
            [{ color: 'white', active: true }, { color: 'white', active: false }, { color: 'white', active: false }],
            [{ color: 'white', active: true }, { color: 'white', active: false }, { color: 'white', active: false }],
            [{ color: 'white', active: false }, { color: 'white', active: true }, { color: 'white', active: true }]
        ],
        salida: [
            [{ color: 'white', active: true }, { color: 'white', active: true }, { color: 'white', active: false }],
            [{ color: 'white', active: true }, { color: 'white', active: false }, { color: 'white', active: true }],
            [{ color: 'white', active: false }, { color: 'white', active: true }, { color: 'white', active: true }]
        ]
    },
    {
        entrada: [
            [{ color: 'white', active: false }, { color: 'white', active: false }, { color: 'white', active: true }],
            [{ color: 'white', active: false }, { color: 'white', active: false }, { color: 'white', active: true }],
            [{ color: 'white', active: true }, { color: 'white', active: true }, { color: 'white', active: true }]
        ],
        salida: [
            [{ color: 'white', active: true }, { color: 'white', active: false }, { color: 'white', active: true }],
            [{ color: 'white', active: true }, { color: 'white', active: false }, { color: 'white', active: true }],
            [{ color: 'white', active: true }, { color: 'white', active: true }, { color: 'white', active: true }]
        ]
    }
];
