const objetos = [
    {
        entrada: [
            [{ color: 'black', active: true }, { color: 'black', active: true }, { color: 'black', active: true }],
            [{ color: 'black', active: true }, { color: 'black', active: true }, { color: 'black', active: true }],
            [{ color: 'black', active: true }, { color: 'black', active: true }, { color: 'black', active: true }]
        ],
        salida: [
            [{ color: 'black', active: false }, { color: 'black', active: true }, { color: 'black', active: false }],
            [{ color: 'black', active: false }, { color: 'black', active: true }, { color: 'black', active: false }],
            [{ color: 'black', active: true }, { color: 'black', active: true }, { color: 'black', active: true }]
        ]
    },
    {
        entrada: [
            [{ color: 'black', active: true }, { color: 'black', active: false }, { color: 'black', active: false }],
            [{ color: 'black', active: true }, { color: 'black', active: false }, { color: 'black', active: false }],
            [{ color: 'black', active: false }, { color: 'black', active: true }, { color: 'black', active: true }]
        ],
        salida: [
            [{ color: 'black', active: true }, { color: 'black', active: true }, { color: 'black', active: false }],
            [{ color: 'black', active: true }, { color: 'black', active: false }, { color: 'black', active: true }],
            [{ color: 'black', active: false }, { color: 'black', active: true }, { color: 'black', active: true }]
        ]
    },
    {
        entrada: [
            [{ color: 'black', active: false }, { color: 'black', active: false }, { color: 'black', active: true }],
            [{ color: 'black', active: false }, { color: 'black', active: false }, { color: 'black', active: true }],
            [{ color: 'black', active: true }, { color: 'black', active: true }, { color: 'black', active: true }]
        ],
        salida: [
            [{ color: 'black', active: true }, { color: 'black', active: false }, { color: 'black', active: true }],
            [{ color: 'black', active: true }, { color: 'black', active: false }, { color: 'black', active: true }],
            [{ color: 'black', active: true }, { color: 'black', active: true }, { color: 'black', active: true }]
        ]
    }
];

type CellState = { color: string, active: boolean };

class MachineSumaResta {
    private on = true;
    private resta = false;

    private center = false;
    private corners = false;
    private middles = false;
    private row_0 = false;
    private row_1 = false;
    private row_2 = false;
    private col_0 = false;
    private col_1 = false;
    private col_2 = false;

    getActions() {
        return [
            () => this.resta = !this.resta,
            () => this.resta = !this.resta,
            () => this.on = !this.on,
            () => this.reset(),
        ]
    }

    getVariants() {
        return [
            () => this.center = !this.center,
            () => this.corners = !this.corners,
            () => this.row_0 = !this.row_0,
            () => this.row_1 = !this.row_1,
            () => this.col_0 = !this.col_0,
            () => this.row_2 = !this.row_2,
            () => this.col_1 = !this.col_1,
            () => this.col_2 = !this.col_2,
            () => this.middles = !this.middles,
        ].sort(() => Math.random() - 0.5);
    }

    reset() {
        this.on = true;
        this.resta = false;
        this.center = false;
        this.corners = false;
        this.row_0 = false;
        this.row_1 = false;
        this.row_2 = false;
        this.col_0 = false;
        this.col_1 = false;
        this.col_2 = false;
    }

    transform(objectState: CellState[][]) {
        const coordinates = this.getCoordinates();
        for (const [x, y] of coordinates) {
            if (this.resta) objectState[x][y].active = false;
            else {
                objectState[x][y].active = true;
                objectState[x][y].color = 'black';
            }
        }
    }

    getCoordinates() {
        let count = 0;
        const aux: Array<Array<number>> = new Array(3).map(() => new Array(3).fill(0));
        if (this.row_0) {
            count += 1;
            aux[0].forEach((_, index, arr) => arr[index] += 1)
        }
        if (this.row_1) {
            count += 1;
            aux[1].forEach((_, index, arr) => arr[index] += 1)
        }
        if (this.row_2) {
            count += 1;
            aux[2].forEach((_, index, arr) => arr[index] += 1)
        }
        if (this.col_0) {
            count += 1;
            for (let i = 0; i < 3; i += 1) aux[i][0] += 1;
        }
        if (this.col_1) {
            count += 1;
            for (let i = 0; i < 3; i += 1) aux[i][1] += 1;
        }
        if (this.col_2) {
            count += 1;
            for (let i = 0; i < 3; i += 1) aux[i][2] += 1;
        }
        if (this.corners) {
            count += 1;
            aux[0][0] += 1;
            aux[0][2] += 1;
            aux[2][0] += 1;
            aux[2][2] += 1;
        }
        if (this.middles) {
            count += 1;
            aux[0][1] += 1;
            aux[1][0] += 1;
            aux[1][2] += 1;
            aux[2][1] += 1;
        }
        if (this.center) {
            count += 1;
            aux[1][1] += 1;
        }
        const result = [];
        for (let i = 0; i < 3; i += 1)
            for (let j = 0; j < 3; j += 1)
                if (aux[i][j] === count)
                    result.push([i, j]);
        return result;
    }
}
