import audioManager from './audioManager.js';
import { AppWindow, WindowManager } from './appwindow.js';
import { restartCssAnimation } from './utils.js';
import windows from './windows.js';

const windowManager = new WindowManager();

const aboutMe = windowManager.add(new AppWindow(windows.aboutMe));
const creation = windowManager.add(new AppWindow(windows.creation));
const skills = windowManager.add(new AppWindow(windows.skills));
const faq = windowManager.add(new AppWindow(windows.faq));

const bindWindowListeners = (button, window) => {
    button.addEventListener('click', () => {
        if (window.visible) {
            audioManager.sounds.clickClose.play()
            window.hide()
        } else {
            audioManager.sounds.click.play()
            window.show()
        }
        windowManager.bringToFront(window)
    })
    button.addEventListener('mouseover', () => {
        audioManager.resetPlay(audioManager.sounds.hover)
    })
}

bindWindowListeners(document.getElementById('about-me-btn'), aboutMe);
bindWindowListeners(document.getElementById('creation-btn'), creation);
bindWindowListeners(document.getElementById('skills-btn'), skills);
bindWindowListeners(document.getElementById('faq-btn'), faq)

const discordBtn = document.getElementById('discord-btn');
discordBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('@pizda69');
    restartCssAnimation(discordBtn, 'show-copied-popup');
})

for (const child of document.getElementById('bottom-buttons').children) {
  child.addEventListener('mouseover', () => {
    audioManager.resetPlay(audioManager.sounds.hover)
  })
}

const questionContainers = Array.from(document.getElementById('faq').querySelectorAll('.question-container'))
for (const key in questionContainers) {
    const questionContainer = questionContainers[key];
    const showButton = questionContainer.querySelector('.show-answer-btn');
    const answer = questionContainer.querySelector('.answer');
    showButton.addEventListener('click', () => {
        const answerStyle = getComputedStyle(answer);
        if (answerStyle.display === 'none') {
            answer.style.display = 'block'
            showButton.classList.add('rotate-show-answer-btn')
            answer.classList.remove('hide-answer')
            restartCssAnimation(answer, 'show-answer')
            showButton.disabled = true
            setTimeout(() => {showButton.disabled = false}, 150)
        } else {
            showButton.classList.remove('rotate-show-answer-btn')
            answer.classList.remove('show-answer')
            restartCssAnimation(answer, 'hide-answer')
            showButton.disabled = true
            setTimeout(() => {
                answer.style.display = 'none'
                showButton.disabled = false
            }, 150)
        }
    })
}

document.getElementById('music-btn').addEventListener('click', () => {
    if ((localStorage.getItem('music-enabled') ?? 'false') === 'false') {
        localStorage.setItem('music-enabled', 'true');
        audioManager.music.currentTime = 0;
        audioManager.music.play();
    } else {
        localStorage.setItem('music-enabled', 'false');
        audioManager.music.pause();
    }
})

const toolSpans = [
  ...Array.from(document.getElementById('tools-container').children),
  ...Array.from(document.getElementById('pl-container').children)
];

for (const span of toolSpans) {
    span.addEventListener('mouseover', () => {
        console.log(1)
        audioManager.resetPlay(audioManager.sounds.hover);
    });
}