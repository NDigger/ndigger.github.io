import { statuses } from "./windows.js";
// import { AppWindow } from "./utils/appwindow.js";
// import { windowManager } from "./windows.js";
// import windows from "./windowscontent.js";
// import { Size } from './utils/structures.js';

const backendHost = 'https://backend-statuses.vercel.app'
// const backendHost = 'http://localhost:3000'

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
const pushNewStatusesList = () => {
    loadingStatuses = true
    const statusLoadingMessage = document.getElementById('status-loading-message')
    const intervalId = setInterval(() => {
        const v = statusLoadingMessage.textContent
        if (v === 'loading') statusLoadingMessage.textContent = 'loading.'
        else if (v === 'loading.') statusLoadingMessage.textContent = 'loading..'
        else if (v === 'loading..') statusLoadingMessage.textContent = 'loading...'
        else if (v === 'loading...') statusLoadingMessage.textContent = 'loading'
    }, 200)
    const params = new URLSearchParams({ 
        page: page,
        limit: limit 
    })
    // fetch(`${backendHost}/api/status?${params.toString()}`)
    // .then(res => res.json())
    // .then(data => {
    //     const recentStatusId = data[0]?.id;
    //     const recentStatusSeenId = config.lastStatusSeenId;
    //     if (recentStatusId > recentStatusSeenId && page === 0) {
    //         config.lastStatusSeenId = recentStatusId
    //         localStorage.setItem('portfolio-config', JSON.stringify(config))
    //     }
    //     clearInterval(intervalId);
    //     pushStatuses(data);
    //     page++;
    //     statusLoadingMessage.style.display = 'none'
    // })
    // .catch(err => {
    //     loadingStatuses = false;
    //     console.error(err)
    //     clearInterval(intervalId)
    //     statusLoadingMessage.style.display = 'block'
    //     statusLoadingMessage.textContent = String(err)
    // })

    setTimeout(() => {
        clearInterval(intervalId);
        loadingStatuses = false;
        statusLoadingMessage.style.display = 'none'
        const statuses = [];
        for(let i = 0; i < 50; i++) {
            const contents = [
                'i need some time to sleep', 'and order and order',
                'привет https://media.tenor.com/RTIUZu7zLZkAAAAe/maud-pie-pinkie-pie.png'
            ];
            statuses.push({
                id: i,
                created_at: Date.now(),
                content: contents[Math.floor(Math.random() * contents.length)],
            })
        }
        pushStatuses(statuses);
    }, 1000)
}

const replaceContentURLs = async str => {
    const regex = /(?:^|\s)(https?:\/\/|data:image\/)\S+/g;
    const matches = Array.from(str.matchAll(regex));
    const urlList = matches.map(v => v[0].trim());
    for (const url of urlList) {
        try {
            const res = await fetch(url);
            const contentType = res.headers.get('Content-Type')
            console.log(contentType)
            if (contentType.startsWith('image/')) {
                str = str.replace(url, `<img src="${url}"">`)
            }
            else {
                str = str.replace(url, `<a href="${url}" target="_blank">${url}</a>`)
            }
        } catch(e) {
            str = str.replace(url, `<a href="${url}" target="_blank">${url}</a>`)
        }
    }
    return str
}

document.getElementById('status-btn').addEventListener('click', () => {
    if (statusFetched) return
    statusFetched = true
    pushNewStatusesList()
})

const lastStatusSeenId = config.lastStatusSeenId
let unreadStatuses = 0
const pushStatuses = async data => {
    const statusContainer = document.getElementById('status-container');
    const statusCreatedElements = [];
    for (const status of data) {
        if (status.id > lastStatusSeenId) unreadStatuses++
        const date = new Date(status.created_at);
        const timePassed = getTimePassed(date.getTime());
        const convertedDate = (() => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const format = val => val < 10 ? `0${val}` : val;
            return `${format(day)}.${format(month)}.${year}`
        })()
        const content = await replaceContentURLs(status.content)
        const htmlContent = 
        `<div id="container-status-${status.id}" class="status ${status.id > lastStatusSeenId ? 'new' : ''}">
            <div class="header">
                <p class="author" translate="no">NDagger</p>
                <p class="time-passed" data-date="${convertedDate}">${timePassed} ago</p>
            </div>
            <p class="status-content">${content}</p>
        </div>`
        statusCreatedElements.push(htmlContent)
    }
    statusCreatedElements.forEach((html, i) => {
        setTimeout(
            () => statusContainer.insertAdjacentHTML('beforeend', html)
        , i * 50);
    })
    setTimeout(() => loadingStatuses = false, statusCreatedElements.length * 50)
    statuses.setTitleContent(unreadStatuses !== 0 ? `Statuses ( ${unreadStatuses} )` : 'Statuses') 
    // statusContainer.insertAdjacentHTML('beforeend', html)

    // statusCreatedElements.forEach(status => {
    //     status.title = "Click to open"
    //     status.addEventListener('click', e => {
    //         const mainElement = e.currentTarget
    //         const id = Number(mainElement.id.match(/(\d+)$/)[1])
    //         let visibleWindow = null
    //         for (const window of windowManager.windows) {
    //             if (window.id === `status-${id}`) {
    //                 visibleWindow = window;
    //                 continue;
    //             }
    //         }
    //         if (visibleWindow == null) {
    //             const d = data.find(v => v.id === id)
    //             const w = new AppWindow(windows.status(d));
    //             w.setClampedSize(new Size(600, 500));
    //             w.onClose = () => setTimeout(() => windowManager.delete(w), 400);
    //             windowManager.add(w);
    //             w.show();
    //         } else {
    //             if (visibleWindow.animationRunning) return
    //             visibleWindow.hide()
    //             setTimeout(() => windowManager.delete(visibleWindow), 400);
    //         }
    //     })
    // })
} 

window.addEventListener('DOMContentLoaded', () => {
    const statusScroll = document.querySelector('#statuses > .content')
    statusScroll.addEventListener('scroll', () => {
        const scrollTop = statusScroll.scrollTop;
        const style = getComputedStyle(statusScroll);
        const scrollMax = statusScroll.scrollHeight - style.height.match(/(\d+)/)[0];
        if (scrollTop >= scrollMax - 100 && !loadingStatuses) pushNewStatusesList();
    })
})