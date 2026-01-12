// Simple countdown timer for deal detail (update every second)
function updateDealTimer() {
    const timerEls = document.querySelectorAll('.deal-timer-display');
    if (timerEls.length === 0) return;
    
    // This is a placeholder - in a real app, you'd calculate from server time
    const firstTimer = timerEls[0];
    const timeStr = firstTimer.textContent;
    if (!timeStr || !timeStr.includes(':')) return;
    
    let hours = parseInt(timeStr.split(':')[0]);
    let minutes = parseInt(timeStr.split(':')[1]);
    let seconds = parseInt(timeStr.split(':')[2]);
    
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
                hours = 0;
                minutes = 0;
                seconds = 0;
            }
        }
    }
    
    const newTimeStr = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    
    timerEls.forEach(el => {
        el.textContent = newTimeStr;
    });
}

setInterval(updateDealTimer, 1000);

