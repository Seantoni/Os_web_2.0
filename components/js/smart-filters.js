document.addEventListener('DOMContentLoaded', () => {
    const sortBtn = document.querySelector('.sort-btn');
    const sortDropdown = document.querySelector('.sort-dropdown');
    const sortOptions = document.querySelectorAll('.sort-option');
    
    if (!sortBtn || !sortDropdown) return;

    // Toggle Dropdown
    sortBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sortDropdown.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!sortDropdown.contains(e.target)) {
            sortDropdown.classList.remove('active');
        }
    });

    // Sorting Logic
    sortOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const sortType = option.dataset.sort;
            
            // Update UI
            sortOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            sortDropdown.classList.remove('active');

            // Sort all carousel containers
            document.querySelectorAll('.carousel-container').forEach(container => {
                sortContainer(container, sortType);
            });
        });
    });

    function sortContainer(container, sortType) {
        // Get all deal cards (wrapped in <a> or direct articles)
        const items = Array.from(container.children);
        
        items.sort((a, b) => {
            const cardA = a.tagName === 'A' ? a.querySelector('.deal-card') : a;
            const cardB = b.tagName === 'A' ? b.querySelector('.deal-card') : b;
            
            if (!cardA || !cardB) return 0;

            const priceA = parseFloat(cardA.dataset.price || 0);
            const priceB = parseFloat(cardB.dataset.price || 0);
            const discountA = parseFloat(cardA.dataset.discount || 0);
            const discountB = parseFloat(cardB.dataset.discount || 0);
            
            switch(sortType) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'discount':
                    return discountB - discountA;
                default:
                    return 0; // Default order
            }
        });

        // Re-append items in new order with animation
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });

        setTimeout(() => {
            container.innerHTML = '';
            items.forEach((item, index) => {
                container.appendChild(item);
                // Staggered fade in
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 200);
    }
});

