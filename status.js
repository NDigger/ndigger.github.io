import { AppWindowHTMLContent } from "./windowscontent.js";

const backendHost = 'https://backend-statuses.vercel.app'
// const backendHost = 'http://localhost:3000'

export const getDateStr = date => {
    const pad = (n) => n.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // месяцы от 0 до 11
    const year = pad(date.getFullYear() % 100); // последние две цифры года
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}.${month}.${year} - ${hours}:${minutes}`;
}

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

const lastStatusSeenId = config.lastStatusSeenId
let unreadStatuses = 0
const statusContainer = document.getElementById('statuses');
const pushStatus = status => {
    const date = new Date(status.created_at);
    const timePassed = getTimePassed(date.getTime());
    const content = replaceContentURLs(escapeHTML(status.content));
    const isNew = status.id > lastStatusSeenId;
    if (isNew) {
        unreadStatuses++
    }
    const htmlContent = 
    `<div class="status ${isNew ? 'new' : ''}">
        <div class="header">
            <p class="author" translate="no">NDagger</p>
            <p class="time-passed" data-date="${getDateStr(date)}">${timePassed} ago</p>
        </div>
        <p class="status-content">${content}</p>
    </div>`
    statusContainer.insertAdjacentHTML('beforeend', htmlContent)
} 


let statusFetched = false;
let page = 0;
const limit = 30;

let loadingStatuses = false
const loadStatuses = async () => {
    loadingStatuses = true
    let loadingState = 0
    const intervalId = setInterval(() => {
        loadingState = (loadingState + 1) % 5
        const content = `Loading${".".repeat(Math.max(loadingState-1, 0))}`
    }, 200)
    const params = new URLSearchParams({ 
        page: page,
        limit: limit 
    })
    const res = await fetch(`${backendHost}/api/status?${params.toString()}`)
    .catch(err => {
        loadingStatuses = false;
        console.error(err);
        clearInterval(intervalId);
    })
    const statuses = await res.json()
    const recentStatusId = statuses[0]?.id;
    const recentStatusSeenId = config.lastStatusSeenId;
    if (recentStatusId > recentStatusSeenId && page === 0) {
        config.lastStatusSeenId = recentStatusId
        localStorage.setItem('portfolio-config', JSON.stringify(config))
    }
    clearInterval(intervalId);
    for (let i = 0; i < statuses.length; i++) {
        const status = statuses[i]
        pushStatus(status)
    }
    loadingStatuses = false;
    page++;
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
    const replace = (url, content) => {
        const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<!["'])${escapeRegExp(url)}(?!["'])`, 'g');
        str = str.replace(regex, content);
    }
    for (const url of urlList) {
        try {
            const cleanUrl = url.split('?')[0].toLowerCase();
            if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif'].some(ext => cleanUrl.endsWith(ext))) {
                replace(url, `<img class="embed open-in-window" src="${url}">`)
                continue;
            }
            else {
                replace(url, `<a href="${url}" target="_blank">${url}</a>`)
                continue;
            }
        } catch(e) {
            replace(url, `<a href="${url}" target="_blank">${url}</a>`)
        }
    }
    return str
}

(async () => {
    await loadStatuses()
    const element = document.querySelector("#statuses");
    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
})()

window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    body.addEventListener('scroll', () => {
        const scrollTop = body.scrollTop;
        const style = getComputedStyle(body);
        const scrollMax = body.scrollHeight - style.height.match(/(\d+)/)[0];
        if (scrollTop >= scrollMax - 2900 && !loadingStatuses) loadStatuses();
    })
})