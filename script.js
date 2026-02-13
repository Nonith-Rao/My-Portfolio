const music = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const cursor = document.querySelector('.liquid-cursor');
const aboutBtn = document.querySelector('.top-nav');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('button, .dot, .side-nav-btn, img, a').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

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
    if (e.target.tagName === "BUTTON" || e.target.classList.contains("dot") || e.target.classList.contains("side-nav-btn") || e.target.tagName === "A") {
        playClick();
    }
});

function openPage(id) {
    startMusic();
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) {
        target.classList.add("active");
        const globalBg = document.getElementById("global-bg");
        
        if (id === 'uiux') globalBg.style.opacity = "0";
        else globalBg.style.opacity = "1";

        if (id === 'landing') aboutBtn.style.display = "block";
        else aboutBtn.style.display = "none";
    }
    document.querySelectorAll(".side-nav-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.target === id);
    });
}
window.openPage = openPage;

document.querySelectorAll(".side-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => openPage(btn.dataset.target));
});

document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => openPage("landing"));
});

// Handle hover videos for Motion Preview items
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