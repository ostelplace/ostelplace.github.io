document.addEventListener("DOMContentLoaded", function() {
    const announcementPlaceholder = document.getElementById('announcement-placeholder');
    const headerPlaceholder = document.getElementById('main-header');
    const mainContent = document.querySelector('main');

    // This function will fetch the nav and then initialize all the site's dynamic behaviors
    function loadNavAndInitialize() {
        // Ensure the header placeholder exists before fetching
        if (!headerPlaceholder) {
            console.error("Fatal Error: Header placeholder 'main-header' not found.");
            return;
        }

        fetch('nav.html')
            .then(response => {
                if (!response.ok) {
                    console.error("Error: nav.html not found.");
                    return ''; // Return empty so the chain doesn't break
                }
                return response.text();
            })
            .then(navHtml => {
                headerPlaceholder.innerHTML = navHtml;
                initializeSite(); // Run positioning and event listeners
            })
            .catch(error => console.error('Error loading navigation:', error));
    }

    // This function sets up all the positioning and event listeners

    function initializeSite() {
        const header = document.getElementById('main-header');
        const announcementBar = document.getElementById('announcement-bar');

        // Hamburger & Mobile Nav logic
        const hamburger = header.querySelector('.hamburger');
        const mobileNav = header.querySelector('#mobile-nav');
        const closeMobileNav = header.querySelector('.close-mobile-nav');

        if (hamburger && mobileNav) {
            hamburger.addEventListener('click', function() {
                mobileNav.classList.add('open');
                mobileNav.setAttribute('aria-hidden', 'false');
                hamburger.setAttribute('aria-expanded', 'true');
            });
        }
        if (closeMobileNav && mobileNav && hamburger) {
            closeMobileNav.addEventListener('click', function() {
                mobileNav.classList.remove('open');
                mobileNav.setAttribute('aria-hidden', 'true');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        }
        // Optional: close mobile nav when clicking a link
        if (mobileNav) {
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mobileNav.classList.remove('open');
                    mobileNav.setAttribute('aria-hidden', 'true');
                    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }

        function positionElements() {
            let announcementHeight = 0;
            let headerHeight = 0;

            if (announcementBar && announcementBar.style.display !== 'none') {
                announcementHeight = announcementBar.offsetHeight;
            }
            if (header) {
                headerHeight = header.offsetHeight;
            }
            
            header.style.top = `${announcementHeight}px`;
            
            if (!document.body.classList.contains('home')) {
                mainContent.style.paddingTop = `${announcementHeight + headerHeight}px`;
            } else {
                mainContent.style.paddingTop = '0';
            }
        }

        if (announcementBar && header) {
            const closeBtn = announcementBar.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    announcementBar.style.display = 'none';
                    positionElements();
                });
            }
        }

        positionElements();
        initializeStoryImageRotator();
    }

    function initializeStoryImageRotator() {
        const frontImage = document.getElementById('story-image-front');
        const backImage = document.getElementById('story-image-back');
        if (!frontImage || !backImage) return;

        const photos = [];
        for (let i = 1; i <= 40; i += 1) {
            photos.push(`media/Airbnb%20(${i}).JPG`);
        }
        for (let i = 1; i <= 10; i += 1) {
            photos.push(`media/Airbnb%20(${i}).png`);
        }

        let currentIndex = 0;
        let showingFront = true;

        backImage.style.opacity = '0';
        frontImage.style.opacity = '1';

        setInterval(() => {
            const nextIndex = (currentIndex + 1) % photos.length;
            const incoming = showingFront ? backImage : frontImage;
            const outgoing = showingFront ? frontImage : backImage;

            incoming.src = photos[nextIndex];
            incoming.alt = `Property photo ${nextIndex + 1}`;
            incoming.classList.add('active');
            outgoing.classList.remove('active');

            showingFront = !showingFront;
            currentIndex = nextIndex;
        }, 5000);
    }

    // --- Main Logic ---
    // Check if the announcement placeholder exists on the current page
    if (announcementPlaceholder) {
        // If it exists, fetch the announcement first, THEN the navigation
        fetch('announcement.html')
            .then(response => {
                if (!response.ok) { return ''; }
                return response.text();
            })
            .then(announcementHtml => {
                announcementPlaceholder.innerHTML = announcementHtml;
                loadNavAndInitialize(); // Now load the nav
            })
            .catch(error => {
                console.error('Error loading announcement:', error);
                loadNavAndInitialize(); // Still try to load nav even if announcement fails
            });
    } else {
        // If no announcement placeholder, just load the navigation directly
        loadNavAndInitialize();
    }
});