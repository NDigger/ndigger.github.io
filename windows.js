export const aboutMe = `
    <section id="about-me" class="window">
        <div class="window-panel">
            <p class="title" title="About me">About me</p>
            <div class="buttons">
                <button class="close" title="Close"><i class="bi bi-x-lg"></i></button>
            </div>
        </div>
        <div class="header">
            <img class="profile-image" src="profileImage.png" alt="">
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
        <div class="window-panel">
            <p class="title" title="Skills">Skills</p>
            <div class="buttons">
                <button class="close" title="Close"><i class="bi bi-x-lg"></i></button>
            </div>
        </div>
        <div class="content">
            <h2>Tools I use:</h2>
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
            <h2>Frameworks and languages I use/used</h2>
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
            <div id="skills-web-dev-container">
                <img class="background" src="React-icon.svg" alt="react">
                <p>Most of pages I made don't use any libraries. The page you see now also does not use any libraries at all.</p>
                <p>I used libraries and frameworks only when I had a need in backend and data storage.</p>
                <p>The only framework I tried to apply on practice is express.</p>
            </div>
            <h2>Game Development</h2>
            <img id="godot-unity-content-img" src="godotVsUnity.png" alt="godotVsUnity">
            <p>All games I've made were done with Godot game engine. The simplicity and speed of the engine make it a top priority for me.</p>
            <p>I had a try to use Unity game engine. It's very heavy and much more complex. I understand that Unity might be better for more complex projects but it doesn't seem to be necessary for me.</p>
            <p>And the most important thing - It's not necessary anymore to have a "Made with Unity" popup on load :D</p>
        </div>
    </section>
`
export const creation = `
    <section id="creation" class="window">
        <div class="window-panel">
            <p class="title" title="Creation">Creation</p>
            <div class="buttons">
                <button class="close" title="Close"><i class="bi bi-x-lg"></i></button>
            </div>
        </div>
        <div class="content">
            <h1>I enjoy making digital things!</h1>
            <p style="margin-bottom: 150px;">Below you can look at various digital things I made.</p>
            <h2>Few Decent Illustrations</h2>
            <div class="illustrations-container">
                <img src="illustrations/Без названия281-1.png" alt="">
                <img src="illustrations/Без названия325_20240522013505.jpg" alt="">
                <img src="illustrations/Без названия459-3.jpg" alt="">
                <img src="illustrations/Без названия467_20250416203247.png" alt="">
                <img src="illustrations/Без названия468.png" alt="">
            </div>
            <p>As I said, I don't have any special skills.</p>
            <h2>Games</h2>
            <img class="right-image" src="snipe.png" alt="snipe">
            <h3>Snipe</h3>
            <p>Hit the target as long as you can! The idea is very simple but can captivate you for several minutes :D</p>
            <img class="right-image" src="iwbtn.png" alt="iwbtn">
            <h3>I wanna be the NDagger</h3>
            <p>An extremely hard platformer with rather rigid controls. The experience may be a bit unusual if you are used to smoother controls.</p>
            <p>The game is heavily inspired by I wanna be the guy and Geometry Dash.</p>
            <img class="right-image" src="rocket.png" alt="rocket">
            <h3>Rocket (In development)</h3>
            <p>That's the speedrun game I'm currently making. Hopes on it to be fun :)</p>
            <h2>Web Pages</h2>
            <p>This page! I have more examples but most of them are static frontend pages with very basic functionality. </p>
        </div>
    </section>
`
export const faq = `
    <section id="faq" class="window">
        <div class="window-panel">
            <p class="title" title="NFAQ">NFAQ</p>
            <div class="buttons">
                <button class="close" title="Close"><i class="bi bi-x-lg"></i></button>
            </div>
        </div>
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

export default {aboutMe, skills, creation, faq}