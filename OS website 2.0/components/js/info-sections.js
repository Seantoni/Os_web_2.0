// Toggle info sections (accordion)
document.querySelectorAll('.info-section-header').forEach(header => {
    header.addEventListener('click', () => {
        const section = header.parentElement;
        section.classList.toggle('active');
    });
});

