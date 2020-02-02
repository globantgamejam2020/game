var Colors;
(function (Colors) {
    Colors["red"] = "#ff0000";
    Colors["black"] = "#000000";
    Colors["white"] = "#ffffff";
    Colors["green"] = "#00ff00";
    Colors["blue"] = "#0000ff";
    Colors["yellow"] = "#ffff00";
    Colors["cyan"] = "#00ffff";
    Colors["magenta"] = "#ff00ff";
})(Colors || (Colors = {}));
class MachineColorRotacion {
    constructor() {
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
    static rotateOnce(objectState) {
        for (let i = 0; i < 2; i++) {
            const value = objectState[0][i];
            objectState[0][i] = objectState[2 - i][0];
            objectState[2 - i][0] = objectState[2][2 - i];
            objectState[2][2 - i] = objectState[i][2];
            objectState[i][2] = value;
        }
    }
    getActions() {
        return [
            {
                action: () => {
                    this.color = !this.color;
                    console.log('color');
                    return this.color;
                }, getValue: () => this.color,
            },
            {
                action: () => {
                    this.rotar = !this.rotar;
                    console.log('rotar');
                    return this.rotar;
                }, getValue: () => this.rotar,
            },
            {
                action: () => {
                    this.on = !this.on;
                    console.log('on');
                    return this.on;
                }, getValue: () => this.on,
            },
            {
                action: () => {
                    this.reset();
                    console.log('reset');
                    return false;
                }, getValue: () => false,
            },
        ];
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
            },
            {
                action: () => {
                    if (!this.rotate90)
                        return;
                    this.rotate180 = !this.rotate180;
                    if (!this.rotate180)
                        this.rotate270 = false;
                    console.log('rotate180');
                },
                getValue: () => this.rotate180
            },
            {
                action: () => {
                    if (!this.rotate180)
                        return;
                    this.rotate270 = !this.rotate270;
                    console.log('rotate270');
                },
                getValue: () => this.rotate270
            },
            ...[
                {
                    action: () => {
                        this.colorR = !this.colorR;
                        console.log('colorR');
                    },
                    getValue: () => this.colorR
                },
                {
                    action: () => {
                        this.colorG = !this.colorG;
                        console.log('colorG');
                    },
                    getValue: () => this.colorG
                }, {
                    action: () => {
                        this.colorB = !this.colorB;
                        console.log('colorB');
                    },
                    getValue: () => this.colorB
                },
            ].sort(() => Math.random() - 0.5)
        ];
    }
    transform(objectState) {
        if (!this.on)
            return false;
        if (this.rotar) {
            if (this.rotate90) {
                this.rotate(objectState, 1);
            }
            else if (this.rotate180) {
                this.rotate(objectState, 2);
            }
            else if (this.rotate270) {
                this.rotate(objectState, 3);
            }
        }
        if (this.color) {
            this.paint(objectState);
        }
        return (this.rotar || this.color);
    }
    paint(state) {
        let color = '';
        color += this.colorR ? 'ff' : '00';
        color += this.colorG ? 'ff' : '00';
        color += this.colorB ? 'ff' : '00';
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                state[i][j].color = parseInt(`0x${color}`, 16);
    }
    rotate(state, times) {
        const timesNeeded = times % 4;
        for (let i = 0; i < timesNeeded; i += 1)
            MachineColorRotacion.rotateOnce(state);
    }
}
