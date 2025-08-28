import audioManager from './audioManager.js';
import { AppWindow, WindowManager } from './appwindow.js';
import { restartCssAnimation, Vector2, getDocumentSize } from './utils.js';
import windows from './windows.js';
import { Size } from './utils.js';
import './nightModeSupport.js';
import { ParticleEmitter } from './particles.js';

const windowManager = new WindowManager();

// Preload windows
const aboutMe = windowManager.add(new AppWindow(windows.aboutMe));
const creation = windowManager.add(new AppWindow(windows.creation));
const skills = windowManager.add(new AppWindow(windows.skills));
// const faq = windowManager.add(new AppWindow(windows.faq));
// const rest = windowManager.add(new AppWindow(windows.rest));

aboutMe.setSize(new Size(900, 500));
creation.setSize(new Size(1200, 500));
// rest.setSize(new Size(1000, 550));
[aboutMe, skills, creation].forEach(w => w.setCenteredPosition())

const bindWindowListeners = (button, window) => {
    button.addEventListener('click', () => window.visible ? window.hide() : window.show())
    button.addEventListener('mouseover', () => {
        audioManager.resetPlayHover(audioManager.sounds.hover)
    })
}

bindWindowListeners(document.getElementById('about-me-btn'), aboutMe);
bindWindowListeners(document.getElementById('creation-btn'), creation);
bindWindowListeners(document.getElementById('skills-btn'), skills);
// bindWindowListeners(document.getElementById('sfaq-btn'), faq)
// bindWindowListeners(document.getElementById('rest-btn'), rest)

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

// Question containers display logic
// const questionContainers = Array.from(document.getElementById('faq').querySelectorAll('.question-container'))
// for (const key in questionContainers) {
//     const questionContainer = questionContainers[key];
//     const showButton = questionContainer.querySelector('.show-answer-btn');
//     const answer = questionContainer.querySelector('.answer');
//     showButton.addEventListener('click', () => {
//         const answerStyle = getComputedStyle(answer);
//         if (answerStyle.display === 'none') {
//             answer.style.display = 'block'
//             showButton.classList.add('rotate-show-answer-btn')
//             answer.classList.remove('hide-answer')
//             restartCssAnimation(answer, 'show-answer')
//             showButton.disabled = true
//             setTimeout(() => {showButton.disabled = false}, 150)
//         } else {
//             showButton.classList.remove('rotate-show-answer-btn')
//             answer.classList.remove('show-answer')
//             restartCssAnimation(answer, 'hide-answer')
//             showButton.disabled = true
//             setTimeout(() => {
//                 answer.style.display = 'none'
//                 showButton.disabled = false
//             }, 150)
//         }
//     })
// }

// Tool spans hover SFX 
const toolSpans = [
  ...Array.from(document.getElementById('tools-container').children),
  ...Array.from(document.getElementById('pl-container').children)
];

for (const span of toolSpans) {
    span.addEventListener('mouseover', () => {
        audioManager.resetPlayHover(audioManager.sounds.hover);
    });
}

// Connect window listeners to images when they're loaded
window.onload = () => {
    const openInWindowImages = Array.from(document.querySelectorAll('.open-in-window-img'));
    openInWindowImages.forEach(image => {
        image.title = "Click to open"
        image.addEventListener('click', e => {
            let visibleWindow = null
            for (const window of windowManager.windows) {
                if (window.id === e.target.src) {
                    visibleWindow = window;
                    continue;
                }
            }
            if (visibleWindow == null) {
                const window = new AppWindow(windows.image(e.target.src));
                window.setClampedSize(new Size(image.width * 2, image.height * 2));
                window.onClose = () => {
                    setTimeout(() => windowManager.delete(window), 400)
                }
                windowManager.add(window);
                window.show();
            } else {
                if (visibleWindow.animationRunning) return
                visibleWindow.hide()
                setTimeout(() => windowManager.delete(visibleWindow), 400);
            }
        })
    })
};


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
        musicBtn.classList.remove('music-btn-disabled');
        musicIllustrationBtn.src = './images/musicIllustrationActive.png'
        musicParticlesEmitter.emissionEnabled = true
    } else {
        localStorage.setItem('music-enabled', 'false');
        audioManager.music.pause();
        musicBtn.classList.add('music-btn-disabled');
        musicIllustrationBtn.src = './images/musicIllustrationInactive.png'
        musicParticlesEmitter.emissionEnabled = false;
    }
}

if ((localStorage.getItem('music-enabled') ?? 'false') === 'false') {
    musicBtn.classList.add('music-btn-disabled');
    musicIllustrationBtn.src = './images/musicIllustrationInactive.png'
    musicParticlesEmitter.emissionEnabled = false
}

musicBtn.addEventListener('click', changeMusicState);
musicIllustrationBtn.addEventListener('click', changeMusicState);

// Ratings coloring
const ratingSpans = document.querySelectorAll(".rating");

const changeSpanStyleByRating = (span) => {
    const rating = span.textContent;
    const parent = span.parentElement;
    const convertedRating = (Number(rating) - 1) * 30;
    if (rating <= 1) {
        parent.style.color = `hsl(0, 50%, 50%)`;
        span.style.color = `hsl(0, 50%, 50%)`;
        parent.style.backgroundColor = `hsla(0, 50%, 50%, 0.1)`;
        parent.style.border = `2px outset hsl(0, 50%, 50%)`;
    } else if (rating <= 4.5) {
        parent.style.color = `hsl(${convertedRating}, 50%, 40%)`;
        span.style.color = `hsl(${convertedRating}, 50%, 40%)`;
        parent.style.backgroundColor = `hsla(${convertedRating}, 50%, 50%, 0.1)`;
        parent.style.border = `2px outset hsl(${convertedRating}, 50%, 50%)`;
    } else {
        parent.style.border = "2px outset gold";
        parent.style.color = 'gold';
        span.style.color = 'gold';
    }
    
}

ratingSpans.forEach(span => changeSpanStyleByRating(span))

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