import { AppWindowHTMLContent } from "./windowscontent.js";

const backendHost = 'https://backend-statuses.vercel.app'
// const backendHost = 'http://localhost:3000'

function formatMonthYearShort(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function isDateInCurrentMonth(date) {
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

export const getDateStr = (date) => {
    const pad = (n) => n.toString().padStart(2, '0');

    const day = date.getDate();
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day} ${month} ${year} - [${hours}:${minutes}]`;
};

const getTimePassed = since => {
    const ms = new Date().getTime() - since
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365.25);

    if (years > 0) return years + (years === 1 ? " year" : " years");
    if (months > 0) return months + (months === 1 ? " month" : " months");
    if (days > 0) return days + (days === 1 ? " day" : " days");
    if (hours > 0) return hours + (hours === 1 ? " hour" : " hours");
    if (minutes > 0) return minutes + (minutes === 1 ? " minute" : " minutes");
    return seconds + (seconds === 1 ? " second" : " seconds");
}

const fullscreenImagesOverride = document.getElementById('fullscreen-images-override');
const lastStatusSeenId = config.lastStatusSeenId;
let unreadStatuses = 0;
const statusContainer = document.getElementById('statuses');
const pushStatus = status => {
    const date = new Date(status.created_at);
    const timePassed = getTimePassed(date.getTime());
    const content = replaceContentURLs(escapeHTML(status.content));
    const month = formatMonthYearShort(date);
    const isNew = status.id > lastStatusSeenId;
    if (!isDateInCurrentMonth(date)) {
        const container = statusContainer.querySelector(`[data-month='${month}']`);
        if (container == null) {
            const title = document.createElement('h1');
            title.setAttribute('data-month', month);
            title.classList.add('month')
            title.textContent = month;
            statusContainer.appendChild(title);
        }
    }
    if (isNew) {
        unreadStatuses++
    }
    const htmlContent = 
    `<div class="status${isNew ? ' new' : ''}">
        <div class="header">
            <p class="author" translate="no">NDagger</p>
            <p class="time-passed" data-date="${getDateStr(date)}">${timePassed} ago</p>
        </div>
        <p class="status-content">${content}</p>
    </div>`
    statusContainer.insertAdjacentHTML('beforeend', htmlContent)
    Array.from(statusContainer.lastElementChild.querySelectorAll('.open-image')).forEach(img => {
        img.addEventListener('pointerup', () => {
            fullscreenImagesOverride.classList.remove('disappear')
            fullscreenImagesOverride.style.display = 'block'
            fullscreenImagesOverride.setAttribute('data-index', 0);
            const imageUrls = img.getAttribute('data-image-urls').split(' ');
            const fullscreenImages = fullscreenImagesOverride.querySelector('.images');
            const fullscreenButtons = fullscreenImagesOverride.querySelector('.buttons')
            const fullscreenImagesList = fullscreenImagesOverride.querySelector('.images-list');
            const a = imageUrls.map(url => `
                <div class="image-container">
                    <img src="${url}" alt="${url}">
                </div>
                `).join('')
            fullscreenImages.innerHTML = a;
            fullscreenButtons.style.display = imageUrls.length > 1 ? 'block' : 'none';
            fullscreenButtons.querySelector('.right-btn').style.display = imageUrls.length > 1 ? 'block' : 'none';
            fullscreenButtons.querySelector('.left-btn').style.display = 'none';
            fullscreenImagesOverride.setAttribute('data-image-urls', imageUrls.join(' '));
            fullscreenImages.scrollTo({
                left: 0,
                behavior: 'instant'
            })
        })
    })
} 

let statusFetched = false;
let page = 0;
let allStatusesLoaded = false
const limit = 30;

let loadingStatuses = false
const loadStatuses = async () => {
    if (allStatusesLoaded) return
    loadingStatuses = true
    const params = new URLSearchParams({ 
        page: page,
        limit: limit 
    })
    const res = await fetch(`${backendHost}/api/status?${params.toString()}`)
    .catch(err => {
        loadingStatuses = false;
        console.error(err);
        throw err
    })
    const statuses = await res.json()
    if (statuses.length === 0) {
        allStatusesLoaded = true
    } 
    const recentStatusId = statuses[0]?.id;
    const recentStatusSeenId = config.lastStatusSeenId;
    if (recentStatusId > recentStatusSeenId && page === 0) {
        config.lastStatusSeenId = recentStatusId
        localStorage.setItem('portfolio-config', JSON.stringify(config))
    }
    for (let i = 0; i < statuses.length; i++) {
        const status = statuses[i]
        pushStatus(status)
    }
    page++;
    setTimeout(() => loadingStatuses = false, 500);
}

const escapeHTML = str => {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const replaceContentURLs = str => {
    const regex = /(https?:\/\/\S+|data:image\/\S+)/g;
    const matches = Array.from(str.matchAll(regex));
    const urlList = matches.map(v => v[0].trim());
    const imageURLs = [];
    for (const url of urlList) {
        try {
            const cleanUrl = url.split('?')[0].toLowerCase();
            if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif'].some(ext => cleanUrl.endsWith(ext))) {
                str = str.replace(url, '');
                imageURLs.push(url);
                continue;
            }
            else {
                str = str.replace(url, `<a href="${url}" target="_blank">${url}</a>`)
                continue;
            }
        } catch(e) {
           str = str.replace(url, `<a href="${url}" target="_blank">${url}</a>`)
        }
    }
    if (imageURLs.length > 0 && str.trim().length === 0) {
        str += `<img class="embed open-image" data-image-urls="${imageURLs.join(" ")}" src="${imageURLs[0]}" alt="${imageURLs[0]}">`;
    } else if (imageURLs.length > 0) {
        str = `
        <p class="floating-right open-image" data-image-urls="${imageURLs.join(" ")}">
            ${imageURLs.length > 1 ? `<span>+${imageURLs.length - 1}</span>` : ''}
            <img class="embed" src="${imageURLs[0]}" alt="${imageURLs[0]}">
        </p>
            ` + `<p>${str}</p>` +
        `<p class="small-screen open-image" data-image-urls="${imageURLs.join(" ")}">
            ${imageURLs.length > 1 ? `<span>+${imageURLs.length - 1}</span>` : ''}
            <img class="embed" src="${imageURLs[0]}" alt="${imageURLs[0]}">
        </p>`
    }
    return str
}

(async () => {
    try {
        const lastStatusId = config.lastStatusSeenId
        await loadStatuses()
        document.getElementById('override').classList.add('disappear')
        if (lastStatusId === -1) return
        const element = document.querySelector("#statuses");
        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } catch(e) {
        const element = document.querySelector("#statuses");
        element.innerHTML += `
            <h1>Whoops! Something broke...</h1>
            <h2>${e}</h2>
        `
        document.getElementById('override').classList.add('disappear')
    }
})()

window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    body.addEventListener('scroll', () => {
        const scrollTop = body.scrollTop;
        const style = getComputedStyle(body);
        const scrollMax = body.scrollHeight - style.height.match(/(\d+)/)[0];
        if (scrollTop >= scrollMax - 500 && !loadingStatuses) loadStatuses();
    })
})