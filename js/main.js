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
        initializeAboutCarousel();
    }

    function initializeStoryImageRotator() {
        const frontImage = document.getElementById('story-image-front');
        const backImage = document.getElementById('story-image-back');
        if (!frontImage || !backImage) return;

        const photos = [
            'media/Ostel%20(1).jpg',
            'media/Ostel%20(2).jpg',
            'media/Ostel%20(3).jpg',
            'media/Ostel%20(4).jpg',
            'media/Ostel%20(5).jpg',
            'media/Ostel%20(6).jpg',
            'media/Ostel%20(1).png',
            'media/Ostel%20(2).png',
            'media/Ostel%20(3).png',
            'media/Ostel%20(4).png',
            'media/Ostel%20(5).png',
            'media/Ostel%20(6).png',
            'media/Ostel%20(7).png',
            'media/Ostel%20(8).png',
            'media/Ostel%20(9).png',
            'media/Ostel%20(10).png',
            'media/Ostel%20(11).png',
            'media/Ostel%20(12).png',
            'media/Ostel%20(13).png',
            'media/Ostel%20(14).png',
            'media/Ostel%20(15).png',
            'media/Ostel%20(16).png',
            'media/Ostel%20(17).png',
            'media/Ostel%20(18).png',
            'media/Ostel%20(19).png',
            'media/Ostel%20(20).png',
            'media/Ostel%20(21).png',
            'media/Ostel%20(22).png',
            'media/Ostel%20(23).png',
            'media/Ostel%20(24).png',
            'media/Ostel%20(25).png',
            'media/Ostel%20(26).png',
            'media/Ostel%20(27).png',
            'media/Ostel%20(28).png',
            'media/Ostel%20(29).png',
            'media/Ostel%20(30).png',
            'media/Ostel%20(31).png',
            'media/Ostel%20(32).png',
            'media/Ostel%20(33).png',
            'media/Ostel%20(34).png',
            'media/Ostel%20(35).png',
            'media/Ostel%20(36).png',
            'media/Ostel%20(37).png',
            'media/Ostel%20(38).png',
            'media/Ostel%20(39).png',
            'media/Ostel%20(40).png',
            'media/Ostel%20(41).png',
            'media/Ostel%20(42).png',
            'media/Ostel%20(43).png',
            'media/Ostel%20(44).png',
            'media/Ostel%20(45).png',
            'media/Ostel%20(46).png',
            'media/Ostel%20(47).png',
            'media/Ostel%20(48).png',
            'media/Ostel%20(49).png',
            'media/Ostel%20(50).png',
            'media/Ostel%20(51).png',
            'media/Ostel%20(52).png',
            'media/Ostel%20(53).png',
            'media/Ostel%20(54).png',
            'media/Ostel%20(55).png',
            'media/Ostel%20(56).png',
            'media/Ostel%20(57).png',
            'media/Ostel%20(58).png',
            'media/Ostel%20(59).png',
            'media/Ostel%20(60).png',
            'media/Ostel%20(61).png',
            'media/Ostel%20(62).png'
        ];

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

    function initializeAboutCarousel() {
        const trackContainer = document.querySelector('.carousel-track-container');
        const carouselTrack = document.querySelector('.carousel-track');
        const dotsContainer = document.querySelector('.carousel-dots');
        const prevButton = document.querySelector('.carousel-control.prev');
        const nextButton = document.querySelector('.carousel-control.next');
        if (!trackContainer || !carouselTrack || !dotsContainer) return;

        const cards = Array.from(carouselTrack.children);
        if (!cards.length) return;

        let activeIndex = 0;

        dotsContainer.innerHTML = cards.map((_, index) =>
            `<button class="carousel-dot${index === 0 ? ' active' : ''}" type="button" aria-label="View section ${index + 1}"></button>`
        ).join('');

        const dots = Array.from(dotsContainer.children);

        const setActiveCard = (index) => {
            const card = cards[index];
            if (!card) return;
            const left = card.offsetLeft;
            trackContainer.scrollTo({ left, behavior: 'smooth' });
            dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
            activeIndex = index;
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => setActiveCard(index));
        });

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                setActiveCard((activeIndex - 1 + cards.length) % cards.length);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                setActiveCard((activeIndex + 1) % cards.length);
            });
        }

        let scrollTimeout = null;
        trackContainer.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                const scrollLeft = trackContainer.scrollLeft;
                let nearestIndex = 0;
                let minDistance = Infinity;
                cards.forEach((card, index) => {
                    const distance = Math.abs(card.offsetLeft - scrollLeft);
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestIndex = index;
                    }
                });
                if (nearestIndex !== activeIndex) {
                    activeIndex = nearestIndex;
                    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === nearestIndex));
                }
            }, 50);
        });
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