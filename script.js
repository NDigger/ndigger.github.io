import audioManager from './audioManager.js';

import './status.js';
import './buttons.js';
import './windows.js';

// Tool spans hover SFX 
const toolSpans = [
  ...Array.from(document.getElementById('tools-container').children),
  ...Array.from(document.getElementById('pl-container').children)
];

window.addEventListener('load', () => {
  Array.from(document.querySelectorAll('.hover-sound'))
  .forEach(el => {
    el.addEventListener('mouseover', () => {
      console.log(1)
      audioManager.resetPlayHover(audioManager.sounds.hover);
    })
  })
})