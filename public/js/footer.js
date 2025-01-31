// footer.js
document.addEventListener('DOMContentLoaded', function() {
    // First, load the footer HTML
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            // Insert the footer HTML
            document.getElementById('footer-placeholder').innerHTML = html;
            
            // Now that the elements exist, initialize the footer
            initializeFooter();
        })
        .catch(error => console.error('Error loading footer:', error));
});

function initializeFooter() {
    const bottomContainer = document.querySelector('.bottom-container');
    const bottomBar = document.querySelector('.bottom-bar');

    if (bottomContainer && bottomBar) {
        // Make sure the container is visible initially
        bottomContainer.style.display = 'block';

        // Add click handler to the bottom bar
        bottomBar.addEventListener('click', function() {
            bottomContainer.classList.toggle('expanded');
        });

        // Close footer when clicking outside
        document.addEventListener('click', function(event) {
            if (!bottomContainer.contains(event.target)) {
                bottomContainer.classList.remove('expanded');
            }
        });

        // Prevent clicks inside footer from closing it
        bottomContainer.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    } else {
        console.error('Footer elements not found');
    }
}