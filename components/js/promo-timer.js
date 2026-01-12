// Promotional Timer (2 minutes) for checkout
(function() {
    const summaryTimerEl = document.getElementById('summary-promo-timer');
    const summaryProgressEl = document.getElementById('summary-promo-progress');
    
    if (!summaryTimerEl || !summaryProgressEl) return;
    
    const STORAGE_KEY = 'checkout_promo_timer_start';
    const TWO_MINUTES = 2 * 60 * 1000; // 2 minutes in milliseconds
    
    let startTime = localStorage.getItem(STORAGE_KEY);
    
    if (!startTime) {
        // First time - start the timer
        startTime = Date.now();
        localStorage.setItem(STORAGE_KEY, startTime);
    } else {
        startTime = parseInt(startTime);
        const elapsed = Date.now() - startTime;
        
        // If 2 minutes have passed, reset
        if (elapsed >= TWO_MINUTES) {
            startTime = Date.now();
            localStorage.setItem(STORAGE_KEY, startTime);
        }
    }
    
    function updatePromoTimer() {
        const now = Date.now();
        const elapsed = now - startTime;
        const remaining = TWO_MINUTES - elapsed;
        
        if (remaining <= 0) {
            // Timer expired - reset
            startTime = Date.now();
            localStorage.setItem(STORAGE_KEY, startTime);
            updatePromoTimer();
            return;
        }
        
        const minutes = Math.floor(remaining / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        const timeString = String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
        
        // Update discount row timer
        summaryTimerEl.textContent = timeString;
        
        const progress = (elapsed / TWO_MINUTES) * 100;
        const progressPercent = Math.min(progress, 100) + '%';
        
        // Update discount row progress
        summaryProgressEl.style.width = progressPercent;
    }
    
    updatePromoTimer();
    setInterval(updatePromoTimer, 1000);
})();

