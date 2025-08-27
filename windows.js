const getPanelHtml = (title) => `
    <div class="window-panel">
        <p class="title" title="${title}">${title}</p>
        <div class="buttons">
            <button class="fullscreen" title="Fullscreen"><i class="bi bi-arrows-fullscreen"></i></button>
            <button class="close" title="Close"><i class="bi bi-x-lg"></i></button>
        </div>
    </div>
`

export const aboutMe = `
    <section id="about-me" class="window">
        ${getPanelHtml('About me')}
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
            <p>Frameworks and languages I use/used:</p>
            <div id="pl-container" class="tools-container">
                <span>С++</span>
                <span>Java Script</span>
                <span>Python</span>
                <span>GDScript</span>
                <span>Bash</span>
                <span>Express</span>
                <span>PHP</span>
                <span>OpenGL Shading Language</span>
            </div>
            <h2>Web Development</h2>
            <p>Most of pages I made don't use any libraries. The page you see now also does not use any libraries at all.</p>
            <p>I used libraries and frameworks only when I had a need in backend and data storage.</p>
            <p>The only framework I tried to apply on practice is express.</p>
            <h2>Game Development</h2>
            <img id="godot-unity-content-img" src="./images/godotVsUnity.png" alt="godotVsUnity">
            <p>I began from SFML library. This is C++ library for developing games. The only reason why I chose it - I thought it's way better than Game Engines for no reason. Due to how complex C++ is to me I dropped it quite quickly.</p>
            <p>All games I've made were done with Godot game engine. The simplicity and speed of the engine make it a top priority for me.</p>
            <p>I had a try to use Unity game engine. It's very heavy and much more complex. I understand that Unity might be better for more complex projects but it doesn't seem to be necessary for me.</p>
            <p>And the most important thing - It's not necessary anymore to have a "Made with Unity" popup on load :D</p>
        </div>
    </section>
`
export const creation = `
    <section id="creation" class="window">
        ${getPanelHtml('Creation')}
        <div class="content">
            <h1>I enjoy making digital things!</h1>
            <p>Below you can look at various digital things I made.</p>
            <h2>Few Decent Illustrations</h2>
            <div class="illustrations-container">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия281-1.png" alt="illustration">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия325_20240522013505.jpg" alt="illustration">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия459-3.jpg" alt="illustration">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия467_20250416203247.png" alt="illustration">
                <img class="open-in-window-img open-in-window" src="images/illustrations/Без названия468.png" alt="illustration">
            </div>
            <p>As I said, I don't have any special skills.</p>
            <h2>Games</h2>
            <div class="game-info-container">
                <div>
                    <img class="open-in-window-img open-in-window" src="./images/games/snipe.png" alt="snipe">
                </div>
                <div>
                    <div class="title-download-container">
                        <h3>Snipe</h3>
                    </div>
                    <p>Hit the target as long as you can! The idea is very simple but can captivate you for several minutes :D</p>
                    <a class="download pc-only" href="https://ndagger1.itch.io/snipe" target="_blank">Get <i class="bi bi-pc-display-horizontal"></i> <i class="bi bi-phone"></i></a>
                    <a class="download mobile-only" href="https://ndagger1.itch.io/snipe" target="_blank">Get <i class="bi bi-pc-display-horizontal"></i> <i class="bi bi-phone"></i></a>
                </div>
            </div>
            <div class="game-info-container">
                <div>
                    <img class="open-in-window-img open-in-window" src="./images/games/iwbtn.png" alt="iwbtn">
                </div>
                <div>
                    <div class="title-download-container">
                        <h3>I wanna be the NDagger</h3>
                    </div>
                    <p>An extremely hard platformer with rather rigid controls. The experience may be a bit unusual if you are used to smoother controls.</p>
                    <p>The game is heavily inspired by I wanna be the guy and Geometry Dash.</p>
                    <a class="download pc-only" href="https://ndagger1.itch.io/i-wanna-be-the-ndagger" target="_blank">Get <i class="bi bi-pc-display-horizontal"></i></a>
                    <a class="download mobile-only" href="https://ndagger1.itch.io/i-wanna-be-the-ndagger" target="_blank">Get <i class="bi bi-pc-display-horizontal"></i></a>
                </div>
            </div>
            <div class="game-info-container">
                <div>
                    <img class="open-in-window-img open-in-window" src="./images/games/rocket.png" alt="rocket">
                </div>
                <div>
                    <h3>Rocket (In development)</h3>
                    <p>That's the speedrun game I'm currently making. Hopes on it to be fun :)</p>
                </div>
            </div>
            <h2>Web Pages</h2>
            <p>This page! I have more examples but most of them are static frontend pages with very basic functionality. </p>
        </div>
    </section>
`
export const faq = `
    <section id="faq" class="window">
        ${getPanelHtml('NFAQ')}
        <div class="content">
            <h1>Here you can see some not frequently asked questions answered.</h1>
            <div class="question-container">
                <div class="question-flex">
                    <p class="question">What is your name?</p>
                    <button class="show-answer-btn"><i class="bi bi-chevron-left"></i></button>
                </div>
                <p class="answer">NAZARII. That's also the reason why I'm NDagger, not ADagger or BDagger</p>
            </div>
            <div class="question-container">
                <div class="question-flex">
                    <p class="question">What is your age?</p>
                    <button class="show-answer-btn"><i class="bi bi-chevron-left"></i></button>
                </div>
                <p class="answer">Better count yourself. I born 10.09.2006 if I am not wrong.</p>
            </div>
            <div class="question-container">
                <div class="question-flex">
                    <p class="question">Do you have other social media?</p>
                    <button class="show-answer-btn"><i class="bi bi-chevron-left"></i></button>
                </div>
                <p class="answer">I do, but I prefer to keep it private. I am not active on social networks because I do not know how to talk to an audience that I do not have.</p>
            </div>
            <div class="question-container">
                <div class="question-flex">
                    <p class="question">Why you don't draw men?</p>
                    <button class="show-answer-btn"><i class="bi bi-chevron-left"></i></button>
                </div>
                <p class="answer">Men is ugly and hard to draw, LL situation.</p>
            </div>
            <div class="question-container">
                <div class="question-flex">
                    <p class="question">Are comissions open?</p>
                    <button class="show-answer-btn"><i class="bi bi-chevron-left"></i></button>
                </div>
                <p class="answer">They never were.</p>
            </div>
            <div class="question-container">
                <div class="question-flex">
                    <p class="question">Can I contact you?</p>
                    <button class="show-answer-btn"><i class="bi bi-chevron-left"></i></button>
                </div>
                <p class="answer">Not sure why but there's no problem with it. You can contact me only on discord. You can get my discord tag below. And one more thing: type reasonable message so I know that you're human and you're real.</p>
            </div>
            <div class="question-container">
                <div class="question-flex">
                    <p class="question">Aren't questions sorta random?</p>
                    <button class="show-answer-btn"><i class="bi bi-chevron-left"></i></button>
                </div>
                <p class="answer">sorta they are.</p>
            </div>
        </div>
    </section>
`

