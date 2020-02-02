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
    private on = true;
    private color = false;
    private rotar = false;

    private reverseColor = false;
    private colorR = false;
    private colorG = false;
    private colorB = false;

    private reverseRotate = false;
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
            () => {
                this.color = !this.color;
                return this.color
            },
            () => {
                this.rotar = !this.color;
                return this.rotar
            },
            () => {
                this.on = !this.on;
                return this.on
            },
            () => {
                this.reset();
                return false
            },
        ]
    }

    reset() {
        this.on = true;
        this.color = false;
        this.rotar = false;

        this.reverseColor = false;
        this.colorR = false;
        this.colorG = false;
        this.colorB = false;

        this.reverseRotate = false;
        this.rotate90 = false;
        this.rotate180 = false;
        this.rotate270 = false;
    }

    getVariants() {
        return [
            () => {
                this.reverseRotate = !this.reverseRotate;
                return this.reverseRotate
            },
            () => {
                this.rotate90 = !this.rotate90;
                return this.rotate90
            },
            () => {
                this.rotate180 = !this.rotate180;
                return this.rotate180
            },
            () => {
                this.rotate270 = !this.rotate270;
                return this.rotate270
            },
            ...[
                () => {
                    this.reverseColor = !this.reverseColor;
                    return this.reverseColor
                },
                () => {
                    this.colorR = !this.colorR;
                    return this.colorR
                },
                () => {
                    this.colorG = !this.colorG;
                    return this.colorG
                },
                () => {
                    this.colorB = !this.colorB;
                    return this.colorB
                },
            ].sort(() => Math.random() - 0.5)
        ];
    }

    transform(objectState: CellState[][]): void {
        if (!this.on)
            return;

        if (this.rotar) {
            if (this.rotate90) {
                this.rotate(objectState, (this.reverseRotate) ? 3 : 1)
            } else if (this.rotate180) {
                this.rotate(objectState, 2)
            } else if (this.rotate270) {
                this.rotate(objectState, (this.reverseRotate) ? 1 : 3)
            }
        }

        if (this.color) {
            this.paint(objectState);
        }
    }

    paint(state: CellState[][]) {
        let color = '#';

        color += this.colorR ? 'ff' : '00';
        color += this.colorG ? 'ff' : '00';
        color += this.colorB ? 'ff' : '00';

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                state[i][j].color = color;

    }

    rotate(state: CellState[][], times: number) {
        const timesNeeded = times % 4;
        for (let i = 0; i < timesNeeded; i += 1) MachineColorRotacion.rotateOnce(state)
    }
}
