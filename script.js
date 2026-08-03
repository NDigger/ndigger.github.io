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

const fullscreenImagesOverride = document.getElementById('fullscreen-images-override');
document.getElementById('fullscreen-images-override').addEventListener('pointerup', e => {
  if (e.currentTarget === e.target) {
    fullscreenImagesOverride.classList.add('disappear')
  }
})

let fullscreenImageIndex = Number(fullscreenImagesOverride.getAttribute('data-index'));
const fullscreenImagesLeftBtn = fullscreenImagesOverride.querySelector('.left-btn')
const fullscreenImagesRightBtn = fullscreenImagesOverride.querySelector('.right-btn')
const shiftImage = (shift) => {
  fullscreenImageIndex = Number(fullscreenImagesOverride.getAttribute('data-index'));
  const imageUrls = fullscreenImagesOverride.getAttribute('data-image-urls').split(' ')
  fullscreenImageIndex = Math.min(imageUrls.length - 1, Math.max(0, fullscreenImageIndex + shift));
  fullscreenImagesLeftBtn.style.display = fullscreenImageIndex <= 0 ? 'none' : 'block';
  fullscreenImagesRightBtn.style.display = fullscreenImageIndex >= imageUrls.length - 1 ? 'none' : 'block';
  fullscreenImagesOverride.querySelector('.images').scrollTo({
    left: fullscreenImageIndex * window.innerWidth,
    behavior: 'smooth'
  });
  fullscreenImagesOverride.setAttribute('data-index', fullscreenImageIndex)
}

fullscreenImagesLeftBtn.addEventListener('pointerup', () => shiftImage(-1))
fullscreenImagesRightBtn.addEventListener('pointerup', () => shiftImage(1))
document.addEventListener('keydown', e => {
  if (fullscreenImagesOverride.style.display !== 'block') return
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    shiftImage(-1);
  }
  if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    shiftImage(1);
  }
})
window.addEventListener('resize', () => {
  fullscreenImagesOverride.querySelector('.images').scrollTo({
    left: fullscreenImageIndex * window.innerWidth,
    behavior: 'instant'
  });
})

bottomHeaderBtn.addEventListener('pointerup', () => {
  bottomHeaderBtn.classList.add('disappear');
  const element = document.querySelector("#statuses");
  element.scrollIntoView({
      behavior: "smooth",
      block: "start"
  });
})