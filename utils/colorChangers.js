import LerpApp from './interpolation.js';

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

export class CanvasColorChanger extends ColorChanger {
    constructor(uniformName, brightModeColor, darkModeColor) {
        super(brightModeColor, darkModeColor)
        const gl = canvas.getContext("webgl");
        const uniform = gl.getUniformLocation(program, uniformName);
        this.colorLerp.setter = v => gl.uniform3fv(uniform, [v.r, v.g, v.b]);
    }
}