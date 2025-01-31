document.addEventListener('DOMContentLoaded', function() {
    // Load navigation HTML
    fetch('nav.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('nav-placeholder').innerHTML = html;
            initializeDropdown();
            initializeNavigation();
            // Initialize cursor after nav is loaded
            initializeCursor();
        })
        .catch(error => console.error('Error loading navigation:', error));
});

function initializeCursor() {
    const cursor = document.getElementById('custom-cursor');
    const clickableElements = document.querySelectorAll('a, .nav-link, .nav-links-left a, .nav-links-right a, .dropdown-btn, .dropdown-content a, .logo a');
    
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            const x = e.clientX - (cursor.offsetWidth / 2);
            const y = e.clientY - (cursor.offsetHeight / 2);
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
        });
    });
    
    clickableElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        elem.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

function initializeDropdown() {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownBtn && dropdown) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
        });

        // Add hover effect for cursor
        dropdownBtn.addEventListener('mouseenter', () => {
            const cursor = document.getElementById('custom-cursor');
            cursor.classList.add('hover');
        });

        dropdownBtn.addEventListener('mouseleave', () => {
            const cursor = document.getElementById('custom-cursor');
            cursor.classList.remove('hover');
        });
    }
}

function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links-left a, .nav-links-right a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}