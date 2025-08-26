import audioManager from './audioManager.js'
import { Vector2, Size, getDocumentSize } from './utils.js'

export class AppWindow {
    id;
    element;
    onClose;
    #isHolding = false;
    visible = false;
    animationRunning = false;
    #mousePositionOnMouseDown;
    #position = new Vector2(0, 0);
    #panelHeight = 50;

    isResizing = false;
    startLeft = null;
    startTop = null;
    currentSide = null;
    startX; startY; startWidth; startHeight;

    constructor(html) {
        document.querySelector('body').insertAdjacentHTML("beforeend", html);
        this.id = html.match(/<section id="(.+)" class="window">/)[1];
        this.element = document.getElementById(this.id);
        const windowPanel = this.element.querySelector('.window-panel');
        windowPanel.addEventListener('mousedown', e => {
            this.#isHolding = true
            this.#mousePositionOnMouseDown = new Vector2(e.pageX, e.pageY)
        });
        windowPanel.querySelector('.buttons .close').addEventListener('click', () => {
            this.hide();
            if (this.onClose) this.onClose();
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
            if (!this.#isHolding || this.isResizing) return;
            move();
        })
        window.addEventListener('resize', () => {
            const documentSize = getDocumentSize();
            const size = this.getSize();
            this.setClampedPosition(this.#position)
            this.#position.x = Math.min(this.#position.x, documentSize.width - size.width);
        })

        // this.element.addEventListener('mousedown', e => {
        //     const rect = this.element.getBoundingClientRect();
        //     const offset = 10;

        //     if (e.clientX - rect.left < offset) this.currentSide = 'left';
        //     else if (rect.right - e.clientX < offset) this.currentSide = 'right';
        //     else if (e.clientY - rect.top < offset) this.currentSide = 'top';
        //     else if (rect.bottom - e.clientY < offset) this.currentSide = 'bottom';
        //     else return;

        //     this.isResizing = true;
        //     this.startX = e.clientX;
        //     this.startY = e.clientY;
        //     this.startWidth = rect.width;
        //     this.startHeight = rect.height;

        //     this.startLeft = this.element.offsetLeft;
        //     this.startTop = this.element.offsetTop;

        //     e.preventDefault();
        // });

        // document.addEventListener('mousemove', e => {
        //     const rect = this.element.getBoundingClientRect();
        //     const offset = 10;
            
        //     if (e.clientX - rect.left < offset) this.element.style.cursor = 'ew-resize';
        //     else if (rect.right - e.clientX < offset) this.element.style.cursor = 'ew-resize';
        //     else if (e.clientY - rect.top < offset) this.element.style.cursor = 'ns-resize';
        //     else if (rect.bottom - e.clientY < offset) this.element.style.cursor = 'ns-resize'; 
        //     else {
        //         this.element.style.cursor = 'default'
        //     };
        
        //     if (!this.isResizing) return;
        //     const dx = e.clientX - this.startX;
        //     const dy = e.clientY - this.startY;

        //     const mouseOnDocument = () => !(e.clientX < 0 || e.clientY < 0 ||
        //         e.clientX > window.innerWidth || e.clientY > window.innerHeight)

        //     if (this.currentSide === 'right' && mouseOnDocument()) {
        //         this.element.style.width = this.startWidth + dx + 'px';
        //     };
        //     if (this.currentSide === 'left' && mouseOnDocument()) {
        //         this.element.style.width = this.startWidth - dx + 'px';
        //         if (this.startWidth - dx > parseInt(getComputedStyle(this.element).minWidth.match(/\d+/)[0])) {
        //             this.#position.x = this.getPosition().x
        //             this.setClampedPosition({x: this.startLeft + dx});
        //         }
        //     }
        //     if (this.currentSide === 'bottom' && mouseOnDocument()) {
        //         this.element.style.height = this.startHeight + dy + 'px'
        //     };
        //     if (this.currentSide === 'top' && mouseOnDocument()) {
        //         this.element.style.height = this.startHeight - dy + 'px';
        //         if (this.startHeight - dy > parseInt(getComputedStyle(this.element).minHeight.match(/\d+/)[0])) {
        //             this.setClampedPosition({y: this.startTop + dy});
        //             this.#position.y = this.getPosition().y
        //         }
        //     }
        // });

        // document.addEventListener('mouseup', () => {
        //     this.isResizing = false;
        // });
        this.setCenteredPosition()        
    }

    setClampedPosition({x, y}) {
        const documentSize = getDocumentSize();
        const size = this.getSize();
        const dx = Math.min(Math.max(x, 0), documentSize.width - size.width);
        const dy = Math.min(Math.max(y, 0), documentSize.height - this.#panelHeight)
        if (x) this.element.style.left = `${dx}px`;
        if (y) this.element.style.top = `${dy}px`;
        if (x) this.element.style.setProperty('--left', `${dx}px`);
        if (y) this.element.style.setProperty('--top', `${dy}px`);
    }

    setClampedSize({width, height}) {
        const documentSize = getDocumentSize();
        const position = this.getPosition();
        const w = Math.max(Math.min(documentSize.width, width), 120);
        const h = Math.max(Math.min(documentSize.height, height + this.#panelHeight), 120)
        this.element.style.width = `${w}px`
        this.element.style.height = `${h}px`
        this.element.style.setProperty('--width', `${w}px`);
        this.element.style.setProperty('--height', `${h}px`);
        this.setClampedPosition(position);
    }

    getPosition() {
        const x = parseFloat(getComputedStyle(this.element).left?.match(/\d+/)[0]);
        const y = parseFloat(getComputedStyle(this.element).top?.match(/\d+/)[0]);
        return new Vector2(x, y);
    }

    getSize() {
        const width = parseFloat(getComputedStyle(this.element).width?.match(/\d+/)[0]);
        const height = parseFloat(getComputedStyle(this.element).height?.match(/\d+/)[0]);
        return new Size(width, height);
    }

    #removeAnimationClasses() {
        this.element.classList.remove('hide-window');
        void this.element.offsetWidth;
        this.element.classList.remove('show-window');
    }
    
    show() {
        audioManager.resetPlay(audioManager.sounds.click)
        this.animationRunning = true
        this.#removeAnimationClasses()
        this.element.classList.add('show-window');
        this.visible = true;
        this.element.style.display = 'flex'
        setTimeout(() => {
            this.#removeAnimationClasses()
            this.animationRunning = false
        }, 400)
    }

    hide() {
        audioManager.resetPlay(audioManager.sounds.clickClose)
        this.animationRunning = true
        this.#removeAnimationClasses()
        this.element.classList.add('hide-window');
        setTimeout(() => {
            this.element.style.display = 'none';
            this.#removeAnimationClasses()
            this.visible = false
            this.animationRunning = false
            }, 400)
    }

    delete() {
        this.element.remove()
    }

    setCenteredPosition() {
        const documentSize = getDocumentSize();
        const size = this.getSize();
        this.#position = new Vector2(documentSize.width/2 - size.width/2, documentSize.height/2 - size.height/2)
        this.setClampedPosition(this.#position)
    }
}

export class WindowManager {
    windows = [];
    #zIndex = 1;

    add(window) {
        this.windows.push(window);
        window.element.addEventListener('mousedown', () => this.bringToFront(window));
        this.bringToFront(window)
        return window
    }

    delete(window) {
        window.delete();
        this.windows.splice(this.windows.indexOf(window), 1);
    }

    bringToFront(window) {
        window.element.style.zIndex = this.#zIndex++;
    }
}
