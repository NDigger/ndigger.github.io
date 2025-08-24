import audioManager from './audioManager.js'
import { Vector2, Size, getDocumentSize } from './utils.js'

export class AppWindow {
    id;
    element;
    #isHolding = false;
    visible = false;
    #mousePositionOnMouseDown;
    #position = new Vector2(0, 0);

    constructor(element) {
        this.element = element
        const windowPanel = element.querySelector('.window-panel');
        windowPanel.addEventListener('mousedown', e => {
            this.#isHolding = true
            this.#mousePositionOnMouseDown = new Vector2(e.pageX, e.pageY)
        });
        windowPanel.querySelector('.buttons .close').addEventListener('click', () => {
            audioManager.sounds.clickClose.play()
            this.hide();
        })
        document.addEventListener('mouseup', () => {
            const saveNewPosition = () => {
                this.#position = new Vector2(
                    parseFloat(this.element.style.left.match(/\d+/)[0]),
                    parseFloat(this.element.style.top.match(/\d+/)[0])
                    )
            };
            if (!this.#isHolding) return;
            this.#isHolding = false;
            saveNewPosition();
        });
        document.addEventListener('mousemove', e => {
            const move = () => {
                const newPositionX = this.#position.x + (e.pageX - this.#mousePositionOnMouseDown.x);
                const newPositionY = this.#position.y + (e.pageY - this.#mousePositionOnMouseDown.y);
                this.setClampedPosition(new Vector2(newPositionX, newPositionY))
            }
            if (!this.#isHolding) return;
            move();
        })
        window.addEventListener('resize', () => {
            const documentSize = getDocumentSize();
            const size = this.getSize();
            this.setClampedPosition(this.#position)
            this.#position.x = Math.min(this.#position.x, documentSize.width - size.width);
        })
        
        // Set element position on load
        const documentSize = getDocumentSize();
        const size = this.getSize();
        this.#position = new Vector2(documentSize.width/2 - size.width/2, documentSize.height/2 - size.height/2)
        this.setClampedPosition(this.#position)
    }

    setClampedPosition(position) {
        const documentSize = getDocumentSize();
        const size = this.getSize();
        this.element.style.left = `clamp(0px, ${position.x}px, ${documentSize.width - size.width}px)`;
        this.element.style.top = `clamp(0px, ${position.y}px, ${documentSize.height - 50}px)`;
        this.element.style.setProperty('--left', `${Math.min(Math.max(position.x, 0), documentSize.width - size.width)}px`);
        this.element.style.setProperty('--top', `${Math.min(Math.max(position.y, 0), documentSize.height - 50)}px`);
    }

    getSize() {
        const width = parseFloat(getComputedStyle(this.element).width.match(/\d+/)[0]);
        const height = parseFloat(getComputedStyle(this.element).height.match(/\d+/)[0]);
        return new Size(width, height);
    }

    #removeAnimationClasses() {
        this.element.classList.remove('hide-window');
        this.element.classList.remove('show-window');
    }
    
    show() {
        this.#removeAnimationClasses()
        this.element.classList.add('show-window');
        this.visible = true;
        this.element.style.display = 'flex'
        setTimeout(() => {this.#removeAnimationClasses()}, 400)
    }

    hide() {
        this.#removeAnimationClasses()
        this.element.classList.add('hide-window');
        setTimeout(() => {
            this.element.style.display = 'none';
            this.#removeAnimationClasses()
            this.visible = false
            }, 400)
    }
}

export class WindowManager {
    #windows = [];
    #zIndex = 1;

    add(window) {
        this.#windows.push(window);
        window.element.addEventListener('mousedown', () => this.bringToFront(window));
        return window
    }

    bringToFront(window) {
        window.element.style.zIndex = this.#zIndex++;
    }
}
