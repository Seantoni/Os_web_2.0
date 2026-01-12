// Deal option selection
document.querySelectorAll('.deal-option').forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected class from all options
        document.querySelectorAll('.deal-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        // Add selected class to clicked option
        option.classList.add('selected');
    });
});

