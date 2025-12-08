import audioManager from './audioManager.js';

import './status.js';
import './buttons.js';
import './windows.js';

// Tool spans hover SFX 
const toolSpans = [
  ...Array.from(document.getElementById('tools-container').children),
  ...Array.from(document.getElementById('pl-container').children)
];

toolSpans.forEach(span => {
    span.addEventListener('mouseover', () => {
        audioManager.resetPlayHover(audioManager.sounds.hover);
    });
})

// Ratings coloring
const ratingSpans = document.querySelectorAll(".rating");

const changeSpanStyleByRating = (span) => {
    const rating = span.textContent;
    const parent = span.parentElement;
    const convertedRating = (Number(rating) - 1) * 30;
    if (rating <= 1) {
        parent.style.color = `hsl(0, 50%, 50%)`;
        span.style.color = `hsl(0, 50%, 50%)`;
        parent.style.backgroundColor = `hsla(0, 50%, 50%, 0.1)`;
        parent.style.border = `2px outset hsl(0, 50%, 50%)`;
    } else if (rating <= 4.5) {
        parent.style.color = `hsl(${convertedRating}, 50%, 40%)`;
        span.style.color = `hsl(${convertedRating}, 50%, 40%)`;
        parent.style.backgroundColor = `hsla(${convertedRating}, 50%, 50%, 0.1)`;
        parent.style.border = `2px outset hsl(${convertedRating}, 50%, 50%)`;
    } else {
        parent.style.border = "2px outset gold";
        parent.style.color = 'gold';
        span.style.color = 'gold';
    }
    
}

ratingSpans.forEach(span => changeSpanStyleByRating(span))