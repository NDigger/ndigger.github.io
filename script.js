import audioManager from './audioManager.js';

import './status.js';
import './buttons.js';
import { getDocumentSize } from './utils/structures.js';

window.addEventListener('load', () => {
  Array.from(document.querySelectorAll('.hover-sound'))
  .forEach(el => el.addEventListener('mouseover', () => audioManager.resetPlayHover(audioManager.sounds.hover)))
})

Array.from(document.querySelectorAll('a')).forEach(el => el.tabIndex = -1);

const body = document.querySelector('body')
body.classList.add(navigator.maxTouchPoints > 1 ? 'screen' : 'desktop')

// Glow Cursor
const box = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  box.style.left = e.clientX + 'px';
  box.style.top = e.clientY + 'px';
});

window.addEventListener('load', () => {
  document.getElementById('override').style.display = 'none'
})

window.addEventListener("load", () => {
  const element = document.querySelector("#target");

  if (element) {
    window.scrollTo({
      top: getDocumentSize().y,
      behavior: "smooth",
    });
  }
});