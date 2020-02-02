import {CellState, Machine} from './types';

enum Colors {
    red = "#ff0000",
    black = "#000000",
    white = "#ffffff",
    green = "#00ff00",
    blue = "#0000ff",
    yellow = "#ffff00",
    cyan = "#00ffff",
    magenta = "#ff00ff"
}

class MachineColorRotacion implements Machine {

    private switchOnTextureColor = 'SW_COLOR_01';
    private switchOnTextureRotate = 'SW_GIRAR_01';
    private switchOnTexturePower = 'SW_POWER_01';
    private switchOnTextureReset = 'SW_RESET_01';

    private switchOffTextureColor = 'SW_COLOR_02';
    private switchOffTextureRotate = 'SW_GIRAR_02';
    private switchOffTexturePower = 'SW_POWER_02';
    private switchOffTextureReset = 'SW_RESET_02';

    private switchOffTexture = "switch-on";
    private switchOnTexture = "switch-off";

    private on = false;
    private color = false;
    private rotar = false;

    private colorR = false;
    private colorG = false;
    private colorB = false;

    private rotate90 = false;
    private rotate180 = false;
    private rotate270 = false;

    private static rotateOnce(objectState: CellState[][]) {
        for (let i = 0; i < 2; i++) {
            const value = objectState[0][i];
            objectState[0][i] = objectState[2 - i][0];
            objectState[2 - i][0] = objectState[2][2 - i];
            objectState[2][2 - i] = objectState[i][2];
            objectState[i][2] = value
        }
    }

    getActions() {
        return [
            {
                action: () => {
                    this.color = !this.color;
                    console.log('color');
                    return this.color
                }, getValue: () => this.color,
                getSwitchOnTexture: (): string => this.switchOnTextureColor,
                getSwitchOffTexture: (): string => this.switchOffTextureColor
            },
            {
                action: () => {
                    this.rotar = !this.rotar;
                    console.log('rotar');
                    return this.rotar
                }, getValue: () => this.rotar,
                getSwitchOnTexture: (): string => this.switchOnTextureRotate,
                getSwitchOffTexture: (): string => this.switchOffTextureRotate
            },
            {
                action: () => {
                    this.on = !this.on;
                    console.log('on');
                    return this.on
                }, getValue: () => this.on,
                getSwitchOnTexture: (): string => this.switchOnTexturePower,
                getSwitchOffTexture: (): string => this.switchOffTexturePower
            },
            {
                action: () => {
                    this.reset();
                    console.log('reset');
                    return false;
                }, getValue: () => false,
                getSwitchOnTexture: (): string => this.switchOnTextureReset,
                getSwitchOffTexture: (): string => this.switchOffTextureReset
            },
        ]
    }

    reset() {
        this.on = false;
        this.color = false;
        this.rotar = false;

        this.colorR = false;
        this.colorG = false;
        this.colorB = false;

        this.rotate90 = false;
        this.rotate180 = false;
        this.rotate270 = false;
    }

    getVariants() {
        return [
            {
                action: () => {
                    this.rotate90 = !this.rotate90;
                    if (!this.rotate90) {
                        this.rotate180 = false;
                        this.rotate270 = false;
                    }
                    console.log('rotate90');
                }, getValue: () => this.rotate90,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    if (!this.rotate90) return;
                    this.rotate180 = !this.rotate180;
                    if (!this.rotate180) this.rotate270 = false;
                    console.log('rotate180');
                },
                getValue: () => this.rotate180,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            {
                action: () => {
                    if (!this.rotate180) return;
                    this.rotate270 = !this.rotate270;
                    console.log('rotate270');
                },
                getValue: () => this.rotate270,
                getSwitchOnTexture: (): string => this.switchOnTexture,
                getSwitchOffTexture: (): string => this.switchOffTexture
            },
            ...[
                {
                    action: () => {
                        this.colorR = !this.colorR;
                        console.log('colorR');
                    },
                    getValue: () => this.colorR,
                    getSwitchOnTexture: (): string => this.switchOnTexture,
                    getSwitchOffTexture: (): string => this.switchOffTexture
                },
                {
                    action: () => {
                        this.colorG = !this.colorG;
                        console.log('colorG');
                    },
                    getValue: () => this.colorG,
                    getSwitchOnTexture: (): string => this.switchOnTexture,
                    getSwitchOffTexture: (): string => this.switchOffTexture
                }, {
                    action: () => {
                        this.colorB = !this.colorB;
                        console.log('colorB');
                    },
                    getValue: () => this.colorB,
                    getSwitchOnTexture: (): string => this.switchOnTexture,
                    getSwitchOffTexture: (): string => this.switchOffTexture
                },
            ].sort(() => Math.random() - 0.5)
        ];
    }

    transform(objectState: CellState[][]): boolean {
        if (!this.on)
            return false;

        if (this.rotar) {
            if (this.rotate90) {
                this.rotate(objectState, 1)
            } else if (this.rotate180) {
                this.rotate(objectState, 2)
            } else if (this.rotate270) {
                this.rotate(objectState, 3)
            }
        }

        if (this.color) {
            this.paint(objectState);
        }

        return (this.rotar || this.color);
    }

    paint(state: CellState[][]) {
        let color = '';

        color += this.colorR ? 'ff' : '00';
        color += this.colorG ? 'ff' : '00';
        color += this.colorB ? 'ff' : '00';

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                state[i][j].color = parseInt(`0x${color}`, 16);

    }

    rotate(state: CellState[][], times: number) {
        const timesNeeded = times % 4;
        for (let i = 0; i < timesNeeded; i += 1) MachineColorRotacion.rotateOnce(state)
    }
}
