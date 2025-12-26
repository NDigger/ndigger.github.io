import LerpApp from './interpolation.js';
import { Color } from './structures.js';

const getRootColor = key => {
    const str = getComputedStyle(document.documentElement).getPropertyValue(key);
    const getColorChannel = channel => parseFloat(str.match(/\d+(\.\d+)?/g)[channel]);
    return {
        r: getColorChannel(0), 
        g: getColorChannel(1), 
        b: getColorChannel(2),
        a: !isNaN(getColorChannel(3)) ? getColorChannel(3) : 1
    } 
}

const colorChangeTime = 0.2;
class ColorChanger {
    colorLerp = new LerpApp.Lerp();
    brightModeColor = null;
    darkModeColor = null;

    constructor(brightModeColor, darkModeColor) {
        this.brightModeColor = brightModeColor.duplicate();
        this.darkModeColor = darkModeColor.duplicate();
        this.colorLerp.value = brightModeColor.duplicate();
    }

    run() {
        this.colorLerp.run(config.nightModeEnabled ? this.darkModeColor.duplicate() : this.brightModeColor.duplicate(), colorChangeTime);
    }

    apply() {
        this.colorLerp.apply(config.nightModeEnabled ? this.darkModeColor.duplicate() : this.brightModeColor.duplicate())
    }
}

export class RootColorChanger extends ColorChanger {
    constructor(key, darkModeColor) {
        const rootColor = getRootColor(key)
        super(new Color(rootColor.r, rootColor.g, rootColor.b, rootColor.a), darkModeColor)
        this.colorLerp.setter = v => document.documentElement.style.setProperty(key, v.getRGBAStyle());
    }
}

export class CanvasColorChanger extends ColorChanger {
    constructor(uniformName, brightModeColor, darkModeColor) {
        super(brightModeColor, darkModeColor)
        const gl = canvas.getContext("webgl");
        const uniform = gl.getUniformLocation(program, uniformName);
        this.colorLerp.setter = v => gl.uniform3fv(uniform, [v.r, v.g, v.b]);
    }
}