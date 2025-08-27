import LerpApp from './interpolation.js';
import audioManager from './audioManager.js';
import { Color, restartCssAnimation } from './utils.js';

const getRootColor = key => {
    const str = getComputedStyle(document.documentElement).getPropertyValue(key);
    const getColorChannel = channel => Number(str.match(/\d+/g)[channel]);
    return {
        r: getColorChannel(0), 
        g: getColorChannel(1), 
        b: getColorChannel(2),
        a: !isNaN(getColorChannel(3)) ? getColorChannel(3) : 1
    } 
}

const getNightModeEnabled = () => localStorage.getItem('night-mode-enabled') === 'true';

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
        const nightMode = getNightModeEnabled()
        this.colorLerp.run(nightMode ? this.darkModeColor.duplicate() : this.brightModeColor.duplicate(), colorChangeTime);
    }

    apply() {
        const nightMode = getNightModeEnabled()
        this.colorLerp.apply(nightMode ? this.darkModeColor.duplicate() : this.brightModeColor.duplicate())
    }
}

class RootColorChanger extends ColorChanger {
    constructor(key, darkModeColor) {
        const rootColor = getRootColor(key)
        super(new Color(rootColor.r, rootColor.g, rootColor.b, rootColor.a), darkModeColor)
        this.colorLerp.setter = v => document.documentElement.style.setProperty(key, v.getRGBAStyle());
    }
}

class CanvasColorChanger extends ColorChanger {
    constructor(uniformName, brightModeColor, darkModeColor) {
        super(brightModeColor, darkModeColor)
        const gl = canvas.getContext("webgl");
        const uniform = gl.getUniformLocation(program, uniformName);
        this.colorLerp.setter = v => gl.uniform3fv(uniform, [v.r, v.g, v.b]);
    }
}

const colorChangers = [
    new RootColorChanger('--main-color', new Color(40, 40, 45)),
    new RootColorChanger('--main-font-color', new Color(165, 165, 165)),
    new RootColorChanger('--gray-color', new Color(75, 75, 75)),
    new RootColorChanger('--bright-gray-color', new Color(110, 110, 110)),
    new RootColorChanger('--window-panel-color', new Color(0, 0, 0)),
    new RootColorChanger('--buttons-mobile-color', new Color(0, 0, 0, 0.5)),
    new RootColorChanger('--weak-font-color', new Color(255, 255, 255, 0.2)),
    new RootColorChanger('--weak-inverse-main-color', new Color(255, 255, 255, 0.03)),
    new CanvasColorChanger('background_color', new Color(1, 1, 1), new Color(0.1, 0.1, 0.12)),
    new CanvasColorChanger('waves_color', new Color(0.9, 0.9, 1), new Color (0, 0, 0)),
    new CanvasColorChanger('waves_color_2', new Color(1., 0.9, 0.9), new Color (.3, .3, .4))
]

const sunIcon = '<i class="bi bi-sun-fill"></i>';
const moonIcon = '<i class="bi bi-moon-fill"></i>';
const nightModeBtn = document.getElementById('night-mode-btn')
nightModeBtn.addEventListener('click', () => {
    const nightModeEnabled = getNightModeEnabled()
    if (nightModeEnabled === false) {
        localStorage.setItem('night-mode-enabled', 'true');
        nightModeBtn.innerHTML = sunIcon
        audioManager.resetPlay(audioManager.sounds.shine)
    } else {
        localStorage.setItem('night-mode-enabled', 'false');
        nightModeBtn.innerHTML = moonIcon
        audioManager.resetPlay(audioManager.sounds.shine2)
    }
    restartCssAnimation(nightModeBtn.querySelector('i'), 'btn-animation');
    colorChangers.map(colorChanger => colorChanger.run())
})

nightModeBtn.addEventListener('mouseover', () => {
    audioManager.resetPlayHover(audioManager.sounds.hover);
})
const nightModeEnabled = getNightModeEnabled()
nightModeBtn.innerHTML = nightModeEnabled ? sunIcon : moonIcon
colorChangers.map(colorChanger => colorChanger.apply())

// QUICK BUG FIX
if (!getNightModeEnabled()) {
   document.documentElement.style.setProperty('--weak-inverse-main-color', 'rgba(0, 0, 0, 0.03)')
   document.documentElement.style.setProperty('--weak-font-color', 'rgba(0, 0, 0, 0.2)');
}