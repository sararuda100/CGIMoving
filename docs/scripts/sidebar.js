window.addEventListener('load', () => {
    const closeFilterButton = document.getElementById('closeFilter');
    const filterElement = document.getElementById('sidebar');
    const openFilter = document.getElementById('openSidebar');

    openFilter.addEventListener('click', () => {
        // filterElement.classList.remove('hidden', 'w-72');
        filterElement.classList.toggle('hidden');
        // filterElement.style.transform = 'translateX(0%)'; 
    });
    closeFilterButton.addEventListener('click', () => {
        // filterElement.style.transform = 'translateX(-100%)'; // Shift to the left to hide 80% of the width
        filterElement.classList.add('hidden');
    });

    
});

