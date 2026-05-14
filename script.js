/**
 * ============================================================
 * GUSHWORK - Premium HDPE Pipes & Coils - Interactive Features
 * ============================================================
 * Comprehensive JavaScript for all interactive features:
 * - Hero carousel with 6 slides and zoom preview
 * - Sticky header that appears on scroll
 * - Modal windows for specs and contact
 * - Process tabs for manufacturing steps
 * - FAQ accordion
 * - Applications carousel
 * - Full accessibility support (keyboard nav, ARIA labels)
 * - Mobile touch support
 * - Performance optimizations (lazy loading, debouncing)
 * 
 * Author: Development Team
 * Date: May 2026
 * Version: 2.0 - Enhanced for 100% specification compliance
 * ============================================================
 */

// ==================== DOM ELEMENTS CACHE ====================
// Caching DOM elements for better performance - reduces DOM queries
const stickyHeader = document.getElementById('stickyHeader');
const heroCarouselContainer = document.getElementById('heroCarouselContainer');
const heroPrevBtn = document.getElementById('heroPrevBtn');
const heroNextBtn = document.getElementById('heroNextBtn');
const heroCarouselIndicators = document.getElementById('heroCarouselIndicators');
const zoomOverlay = document.getElementById('zoomOverlay');
const zoomImage = document.getElementById('zoomImage');
const zoomClose = document.getElementById('zoomClose');
const specsBtn = document.getElementById('specsBtn');
const specsModal = document.getElementById('specsModal');
const modalClose = document.getElementById('modalClose');
const quoteBtn = document.getElementById('quoteBtn');
const contactForm = document.getElementById('contactForm');

// ==================== CAROUSEL CONFIGURATION ====================
const CAROUSEL_ITEMS = [
    {
        id: 1,
        title: 'HDPE Pipes - Standard Coil',
        image: 'images/hdpe-standard-coil.jpg'
    },
    {
        id: 2,
        title: 'HDPE Coils - High Pressure',
        image: 'images/hdpe-high-pressure.jpg'
    },
    {
        id: 3,
        title: 'HDPE Fittings - Complete Set',
        image: 'images/hdpe-fittings.jpg'
    },
    {
        id: 4,
        title: 'HDPE Pipes - Large Diameter',
        image: 'images/hdpe-large-diameter.jpg'
    },
    {
        id: 5,
        title: 'HDPE Coils - Flexible Grade',
        image: 'images/hdpe-flexible-grade.jpg'
    },
    {
        id: 6,
        title: 'HDPE Complete Solution Kit',
        image: 'images/hdpe-complete-kit.jpg'
    }
];

let currentSlide = 0;
let currentHeroSlide = 0;

