import './status.js';
import './buttons.js';
import { getDocumentSize } from './utils/structures.js';

Array.from(document.querySelectorAll('a')).forEach(el => el.tabIndex = -1);

const body = document.querySelector('body')
const canvasOverride = document.getElementById('canvas-override');
const bottomHeaderBtn = document.querySelector('main > header .bottom-btn')
body.classList.add(navigator.maxTouchPoints > 1 ? 'screen' : 'desktop')
body.addEventListener('scroll', e => {
  bottomHeaderBtn.classList.add('disappear');
  canvasOverride.style.opacity = Math.min(.8, Math.max(0.001, e.currentTarget.scrollTop - 10000) / 100000);
}) 

// Glow Cursor
const box = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  box.style.left = e.clientX + 'px';
  box.style.top = e.clientY + 'px';
});

bottomHeaderBtn.addEventListener('pointerup', () => {
  bottomHeaderBtn.classList.add('disappear');
  const element = document.querySelector("#statuses");
  element.scrollIntoView({
      behavior: "smooth",
      block: "start"
  });
})