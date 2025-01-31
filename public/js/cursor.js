document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.getElementById('custom-cursor');
    
    // Initial clickable elements
    const updateClickableElements = () => {
        // Updated selector list to include form elements
        const clickableElements = document.querySelectorAll('a, button, .pricing-card, .nav-link, .scroll-row, .carousel-btn, .faq-item, .schedule-link, [role="button"], .project-marker, input, textarea, .website-option, .form-input, .submit-button');
        
        clickableElements.forEach(elem => {
            // Only add listeners if they haven't been added before
            if (!elem.dataset.cursorListenersAdded) {
                elem.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                });
                
                elem.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                });
                
                // Mark this element as having listeners
                elem.dataset.cursorListenersAdded = 'true';
            }
        });
    };

    // Update clickable elements initially
    updateClickableElements();

    // Observer for dynamic elements
    const observer = new MutationObserver(updateClickableElements);
    observer.observe(document.body, { childList: true, subtree: true });

    // Smooth cursor movement
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    });
});