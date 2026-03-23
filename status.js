import { statuses } from "./windows.js";
import { AppWindow } from "./utils/appwindow.js";
import { windowManager } from "./windows.js";
import { AppWindowHTMLContent } from "./windowscontent.js";
import { Size } from './utils/structures.js';
import { openWindowOnImageClick } from "./windows.js";

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

const statusContainer = document.getElementById('status-container');
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

let statusFetched = false;
let page = 0;
const limit = 30;

let loadingStatuses = false
const statusTitle = document.querySelector('#statuses .title');
const statusLoadingProgressBar = document.querySelector('#statuses .loading-progress-bar');
const loadStatuses = () => {
    loadingStatuses = true
    let loadingState = 0
    const intervalId = setInterval(() => {
        loadingState = (loadingState + 1) % 5
        const content = `Loading${".".repeat(Math.max(loadingState-1, 0))}`
        statusTitle.textContent = content
    }, 200)
    const params = new URLSearchParams({ 
        page: page,
        limit: limit 
    })
    fetch(`${backendHost}/api/status?${params.toString()}`)
    .then(res => res.json())
    .then(async statuses => {
        document.querySelector('#statuses .title').textContent = `Statuses ( ${unreadStatuses}/${statusContainer.childElementCount} )`
        
        const recentStatusId = statuses[0]?.id;
        const recentStatusSeenId = config.lastStatusSeenId;
        if (recentStatusId > recentStatusSeenId && page === 0) {
            config.lastStatusSeenId = recentStatusId
            localStorage.setItem('portfolio-config', JSON.stringify(config))
        }
        clearInterval(intervalId);
        const setProgress = p => {
            statusLoadingProgressBar.style.setProperty('--progress', p)
        }
        for (let i = 0; i < statuses.length; i++) {
            const status = statuses[i]
            setProgress((i+1)/statuses.length)
            await pushStatus(status)
        }
        setProgress(0)
        loadingStatuses = false;
        page++;
    })
    .catch(err => {
        loadingStatuses = false;
        console.error(err)
        document.querySelector('#statuses .title').textContent = err
        clearInterval(intervalId)
    })

    // setTimeout(async () => {
    //     clearInterval(intervalId);
    //     const statuses = []
    //     for(let i = 0; i < 50; i++) {
    //         const contents = [
    //             'i need some time to sleep', 'and order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and orderand order and order',
    //             'привет https://media.tenor.com/RTIUZu7zLZkAAAAe/maud-pie-pinkie-pie.png пока https://media.tenor.com/RTIUZu7zLZkAAAAe/maud-pie-pinkie-pie.png',
    //             'Today I finished watching mlp s7:( https://youtu.be/-c6sE584NP8?si=aIYfM9bAQS86j6Zb I\'m still excited how much have I got attached to it .0. I also got used a bit more to English in it and during time I was figuring out new words to me without any pressure what I used to feel when looking at any new words in common. waaa im sleeping, also musicals are actually nice, I might come back to earlier episodes on eng just to check them out too, I think I missed a bunch of gems >_∆',
    //             'https://user-images.githubusercontent.com/14011726/94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif',
    //         ];
    //         statuses.push({
    //             id: i,
    //             created_at: Date.now(),
    //             content: contents[Math.floor(Math.random() * contents.length)],
    //         })
    //     }
    //     const setProgress = p => {
    //         statusLoadingProgressBar.style.setProperty('--progress', p)
    //     }
    //     for (let i = 0; i < statuses.length; i++) {
    //         const status = statuses[i]
    //         setProgress((i+1)/statuses.length)
    //         await pushStatus(status)
    //     }
    //     setProgress(0)
    //     loadingStatuses = false;
    // }, 1000)
}

const escapeHTML = str => {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const replaceContentURLs = async str => {
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
            // if (['https://www.youtube.com/watch', 'https://youtu.be/'].some(v => url.startsWith(v))) {
            //     var videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            //     replace(url, `<a href="${url}" target="_blank">${url}</a><iframe width="560" height="315" 
            //         src="https://www.youtube.com/embed/${videoId[1]}" 
            //         class="embed"
            //         title="YouTube video player" 
            //         frameborder="0" 
            //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            //         allowfullscreen>
            //     </iframe>`)
            //     continue;
            // }
            const res = await fetch(url);
            // const res = await fetch(url);
            const contentType = res.headers.get('Content-Type')
            if (contentType.startsWith('image/')) {
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

document.getElementById('status-btn').addEventListener('click', () => {
    if (statusFetched) return
    statusFetched = true
    loadStatuses()
})

const lastStatusSeenId = config.lastStatusSeenId
let unreadStatuses = 0
const pushStatus = async status => {
    const onClick = async (element) => {
        const id = Number(element.id.match(/(\d+)$/)[1]);
        let visibleWindow = windowManager.getWindow(`status-info-${id}`);
        if (visibleWindow == null) {
            const localStatus = status
            // status.content = await replaceContentURLs(escapeHTML(localStatus.content));
            const html = AppWindowHTMLContent.status(status)
            console.log(html)
            const w = new AppWindow(html);
            Array.from(w.element.querySelectorAll('.content .status-content img')).forEach(img => {
                openWindowOnImageClick(img)
            })
            const width = Math.min(window.innerWidth - 80, window.innerWidth * html.length * 0.0005)
            const height = Math.min(window.innerHeight - 80, 150 + window.innerHeight * html.length * 0.00025)
            w.setClampedSize(new Size(width, height));
            w.onClose = () => setTimeout(() => windowManager.destroy(w), 400);
            windowManager.add(w);
            w.show();
        } else {
            windowManager.destroy(visibleWindow)
        }
    }
    
    const date = new Date(status.created_at);
    const timePassed = getTimePassed(date.getTime());
    const content = await replaceContentURLs(escapeHTML(status.content));
    const isNew = status.id > lastStatusSeenId;
    if (isNew) {
        unreadStatuses++
    }
    const htmlContent = 
    `<div id="container-status-${status.id}" class="status ${isNew ? 'new' : ''}">
        <div class="header">
            <button class="author" translate="no">NDagger</button>
            <p class="time-passed" data-date="${getDateStr(date)}">${timePassed} ago</p>
        </div>
        <p class="status-content">${content}</p>
    </div>`
    statusContainer.insertAdjacentHTML('beforeend', htmlContent)
    Array.from(statusContainer.lastElementChild.querySelectorAll('.status-content img')).forEach(img => {
        openWindowOnImageClick(img)
    })
    // statusCreatedElements.push(htmlContent)
    // const author = statusContainer.lastElementChild.querySelector('.header .author')
    // author.addEventListener('click', () => onClick(statusContainer.lastElementChild))
    document.querySelector('#statuses .title').textContent = `Statuses ( ${unreadStatuses}/${statusContainer.childElementCount} )`
} 

window.addEventListener('DOMContentLoaded', () => {
    const statusScroll = document.querySelector('#statuses > .content')
    statusScroll.addEventListener('scroll', () => {
        const scrollTop = statusScroll.scrollTop;
        const style = getComputedStyle(statusScroll);
        const scrollMax = statusScroll.scrollHeight - style.height.match(/(\d+)/)[0];
        if (scrollTop >= scrollMax - 100 && !loadingStatuses) loadStatuses();
    })
})