// Mobile-First JavaScript - Clean and Optimized

// Make showContentLocker globally available immediately
window.showContentLocker = function(platform) {
    // Load AdBlueMedia script permanently
    loadAdBlueMediaScript();
};

(function() {
    'use strict';

    // State management
    const state = {
        hasVoted: false,
        currentVotes: 10367,
        currentRating: 4.5,
        isScrolling: false,
        scrollTimer: null
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initRatingSystem();
        initScrollPrevention();
        initScreenshotSwipe();
    });

    // Rating System
    function initRatingSystem() {
        const starsContainer = document.getElementById('starsContainer');
        const votesCountElement = document.getElementById('votesCount');
        
        if (!starsContainer || !votesCountElement) return;

        // Format number with commas
        function formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        // Update votes display
        function updateVotesDisplay() {
            votesCountElement.textContent = formatNumber(state.currentVotes) + ' votes';
        }

        // Handle star click
        function handleStarClick(e) {
            // Prevent action if scrolling or already voted
            if (state.isScrolling || state.hasVoted) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            const star = e.currentTarget;
            const rating = parseInt(star.getAttribute('data-rating'));
            
            // Only allow voting if not already voted
            if (!state.hasVoted) {
                state.hasVoted = true;
                state.currentVotes += 1;
                updateVotesDisplay();
                
                // Visual feedback
                star.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);
                
                // Show thank you message
                showThankYouMessage();
                
                // Store in sessionStorage to prevent multiple votes
                try {
                    sessionStorage.setItem('carx_voted', 'true');
                } catch (e) {
                    // Ignore storage errors
                }
            }
        }

        // Add click listeners to stars
        const stars = starsContainer.querySelectorAll('.star-icon');
        stars.forEach(star => {
            star.addEventListener('click', handleStarClick, { passive: false });
            star.addEventListener('touchend', function(e) {
                // Small delay to ensure scroll didn't happen
                setTimeout(() => {
                    if (!state.isScrolling) {
                        handleStarClick(e);
                    }
                }, 100);
            }, { passive: false });
        });

        // Check if user already voted in this session
        try {
            if (sessionStorage.getItem('carx_voted') === 'true') {
                state.hasVoted = true;
            }
        } catch (e) {
            // Ignore storage errors
        }

        // Initialize display
        updateVotesDisplay();
    }

    // Load AdBlueMedia Script - Loads permanently on each click
    function loadAdBlueMediaScript() {
        // Remove existing scripts to ensure fresh load
        const existingConfig = document.querySelector('script[data-abm-config]');
        const existingMain = document.querySelector('script[src*="66abc77.js"]');
        
        if (existingConfig) existingConfig.remove();
        if (existingMain) existingMain.remove();
        
        // Always set configuration fresh
        const configScript = document.createElement('script');
        configScript.type = 'text/javascript';
        configScript.setAttribute('data-abm-config', 'true');
        configScript.textContent = 'var ElpVt_lYO_CMxBFc={"it":4455572,"key":"e7e4f"};';
        document.head.appendChild(configScript);
        
        // Set window variable immediately
        window.ElpVt_lYO_CMxBFc = {"it":4455572,"key":"e7e4f"};
        
        // Add AdBlueMedia main script
        const mainScript = document.createElement('script');
        mainScript.src = 'https://da4talg8ap14y.cloudfront.net/66abc77.js';
        mainScript.async = true;
        mainScript.setAttribute('data-abm-main', 'true');
        
        // Execute after script loads
        mainScript.onload = function() {
            console.log('AdBlueMedia script loaded');
        };
        
        mainScript.onerror = function() {
            console.error('AdBlueMedia script failed to load');
        };
        
        document.head.appendChild(mainScript);
    }

    // Update global function to use internal loadAdBlueMediaScript
    window.showContentLocker = function(platform) {
        loadAdBlueMediaScript();
    };

    // Scroll Prevention - Prevent accidental clicks during scroll
    function initScrollPrevention() {
        let touchStartY = 0;
        let touchStartX = 0;
        let touchEndY = 0;
        let touchEndX = 0;

        // Detect scroll start
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            state.isScrolling = false;
        }, { passive: true });

        // Detect scroll movement
        document.addEventListener('touchmove', function(e) {
            touchEndY = e.touches[0].clientY;
            touchEndX = e.touches[0].clientX;
            
            const deltaY = Math.abs(touchEndY - touchStartY);
            const deltaX = Math.abs(touchEndX - touchStartX);
            
            // If significant movement, user is scrolling
            if (deltaY > 10 || deltaX > 10) {
                state.isScrolling = true;
                
                // Clear any existing timer
                if (state.scrollTimer) {
                    clearTimeout(state.scrollTimer);
                }
                
                // Reset scrolling flag after scroll ends
                state.scrollTimer = setTimeout(() => {
                    state.isScrolling = false;
                }, 150);
            }
        }, { passive: true });

        // Reset on touch end
        document.addEventListener('touchend', function() {
            // Small delay before allowing clicks again
            setTimeout(() => {
                state.isScrolling = false;
            }, 100);
        }, { passive: true });

        // Also handle mouse/wheel scrolling
        let wheelTimer = null;
        document.addEventListener('wheel', function() {
            state.isScrolling = true;
            
            if (wheelTimer) {
                clearTimeout(wheelTimer);
            }
            
            wheelTimer = setTimeout(() => {
                state.isScrolling = false;
            }, 150);
        }, { passive: true });
    }

    // Screenshot Swipe (Touch-friendly)
    function initScreenshotSwipe() {
        const screenshotGrid = document.querySelector('.screenshot-grid');
        if (!screenshotGrid) return;

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        // Mouse events (for desktop)
        screenshotGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            screenshotGrid.style.cursor = 'grabbing';
            startX = e.pageX - screenshotGrid.offsetLeft;
            scrollLeft = screenshotGrid.scrollLeft;
        }, { passive: false });

        screenshotGrid.addEventListener('mouseleave', () => {
            isDown = false;
            screenshotGrid.style.cursor = 'grab';
        }, { passive: true });

        screenshotGrid.addEventListener('mouseup', () => {
            isDown = false;
            screenshotGrid.style.cursor = 'grab';
        }, { passive: true });

        screenshotGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - screenshotGrid.offsetLeft;
            const walk = (x - startX) * 2;
            screenshotGrid.scrollLeft = scrollLeft - walk;
        }, { passive: false });

        // Touch events (for mobile)
        let touchStartX = 0;
        let touchScrollLeft = 0;

        screenshotGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - screenshotGrid.offsetLeft;
            touchScrollLeft = screenshotGrid.scrollLeft;
        }, { passive: true });

        screenshotGrid.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - screenshotGrid.offsetLeft;
            const walk = (x - touchStartX) * 1.5;
            screenshotGrid.scrollLeft = touchScrollLeft - walk;
        }, { passive: true });
    }

    // Conditional "Get it on" logic
    function updateGetItOn() {
        const getItOnElement = document.getElementById('getItOn');
        if (!getItOnElement) return;

        // Set to false if app is not on Google Play, true if it is
        const isOnGooglePlay = false; // Change this based on your app availability
        
        if (isOnGooglePlay) {
            getItOnElement.textContent = 'Get it on Google Play';
        } else {
            getItOnElement.textContent = 'ModXNet';
        }
    }

    // Initialize conditional logic
    updateGetItOn();

    // Thank You Message Toast
    function showThankYouMessage() {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = '<i class="fas fa-check-circle"></i><span>Thank you for your vote!</span>';
        
        // Add to body
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

})();
