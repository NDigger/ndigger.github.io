import { AppWindow, WindowManager } from './utils/appwindow.js';
import AppWindowHTMLContent from './windowscontent.js';
import { Size } from './utils/structures.js';

export const windowManager = new WindowManager();

// Preload windows
export const aboutMe = new AppWindow(AppWindowHTMLContent.ABOUT_ME);
export const links = new AppWindow(AppWindowHTMLContent.LINKS);
export const skills = new AppWindow(AppWindowHTMLContent.SKILLS);
export const statuses = new AppWindow(AppWindowHTMLContent.STATUSES);
[aboutMe, links, skills, statuses].forEach(el => windowManager.add(el));

aboutMe.setSize(new Size(900, 500));
skills.setSize(new Size(970, 500));
links.setSize(new Size(500, 340));
statuses.setSize(new Size(1200, 550))
// windowManager.windows.forEach(w => w.setCenteredPosition())

const bindWindowListeners = (button, window) => {
    button.addEventListener('click', () => {
        window.visible ? window.hide() : window.show();
        windowManager.bringToFront(window);
    })
}

bindWindowListeners(document.getElementById('about-me-btn'), aboutMe);
bindWindowListeners(document.getElementById('skills-btn'), skills);
bindWindowListeners(document.getElementById('links-btn'), links);
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
                const w = new AppWindow(AppWindowHTMLContent.image(e.target.src));
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