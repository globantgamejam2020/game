export type CellState = { color: string, active: boolean };

export interface Machine {
    getActions(): (() => void)[];

    getVariants(): (() => void)[];

    transform(objectState: CellState[][]): void;
}

const levels = [
    {
        entrada: [
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: true }, { color: 0xffffff, active: true }],
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: true }, { color: 0xffffff, active: true }],
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: true }, { color: 0xffffff, active: true }]
        ],
        salida: [
            [{ color: 0xffffff, active: false }, { color: 0xffffff, active: true }, { color: 0xffffff, active: false }],
            [{ color: 0xffffff, active: false }, { color: 0xffffff, active: true }, { color: 0xffffff, active: false }],
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: true }, { color: 0xffffff, active: true }]
        ]
    },
    {
        entrada: [
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: false }, { color: 0xffffff, active: false }],
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: false }, { color: 0xffffff, active: false }],
            [{ color: 0xffffff, active: false }, { color: 0xffffff, active: true }, { color: 0xffffff, active: true }]
        ],
        salida: [
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: true }, { color: 0xffffff, active: false }],
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: false }, { color: 0xffffff, active: true }],
            [{ color: 0xffffff, active: false }, { color: 0xffffff, active: true }, { color: 0xffffff, active: true }]
        ]
    },
    {
        entrada: [
            [{ color: 0xffffff, active: false }, { color: 0xffffff, active: false }, { color: 0xffffff, active: true }],
            [{ color: 0xffffff, active: false }, { color: 0xffffff, active: false }, { color: 0xffffff, active: true }],
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: true }, { color: 0xffffff, active: true }]
        ],
        salida: [
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: false }, { color: 0xffffff, active: true }],
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: false }, { color: 0xffffff, active: true }],
            [{ color: 0xffffff, active: true }, { color: 0xffffff, active: true }, { color: 0xffffff, active: true }]
        ]
    }
];
