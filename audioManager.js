import { getDocumentSize } from "./utils.js";

const sounds = {
    click: new Audio('./audio/click.wav'),
    clickClose: new Audio('./audio/clickClose.mp3'),
    hover: new Audio('./audio/hover.mp3'),
    shine: new Audio('./audio/shine.mp3'),
    shine2: new Audio('./audio/shine2.mp3')
}

sounds.click.volume = 0.2;
sounds.clickClose.volume = 0.2;
sounds.hover.volume = 0.45;
sounds.shine.volume = 0.35;

export const music = new Audio('./audio/musicSmooth.mp3');
music.loop = true;
document.addEventListener('click', () => {
    if ((localStorage.getItem('music-enabled') ?? 'false') == 'true') {
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

export default { sounds, music, resetPlay, resetPlayHover }