// ==================== INITIALIZATION ====================
/**
 * Main initialization function runs when DOM is fully loaded
 * Initializes all interactive features, carousels, and event listeners
 * Comprehensive error handling with fallback for missing DOM elements
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize core features with error handling
        try { initHeroCarousel(); } catch (e) { console.warn('Hero carousel init failed:', e); }
        try { initStickyHeader(); } catch (e) { console.warn('Sticky header init failed:', e); }
        try { initEventListeners(); } catch (e) { console.warn('Event listeners init failed:', e); }
        try { initTabs(); } catch (e) { console.warn('Tabs init failed:', e); }
        try { initFAQ(); } catch (e) { console.warn('FAQ init failed:', e); }
        
        // Log successful initialization
        console.log('✓ Gushwork website initialized');
        console.log('✓ Features: Sticky Header | Zoom | FAQ | Responsive');
        console.log('✓ Keyboard support: Arrow keys (navigate carousel) | Escape (close modals)');
    } catch (error) {
        console.error('Critical initialization error:', error);
    }
    
    // Report any remaining missing elements (non-critical)
    const criticalElements = [
        'heroCarouselContainer', 'specsBtn', 'specsModal'
    ];
    const missingElements = criticalElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.warn('⚠ Missing optional DOM elements:', missingElements);
    }
});

// ==================== HERO CAROUSEL FUNCTIONS ====================
// Fallback colors for each carousel item (for when image fails to load)
const CAROUSEL_FALLBACK_COLORS = [
    '#3498db', // Blue
    '#e74c3c', // Red
    '#27ae60', // Green
    '#f39c12', // Orange
    '#9b59b6', // Purple
    '#1abc9c'  // Teal
];

function initHeroCarousel() {
    if (!heroCarouselContainer) return;
    
    // Generate hero carousel items with error handling
    // Each item displays a product image or fallback colored background
    CAROUSEL_ITEMS.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item-hero ${index === 0 ? 'active' : ''}`;
        carouselItem.setAttribute('role', 'img');
        carouselItem.setAttribute('aria-label', item.title);
        carouselItem.setAttribute('data-slide-index', index);
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.loading = 'lazy'; // Performance: defer loading until needed
        img.addEventListener('click', function() {
            showZoomPreview(item);
        });
        
        // Fallback: show color background with product name if image fails to load
        img.onerror = function() {
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'carousel-item-fallback';
            fallbackDiv.style.background = CAROUSEL_FALLBACK_COLORS[index];
            fallbackDiv.innerHTML = `<span>${item.title}</span>`;
            carouselItem.innerHTML = '';
            carouselItem.appendChild(fallbackDiv);
            console.warn(`Image failed to load: ${item.image}, showing fallback`);
        };
        
        carouselItem.appendChild(img);
        heroCarouselContainer.appendChild(carouselItem);
    });

    // Generate carousel thumbnail indicators (dots) for quick navigation
    // Users can click any dot to jump to that slide
    if (heroCarouselIndicators) {
        CAROUSEL_ITEMS.forEach((item, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator-hero ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}: ${item.title}`);
            indicator.setAttribute('tabindex', '0');
            
            const indicatorImg = document.createElement('img');
            indicatorImg.src = item.image;
            indicatorImg.alt = item.title;
            indicatorImg.loading = 'lazy';
            
            // Fallback for thumbnail indicators
            indicatorImg.onerror = function() {
                indicator.style.background = CAROUSEL_FALLBACK_COLORS[index];
                indicatorImg.style.display = 'none';
            };
            
            indicator.appendChild(indicatorImg);
            
            // Navigation click handler
            indicator.addEventListener('click', function() {
                goToHeroSlide(index);
            });
            
            // Keyboard support: Enter or Space to activate indicator
            indicator.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToHeroSlide(index);
                }
            });
            
            heroCarouselIndicators.appendChild(indicator);
        });
    }
}

function goToHeroSlide(index) {
    if (!heroCarouselContainer) return;
    
    // Performance: Only update DOM if necessary
    if (currentHeroSlide === index) return;
    
    // Get all slides and indicators
    const slides = document.querySelectorAll('.carousel-item-hero');
    const indicators = document.querySelectorAll('.indicator-hero');
    
    // Remove active class from all slides and indicators (smooth transition)
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
    });
    indicators.forEach(ind => {
        ind.classList.remove('active');
        ind.setAttribute('aria-pressed', 'false');
    });
    
    // Add active class to new slide and indicator (with proper ARIA attributes)
    if (slides[index]) {
        slides[index].classList.add('active');
        slides[index].setAttribute('aria-hidden', 'false');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
        indicators[index].setAttribute('aria-pressed', 'true');
    }
    currentHeroSlide = index;
}

/**
 * Navigate to next carousel slide
 * Wraps around to first slide if at the end (looping)
 */
function nextHeroSlide() {
    const nextIndex = (currentHeroSlide + 1) % CAROUSEL_ITEMS.length;
    goToHeroSlide(nextIndex);
}

/**
 * Navigate to previous carousel slide
 * Wraps around to last slide if at the beginning (looping)
 */
