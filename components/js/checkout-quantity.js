// Quantity controls for checkout page
let quantity = 1;
const pricePerUnit = 8;

function increaseQuantity() {
    quantity++;
    updateQuantity();
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        updateQuantity();
    }
}

function updateQuantity() {
    const quantityEl = document.getElementById('quantity');
    const itemTotalEl = document.getElementById('item-total');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (!quantityEl || !itemTotalEl || !subtotalEl || !totalEl) return;
    
    quantityEl.textContent = quantity;
    const subtotal = quantity * pricePerUnit;
    const promoDiscount = 5; // $5 promotional discount
    const total = Math.max(0, subtotal - promoDiscount); // Ensure total doesn't go negative
    
    itemTotalEl.textContent = '$' + subtotal;
    subtotalEl.textContent = '$' + subtotal;
    totalEl.textContent = '$' + total;
}

// Initialize with discount applied
updateQuantity();

