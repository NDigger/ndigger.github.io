// const backendHost = 'https://backend-statuses.vercel.app'
const backendHost = 'http://localhost:3000'

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

let statusData;
let statusFetched = false;
document.getElementById('status-btn').addEventListener('click', () => {
    const statusLoadingMessage = document.getElementById('status-loading-message')
    statusFetched = true
    const intervalId = setInterval(() => {
        const v = statusLoadingMessage.textContent
        if (v === 'loading') statusLoadingMessage.textContent = 'loading.'
        else if (v === 'loading.') statusLoadingMessage.textContent = 'loading..'
        else if (v === 'loading..') statusLoadingMessage.textContent = 'loading...'
        else if (v === 'loading...') statusLoadingMessage.textContent = 'loading'
    }, 200)
    setTimeout(() => {
    fetch(`${backendHost}/api/status`)
    .then(res => res.json())
    .then(data => {
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        statusData = data;
        statusLoadingMessage.style.display = 'none';
        clearInterval(intervalId);
        pushStatuses(statusData, statusIterator);
    })
    .catch(err => {
        console.error(err)
        clearInterval(intervalId)
        statusLoadingMessage.textContent = String(err)
    })
    }, 1000)
})

let statusIterator = 0;
let isStatusListUpdating = false
const statusIteratorInc = 10;
const pushStatuses = (statuses, iterator) => {
    const statusContainer = document.getElementById('status-container');

    if (statusIterator > statuses.length && !isStatusListUpdating) return
    isStatusListUpdating = true
    let html = '';
    statusIterator += statusIteratorInc
    const cap = iterator + statusIteratorInc < statuses.length ? iterator + statusIteratorInc : statuses.length 
    for (let i = iterator; i < cap; i++){
        const status = statusData[i];
        html += 
            `<div class="status">
                <div class="header">
                    <p class="author">NDagger</p>
                    <p class="time-passed">${getTimePassed(new Date(status.created_at).getTime())} ago</p>
                </div>
                <p>${status.content}</p>
            </div>`
    }
    isStatusListUpdating = false
    statusContainer.insertAdjacentHTML('beforeend', html)
} 

window.addEventListener('DOMContentLoaded', () => {
    const statusScroll = document.querySelector('#statuses > .content')
    statusScroll.addEventListener('scroll', () => {
        const scrollTop = statusScroll.scrollTop;
        const style = getComputedStyle(statusScroll);
        const scrollMax = statusScroll.scrollHeight - style.height.match(/(\d+)/)[0];
        if (scrollTop >= scrollMax - 100) pushStatuses(statusData, statusIterator);
    })
})