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
        this.switchOnTextureColor = 'SW_COLOR_01';
        this.switchOnTextureRotate = 'SW_GIRAR_01';
        this.switchOnTexturePower = 'SW_POWER_01';
        this.switchOnTextureReset = 'SW_RESET_01';
        this.switchOffTextureColor = 'SW_COLOR_02';
        this.switchOffTextureRotate = 'SW_GIRAR_02';
        this.switchOffTexturePower = 'SW_POWER_02';
        this.switchOffTextureReset = 'SW_RESET_02';
        this.switchOffTexture = "switch-on";
        this.switchOnTexture = "switch-off";
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
                getSwitchOnTexture: () => this.switchOnTextureColor,
                getSwitchOffTexture: () => this.switchOffTextureColor
            },
            {
                action: () => {
                    this.rotar = !this.rotar;
                    console.log('rotar');
                    return this.rotar;
                }, getValue: () => this.rotar,
                getSwitchOnTexture: () => this.switchOnTextureRotate,
                getSwitchOffTexture: () => this.switchOffTextureRotate
            },
            {
                action: () => {
                    this.on = !this.on;
                    console.log('on');
                    return this.on;
                }, getValue: () => this.on,
                getSwitchOnTexture: () => this.switchOnTexturePower,
                getSwitchOffTexture: () => this.switchOffTexturePower
            },
            {
                action: () => {
                    this.reset();
                    console.log('reset');
                    return false;
                }, getValue: () => false,
                getSwitchOnTexture: () => this.switchOnTextureReset,
                getSwitchOffTexture: () => this.switchOffTextureReset
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
                getSwitchOnTexture: () => this.switchOnTexture,
                getSwitchOffTexture: () => this.switchOffTexture
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
                getValue: () => this.rotate180,
                getSwitchOnTexture: () => this.switchOnTexture,
                getSwitchOffTexture: () => this.switchOffTexture
            },
            {
                action: () => {
                    if (!this.rotate180)
                        return;
                    this.rotate270 = !this.rotate270;
                    console.log('rotate270');
                },
                getValue: () => this.rotate270,
                getSwitchOnTexture: () => this.switchOnTexture,
                getSwitchOffTexture: () => this.switchOffTexture
            },
            ...[
                {
                    action: () => {
                        this.colorR = !this.colorR;
                        console.log('colorR');
                    },
                    getValue: () => this.colorR,
                    getSwitchOnTexture: () => this.switchOnTexture,
                    getSwitchOffTexture: () => this.switchOffTexture
                },
                {
                    action: () => {
                        this.colorG = !this.colorG;
                        console.log('colorG');
                    },
                    getValue: () => this.colorG,
                    getSwitchOnTexture: () => this.switchOnTexture,
                    getSwitchOffTexture: () => this.switchOffTexture
                }, {
                    action: () => {
                        this.colorB = !this.colorB;
                        console.log('colorB');
                    },
                    getValue: () => this.colorB,
                    getSwitchOnTexture: () => this.switchOnTexture,
                    getSwitchOffTexture: () => this.switchOffTexture
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
