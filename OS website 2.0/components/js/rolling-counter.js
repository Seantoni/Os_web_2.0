// Rolling counter for sold offers
(function() {
    const counterEls = document.querySelectorAll('.sold-counter-display');
    if (counterEls.length === 0) return;

    let currentCount = 0;
    const targetCount = 47;
    const duration = 2500;
    const startTime = Date.now();

    function createDigitStrip(digit, isRolling = false) {
        const digitNum = parseInt(digit);
        const strip = document.createElement('div');
        strip.className = 'digit-strip' + (isRolling ? ' rolling' : '');
        
        // Create strip with all digits 0-9, then repeat for smooth rolling
        let html = '';
        for (let i = 0; i <= 9; i++) {
            html += `<div class="digit">${i}</div>`;
        }
        // Add extra digits for smooth rolling effect
        for (let i = 0; i <= 9; i++) {
            html += `<div class="digit">${i}</div>`;
        }
        strip.innerHTML = html;
        
        // Position to show current digit
        const position = -(digitNum * 1) + 'em';
        strip.style.transform = `translateY(${position})`;
        
        return strip;
    }

    function createCounterHTML(count, isRolling = false) {
        const countStr = count.toString().padStart(2, '0');
        let html = '';
        for (let i = 0; i < countStr.length; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'digit-wrapper';
            const strip = createDigitStrip(countStr[i], isRolling);
            wrapper.appendChild(strip);
            html += wrapper.outerHTML;
        }
        return html;
    }

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const newCount = Math.floor(easeOutCubic * targetCount);
        
        if (newCount !== currentCount) {
            const isRolling = progress < 1;
            const counterHTML = createCounterHTML(newCount, isRolling);
            
            counterEls.forEach(counterEl => {
                counterEl.innerHTML = counterHTML;
                
                // Update positions for smooth rolling
                const strips = counterEl.querySelectorAll('.digit-strip');
                const countStr = newCount.toString().padStart(2, '0');
                strips.forEach((strip, index) => {
                    const digit = parseInt(countStr[index]);
                    const position = -(digit * 1) + 'em';
                    strip.style.transform = `translateY(${position})`;
                });
            });
            
            currentCount = newCount;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Final update
            const finalHTML = createCounterHTML(targetCount, false);
            counterEls.forEach(counterEl => {
                counterEl.innerHTML = finalHTML;
                const strips = counterEl.querySelectorAll('.digit-strip');
                const countStr = targetCount.toString().padStart(2, '0');
                strips.forEach((strip, index) => {
                    const digit = parseInt(countStr[index]);
                    const position = -(digit * 1) + 'em';
                    strip.style.transform = `translateY(${position})`;
                });
            });
        }
    }

    // Initialize with zeros
    const initialHTML = createCounterHTML(0, false);
    counterEls.forEach(el => el.innerHTML = initialHTML);

    // Start animation after a short delay
    setTimeout(() => {
        updateCounter();
    }, 300);

    // Randomly increment the counter every 3-8 seconds
    setInterval(() => {
        if (currentCount < targetCount) {
            const increment = Math.floor(Math.random() * 3) + 1;
            const newTarget = Math.min(currentCount + increment, targetCount);
            const oldStr = currentCount.toString().padStart(2, '0');
            const newStr = newTarget.toString().padStart(2, '0');
            
            // Update only digits that changed
            counterEls.forEach(counterEl => {
                const strips = counterEl.querySelectorAll('.digit-strip');
                strips.forEach((strip, index) => {
                    if (oldStr[index] !== newStr[index]) {
                        // Add a slight stagger delay for the digits
                        setTimeout(() => {
                            strip.classList.add('rolling');
                            const oldDigit = parseInt(oldStr[index]);
                            const newDigit = parseInt(newStr[index]);
                            
                            // Calculate how many positions to roll
                            let rollDistance = newDigit - oldDigit;
                            if (rollDistance < 0) rollDistance += 10; // Handle wrap-around
                            
                            // Add extra rotation for visual effect
                            const extraRolls = 2; // Roll through 2 extra cycles
                            const totalDistance = -(newDigit * 1) - (extraRolls * 10);
                            
                            strip.style.transform = `translateY(${totalDistance}em)`;
                            
                            // Remove rolling class after animation
                            setTimeout(() => {
                                strip.classList.remove('rolling');
                                strip.style.transform = `translateY(${-(newDigit * 1)}em)`;
                            }, 800);
                        }, index * 100); // 100ms stagger between digits
                    }
                });
            });
            
            currentCount = newTarget;
        }
    }, Math.random() * 5000 + 3000);
})();

