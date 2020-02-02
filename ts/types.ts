export type CellState = { color: number, active: boolean };

export interface Machine {
    getActions(): { action: () => void, getValue: () => boolean }[];

    getVariants(): { action: () => void, getValue: () => boolean }[];

    transform(objectState: CellState[][]): boolean;
}

const levels = [
    {
        entrada: [
            [
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: true }
            ],
            [
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: true }
            ],
            [
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: true }
            ]
        ],
        salida: [
            [
                { color: parseInt("0x0000ff", 16), active: false },
                { color: parseInt("0x0000ff", 16), active: true },
                { color: parseInt("0x0000ff", 16), active: false }
            ],
            [
                { color: parseInt("0x0000ff", 16), active: false },
                { color: parseInt("0x0000ff", 16), active: true },
                { color: parseInt("0x0000ff", 16), active: false }
            ],
            [
                { color: parseInt("0x0000ff", 16), active: true },
                { color: parseInt("0x0000ff", 16), active: true },
                { color: parseInt("0x0000ff", 16), active: true }
            ]
        ]
    },

    {
        entrada: [
            [
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: false },
                { color: parseInt("0xffffff", 16), active: false }
            ],
            [
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: false },
                { color: parseInt("0xffffff", 16), active: false }
            ],
            [
                { color: parseInt("0xffffff", 16), active: false },
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: true }
            ]
        ],
        salida: [
            [
                { color: parseInt("0xff00ff", 16), active: true },
                { color: parseInt("0xff00ff", 16), active: true },
                { color: parseInt("0xff00ff", 16), active: false }
            ],
            [
                { color: parseInt("0xff00ff", 16), active: true },
                { color: parseInt("0xff00ff", 16), active: false },
                { color: parseInt("0xff00ff", 16), active: true }
            ],
            [
                { color: parseInt("0xff00ff", 16), active: false },
                { color: parseInt("0xff00ff", 16), active: true },
                { color: parseInt("0xff00ff", 16), active: true }
            ]
        ]
    },

    {
        entrada: [
            [
                { color: parseInt("0xffffff", 16), active: false },
                { color: parseInt("0xffffff", 16), active: false },
                { color: parseInt("0xffffff", 16), active: true }
            ],
            [
                { color: parseInt("0xffffff", 16), active: false },
                { color: parseInt("0xffffff", 16), active: false },
                { color: parseInt("0xffffff", 16), active: true }
            ],
            [
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: true },
                { color: parseInt("0xffffff", 16), active: true }
            ]
        ],
        salida: [
            [
                { color: parseInt("0x000000", 16), active: true },
                { color: parseInt("0x000000", 16), active: false },
                { color: parseInt("0x000000", 16), active: true }
            ],
            [
                { color: parseInt("0x000000", 16), active: true },
                { color: parseInt("0x000000", 16), active: false },
                { color: parseInt("0x000000", 16), active: true }
            ],
            [
                { color: parseInt("0x000000", 16), active: true },
                { color: parseInt("0x000000", 16), active: true },
                { color: parseInt("0x000000", 16), active: true }
            ]
        ]
    }
];
