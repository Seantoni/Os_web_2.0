// Header scroll compression effect - nav merges into header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-header');
    const navWrapper = document.querySelector('.nav-wrapper');
    const scrollThreshold = 50;
    let ticking = false;

    function updateHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            document.body.classList.add('scrolled-nav');
        } else {
            header.classList.remove('scrolled');
            document.body.classList.remove('scrolled-nav');
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // Check initial state
    updateHeader();
});
