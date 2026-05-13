/**
 * GUSHWORK - PREMIUM HDPE PIPES & COILS
 * JavaScript - Interactive Features
 * Features:
 * - Sticky header on scroll
 * - Image carousel with navigation
 * - Zoom preview on click
 * - Modal for technical specs
 * - Responsive menu toggle
 */

// ===================================================
// DOM ELEMENTS
// ===================================================

const stickyHeader = document.getElementById('stickyHeader');
const carouselContainer = document.getElementById('carouselContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselIndicators = document.getElementById('carouselIndicators');
const zoomOverlay = document.getElementById('zoomOverlay');
const zoomImage = document.getElementById('zoomImage');
const zoomClose = document.getElementById('zoomClose');
const specsBtn = document.getElementById('specsBtn');
const quoteBtn = document.getElementById('quoteBtn');
const specsModal = document.getElementById('specsModal');
const modalClose = document.getElementById('modalClose');
const navToggle = document.getElementById('navToggle');

// ===================================================
// CAROUSEL CONFIGURATION
// ===================================================

const CAROUSEL_ITEMS = [
    {
        id: 1,
        title: 'HDPE Pipes - Standard Coil',
        color: '#3498db',
        gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
    },
    {
        id: 2,
        title: 'HDPE Coils - High Pressure',
        color: '#e74c3c',
        gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
    },
    {
        id: 3,
        title: 'HDPE Fittings - Complete Set',
        color: '#27ae60',
        gradient: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)'
    },
    {
        id: 4,
        title: 'HDPE Pipes - Large Diameter',
        color: '#f39c12',
        gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
    },
    {
        id: 5,
        title: 'HDPE Coils - Flexible Grade',
        color: '#9b59b6',
        gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)'
    },
    {
        id: 6,
        title: 'HDPE Complete Solution Kit',
        color: '#1abc9c',
        gradient: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)'
    }
];

let currentSlide = 0;

// ===================================================
// INITIALIZATION
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initEventListeners();
    initStickyHeader();
    console.log('%cGushwork - Premium HDPE Pipes & Coils', 'color: #0066cc; font-size: 16px; font-weight: bold;');
    console.log('%cFeatures: Sticky Header | Carousel | Zoom | Responsive Design', 'color: #27ae60;');
});

// ===================================================
// CAROUSEL INITIALIZATION
// ===================================================

function initCarousel() {
    // Generate carousel items
    CAROUSEL_ITEMS.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.style.background = item.gradient;
        carouselItem.innerHTML = `
            <div class="carousel-item-content" data-index="${index}">
                <h3 style="color: white; font-size: 1.5rem; text-align: center; margin: 0;">${item.title}</h3>
                <p style="color: rgba(255,255,255,0.8); text-align: center; margin: 10px 0 0 0;">Item ${item.id}</p>
            </div>
        `;
        
        // Add click event for zoom
        carouselItem.addEventListener('click', function() {
            showZoomPreview(item);
        });

        carouselContainer.appendChild(carouselItem);
    });

    // Generate indicators
    CAROUSEL_ITEMS.forEach((item, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
        carouselIndicators.appendChild(indicator);
    });
}

// ===================================================
// CAROUSEL NAVIGATION
// ===================================================

function goToSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');

    // Remove active class from all
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current
    items[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % CAROUSEL_ITEMS.length;
    goToSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    goToSlide(prev);
}

// ===================================================
// ZOOM PREVIEW
// ===================================================

function showZoomPreview(item) {
    // Create a canvas to display the zoomed item
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const colors = item.gradient.match(/#[0-9a-f]{3,6}|rgb\([^)]+\)/gi) || ['#0066cc', '#003d99'];
    gradient.addColorStop(0, colors[0]);
    if (colors.length > 1) {
        gradient.addColorStop(1, colors[colors.length - 1]);
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.title, canvas.width / 2, canvas.height / 2 - 30);
    
    ctx.font = '18px Arial';
    ctx.globalAlpha = 0.8;
    ctx.fillText('Click to close or press ESC', canvas.width / 2, canvas.height / 2 + 50);

    // Display zoom
    zoomImage.src = canvas.toDataURL();
    zoomOverlay.classList.add('active');
}

function closeZoom() {
    zoomOverlay.classList.remove('active');
}

// ===================================================
// MODAL FUNCTIONS
// ===================================================

function openModal(modal) {
    modal.classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('active');
}

// ===================================================
// STICKY HEADER
// ===================================================

function initStickyHeader() {
    const heroHeight = document.querySelector('.main-nav').offsetHeight || 100;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > heroHeight) {
            stickyHeader.classList.add('active');
        } else {
            stickyHeader.classList.remove('active');
        }
    });
}

// ===================================================
// MOBILE MENU TOGGLE
// ===================================================

function toggleMobileMenu() {
    navToggle.classList.toggle('active');
}

// ===================================================
// EVENT LISTENERS
// ===================================================

function initEventListeners() {
    // Carousel controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Zoom controls
    zoomClose.addEventListener('click', closeZoom);
    zoomOverlay.addEventListener('click', function(e) {
        if (e.target === zoomOverlay) {
            closeZoom();
        }
    });

    // Modal controls
    specsBtn.addEventListener('click', function() {
        openModal(specsModal);
    });

    modalClose.addEventListener('click', function() {
        closeModal(specsModal);
    });

    specsModal.addEventListener('click', function(e) {
        if (e.target === specsModal) {
            closeModal(specsModal);
        }
    });

    // Quote button
    quoteBtn.addEventListener('click', function() {
        alert('Thank you for your interest!\n\nPlease fill out the contact form or call us for a custom quote.');
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' && !zoomOverlay.classList.contains('active')) {
            nextSlide();
        } else if (e.key === 'ArrowLeft' && !zoomOverlay.classList.contains('active')) {
            prevSlide();
        } else if (e.key === 'Escape') {
            closeZoom();
            closeModal(specsModal);
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-toggle') && !e.target.closest('.sticky-nav')) {
            navToggle.classList.remove('active');
        }
    });

    // Carousel auto-rotate every 5 seconds (optional - commented out for manual control)
    // setInterval(nextSlide, 5000);
}

// ===================================================
// UTILITY FUNCTIONS
// ===================================================

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Announce to screen readers
 */
function announceToScreenReaders(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.cssText = 'position: absolute; left: -10000px;';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// ===================================================
// LOGGING & DEBUG INFO
// ===================================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%cDebug Info:', 'color: #e74c3c; font-weight: bold;');
    console.log('Carousel Items: ' + CAROUSEL_ITEMS.length);
    console.log('Current Slide: ' + currentSlide);
}
