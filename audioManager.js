const sounds = {
    click: new Audio('click.wav'),
    clickClose: new Audio('clickClose.mp3'),
    hover: new Audio('hover.mp3')
}

sounds.click.volume = 0.2;
sounds.clickClose.volume = 0.2;
sounds.hover.volume = 0.45;

export const music = new Audio('music.mp3');
music.loop = true;
document.addEventListener('click', () => {
    if ((localStorage.getItem('music-enabled') ?? 'false') == 'true') {
        music.play();
    }
})

const resetPlay = audio => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

export default {sounds, music, resetPlay}