import { Vector2, Color } from './utils/structures.js';
import audioManager from './audioManager.js';
import { CanvasColorChanger } from './utils/colorChangers.js';

const soundBtn = document.getElementById('sound-btn');
const changeSoundState = () => {
    config.soundEnabled = !config.soundEnabled;
    localStorage.setItem('portfolio-config', JSON.stringify(config))
    if (!config.soundEnabled) {
        soundBtn.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
        audioManager.setMasterVolume(0)
    } else {
        soundBtn.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
        audioManager.setMasterVolume(1)
    }
}
soundBtn.addEventListener('click', changeSoundState)
if (!config.soundEnabled) {
    soundBtn.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
}

// Copy text when clicked
const discordBtn = document.getElementById('copy-discord');
const discordCopiedElement = document.getElementById('discord-copied');
discordBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('@pizda69');
    discordBtn.style.display = 'none';
    discordCopiedElement.style.display = 'flex';
    audioManager.resetPlay(audioManager.sounds.clickClose)
    setTimeout(() => {
        discordBtn.style.display = 'block'
        discordCopiedElement.style.display = 'none';
    }, 600)
})

const colorChangers = [
    new CanvasColorChanger('u_backgroundColor', new Color(1, 1, 1), new Color(0.1, 0.1, 0.12)),
    new CanvasColorChanger('u_wavesColor', new Color(0.9, 0.9, 1), new Color (0, 0, 0)),
    new CanvasColorChanger('u_secondaryWavesColor', new Color(1., 1., 1.), new Color (.3, .3, .4)),
]

const sunIcon = '<i class="bi bi-sun-fill"></i>';
const moonIcon = '<i class="bi bi-moon-fill"></i>';
const nightModeBtn = document.getElementById('night-mode-btn')

const updateState = () => {
    const darkMode = config.nightModeEnabled
    document.querySelector('body').classList.toggle('dark', config.nightModeEnabled);
    document.querySelector('html').classList.toggle('dark', config.nightModeEnabled);
    localStorage.setItem('portfolio-config', JSON.stringify(config))
    nightModeBtn.innerHTML = config.nightModeEnabled ? moonIcon : sunIcon
    if (!darkMode) {
        nightModeBtn.innerHTML = sunIcon
    } else {
        nightModeBtn.innerHTML = moonIcon
    }
    colorChangers.map(colorChanger => colorChanger.run())
}

nightModeBtn.addEventListener('click', () => {
    config.nightModeEnabled = !config.nightModeEnabled;
    const darkMode = config.nightModeEnabled;
    if (darkMode) {
        nightModeBtn.innerHTML = sunIcon
        audioManager.resetPlay(audioManager.sounds.shine)
    } else {
        audioManager.resetPlay(audioManager.sounds.shine2)
    }
    updateState()
})

updateState()