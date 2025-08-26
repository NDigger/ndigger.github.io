import audioManager from './audioManager.js';
import { AppWindow, WindowManager } from './appwindow.js';
import { restartCssAnimation, Vector2, getDocumentSize } from './utils.js';
import windows from './windows.js';
import { Size, Anchor } from './utils.js';
import './nightModeSupport.js';

const windowManager = new WindowManager();

const aboutMe = windowManager.add(new AppWindow(windows.aboutMe));
const creation = windowManager.add(new AppWindow(windows.creation));
const skills = windowManager.add(new AppWindow(windows.skills));
const faq = windowManager.add(new AppWindow(windows.faq));
// const rest = windowManager.add(new AppWindow(windows.rest));

creation.setClampedSize(new Size(1200, 500));
[aboutMe, skills, creation, faq].forEach(w => {
    const documentSize = getDocumentSize();
    const size = w.getSize();
    w.setClampedPosition(new Vector2(documentSize.width/2 - size.width/2, documentSize.height/2 - size.height/2))
})

const bindWindowListeners = (button, window) => {
    button.addEventListener('click', () => {
        if (!window.animationRunning) {
            if (window.visible) {
                window.hide()
            } else {
                window.show()
            }
        }
    })
    button.addEventListener('mouseover', () => {
        audioManager.resetPlay(audioManager.sounds.hover)
    })
}

bindWindowListeners(document.getElementById('about-me-btn'), aboutMe);
bindWindowListeners(document.getElementById('creation-btn'), creation);
bindWindowListeners(document.getElementById('skills-btn'), skills);
bindWindowListeners(document.getElementById('faq-btn'), faq)
// bindWindowListeners(document.getElementById('rest-btn'), rest)

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

const toolSpans = [
  ...Array.from(document.getElementById('tools-container').children),
  ...Array.from(document.getElementById('pl-container').children)
];

for (const span of toolSpans) {
    span.addEventListener('mouseover', () => {
        audioManager.resetPlay(audioManager.sounds.hover);
    });
}


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

class Particle {
    anchor = Anchor.TOP_LEFT;
    id = 0;
    element = null;
    container = null;
    position = new Vector2(0, 0);
    speed = 1;
    lifetime = 1;
    angle = 0;

    insertIntoHTML() {
        this.element.id = this.id.toString();
        this.container.appendChild(this.element);
    }

    removeFromHTML() {
        document.getElementById(this.id.toString())?.remove();
    }

    move(vec2) {
        this.position.x += vec2.x;
        this.position.y += vec2.y;
        if (this.anchor === Anchor.TOP_LEFT || this.anchor === Anchor.TOP || this.anchor === Anchor.TOP_RIGHT)
            this.element.style.top = `${this.position.y}px`
        if (this.anchor === Anchor.TOP_RIGHT || this.anchor === Anchor.RIGHT || this.anchor === Anchor.BOTTOM_RIGHT)
            this.element.style.right = `${this.position.x}px`
        if (this.anchor === Anchor.BOTTOM_RIGHT || this.anchor === Anchor.BOTTOM || this.anchor === Anchor.BOTTOM_LEFT)
            this.element.style.bottom = `${this.position.y}px`
        if (this.anchor === Anchor.BOTTOM_LEFT || this.anchor === Anchor.LEFT || this.anchor === Anchor.TOP_LEFT)
            this.element.style.left = `${this.position.x}px`
    }
}

class ParticleEmitter {
    element = null;
    container = null;
    emissionEnabled = false;
    particles = [];
    offset = new Vector2(0, 0);
    speed = 1;
    lifetime = 1;
    emission = 30;
    angle = 0;
    angleVariation = 0;
    #currentParticleId = 0;
    #emissionTimer = 0;
    #afId = null;

    constructor() {
        requestAnimationFrame(() => this.#update())
    }
    #update() {
        this.#afId = requestAnimationFrame(() => this.#update());
        this.#emissionTimer -= 1/60;
        if (this.#emissionTimer < 0 && this.emissionEnabled) { 
            this.#emissionTimer = this.lifetime / this.emission;
            this.emit()
        }
        this.particles.forEach(p => {
            p.move(new Vector2(Math.cos(p.angle) * p.speed, Math.sin(p.angle) * p.speed));
            p.lifetime -= 1/60;
        })
        this.particles = this.particles.filter(p => {
            if (p.lifetime < 0) {
                p.removeFromHTML();
                return false;
            }
            return true;
        });
    }

    emit() {
        const p = new Particle()
        p.angle = this.angle + (Math.random()-.5) * this.angleVariation;
        p.speed = this.speed;
        p.position = this.offset.duplicate();
        p.id = this.#currentParticleId++;
        p.element = this.element.cloneNode(false);
        p.container = this.container;
        p.anchor = Anchor.TOP_RIGHT;
        p.lifetime = this.lifetime;
        p.insertIntoHTML();
        this.particles.push(p);
    }
}

const musicParticlesEmitter = new ParticleEmitter();
let temp = document.createElement("i");
temp.classList.add('bi', 'bi-music-note-beamed', 'main-window-music-particle');
temp.id = '1';
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
        musicIllustrationBtn.src = 'musicIllustrationActive.png'
        musicParticlesEmitter.emissionEnabled = true
    } else {
        localStorage.setItem('music-enabled', 'false');
        audioManager.music.pause();
        musicBtn.classList.add('music-btn-disabled');
        musicIllustrationBtn.src = 'musicIllustrationInactive.png'
        musicParticlesEmitter.emissionEnabled = false;
    }
}

if ((localStorage.getItem('music-enabled') ?? 'false') === 'false') {
    musicBtn.classList.add('music-btn-disabled');
    musicIllustrationBtn.src = 'musicIllustrationInactive.png'
    musicParticlesEmitter.emissionEnabled = false
}


musicBtn.addEventListener('click', changeMusicState);
musicIllustrationBtn.addEventListener('click', changeMusicState);