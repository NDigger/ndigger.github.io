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
const status = windowManager.add(new AppWindow(windows.status));

aboutMe.setSize(new Size(900, 500));
creation.setSize(new Size(1200, 500));
// rest.setSize(new Size(1000, 550));
// windowManager.windows.forEach(w => w.setCenteredPosition())

const bindWindowListeners = (button, window) => {
    button.addEventListener('click', () => {
        window.visible ? window.hide() : window.show();
        windowManager.bringToFront(window);
    })
    button.addEventListener('mouseover', () => {
        audioManager.resetPlayHover(audioManager.sounds.hover)
    })
}

bindWindowListeners(document.getElementById('about-me-btn'), aboutMe);
bindWindowListeners(document.getElementById('creation-btn'), creation);
bindWindowListeners(document.getElementById('skills-btn'), skills);
bindWindowListeners(document.getElementById('status-btn'), status);
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

const getTimePassed = since => {
    const ms = new Date().getTime() - since
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365.25);

    if (years > 0) return years + (years === 1 ? " year" : " years");
    if (months > 0) return months + (months === 1 ? " month" : " months");
    if (days > 0) return days + (days === 1 ? " day" : " days");
    if (hours > 0) return hours + (hours === 1 ? " hour" : " hours");
    if (minutes > 0) return minutes + (minutes === 1 ? " minute" : " minutes");
    return seconds + (seconds === 1 ? " second" : " seconds");
}

const statusContainer = document.getElementById('status-container');
let statusData;
let statusFetched = false;
document.getElementById('status-btn').addEventListener('click', () => {
    const statusLoadingMessage = document.getElementById('status-loading-message')
    statusFetched = true
    const intervalId = setInterval(() => {
        const v = statusLoadingMessage.textContent
        if (v === 'loading') statusLoadingMessage.textContent = 'loading.'
        else if (v === 'loading.') statusLoadingMessage.textContent = 'loading..'
        else if (v === 'loading..') statusLoadingMessage.textContent = 'loading...'
        else if (v === 'loading...') statusLoadingMessage.textContent = 'loading'
    }, 200)
    setTimeout(() => {
    fetch('https://backend-statuses.vercel.app/api/status')
    .then(res => res.json())
    .then(data => {
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        statusData = data;
        statusLoadingMessage.style.display = 'none';
        clearInterval(intervalId);
        pushStatuses(statusData, statusIterator);
    })
    }, 1000)
})
let statusIterator = 0;
let isStatusListUpdating = false
const statusIteratorInc = 10;
const pushStatuses = (statuses, iterator) => {
    if (statusIterator > statuses.length && !isStatusListUpdating) return
    isStatusListUpdating = true
    let html = '';
    statusIterator += statusIteratorInc
    const cap = iterator + statusIteratorInc < statuses.length ? iterator + statusIteratorInc : statuses.length 
    for (let i = iterator; i < cap; i++){
        const status = statusData[i];
        html += 
            `<div class="status">
                <div class="header">
                    <p class="author">NDagger</p>
                    <p class="time-passed">${getTimePassed(new Date(status.created_at).getTime())} ago</p>
                </div>
                <p>${status.content}</p>
            </div>`
    }
    isStatusListUpdating = false
    statusContainer.insertAdjacentHTML('beforeend', html)
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
                const w = new AppWindow(windows.image(e.target.src));
                w.setClampedSize(new Size(image.width * 2, image.height * 2));
                w.onClose = () => setTimeout(() => windowManager.delete(w), 400);
                windowManager.add(w);
                w.show();
            } else {
                if (visibleWindow.animationRunning) return
                visibleWindow.hide()
                setTimeout(() => windowManager.delete(visibleWindow), 400);
            }
        })
    })

    const statusScroll = document.querySelector('#statuses > .content')
    statusScroll.addEventListener('scroll', () => {
        const scrollTop = statusScroll.scrollTop;
        const style = getComputedStyle(statusScroll);
        const scrollMax = statusScroll.scrollHeight - style.height.match(/(\d+)/)[0];
        if (scrollTop >= scrollMax - 100) pushStatuses(statusData, statusIterator);
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