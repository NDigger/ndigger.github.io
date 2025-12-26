import { getDocumentSize } from "./utils/structures.js";

const sounds = {
    click: new Audio('./audio/click.wav'),
    clickClose: new Audio('./audio/clickClose.mp3'),
    hover: new Audio('./audio/hover.mp3'),
    shine: new Audio('./audio/shine.mp3'),
    shine2: new Audio('./audio/shine2.mp3'),
    clickFullscreen: new Audio('./audio/clickFullscreen.mp3')
}

export const setMasterVolume = value => {
    sounds.click.volume = 0.2 * value;
    sounds.clickClose.volume = 0.2 * value;
    sounds.clickFullscreen.volume = 0.2 * value;
    sounds.hover.volume = 0.45 * value;
    sounds.shine.volume = 0.35 * value;
    sounds.shine2.volume = 1 * value;
}

setMasterVolume(!config.soundEnabled ? 0 : 1)

export const music = new Audio('./audio/musicSmooth.mp3');
music.loop = true;
document.addEventListener('click', () => {
    if (config.musicEnabled) {
        music.play();
    }
})

export const resetPlayHover = audio => {
    if (getDocumentSize().width >= 768) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}

export const resetPlay = audio => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

export default { sounds, music, resetPlay, resetPlayHover, setMasterVolume }