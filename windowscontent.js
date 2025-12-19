const getPanelHtml = (title, {fullscreenBtn} = {}) => `
    <div class="window-panel">
        <p class="title"><span class="content" title="${title}">${title}</span></p>
        <div class="buttons">
            ${fullscreenBtn ? '<button class="fullscreen" title="Fullscreen" aria-label="screen mode"><i class="bi bi-window-fullscreen"></i></button>' : ''}
            <button class="close" title="Close" aria-label="close"><i class="bi bi-x-lg"></i></button>
        </div>
    </div>
`

export default class AppWindowHTMLContent {
    static ABOUT_ME = `
        <section id="about-me" class="window">
            ${getPanelHtml('About me', {
                fullscreenBtn: false
            })}
            <div class="header">
                <img class="profile-image" src="./images/profileImage.png" alt="Profile Image">
                <div>
                    <h1 class="profile-name" translate="no">NDagger</h1>
                    <h2 class="subtitle">The low tier progarmer</h2>
                </div>
            </div>
            <div class="content">
                <p>Hi, I'm NDagger or NDigger or someone else.</p>
                <p>I'm the child who is working on a factory and trying to create pages with some functionality.</p>
                <p>Things that I work with for a long time are programming and drawing, you can see more details below.</p>
                <p>I have been programming since I was 18 and continue to do so to this day. I started programming out of sheer boredom and an important piece of advice. It turned out to be much more interesting than I thought. Unfortunately, learning libraries for programming languages ​​is tens of times more difficult for me, but I try.</p>
                <p>I have used programming to create games, create pages, and create different content for games.</p>
                <p>I also like or liked drawing, cool right?</p>
            </div>
        </section>
    `
    static SKILLS = `
        <section id="skills" class="window">
            ${getPanelHtml('Skills')}
            <div class="content">
                <p>Tools I use:</p>
                <div id="tools-container" translate="no" class="tools-container">
                    <span class="hover-sound">Adobe Illustrator</span>
                    <span class="hover-sound">Adobe Photoshop</span>
                    <span class="hover-sound">Clip Studio Paint X</span>
                    <span class="hover-sound">FL Studio</span>
                    <span class="hover-sound">Visual Studio Code</span>
                    <span class="hover-sound">Visual Studio</span>
                    <span class="hover-sound">Postgre SQL</span>
                    <span class="hover-sound">Git</span>
                </div>
                <p>Programming languages I worked with:</p>
                <div id="pl-container" translate="no" class="tools-container">
                    <span class="hover-sound">Python</span>
                    <span class="hover-sound">Java Script</span>
                    <span class="hover-sound">C++</span>
                    <span class="hover-sound">GDScript</span>
                    <span class="hover-sound">Bash</span>
                    <span class="hover-sound">OpenGL Shading Language</span>
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
                <p>I have been drawing since I was 14. I can't say that I have learned anything in 4 years. For me, drawing is a simple way to relax and maybe enjoy the end result.</p>
                <div class="illustrations-container">
                    <img class="open-in-window-img open-in-window hover-sound" src="images/illustrations/Без названия281-1.png" alt="illustration">
                    <img class="open-in-window-img open-in-window hover-sound" src="images/illustrations/Без названия325_20240522013505.jpg" alt="illustration">
                    <img class="open-in-window-img open-in-window hover-sound" src="images/illustrations/Без названия459-3.jpg" alt="illustration">
                    <img class="open-in-window-img open-in-window hover-sound" src="images/illustrations/Без названия467_20250416203247.png" alt="illustration">
                </div>
            </div>
        </section>
    `
                        // <img class="open-in-window-img open-in-window hover-sound" src="images/illustrations/Без названия468.png" alt="illustration">

    // static LINKS = `
    //     <section id="creations" class="window">
    //         ${getPanelHtml('Creations')}
    //         <div class="content">
    //             <div class="centered-links">
    //                 <h1>Avaliable pages</h1>
    //                 <div class="links">
    //                     <a class="hover-sound" href="./old" target="_blank" title="Click to visit"><img src="./images/pages/old.png"></a>
    //                     <a class="hover-sound" href="./typing-speed-test" target="_blank" title="Click to visit"><img src="./images/pages/tts.png"></a>
    //                     <a class="hover-sound" href="./webagon" target="_blank" title="Click to visit"><img src="./images/pages/webagon.png"></a>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // `
    static LINKS = `
        <section id="links" class="window">
            ${getPanelHtml('Links')}
            <div class="content">
                <div class="centered">
                    <div class="flex-links">
                        <a title="Redirect" aria-label="youtube" class="gold-btn hover-sound" href="https://www.youtube.com/@scout1495" target="_blank">
                            <i class="bi bi-youtube"></i>
                            <p translate="no">Youtube</p>
                        </a>
                        <a title="Redirect" aria-label="github" class="gold-btn hover-sound" href="https://github.com/NDigger" target="_blank">
                            <i class="bi bi-github"></i>
                            <p translate="no">Github</p>
                        </a>
                        <a title="Redirect" aria-label="itch.io" class="gold-btn hover-sound" href="https://ndagger1.itch.io/" target="_blank">
                            <i class="bi bi-shop-window"></i>
                            <p translate="no">Itch.io</p>
                        </a>
                    </div>
                    <div class="discord">
                        <i class="bi bi-discord" title="Discord"></i>
                        <p translate="no">@pizda69</p>
                        <button id="copy-discord" title="Copy" aria-label="discord" id="discord-btn" class="copyable hover-sound copy-btn">
                            <i class="bi bi-copy"></i>
                        </button>
                        <div id="discord-copied" class="discord-copied">
                            <i class="bi bi-check2"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `

    static image = src => `
        <section id="${src}" class="window">
            ${getPanelHtml(src, {
                fullscreenBtn: true
            })}
            <div class="content image-content">
                <img src=${src} alt=${src}>
            </div>
        </section>
    `

    static status = data => {
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

    static STATUSES = `
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
}