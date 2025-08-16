
// Accordion 
const headers = document.querySelectorAll('.accordion__item--header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.classList.contains('accordion__item--content-active');
        

        // Close all items
        document.querySelectorAll('.accordion__item--content').forEach(item => {
            item.classList.remove('accordion__item--content-active');
        });
        
        // Reset all style
        document.querySelectorAll('.accordion__item--header').forEach(h => {
            h.classList.remove('accordion__item--header-active');
        });

        // Toggle the clicked item (open if it was closed, close if it was open)
        if (!isOpen) {
            content.classList.add('accordion__item--content-active');
            header.classList.add('accordion__item--header-active');
        }
    });
});