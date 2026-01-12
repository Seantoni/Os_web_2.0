// Gallery thumbnail functionality with auto-rotate
(function() {
    const mainImage = document.getElementById('main-gallery-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    let currentImageIndex = 0;
    let autoRotateInterval = null;

    // Function to stop auto-rotation
    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }

    // Navigation arrows
    function showImage(index) {
        if (index < 0) index = thumbnails.length - 1;
        if (index >= thumbnails.length) index = 0;
        
        const thumbnail = thumbnails[index];
        const imageUrl = thumbnail.getAttribute('data-image');
        if (imageUrl) {
            mainImage.src = imageUrl;
        }
        
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
        currentImageIndex = index;
    }

    // Update main image when thumbnail is clicked
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            stopAutoRotate();
            showImage(index);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoRotate();
            showImage(currentImageIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoRotate();
            showImage(currentImageIndex + 1);
        });
    }

    // Auto-rotate images every 5 seconds
    if (thumbnails.length > 1) {
        autoRotateInterval = setInterval(() => {
            showImage(currentImageIndex + 1);
        }, 5000);
    }
})();

