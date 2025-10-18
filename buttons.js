import { ParticleEmitter } from './particles.js';
import { Vector2, restartCssAnimation, getNightModeEnabled, Color } from './utils.js';
import audioManager from './audioManager.js';
import { RootColorChanger, CanvasColorChanger } from './colorChangers.js';

// Music buttons adjustments
const musicParticlesEmitter = new ParticleEmitter();
let temp = document.createElement("i");
temp.classList.add('bi', 'bi-music-note-beamed', 'main-window-music-particle');
musicParticlesEmitter.element = temp;
musicParticlesEmitter.container = document.getElementById('main-window');
musicParticlesEmitter.angle = -Math.PI/4
musicParticlesEmitter.angleVariation = Math.PI * 1.5;
musicParticlesEmitter.speed = 0.5;
musicParticlesEmitter.emission = 2;
musicParticlesEmitter.lifetime = 3;
musicParticlesEmitter.offset = new Vector2(50, -100)
musicParticlesEmitter.emissionEnabled = true

const musicBtn = document.getElementById('music-btn');
const musicIllustrationBtn = document.getElementById('music-illustration-btn');
const changeMusicState = () => {
    restartCssAnimation(musicBtn, 'btn-animation');
    restartCssAnimation(musicIllustrationBtn, 'music-illustration-animation');
    if ((localStorage.getItem('music-enabled') ?? 'false') === 'false') {
        localStorage.setItem('music-enabled', 'true');
        audioManager.music.currentTime = 0;
        audioManager.music.play();
        musicBtn.classList.remove('audio-btn-disabled');
        musicIllustrationBtn.src = './images/musicIllustrationActive.png'
        musicParticlesEmitter.emissionEnabled = true
    } else {
        localStorage.setItem('music-enabled', 'false');
        audioManager.music.pause();
        musicBtn.classList.add('audio-btn-disabled');
        musicIllustrationBtn.src = './images/musicIllustrationInactive.png'
        musicParticlesEmitter.emissionEnabled = false;
    }
}

if ((localStorage.getItem('music-enabled') ?? 'false') === 'false') {
    musicBtn.classList.add('audio-btn-disabled');
    musicIllustrationBtn.src = './images/musicIllustrationInactive.png'
    musicParticlesEmitter.emissionEnabled = false
}

const soundBtn = document.getElementById('sound-btn');
const changeSoundState = () => {
    restartCssAnimation(soundBtn, 'btn-animation');
    if ((localStorage.getItem('sound-enabled') ?? 'true') === 'true') {
        localStorage.setItem('sound-enabled', 'false');
        soundBtn.classList.add('audio-btn-disabled');
        audioManager.setMasterVolume(0)
    } else {
        localStorage.setItem('sound-enabled', 'true');
        soundBtn.classList.remove('audio-btn-disabled');
        audioManager.setMasterVolume(1)
    }
}
soundBtn.addEventListener('click', changeSoundState)
soundBtn.addEventListener('mouseover', () => audioManager.resetPlayHover(audioManager.sounds.hover))
if ((localStorage.getItem('sound-enabled') ?? 'true') === 'false') {
    soundBtn.classList.add('audio-btn-disabled');
}

musicBtn.addEventListener('click', changeMusicState);
musicIllustrationBtn.addEventListener('click', changeMusicState);

// Blinking music button imitation
setInterval(() => {
    setTimeout(() => {
        if ((localStorage.getItem('music-enabled') ?? 'true') === 'true') return
        musicIllustrationBtn.src = 'images/musicIllustrationInactiveBlink.png'
        setTimeout(() => {
            if ((localStorage.getItem('music-enabled') ?? 'true') === 'true') return
            musicIllustrationBtn.src = 'images/musicIllustrationInactive.png'
        }, 100)
    }, Math.random() * 4500)
}, 5000)

// Copy text when clicked
const discordBtn = document.getElementById('discord-btn');
discordBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('@pizda69');
    restartCssAnimation(discordBtn, 'show-copied-popup');
})

// Add SFX to bottom buttons
for (const child of document.getElementById('bottom-buttons').children) {
    child.addEventListener('mouseover', () => {
        audioManager.resetPlayHover(audioManager.sounds.hover)
    })
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
    new RootColorChanger('--window-background-color', new Color(255, 255, 255, 0)),
    new RootColorChanger('--title-author-text-shadow-color', new Color(255, 162, 0, 0.5)),
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