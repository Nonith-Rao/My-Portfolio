// Function to switch pages with a smooth zoom transition
function openPage(id) {
    const pages = document.querySelectorAll(".page");
    
    // Remove active class from others to trigger exit transition
    pages.forEach(p => {
        if (p.id !== id) p.classList.remove("active");
    });
    
    const target = document.getElementById(id);
    if (target) {
        // Small delay to ensure the browser registers the state change for CSS transitions
        setTimeout(() => {
            target.classList.add("active");
            // Reset vertical scroll to top for the new page
            const contentArea = target.querySelector(".content");
            if (contentArea) contentArea.scrollTop = 0;
        }, 10);
    }

    // Update Sidebar/Category Bar highlight
    document.querySelectorAll(".side-nav-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.target === id);
    });
}
window.openPage = openPage;

// Sidebar Click Listeners
document.querySelectorAll(".side-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => openPage(btn.dataset.target));
});

// Red Dot (Back to Landing) Listener
document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => openPage("landing"));
});

// Horizontal Scroll logic for Posters/Banners
document.querySelectorAll(".h-scroll-area").forEach(grid => {
    grid.addEventListener("wheel", (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            grid.scrollLeft += e.deltaY;
        }
    });
});

// Music Toggle Logic
const music = document.getElementById("bgMusic");
document.querySelectorAll(".music-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            btn.textContent = "🔇";
        } else {
            music.pause();
            btn.textContent = "🔊";
        }
    });
});