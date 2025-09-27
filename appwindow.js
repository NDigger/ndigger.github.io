import audioManager from './audioManager.js'
import { Vector2, Size, getDocumentSize, restartCssAnimation } from './utils.js'

const windowViewAnimationSpeed = 400;
class WindowView {
    model;
    element;
    animationRunning = false;

    constructor(model) {
        this.model = model;
        this.element = model.element;
    }

    #removeAnimationClasses() {
        this.element.classList.remove('hide-window');
        void this.element.offsetWidth;
        this.element.classList.remove('show-window');
    }

    updatePosition() {
        const {x, y} = this.model.getPosition()
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.setProperty('--left', `${x}px`);
        this.element.style.setProperty('--top', `${y}px`);
    }

    updateSize() {
        const {width, height} = this.model.getSize()
        this.element.style.width = `${width}px`
        this.element.style.height = `${height}px`
        this.element.style.setProperty('--width', `${width}px`);
        this.element.style.setProperty('--height', `${height}px`);
    }

    show() {
        if (this.animationRunning) return
        audioManager.resetPlay(audioManager.sounds.click)
        this.animationRunning = true
        this.#removeAnimationClasses()
        this.element.classList.add('show-window');
        this.model.visible = true;
        this.element.style.display = 'flex'
        setTimeout(() => {
            this.#removeAnimationClasses()
            this.animationRunning = false
            }, windowViewAnimationSpeed)
    }

    hide() {
        if (this.animationRunning) return
        audioManager.resetPlay(audioManager.sounds.clickClose)
        this.animationRunning = true
        this.#removeAnimationClasses()
        this.element.classList.add('hide-window');
        setTimeout(() => {
            this.element.style.display = 'none';
            this.#removeAnimationClasses()
            this.model.visible = false
            this.animationRunning = false
            }, windowViewAnimationSpeed)
    }

    fullscreenTransition() {
        audioManager.resetPlay(audioManager.sounds.clickFullscreen)
        this.element.classList.remove('window-fullscreen-hide');
        restartCssAnimation(this.element, 'window-fullscreen-show');
        setTimeout(() => {
            this.element.classList.remove('window-fullscreen-show');
        }, 300)
    }

    windowedTransition() {
        audioManager.resetPlay(audioManager.sounds.clickFullscreen)
        this.element.classList.remove('window-fullscreen-show');
        restartCssAnimation(this.element, 'window-fullscreen-hide');
        setTimeout(() => {
            this.element.classList.remove('window-fullscreen-hide');
        }, 300)
    }
}

class WindowDragger {
    #mousePositionOnMouseDown
    #startPosition
    #isHolding;
    model;
    element;

