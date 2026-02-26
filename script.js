// --- EXACT 5 SECOND LOADING SCRIPT ---
window.addEventListener('load', () => {
    const fill = document.getElementById('loading-fill');
    
    // Tiny delay to let the CSS transition catch the width change from 0 to 100
    setTimeout(() => {
        if (fill) fill.style.width = '100%';
    }, 100);
    
    // Wait exactly 5000 milliseconds (5 seconds) before removing loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        const landingUI = document.getElementById('landing-ui');
        
        if (loader) loader.classList.add('hidden');
        
        setTimeout(() => {
            if (landingUI) landingUI.classList.add('loaded');
        }, 500);
        
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
        }, 2500);
        
    }, 5000); 
});

// --- REAL-TIME CLOCK & DATE LOGIC ---
function updateTopBar() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}.${month}.${day}`;

    const timeEl = document.getElementById('real-time');
    const dateEl = document.getElementById('real-date');

    if (timeEl) timeEl.textContent = timeString;
    if (dateEl) dateEl.textContent = dateString;
}

setInterval(updateTopBar, 1000);
updateTopBar(); 

const innerHUD = document.getElementById('inner-hud');
const blurOverlay = document.getElementById('bg-blur-overlay');
const pageTitleEl = document.getElementById('current-page-title');
const music = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const cursor = document.querySelector('.liquid-cursor');
const bgContainer = document.getElementById('global-bg');

// --- INSTANT CLICK LOGIC FOR UX PORTFOLIO ---
const uxSwitchBtn = document.getElementById('ux-switch-btn');

if(uxSwitchBtn) {
    uxSwitchBtn.addEventListener('click', () => {
        window.location.href = "ux-portfolio.html"; 
    });
}

// --- MOUSE MOVEMENT ---
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';

    bgContainer.style.setProperty('--x', x + 'px');
    bgContainer.style.setProperty('--y', y + 'px');
    bgContainer.classList.add('active');
});

// --- AUDIO LOGIC ---
function playClick() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {}); 
}

function startMusic() {
    if (music.paused) {
        music.play().catch(() => {}); 
    }
}

document.addEventListener("click", (e) => {
    if ((e.target.tagName === "BUTTON" || e.target.classList.contains("hud-link") || e.target.tagName === "A") && !e.target.classList.contains("locked")) {
        playClick();
    }
});

// --- MASTER NAVIGATION LOGIC ---
const pageTitles = {
    'about': 'ABOUT ME',
    'graphic': 'GRAPHIC DESIGN',
    'vector': 'VECTOR ILLUSTRATIONS',
    'uiux': 'UI/UX DESIGN',
    'motion': 'MOTION GRAPHICS'
};

function openPage(id) {
    if (id === 'motion') return; // Locked

    startMusic();
    const pages = document.querySelectorAll(".page");
    const landingUI = document.getElementById('landing-ui');

    if (id === 'landing' || !id) {
        landingUI.classList.add('active');
        innerHUD.classList.remove('active');
        blurOverlay.classList.remove('active');
    } else {
        landingUI.classList.remove('active');
        innerHUD.classList.add('active');
        blurOverlay.classList.add('active');
        
        if(pageTitleEl && pageTitles[id]) {
            pageTitleEl.textContent = pageTitles[id];
        }
    }

    pages.forEach(p => p.classList.remove("active"));
    
    const target = document.getElementById(id);
    if (target && id !== 'landing') {
        setTimeout(() => {
            target.classList.add("active");
        }, 100);
    }
}
window.openPage = openPage;

// --- RIPPLE LOOP ---
function triggerRipple() {
    bgContainer.classList.add('ripple-active');
    setTimeout(() => {
        bgContainer.classList.remove('ripple-active');
    }, 2000);
}
setInterval(triggerRipple, 3000);

// --- CURSOR HOVER STATES ---
document.querySelectorAll('button, .hud-link, img, a, #ux-switch-btn').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        if(!e.target.classList.contains('locked')){
            cursor.classList.add('active');
        }
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// --- HOVER VIDEOS FOR MOTION PREVIEW ---
document.querySelectorAll('.motion-preview').forEach(container => {
    const video = container.querySelector('.preview-video');
    container.addEventListener('mouseenter', () => {
        video.play().catch(e => console.log("Video play interrupted"));
    });
    container.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; 
    });
});