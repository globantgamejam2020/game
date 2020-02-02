import {CellState, Machine} from './types';

class MachineSumaResta implements Machine {

    private switchOnTextureSuma = 'SW_SUMAR_01';
    private switchOnTextureResta = 'SW_RESTAR_01';
    private switchOnTexturePower = 'SW_POWER_01';
    private switchOnTextureReset = 'SW_RESET_01';

    private switchOffTextureSuma = 'SW_SUMAR_02';
    private switchOffTextureResta = 'SW_RESTAR_02';
    private switchOffTexturePower = 'SW_POWER_02';
    private switchOffTextureReset = 'SW_RESET_02';

    private switchOffTexture = "switch-on";
    private switchOnTexture = "switch-off";

    private on = false;
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
            {
                action: () => {
                    this.resta = !this.resta;
                    console.log(`resta: ${this.resta}`);
                }, getValue: () => this.resta,
                getSwitchOnTexture: (): string => this.switchOnTextureResta,
                getSwitchOffTexture: (): string => this.switchOffTextureResta
            },
            {
                action: () => {
                    this.resta = !this.resta;
                    console.log(`resta: ${this.resta}`);
                }, getValue: () => !this.resta,
                getSwitchOnTexture: (): string => this.switchOnTextureSuma,
                getSwitchOffTexture: (): string => this.switchOffTextureSuma
            },
            {
                action: () => {
                    this.on = !this.on;
                    console.log('on');
                }, getValue: () => this.on,
                getSwitchOnTexture: (): string => this.switchOnTexturePower,
                getSwitchOffTexture: (): string => this.switchOffTexturePower
            },
            {
                action: () => {
                    this.reset();
                    console.log('reset');
                }, getValue: () => false,
                getSwitchOnTexture: (): string => this.switchOnTextureReset,
                getSwitchOffTexture: (): string => this.switchOffTextureReset
            },
        ]
    }

    getVariants() {
        return [
            {
                action: () => {
                    this.center = !this.center;
                    console.log('center');
                }, getValue: () => this.center,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    this.corners = !this.corners;
                    console.log('corners');
                }, getValue: () => this.corners,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    this.row_0 = !this.row_0;
                    console.log('row_0');
                }, getValue: () => this.row_0,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    this.row_1 = !this.row_1;
                    console.log('row_1');
                }, getValue: () => this.row_1,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    this.row_2 = !this.row_2;
                    console.log('row_2');
                }, getValue: () => this.row_2,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    this.col_0 = !this.col_0;
                    console.log('col_0');
                }, getValue: () => this.col_0,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    this.col_1 = !this.col_1;
                    console.log('col_1');
                }, getValue: () => this.col_1,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    this.col_2 = !this.col_2;
                    console.log('col_2');
                }, getValue: () => this.col_2,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    this.middles = !this.middles;
                    console.log('middles');
                }, getValue: () => this.middles,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
        ].sort(() => Math.random() - 0.5);
    }

    reset() {
        this.on = false;
        this.resta = false;
        this.center = false;
        this.corners = false;
        this.row_0 = false;
        this.row_1 = false;
        this.row_2 = false;
        this.col_0 = false;
        this.col_1 = false;
        this.col_2 = false;
        this.middles = false;
    }

    transform(objectState: CellState[][]) {
        if (!this.on) return false;
        const coordinates = this.getCoordinates();
        for (const [x, y] of coordinates) {
            if (this.resta) objectState[x][y].active = false;
            else {
                objectState[x][y].active = true;
                objectState[x][y].color = 0x000000;
            }
        }
        return true;
    }

    getCoordinates() {
        let count = 0;
        const aux = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        if (this.row_0) {
            count += 1;
            for (let i = 0; i < 3; i += 1) aux[0][i] += 1;
        }
        if (this.row_1) {
            count += 1;
            for (let i = 0; i < 3; i += 1) aux[1][i] += 1;
        }
        if (this.row_2) {
            count += 1;
            for (let i = 0; i < 3; i += 1) aux[2][i] += 1;
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
        const result: [number, number][] = [];
        if (count === 0) return result;
        let max = 0;
        for (let i = 0; i < 3; i += 1)
            for (let j = 0; j < 3; j += 1) {
                if (max < aux[i][j]) {
                    result.splice(0);
                    max = aux[i][j];
                }
                if (aux[i][j] === max)
                    result.push([i, j]);
            }
        return result;
    }
}
