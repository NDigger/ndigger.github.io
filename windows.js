import { AppWindow, WindowManager } from './utils/appwindow.js';
import audioManager from './audioManager.js';
import windows from './windowscontent.js';
import { Size } from './utils/structures.js';

export const windowManager = new WindowManager();

// Preload windows
export const aboutMe = windowManager.add(new AppWindow(windows.aboutMe));
export const creation = windowManager.add(new AppWindow(windows.creation));
export const skills = windowManager.add(new AppWindow(windows.skills));
// export const faq = windowManager.add(new AppWindow(windows.faq));
// export const rest = windowManager.add(new AppWindow(windows.rest));
export const statuses = windowManager.add(new AppWindow(windows.statuses));

aboutMe.setSize(new Size(900, 500));
creation.setSize(new Size(1200, 500));
statuses.setSize(new Size(1200, 550))
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
bindWindowListeners(document.getElementById('status-btn'), statuses);

window.addEventListener('DOMContentLoaded', () => {
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
});