    constructor(model) {
        this.model = model;
        this.element = this.model.element;

        const windowPanel = this.element.querySelector('.window-panel');
        windowPanel.addEventListener('mousedown', e => {
            if (e.target.closest('.buttons .close') || this.model.fullscreen) return;
            this.#isHolding = true
            this.#startPosition = this.model.getPosition();
            this.#mousePositionOnMouseDown = new Vector2(e.pageX, e.pageY)
        });
        document.addEventListener('mouseup', () => {
            const saveNewPosition = () => {
                const style = getComputedStyle(this.element);
                this.model.setPosition(new Vector2(
                        parseFloat(style.left) || 0,
                        parseFloat(style.top) || 0
                    ))
            };
            if (!this.#isHolding) return;
            this.#isHolding = false;
            saveNewPosition();
        });
        document.addEventListener('mousemove', e => {
            const move = () => {
                this.model.setClampedPosition(new Vector2(
                    this.#startPosition.x + (e.pageX - this.#mousePositionOnMouseDown.x),
                    this.#startPosition.y + (e.pageY - this.#mousePositionOnMouseDown.y)
                ))
            }
            if (!this.#isHolding) return; // || this.isResizing
            move();
        })
        window.addEventListener('resize', () => {
            this.model.setClampedPosition(this.model.getPosition())
        })
    }
}

const minWindowWidth = 120;
const minWindowHeight = 120;
const panelHeight = 50;
const windowDefaultSize = new Size(800, 500);
export class AppWindow {
    id;
    element;

    onClose = () => {};
    #savedPosition = new Vector2(0, 0);
    #savedSize = new Vector2(0, 0);
    fullscreen = false;

    #position = new Vector2(0, 0);
    #size = windowDefaultSize.duplicate();
    visible = false;

    #dragger
    #view

    constructor(html) {
        document.querySelector('body').insertAdjacentHTML("beforeend", html);
        this.id = html.match(/<section id="(.+)" class="window">/)[1];
        this.element = document.getElementById(this.id);
        this.#dragger = new WindowDragger(this); 
        this.#view = new WindowView(this);
        const windowPanel = this.element.querySelector('.window-panel');
        windowPanel.querySelector('.buttons .close').addEventListener('click', () => {
            this.hide();
            this.onClose();
        })

        const fullscreenPanelBtn = windowPanel.querySelector('.buttons .fullscreen');
        if (fullscreenPanelBtn) {
            fullscreenPanelBtn.addEventListener('click', () => this.toggleFullscreen(true))
        }

        // Center window
        this.setCenteredPosition();
    }

    #fullscreenResizeListener = () => this.setSize(getDocumentSize())

    setFullscreenEnabled(enabled) {
        const fullscreenBtn = this.element.querySelector('.window-panel > .buttons > .fullscreen')
        if (enabled && !this.fullscreen) {
            this.fullscreen = true
            fullscreenBtn.title = "Windowed"
            this.element.classList.add('window-fullscreen')
            this.#savedPosition = this.#position.duplicate();
            this.#savedSize = this.#size.duplicate();
            setTimeout(() => {
                this.setPosition(Vector2.ZERO);
                this.setSize(getDocumentSize());
                window.addEventListener('resize', this.#fullscreenResizeListener)
            }, 300)
        } else if (!enabled && this.fullscreen) {
            this.fullscreen = false
            fullscreenBtn.title = "Fullscreen"
            this.element.classList.remove('window-fullscreen')
            this.setPosition(this.#savedPosition);
            this.setSize(this.#savedSize);
            window.removeEventListener('resize', this.#fullscreenResizeListener)
        }
    }

    toggleFullscreen(animate = true) {
        const enabled = !this.element.classList.contains('window-fullscreen');
        this.setFullscreenEnabled(enabled);

        if (!animate) return;

        if (enabled) this.#view.fullscreenTransition();
        else this.#view.windowedTransition();
    }

    setClampedPosition({x, y}) {
        const documentSize = getDocumentSize();
        const dx = Math.max(0, Math.min(x, documentSize.width - this.#size.width));
        const dy = Math.max(0, Math.min(y, documentSize.height - panelHeight));
        this.setPosition(new Vector2(dx, dy))
        this.#view.updatePosition();
    }

    setClampedSize({width, height}) {
        const documentSize = getDocumentSize();
        const w = Math.max(Math.min(documentSize.width, width), minWindowWidth);
        const h = Math.max(Math.min(documentSize.height, height + panelHeight), minWindowHeight);
        this.setSize(new Size(w, h));
        this.#view.updateSize();
    }

    getPosition = () => this.#position.duplicate();
    getSize = () => this.#size.duplicate();

    hide = () => {
        this.#view.hide();
        setTimeout(() => this.setFullscreenEnabled(false), 500);
    }

    show = () => {
        this.setCenteredPosition();
        this.#view.show();
    }

    delete() {
        this.element.remove()
    }

    setPosition(vec2) {
        this.#position = vec2.duplicate();
        this.#view.updatePosition();
    }

    setSize(size) {
        this.#size = size.duplicate();
        this.#view.updateSize();
    }

    setCenteredPosition() {
        const documentSize = getDocumentSize();
        const size = this.getSize();
        this.#position = new Vector2(documentSize.width/2 - size.width/2, documentSize.height/2 - size.height/2)
        this.setClampedPosition(this.#position);
    }
}

export class WindowManager {
    windows = [];
    #zIndex = 1;

    add(window) {
        this.windows.push(window);
        window.element.addEventListener('mousedown', () => this.bringToFront(window));
        this.bringToFront(window);
        return window;
    }

    delete(window) {
        window.delete();
        this.windows.splice(this.windows.indexOf(window), 1);
    }

    bringToFront(window) {
        window.element.style.zIndex = this.#zIndex++;
    }
}
