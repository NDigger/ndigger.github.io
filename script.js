import audioManager from './audioManager.js';

import './status.js';
import './buttons.js';
import './windows.js';

window.addEventListener('load', () => {
  Array.from(document.querySelectorAll('.hover-sound'))
  .forEach(el => el.addEventListener('mouseover', () => audioManager.resetPlayHover(audioManager.sounds.hover)))
})

Array.from(document.querySelectorAll('a')).forEach(el => el.tabIndex = -1);