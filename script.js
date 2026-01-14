    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const helpButton = document.getElementById('helpButton');
    const helpModal = document.getElementById('helpModal');
    const closeHelpModal = document.getElementById('closeHelpModal');
    const closeHelpBtn = document.getElementById('closeHelpBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileRegisterBtn = document.getElementById('mobileRegisterBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const contactForm = document.getElementById('contactForm');
    const contactBtn = document.getElementById('contactBtn');
    const gameDetailModal = document.getElementById('gameDetailModal');
    const closeGameDetailModal = document.getElementById('closeGameDetailModal');
    const gamesSearchInput = document.getElementById('gamesSearchInput');
    const gamesList = document.getElementById('gamesList');
    const gameCards = document.querySelectorAll('.game-card');
    const downloadGameBtn = document.getElementById('downloadGameBtn');
    
    // Track last touch time to suppress synthetic clicks on mobile
    let lastTouchTime = 0;
    
    // Mobile Menu Toggle
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-times');
          icon.classList.toggle('fa-bars');
        }
      });
      
      // Close mobile menu when clicking on a link
      document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        });
      });
    }
    
    // Game card tap/press handling with proper touch logic
    document.querySelectorAll('.game-card').forEach(card => {
      // Add click-effect overlay element
      const clickEffect = document.createElement('div');
      clickEffect.className = 'game-card-click-effect';
      card.appendChild(clickEffect);
      
      let touchStartX = 0;
      let touchStartY = 0;
      let touchMoved = false;
      const MOVE_THRESHOLD = 10; // pixels
      
      const triggerTap = (event) => {
        // Ignore taps on inner links or buttons
        const targetTag = event.target.tagName;
        if (targetTag === 'A' || targetTag === 'BUTTON') return;
        
        // Add active class for visual press effect
        card.classList.add('active');
        
        // Remove the effect after animation completes
        setTimeout(() => {
          card.classList.remove('active');
        }, 200);
        
        // Navigate after a brief delay so the effect is visible
        const gameLink = card.getAttribute('data-link');
        if (gameLink) {
          setTimeout(() => {
            window.open(gameLink, '_blank');
          }, 150);
        }
      };
      
      const handleTouchStart = (event) => {
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchMoved = false;
      };
      
      const handleTouchMove = (event) => {
        const touch = event.touches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        
        if (Math.abs(deltaX) > MOVE_THRESHOLD || Math.abs(deltaY) > MOVE_THRESHOLD) {
          // User is scrolling, not tapping
          touchMoved = true;
        }
      };
      
      const handleTouchEnd = (event) => {
        // Mark touch time to suppress the following synthetic click
        lastTouchTime = Date.now();
        
        if (touchMoved) {
          // It was a scroll; do nothing
          return;
        }
        
        triggerTap(event);
      };
      
      const handleClick = (event) => {
        // Ignore synthetic click that follows a touch
        if (Date.now() - lastTouchTime < 400) {
          return;
        }
        
        triggerTap(event);
      };
      
      // Touch events: passive so scrolling remains smooth
      card.addEventListener('touchstart', handleTouchStart, { passive: true });
      card.addEventListener('touchmove', handleTouchMove, { passive: true });
      card.addEventListener('touchend', handleTouchEnd);
      
      // Mouse / pointer click (desktop)
      card.addEventListener('click', handleClick);
    });

    // Help Button Tooltip
    const helpTooltip = document.getElementById('helpTooltip');
    let tooltipShown = false;
    
    function showHelpTooltip() {
      if (helpButton && helpTooltip && !tooltipShown && helpButton.classList.contains('visible')) {
        helpTooltip.classList.add('show');
        tooltipShown = true;
        setTimeout(() => {
          helpTooltip.classList.remove('show');
        }, 1500);
      }
    }
    
    // Help Modal
    if (helpButton && helpModal) {
      helpButton.addEventListener('click', () => {
        helpModal.classList.add('active');
        if (helpTooltip) {
          helpTooltip.classList.remove('show');
        }
      });
    }
    
    if (closeHelpModal && closeHelpBtn && helpModal) {
      [closeHelpModal, closeHelpBtn].forEach(el => {
        el.addEventListener('click', () => {
          helpModal.classList.remove('active');
        });
      });
    }
    
    // Game Detail Modal
    if (closeGameDetailModal && gameDetailModal) {
      closeGameDetailModal.addEventListener('click', () => {
        gameDetailModal.classList.remove('active');
      });
    }
    
    // Live search functionality
    if (gamesSearchInput) {
      gamesSearchInput.addEventListener('input', () => {
        const searchTerm = gamesSearchInput.value.toLowerCase();
        
        // Search in game cards
        document.querySelectorAll('.game-card').forEach(card => {
          const titleElement = card.querySelector('.game-title');
          if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(searchTerm)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    }
    
    // Also handle desktop search input
    const desktopSearchInput = document.getElementById('searchInput');
    if (desktopSearchInput) {
      desktopSearchInput.addEventListener('input', () => {
        const searchTerm = desktopSearchInput.value.toLowerCase();
        
        // Search in game cards
        document.querySelectorAll('.game-card').forEach(card => {
          const titleElement = card.querySelector('.game-title');
          if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(searchTerm)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    }
    
    // Mobile search input
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    if (mobileSearchInput) {
      mobileSearchInput.addEventListener('input', () => {
        const searchTerm = mobileSearchInput.value.toLowerCase();
        
        // Search in game cards
        document.querySelectorAll('.game-card').forEach(card => {
          const titleElement = card.querySelector('.game-title');
          if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(searchTerm)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    }
    
    // Show/hide help button on scroll
    if (helpButton) {
      let lastScrollPosition = 0;
      const scrollThreshold = 200;
      let helpButtonVisibleBefore = false;
      
      window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScrollPosition > scrollThreshold) {
          if (!helpButtonVisibleBefore) {
            helpButton.classList.add('visible');
            helpButtonVisibleBefore = true;
            // Show tooltip when button first becomes visible
            setTimeout(() => {
              if (!tooltipShown && helpButton.classList.contains('visible')) {
                showHelpTooltip();
              }
            }, 500);
          }
        } else {
          helpButton.classList.remove('visible');
          helpButtonVisibleBefore = false;
        }
        
        lastScrollPosition = currentScrollPosition;
      });
    }
    
    // Auth Modals
    function showLoginModal() {
      loginModal.classList.add('active');
      mobileMenu.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      menuToggle.querySelector('i').classList.add('fa-bars');
    }
    
    function showRegisterModal() {
      registerModal.classList.add('active');
      mobileMenu.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      menuToggle.querySelector('i').classList.add('fa-bars');
    }
    
    if (loginBtn) loginBtn.addEventListener('click', showLoginModal);
    if (mobileLoginBtn) mobileLoginBtn.addEventListener('click', showLoginModal);
    
    if (registerBtn) registerBtn.addEventListener('click', showRegisterModal);
    if (mobileRegisterBtn) mobileRegisterBtn.addEventListener('click', showRegisterModal);
    
    if (closeLoginModal && closeRegisterModal) {
      [closeLoginModal, closeRegisterModal].forEach(el => {
        el.addEventListener('click', () => {
          if (loginModal) loginModal.classList.remove('active');
          if (registerModal) registerModal.classList.remove('active');
        });
      });
    }
    
    if (switchToRegister && loginModal && registerModal) {
      switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
      });
    }
    
    if (switchToLogin && loginModal && registerModal) {
      switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
      });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        document.querySelectorAll('.modal').forEach(modal => {
          modal.classList.remove('active');
        });
      }
    });
    
    // Show Toast Notification
    function showToast(message, type = 'success') {
      toastMessage.textContent = message;
      toast.className = `toast ${type} show`;
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
    
    // Contact Form Toggle
    if (contactBtn && contactForm) {
      contactBtn.addEventListener('click', () => {
        contactForm.style.display = contactForm.style.display === 'block' ? 'none' : 'block';
      });
    }
    
    // Contact Form Validation (make it globally accessible)
    window.validateContactForm = function() {
      let isValid = true;
      
      // Reset errors
      document.getElementById('nameError').textContent = '';
      document.getElementById('emailError').textContent = '';
      document.getElementById('messageError').textContent = '';
      
      // Validate name
      const name = document.getElementById('name').value.trim();
      if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
      }
      
      // Validate email
      const email = document.getElementById('email').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Valid email is required';
        isValid = false;
      }
      
      // Validate message
      const message = document.getElementById('message').value.trim();
      if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
      }
      
      if (isValid) {
        showToast('Your message has been sent! We will contact you soon.');
        document.getElementById('form').reset();
        contactForm.style.display = 'none';
      }
      
      return false; // Prevent form submission
    }
    
    // Form Submissions
    document.querySelectorAll('.auth-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Form submitted successfully!');
        form.reset();
        loginModal.classList.remove('active');
        registerModal.classList.remove('active');
      });
    });
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thanks for subscribing to our newsletter!');
        e.target.reset();
      });
    }
    
    // Animation on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll('.animate-in');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
        }
      });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Initialize animations
    animateOnScroll();
    
    // Initialize contact form as hidden
    if (contactForm) {
      contactForm.style.display = 'none';
    }
    
    // Initialize modals as hidden
    if (helpModal) {
      helpModal.classList.remove('active');
    }
    if (loginModal) {
      loginModal.classList.remove('active');
    }
    if (registerModal) {
      registerModal.classList.remove('active');
    }
    if (gameDetailModal) {
      gameDetailModal.classList.remove('active');
    }
    
    // Initialize help button visibility
    if (helpButton) {
      helpButton.classList.remove('visible');
    }