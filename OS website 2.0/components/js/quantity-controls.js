// Quantity controls for deal-detail page
(function() {
    const qtyValueDesktop = document.getElementById('qty-value');
    const qtyValueMobile = document.getElementById('qty-value-mobile');
    const decreaseDesktop = document.getElementById('qty-decrease');
    const increaseDesktop = document.getElementById('qty-increase');
    const decreaseMobile = document.getElementById('qty-decrease-mobile');
    const increaseMobile = document.getElementById('qty-increase-mobile');
    
    // Only initialize if elements exist
    if (!qtyValueDesktop && !qtyValueMobile) return;
    
    let quantity = 1;
    const minQty = 1;
    const maxQty = 10;

    function updateDisplay() {
        if (qtyValueDesktop) qtyValueDesktop.textContent = quantity;
        if (qtyValueMobile) qtyValueMobile.textContent = quantity;
        
        // Update button states
        const decreaseBtns = [decreaseDesktop, decreaseMobile];
        const increaseBtns = [increaseDesktop, increaseMobile];
        
        decreaseBtns.forEach(btn => {
            if (btn) btn.disabled = quantity <= minQty;
        });
        
        increaseBtns.forEach(btn => {
            if (btn) btn.disabled = quantity >= maxQty;
        });
    }

    function decrease(e) {
        e.preventDefault();
        e.stopPropagation();
        if (quantity > minQty) {
            quantity--;
            updateDisplay();
        }
    }

    function increase(e) {
        e.preventDefault();
        e.stopPropagation();
        if (quantity < maxQty) {
            quantity++;
            updateDisplay();
        }
    }

    if (decreaseDesktop) decreaseDesktop.addEventListener('click', decrease);
    if (increaseDesktop) increaseDesktop.addEventListener('click', increase);
    if (decreaseMobile) decreaseMobile.addEventListener('click', decrease);
    if (increaseMobile) increaseMobile.addEventListener('click', increase);

    // Initial state
    updateDisplay();
})();