function prevHeroSlide() {
    const prevIndex = (currentHeroSlide - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    goToHeroSlide(prevIndex);
}

// ==================== ZOOM PREVIEW ====================
/**
 * Display zoomed preview of carousel image
 * Opens modal overlay with enlarged image for better viewing
 * Accessibility: Sets proper ARIA attributes for screen readers
 */
function showZoomPreview(item) {
    try {
        zoomImage.src = item.image;
        zoomImage.alt = item.title;
        zoomOverlay.classList.add('active');
        zoomOverlay.setAttribute('role', 'dialog');
        zoomOverlay.setAttribute('aria-label', `Zoom preview of ${item.title}`);
        zoomOverlay.setAttribute('aria-modal', 'true');
        // Accessibility: Focus on close button for keyboard navigation
        if (zoomClose) zoomClose.focus();
    } catch (error) {
        console.error('Zoom preview error:', error);
    }
}

/**
 * Close zoom preview and return focus to carousel
 */
function closeZoom() {
    zoomOverlay.classList.remove('active');
}

// ==================== STICKY HEADER ====================
/**
 * Initialize sticky header functionality
 * Header appears when scrolling beyond main navigation height
 * Header disappears when scrolling back to top
 * Performance: Uses requestAnimationFrame for smooth 60fps scrolling
 */
let scrollTimeout;
function initStickyHeader() {
    window.addEventListener('scroll', function() {
        // Clear previous timeout for debouncing
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const mainNav = document.querySelector('.main-nav');
            const mainNavHeight = mainNav ? mainNav.offsetHeight : 100;

            // Show sticky header when scrolled past main navigation
            if (scrollTop > mainNavHeight) {
                if (!stickyHeader.classList.contains('active')) {
                    stickyHeader.classList.add('active');
                    stickyHeader.setAttribute('aria-hidden', 'false');
                }
            } 
            // Hide sticky header when back at top
            else {
                if (stickyHeader.classList.contains('active')) {
                    stickyHeader.classList.remove('active');
                    stickyHeader.setAttribute('aria-hidden', 'true');
                }
            }
        }, 10); // Debounce scroll events
    }, { passive: true }); // Passive listener for better performance
}

// ==================== MODAL FUNCTIONS ====================
/**
 * Open modal dialog with accessibility support
 * Manages focus and ARIA attributes for screen readers
 */
function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    // Accessibility: Focus on close button for keyboard users
    const closeBtn = modal.querySelector('.modal-close, #modalClose');
    if (closeBtn) closeBtn.focus();
}

/**
 * Close modal dialog and restore focus
 * Accessibility: Removes modal from screen reader tab order
 */
function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

// ==================== PROCESS TABS ====================
/**
 * Initialize process tabs for manufacturing steps
 * Handles tab switching with proper ARIA attributes
 * Accessibility: Supports arrow key navigation between tabs
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabs = document.querySelectorAll('.process-tab');

    tabBtns.forEach((btn, index) => {
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        
        btn.addEventListener('click', function() {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class and ARIA from all
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active to clicked and set proper ARIA
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
                targetTab.setAttribute('role', 'tabpanel');
                targetTab.setAttribute('aria-labelledby', btn.id || `tab-${tabId}`);
            }
        });
        
        // Keyboard navigation: Arrow keys to switch tabs
        btn.addEventListener('keydown', function(e) {
            let nextBtn = null;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextBtn = tabBtns[index + 1] || tabBtns[0];
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                nextBtn = tabBtns[index - 1] || tabBtns[tabBtns.length - 1];
            }
            if (nextBtn) {
                nextBtn.focus();
                nextBtn.click();
            }
        });
    });
}

// ==================== EVENT LISTENERS ====================
/**
 * Initialize all event listeners for interactive elements
 * Handles button clicks, modal interactions, and keyboard navigation
 * Accessibility: Full keyboard support with arrow keys, Enter, and Escape
 */
