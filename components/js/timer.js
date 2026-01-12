// 2-Hour Lightning Timer with Mechanical Animation
(function() {
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');
    const progressEl = document.getElementById('timer-progress');
    
    if (!hoursEl || !minutesEl || !secondsEl || !progressEl) return;
    
    // Get or set start time in localStorage
    const STORAGE_KEY = 'lightning_timer_start_v2';
    const TWO_HOURS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    
    let startTime = localStorage.getItem(STORAGE_KEY);
    
    if (!startTime) {
        startTime = Date.now();
        localStorage.setItem(STORAGE_KEY, startTime);
    } else {
        startTime = parseInt(startTime);
    }

    let previousSeconds = -1;
    
    function updateTimer() {
        const now = Date.now();
        const elapsed = now - startTime;
        let remaining = TWO_HOURS - elapsed;
        
        if (remaining <= 0) {
            // Reset logic
            startTime = Date.now();
            localStorage.setItem(STORAGE_KEY, startTime);
            remaining = TWO_HOURS;
        }
        
        // Calculate time components
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        
        // Update display with animation only if changed
        updateDigit(hoursEl, hours);
        updateDigit(minutesEl, minutes);
        updateDigit(secondsEl, seconds);
        
        // Update progress bar
        const progress = (remaining / TWO_HOURS) * 100;
        progressEl.style.width = progress + '%';
    }

    function updateDigit(element, value) {
        const strVal = String(value).padStart(2, '0');
        if (element.textContent !== strVal) {
            element.textContent = strVal;
            // Add animation class
            element.parentElement.classList.remove('tick-anim');
            void element.parentElement.offsetWidth; // Trigger reflow
            element.parentElement.classList.add('tick-anim');
        }
    }
    
    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
})();
