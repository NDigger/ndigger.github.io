import { ParticleEmitter } from './utils/particles.js';
import { Vector2, restartCssAnimation, Color } from './utils/structures.js';
import audioManager from './audioManager.js';
import { CanvasColorChanger } from './utils/colorChangers.js';

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
musicParticlesEmitter.offset = new Vector2(60, -110)
musicParticlesEmitter.emissionEnabled = false

const musicBtn = document.getElementById('music-btn');
const musicIllustrationBtn = document.querySelector('#music-illustration-btn');
const musicIllustrationBtnImg = document.querySelector('#music-illustration-btn img');
const changeMusicState = () => {
    restartCssAnimation(musicBtn, 'btn-animation');
    restartCssAnimation(musicIllustrationBtnImg, 'music-illustration-animation');
    config.musicEnabled = !config.musicEnabled
    localStorage.setItem('portfolio-config', JSON.stringify(config))
    if (config.musicEnabled) {
        audioManager.music.currentTime = 0;
        audioManager.music.play();
        musicBtn.classList.remove('disabled');
        musicIllustrationBtnImg.src = './images/musicIllustrationActive.png'
        musicParticlesEmitter.emissionEnabled = true
    } else {
        audioManager.music.pause();
        musicBtn.classList.add('disabled');
        musicIllustrationBtnImg.src = './images/musicIllustrationInactive.png'
        musicParticlesEmitter.emissionEnabled = false;
    }
}

if (!config.musicEnabled) {
    musicBtn.classList.add('disabled');
}

if (!config.musicEnabled) {
    musicIllustrationBtnImg.src = './images/musicIllustrationInactiveSleep.png'
} else {
    musicIllustrationBtnImg.src = './images/musicIllustrationActiveSleep.png'
}
    

document.addEventListener('click', () => {
    if (config.musicEnabled) {
        musicParticlesEmitter.emissionEnabled = true
    }

    restartCssAnimation(musicIllustrationBtnImg, 'music-illustration-animation');
    if (!config.musicEnabled) {
        musicIllustrationBtnImg.src = './images/musicIllustrationInactive.png'
    } else {
        musicIllustrationBtnImg.src = './images/musicIllustrationActive.png'
    }
        
    // Blinking music button imitation
    setInterval(() => {
        setTimeout(() => {
            if (config.musicEnabled) return
            musicIllustrationBtnImg.src = 'images/musicIllustrationInactiveBlink.png'
            setTimeout(() => {
                if (config.musicEnabled) return
                musicIllustrationBtnImg.src = 'images/musicIllustrationInactive.png'
            }, 100)
        }, Math.random() * 4500)
    }, 5000)

    musicBtn.addEventListener('click', changeMusicState);
    musicIllustrationBtn.addEventListener('click', changeMusicState);
}, {once: true});

const soundBtn = document.getElementById('sound-btn');
const changeSoundState = () => {
    restartCssAnimation(soundBtn, 'btn-animation');
    config.soundEnabled = !config.soundEnabled;
    localStorage.setItem('portfolio-config', JSON.stringify(config))
    if (!config.soundEnabled) {
        soundBtn.classList.add('disabled');
        audioManager.setMasterVolume(0)
    } else {
        soundBtn.classList.remove('disabled');
        audioManager.setMasterVolume(1)
    }
}
soundBtn.addEventListener('click', changeSoundState)
if (!config.soundEnabled) {
    soundBtn.classList.add('disabled');
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
    new CanvasColorChanger('u_secondaryWavesColor', new Color(1., 0.9, 0.9), new Color (.3, .3, .4)),
]

const sunIcon = '<i class="bi bi-sun-fill"></i>';
const moonIcon = '<i class="bi bi-moon-fill"></i>';
const nightModeBtn = document.getElementById('night-mode-btn')

const updateState = () => {
    const darkMode = config.nightModeEnabled
    document.querySelector('body').classList.toggle('dark', config.nightModeEnabled);
    document.querySelector('html').classList.toggle('dark', config.nightModeEnabled);
    localStorage.setItem('portfolio-config', JSON.stringify(config))
    nightModeBtn.innerHTML = config.nightModeEnabled ? sunIcon : moonIcon
    if (darkMode) {
        nightModeBtn.innerHTML = sunIcon
        audioManager.resetPlay(audioManager.sounds.shine)
    } else {
        nightModeBtn.innerHTML = moonIcon
        audioManager.resetPlay(audioManager.sounds.shine2)
    }
    restartCssAnimation(nightModeBtn.querySelector('i'), 'btn-animation');
    colorChangers.map(colorChanger => colorChanger.run())
}

nightModeBtn.addEventListener('click', () => {
    config.nightModeEnabled = !config.nightModeEnabled
    updateState()
})

updateState()
