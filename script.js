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

const fullscreenImages = fullscreenImagesOverride.querySelector('.images');

const setImageIndex = (index) => {
  const imageUrls = fullscreenImagesOverride.getAttribute('data-image-urls').split(' ')
  fullscreenImagesOverride.setAttribute('data-index', index)
  fullscreenImagesLeftBtn.style.display = index <= 0 ? 'none' : 'block';
  fullscreenImagesRightBtn.style.display = index >= imageUrls.length - 1 ? 'none' : 'block';
}

const fullscreenImagesLeftBtn = fullscreenImagesOverride.querySelector('.left-btn')
const fullscreenImagesRightBtn = fullscreenImagesOverride.querySelector('.right-btn')
const shiftImage = (shift) => {
  let index = Number(fullscreenImagesOverride.getAttribute('data-index'));
  const imageUrls = fullscreenImagesOverride.getAttribute('data-image-urls').split(' ')
  index = Math.min(imageUrls.length - 1, Math.max(0, index + shift));
  // setImageIndex(index)
  fullscreenImagesOverride.querySelector('.images').scrollTo({
    left: index * window.innerWidth,
    behavior: 'smooth'
  });
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
  let index = Number(fullscreenImagesOverride.getAttribute('data-index'));
  fullscreenImagesOverride.querySelector('.images').scrollTo({
    left: index * window.innerWidth,
    behavior: 'instant'
  });
})

fullscreenImagesOverride.querySelector('.images').addEventListener('scroll', e => {
  const index = Math.round(e.target.scrollLeft / window.innerWidth);
  setImageIndex(index);
})

bottomHeaderBtn.addEventListener('pointerup', () => {
  bottomHeaderBtn.classList.add('disappear');
  const element = document.querySelector("#statuses");
  element.scrollIntoView({
      behavior: "smooth",
      block: "start"
  });
})