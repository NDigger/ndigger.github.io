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
  .addEventListener('mouseover', () => {
    audioManager.resetPlayHover(audioManager.sounds.hover);
  })
})

toolSpans.forEach(span => {
    span.addEventListener('mouseover', () => {
        audioManager.resetPlayHover(audioManager.sounds.hover);
    });
})