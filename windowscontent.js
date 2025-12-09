const getPanelHtml = (title, {fullscreenBtn} = {}) => `
    <div class="window-panel">
        <p class="title"><span class="content" title="${title}">${title}</span></p>
        <div class="buttons">
            ${fullscreenBtn ? '<button class="fullscreen" title="Fullscreen" aria-label="screen mode"><i class="bi bi-window-fullscreen"></i></button>' : ''}
            <button class="close" title="Close" aria-label="close"><i class="bi bi-x-lg"></i></button>
        </div>
    </div>
`

export const aboutMe = `
    <section id="about-me" class="window">
        ${getPanelHtml('About me', {
            fullscreenBtn: true
        })}
        <div class="header">
            <img class="profile-image" src="./images/profileImage.png" alt="Profile Image">
            <div>
                <h1 class="profile-name">NDagger</h1>
                <h2 class="subtitle">The low tier progarmer</h2>
            </div>
        </div>
        <div class="content">
            <p>Hi, I'm NDagger or NDigger or someone else.</p>
            <p>I'm the child who is working on a factory and trying to create pages with some functionality.</p>
            <p>Things that I work with for a long time are programming and drawing, you can see more details below.</p>
            <h2>Programming</h2>
            <p>I have been programming since I was 18 and continue to do so to this day. I started programming out of sheer boredom and an important piece of advice. It turned out to be much more interesting than I thought. Unfortunately, learning libraries for programming languages ​​is tens of times more difficult for me, but I try.</p>
            <p>I have used programming to create games, create pages, and create different content for games.</p>
            <h2>Drawing</h2>
            <p>I have been drawing since I was 14. I can't say that I have learned anything in 4 years. For me, drawing is a simple way to relax and maybe enjoy the end result.</p>
        </div>
    </section>
`
export const skills = `
    <section id="skills" class="window">
        ${getPanelHtml('Skills')}
        <div class="content">
            <p>Tools I use:</p>
            <div id="tools-container" class="tools-container">
                <span>Adobe Illustrator</span>
                <span>Adobe Photoshop</span>
                <span>Clip Studio Paint X</span>
                <span>FL Studio</span>
                <span>Visual Studio Code</span>
                <span>Visual Studio</span>
                <span>Postgre SQL</span>
                <span>Git</span>
            </div>
            <p>Programming languages I worked with:</p>
            <div id="pl-container" class="tools-container">
                <span>Python</span>
                <span>Java Script</span>
                <span>C++</span>
                <span>GDScript</span>
                <span>Bash</span>
                <span>OpenGL Shading Language</span>
            </div>
            <h2>Web Development</h2>
            <p>Most of pages I made don't use any libraries because I don't see much of need in them for personal projects.</p>
            <p>But there are exceptions! Drawing meshes with pure JavaScript is a complex task so I used pixi.js meshes for that.</p>
            <p>I had practiced both frontend and backend sides. This page is an exception of the good adaptive frontend design I made.</p>
            <p>When I tried to create my custom app I used various libraries and frameworks which do some complex work or simplify the development process of complex stuff to me.</p>
            <p>I had worked with basics of React, express.js, various node libraries, Vite, pixi.js.</p>
            <p>Several hosted pages you can see in the creation tab.</p>
            <p>The page you see now also does not use any libraries at all.</p>
            <h2>Drawing</h2>
            <p>I began enjoying this process a lot when I was 15. I keep returning back from times to times to make several pictures, but I'm not focused on it.</p>
            <p>I didn't progress much since then.</p>
            <div class="illustrations-container">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия281-1.png" alt="illustration">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия325_20240522013505.jpg" alt="illustration">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия459-3.jpg" alt="illustration">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия467_20250416203247.png" alt="illustration">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия468.png" alt="illustration">
            </div>
        </div>
    </section>
`
export const creation = `
    <section id="creations" class="window">
        ${getPanelHtml('Creations')}
        <div class="content">
            <div class="centered-links">
                <h1>Avaliable pages</h1>
                <div class="links">
                    <a href="./old" target="_blank" title="Click to visit"><img src="./images/pages/old.png"></a>
                    <a href="./typing-speed-test" target="_blank" title="Click to visit"><img src="./images/pages/tts.png"></a>
                    <a href="./webagon" target="_blank" title="Click to visit"><img src="./images/pages/webagon.png"></a>
                </div>
            </div>
        </div>
    </section>
`

export const image = src => `
    <section id="${src}" class="window">
        ${getPanelHtml(src, {
            fullscreenBtn: true
        })}
        <div class="content image-content">
            <img src=${src} alt=${src}>
        </div>
    </section>
`

export const status = data => {
    const date = new Date(data.created_at);
    return `
    <section id="status-${data.id}" class="window">
        ${getPanelHtml(`Status Info`, {
            fullscreenBtn: true
        })}
        <div class="content status-content">
            <h3>ID: ${data.id}</h3>
            <p>Created at: ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}</p>
            <p class="content">${data.content}</p>
        </div>
    </section>
    `
}

export const statuses = `
    <section id="statuses" class="window">
        ${getPanelHtml('Statuses', {
            fullscreenBtn: true
        })}
        <div class="content">
            <p id="status-loading-message">loading</p>
            <div id="status-container">
            </div>
        </div>
    </section>
`

export default {aboutMe, skills, creation, image, status, statuses}