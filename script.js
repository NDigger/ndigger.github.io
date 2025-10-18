import audioManager from './audioManager.js';
import { AppWindow } from './appwindow.js';
import windows from './windowscontent.js';
import { Size } from './utils.js';
import './colorChangers.js';

import './status.js';
import './buttons.js';
import './windows.js';

// bindWindowListeners(document.getElementById('sfaq-btn'), faq)
// bindWindowListeners(document.getElementById('rest-btn'), rest)

// Question containers display logic
// const questionContainers = Array.from(document.getElementById('faq').querySelectorAll('.question-container'))
// for (const key in questionContainers) {
//     const questionContainer = questionContainers[key];
//     const showButton = questionContainer.querySelector('.show-answer-btn');
//     const answer = questionContainer.querySelector('.answer');
//     showButton.addEventListener('click', () => {
//         const answerStyle = getComputedStyle(answer);
//         if (answerStyle.display === 'none') {
//             answer.style.display = 'block'
//             showButton.classList.add('rotate-show-answer-btn')
//             answer.classList.remove('hide-answer')
//             restartCssAnimation(answer, 'show-answer')
//             showButton.disabled = true
//             setTimeout(() => {showButton.disabled = false}, 150)
//         } else {
//             showButton.classList.remove('rotate-show-answer-btn')
//             answer.classList.remove('show-answer')
//             restartCssAnimation(answer, 'hide-answer')
//             showButton.disabled = true
//             setTimeout(() => {
//                 answer.style.display = 'none'
//                 showButton.disabled = false
//             }, 150)
//         }
//     })
// }

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