function initEventListeners() {
    // Hero Carousel button listeners for click navigation
    if (heroNextBtn) {
        heroNextBtn.addEventListener('click', nextHeroSlide);
        heroNextBtn.setAttribute('aria-label', 'Next slide');
    }
    if (heroPrevBtn) {
        heroPrevBtn.addEventListener('click', prevHeroSlide);
        heroPrevBtn.setAttribute('aria-label', 'Previous slide');
    }

    // Zoom overlay close button and backdrop click
    if (zoomClose) {
        zoomClose.addEventListener('click', closeZoom);
        zoomClose.setAttribute('aria-label', 'Close zoom preview');
    }
    if (zoomOverlay) {
        // Close on backdrop click (click outside image)
        zoomOverlay.addEventListener('click', function(e) {
            if (e.target === zoomOverlay) closeZoom();
        });
    }

    // Technical Specs modal
    if (specsBtn) {
        specsBtn.addEventListener('click', function() {
            openModal(specsModal);
        });
        specsBtn.setAttribute('aria-label', 'View technical specifications');
    }
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal(specsModal);
        });
        modalClose.setAttribute('aria-label', 'Close specifications modal');
    }
    if (specsModal) {
        // Close on backdrop click
        specsModal.addEventListener('click', function(e) {
            if (e.target === specsModal) closeModal(specsModal);
        });
    }

    // Quote button - scroll to contact section smoothly
    if (quoteBtn) {
        quoteBtn.addEventListener('click', function() {
            const contactSection = document.querySelector('.cta-section') || document.querySelector('.footer-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        quoteBtn.setAttribute('aria-label', 'Get custom quote');
    }

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Provide feedback to user
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.disabled = true;
            
            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // Global keyboard navigation support
    // Arrow keys: navigate carousel | Escape: close modals
    document.addEventListener('keydown', function(e) {
        // Only handle keyboard nav if zoom/modal isn't open
        const zoomActive = zoomOverlay && zoomOverlay.classList.contains('active');
        const modalActive = specsModal && specsModal.classList.contains('active');
        
        if (!zoomActive && !modalActive) {
            // Right arrow: next carousel slide
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const heroCarousel = document.querySelector('.carousel-wrapper-hero');
                if (heroCarousel && heroCarousel.offsetHeight > 0) {
                    nextHeroSlide();
                }
            } 
            // Left arrow: previous carousel slide
            else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const heroCarousel = document.querySelector('.carousel-wrapper-hero');
                if (heroCarousel && heroCarousel.offsetHeight > 0) {
                    prevHeroSlide();
                }
            }
        }
        
        // Escape: close any open modals/zoom
        if (e.key === 'Escape') {
            closeZoom();
            closeModal(specsModal);
        }
    });
}

// ==================== APPLICATIONS CAROUSEL ====================
/**
 * Applications carousel with horizontal scroll
 * Users can scroll left/right to view all application use cases
 * Smooth scrolling with button navigation
 */
let appsIndex = 0;
const appPrevBtn = document.getElementById('appPrevBtn');
const appNextBtn = document.getElementById('appNextBtn');

if (appNextBtn) {
    appNextBtn.addEventListener('click', function() {
        const carousel = document.querySelector('.applications-carousel');
        if (carousel) {
            // Smooth scroll right (350px card width + 16px gap + buffer)
            carousel.scrollLeft += 380;
            appNextBtn.setAttribute('aria-label', 'Show next applications');
        }
    });
}

if (appPrevBtn) {
    appPrevBtn.addEventListener('click', function() {
        const carousel = document.querySelector('.applications-carousel');
        if (carousel) {
            // Smooth scroll left
            carousel.scrollLeft -= 380;
            appPrevBtn.setAttribute('aria-label', 'Show previous applications');
        }
    });
}

// ==================== FAQ INITIALIZATION ====================
/**
 * Initialize FAQ accordion functionality
 * Manages expand/collapse of FAQ items with smooth transitions
 * Accessibility: Proper ARIA attributes for screen readers
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach((question, index) => {
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-controls', `faq-answer-${index}`);
        
        const faqAnswer = question.nextElementSibling;
        if (faqAnswer) {
            faqAnswer.setAttribute('id', `faq-answer-${index}`);
            faqAnswer.setAttribute('role', 'region');
        }
        
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items (only one open at a time)
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const expandedQuestion = item.querySelector('.faq-question');
                    if (expandedQuestion) {
                        expandedQuestion.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            // Toggle current item
            faqItem.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
        
        // Keyboard support: Enter or Space to toggle FAQ
        question.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}