export const rest = `
    <section id="rest" class="window">
        ${getPanelHtml('Rest')}
        <div class="content">
            <h1>What is a rest?</h1>
            <p>What a nice question. Everyone likes to relax and everyone does it differently. From about 9 years old until about today, I relaxed inside an amazing world written with numbers and letters - a computer.</p>
            <p>In the wonderful digital world, my main way of relaxing was playing games. Most of the time I played multiplayer games that were not based on competition, so I really just relaxed.</p>
            <p>Even though I spent most of my time playing non-competitive games, let's not forget about the smaller part. Because of the smaller part, I broke my phone at about 12 years old :D</p>
            <p>Besides games, I also occasionally enjoy watching anime.</p>
            <p>Unfortunately, after I got a job, I forgot how to rest at all (even sleep). Too many negative thoughts that prevent me from opening Steam and just launching the game.</p>
            <p>Now rarely I play quite specific games or watch specific anime. But my favorite way to relax now is YouTube.</p>
            <h2>Recommendations list</h2>
            <p>I like rating and sharing my small opinions about games and other. Here you can see my ratings on:
            <h3>Games</h3>
            <div class="ratings-container">
                <span><span class="rating">5</span> Getting Over It</span>
                <span><span class="rating">5</span> Saya No Uta</span>
                <span><span class="rating">5</span> Miside</span>
                <span><span class="rating">5</span> Portal</span>
                <span><span class="rating">5</span> Undertale</span>
                <span><span class="rating">4.5</span> LonaRPG</span>
                <span><span class="rating">4.5</span> Flipwitch - Forbidden Sex Hex</span>
                <span><span class="rating">4.5</span> Voices of the void</span>
                <span><span class="rating">4.5</span> Entropy Zero 2</span>
                <span><span class="rating">4.5</span> Boxman's Struggle</span>
                <span><span class="rating">4.5</span> Infinitode 2</span>
                <span><span class="rating">4.5</span> Black Mesa</span>
                <span><span class="rating">4.5</span> Portal 2</span>
                <span><span class="rating">4.5</span> Half-life 2</span>
                <span><span class="rating">4</span> Outcore</span>
                <span><span class="rating">4</span> Stanley Parable</span>
                <span><span class="rating">4</span> Deltarune</span>
                <span><span class="rating">4</span> TMNT 2007</span>
                <span><span class="rating">3.5</span> DATA WING</span>
                <span><span class="rating">3.5</span> One Shot</span>
                <span><span class="rating">3.5</span> Helltaker</span>
                <span><span class="rating">3.5</span> EDGE</span>
                <span><span class="rating">3</span> Euphoria</span>
                <span><span class="rating">3</span> Celeste</span>                
                <span><span class="rating">3</span> THE CORRIDOR</span>
                <span><span class="rating">3</span> Entropy Zero</span>
                <span><span class="rating">3</span> Палитра Смерти</span>
                <span><span class="rating">3</span> Paper lily - Chapter 1</span>
                <span><span class="rating">3</span> Hello Charlotte - Episode 2</span>
                <span><span class="rating">3</span> TWHL Tower: Source</span>
                <span><span class="rating">3</span> Зной</span>
                <span><span class="rating">2.5</span> Terraria</span>
                <span><span class="rating">2.5</span> Studio System : Guardian Angel</span>
                <span><span class="rating">2</span> Half-life C.A.G.E.D.</span>
                <span><span class="rating">2</span> Emily Is Away</span>
                <span><span class="rating">1.5</span> Don't Starve Together</span>
                <span><span class="rating">1.5</span> Psychopomp</span>
                <span><span class="rating">1.5</span> Half-life</span>
                <span><span class="rating">0</span> Hentai Killer</span>
            </div>
            <h3>Anime</h3>
            <div class="ratings-container">
                <span><span class="rating">5</span> Made In Abyss</span>
                <span><span class="rating">5</span> Interspecies Reviewers</span>
                <span><span class="rating">4.5</span> Oniichan wa Oshimai!</span>
                <span><span class="rating">2.5</span> School Days</span>
            </div>
        </div>
    </section>
`

export const image = src => `
    <section id="${src}" class="window">
        ${getPanelHtml(src)}
        <div class="content image-window-content">
            <img src=${src} alt=${src}>
        </div>
    </section>
`

export default {aboutMe, skills, creation, rest, faq, image}