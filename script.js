// Scroll-reveal styles only apply when this script runs
document.documentElement.classList.add('js');

// Always open on the home screen: drop any #section from the URL and any remembered scroll position
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
window.scrollTo(0, 0);

// --- EXACT 5 SECOND LOADING SCRIPT ---
window.addEventListener('load', () => {
    const fill = document.getElementById('loading-fill');
    const loader = document.getElementById('loader');
    window.scrollTo(0, 0);

    // Tiny delay so the CSS transition catches the width change from 0 to 100
    setTimeout(() => {
        if (fill) fill.style.width = '100%';
    }, 100);

    // Wait exactly 5000 milliseconds (5 seconds) before removing the loader
    setTimeout(() => {
        window.scrollTo(0, 0);
        if (loader) loader.classList.add('hidden');
        setTimeout(() => {
            document.body.classList.remove('is-loading');
            document.body.classList.add('loaded');
        }, 500);
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
        }, 2500);
    }, 5000);
});

// --- REAL-TIME CLOCK & DATE (HUD) ---
function updateTopBar() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timeEl = document.getElementById('real-time');
    const dateEl = document.getElementById('real-date');
    if (timeEl) timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    if (dateEl) dateEl.textContent = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
}
setInterval(updateTopBar, 1000);
updateTopBar();

// --- CUSTOM CURSOR ---
const cursor = document.querySelector('.liquid-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, img, video').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// --- CLICK SOUND ---
const clickSound = document.getElementById('clickSound');
document.addEventListener('click', (e) => {
    if (clickSound && e.target.closest('a, button')) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
});

// --- IN-PAGE LINKS: smooth scroll without writing #section into the URL (so a reload starts at home) ---
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// --- HUD TITLE FOLLOWS THE SECTION IN VIEW ---
const sectionTitle = document.getElementById('current-section');
function setSectionTitle(title) {
    if (!sectionTitle || sectionTitle.textContent === title) return;
    sectionTitle.style.opacity = '0';
    setTimeout(() => {
        sectionTitle.textContent = title;
        sectionTitle.style.opacity = '1';
    }, 250);
}
// Nested blocks (like Figma Designs inside Website Design) win over their parent section
const activeBlocks = new Set();
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) activeBlocks.add(entry.target);
        else activeBlocks.delete(entry.target);
    });
    const blocks = [...activeBlocks];
    const innermost = blocks.find((el) => !blocks.some((other) => other !== el && el.contains(other)));
    if (innermost) setSectionTitle(innermost.dataset.title);
}, { rootMargin: '-45% 0px -54% 0px' });
document.querySelectorAll('[data-title]').forEach((section) => sectionObserver.observe(section));

// --- SCROLL REVEAL ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// --- HOVER VIDEO FOR MOTION PREVIEW ---
document.querySelectorAll('.motion-preview').forEach((container) => {
    const video = container.querySelector('.preview-video');
    container.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
    });
    container.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});
