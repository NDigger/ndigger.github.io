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

let statusFetched = false;
let page = 0;
const limit = 50;

let loadingStatuses = false
const pushNewStatusesList = () => {
    if (loadingStatuses) return
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
    fetch(`${backendHost}/api/status?${params.toString()}`)
    .then(res => res.json())
    .then(data => {
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        statusLoadingMessage.style.display = 'none';
        clearInterval(intervalId);
        pushStatuses(data);
        page++;
        loadingStatuses = false;
    })
    .catch(err => {
        console.error(err)
        clearInterval(intervalId)
        statusLoadingMessage.style.display = 'block'
        statusLoadingMessage.textContent = String(err)
    })
}

document.getElementById('status-btn').addEventListener('click', () => {
    if (statusFetched) return
    statusFetched = true
    pushNewStatusesList()
})

const pushStatuses = data => {
    const statusContainer = document.getElementById('status-container');
    let html = '';
    data.map(status => {
        html += 
            `<div class="status">
                <div class="header">
                    <p class="author">NDagger</p>
                    <p class="time-passed">${getTimePassed(new Date(status.created_at).getTime())} ago</p>
                </div>
                <p>${status.content}</p>
            </div>`
    })
    statusContainer.insertAdjacentHTML('beforeend', html)
} 

window.addEventListener('DOMContentLoaded', () => {
    const statusScroll = document.querySelector('#statuses > .content')
    statusScroll.addEventListener('scroll', () => {
        const scrollTop = statusScroll.scrollTop;
        const style = getComputedStyle(statusScroll);
        const scrollMax = statusScroll.scrollHeight - style.height.match(/(\d+)/)[0];
        if (scrollTop >= scrollMax - 100) pushNewStatusesList();
    })
})