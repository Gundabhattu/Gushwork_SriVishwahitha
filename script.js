// ============================================================================
// Manufacturing Process Showcase - Gushwork
// Main JavaScript File
// ============================================================================

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  carousel: {
    autoPlay: true,
    autoPlayInterval: 5000,
    canvasWidth: 800,
    canvasHeight: 500,
  },
  smooth: true,
  debug: false,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function log(msg) {
  if (CONFIG.debug) console.log(`[Gushwork] ${msg}`);
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function getElementBounds(el) {
  return el ? el.getBoundingClientRect() : null;
}

function isElementInViewport(el) {
  const bounds = getElementBounds(el);
  return bounds ? bounds.top < window.innerHeight && bounds.bottom > 0 : false;
}

// ============================================================================
// CANVAS ANIMATION SYSTEM
// ============================================================================

class CanvasAnimator {
  constructor(canvasEl, width, height) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext("2d");
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.animationId = null;
    this.isAnimating = false;

    // Try to enable high DPI rendering
    const dpr = window.devicePixelRatio || 1;
    if (dpr > 1) {
      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
      this.ctx.scale(dpr, dpr);
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawGradientBackground() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    gradient.addColorStop(0, "#667eea");
    gradient.addColorStop(1, "#764ba2");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isAnimating = false;
  }
}

// Raw Materials Animation
class RawMaterialsAnimator extends CanvasAnimator {
  constructor(canvasEl) {
    super(canvasEl, 800, 500);
    this.particles = [];
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: `hsla(${200 + Math.random() * 60}, 70%, 60%, 0.8)`,
      });
    }
  }

  update() {
    this.particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;
    });
  }

  draw() {
    this.clear();
    this.drawGradientBackground();

    this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.particles.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
      this.ctx.closePath();
    });

    // Draw connecting lines
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    this.ctx.lineWidth = 1;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }
    }
  }

  animate() {
    if (this.isAnimating) {
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  start() {
    this.isAnimating = true;
    this.animate();
  }
}

// Manufacturing Process Animation
class ManufacturingAnimator extends CanvasAnimator {
  constructor(canvasEl) {
    super(canvasEl, 800, 500);
    this.time = 0;
    this.boxes = [];
    this.initBoxes();
  }

  initBoxes() {
    this.boxes = [
      { x: 50, y: 150, w: 80, h: 80, label: "Input", color: "#00a3ff" },
      { x: 250, y: 150, w: 80, h: 80, label: "Process", color: "#667eea" },
      { x: 450, y: 150, w: 80, h: 80, label: "Quality", color: "#764ba2" },
      { x: 650, y: 150, w: 80, h: 80, label: "Output", color: "#00ff88" },
    ];
  }

  draw() {
    this.clear();
    this.drawGradientBackground();

    // Draw connecting lines with animation
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    this.ctx.lineWidth = 3;
    for (let i = 0; i < this.boxes.length - 1; i++) {
      const x1 = this.boxes[i].x + this.boxes[i].w;
      const y1 = this.boxes[i].y + this.boxes[i].h / 2;
      const x2 = this.boxes[i + 1].x;
      const y2 = this.boxes[i + 1].y + this.boxes[i + 1].h / 2;

      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);

      // Animated dashes
      const dashLength = 10;
      const totalLength = x2 - x1;
      const dashOffset = (this.time * 100) % dashLength;

      for (let x = x1; x < x2; x += dashLength) {
        const nextX = Math.min(x + dashLength - dashOffset, x2);
        if (x < x2) {
          this.ctx.lineTo(nextX, y1);
          this.ctx.stroke();
          x += dashLength;
          if (x < x2) {
            this.ctx.moveTo(Math.min(x, x2), y1);
          }
        }
      }
    }

    // Draw boxes
    this.boxes.forEach((box, index) => {
      const pulse = Math.sin(this.time * 3 + index) * 5;

      this.ctx.fillStyle = box.color;
      this.ctx.shadowColor = `${box.color}99`;
      this.ctx.shadowBlur = 10 + pulse;
      this.ctx.fillRect(box.x, box.y + pulse, box.w, box.h);

      this.ctx.shadowColor = "transparent";
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      this.ctx.font = "12px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        box.label,
        box.x + box.w / 2,
        box.y + box.h / 2 + 5 + pulse
      );
    });
  }

  animate() {
    if (this.isAnimating) {
      this.time += 0.016;
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  start() {
    this.isAnimating = true;
    this.animate();
  }
}

// Quality Control Animation
class QualityControlAnimator extends CanvasAnimator {
  constructor(canvasEl) {
    super(canvasEl, 800, 500);
    this.products = [];
    this.time = 0;
    this.initProducts();
  }

  initProducts() {
    this.products = [];
    for (let i = 0; i < 15; i++) {
      this.products.push({
        x: Math.random() * this.width,
        y: Math.random() * (this.height - 50) + 25,
        size: Math.random() * 20 + 15,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 0.5,
        angle: Math.random() * Math.PI * 2,
        passed: Math.random() > 0.3,
      });
    }
  }

  draw() {
    this.clear();
    this.drawGradientBackground();

    // Draw checkmarks/X marks in background
    this.ctx.font = "80px Arial";
    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = "rgba(0, 255, 136, 0.8)";
    this.ctx.fillText("✓", 100, 150);
    this.ctx.fillStyle = "rgba(255, 0, 100, 0.8)";
    this.ctx.fillText("✕", 600, 380);
    this.ctx.globalAlpha = 1;

    // Draw products
    this.products.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.passed
        ? `hsla(120, 100%, 50%, ${0.7 + Math.sin(this.time + p.x) * 0.2})`
        : `hsla(0, 100%, 50%, ${0.7 + Math.sin(this.time + p.x) * 0.2})`;
      this.ctx.fill();
      this.ctx.closePath();

      // Draw center
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size / 3, 0, Math.PI * 2);
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  update() {
    this.products.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < -50) p.x = this.width + 50;
      if (p.x > this.width + 50) p.x = -50;
      if (p.y < -50) p.y = this.height + 50;
      if (p.y > this.height + 50) p.y = -50;
    });
  }

  animate() {
    if (this.isAnimating) {
      this.time += 0.016;
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  start() {
    this.isAnimating = true;
    this.animate();
  }
}

// Packaging Animation
class PackagingAnimator extends CanvasAnimator {
  constructor(canvasEl) {
    super(canvasEl, 800, 500);
    this.packages = [];
    this.time = 0;
    this.initPackages();
  }

  initPackages() {
    this.packages = [];
    for (let i = 0; i < 8; i++) {
      this.packages.push({
        x: 100 + i * 80,
        y: 100,
        w: 60,
        h: 80,
        progress: (i / 8) * 100,
        label: `Box ${i + 1}`,
      });
    }
  }

  draw() {
    this.clear();
    this.drawGradientBackground();

    // Draw conveyor belt
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    this.ctx.fillRect(50, 280, 700, 60);

    // Animated belt pattern
    const beltOffset = (this.time * 100) % 20;
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    this.ctx.lineWidth = 2;
    for (let x = beltOffset; x < 750; x += 20) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 310);
      this.ctx.lineTo(x, 310);
      this.ctx.stroke();
    }

    // Draw packages
    this.packages.forEach((pkg, index) => {
      const animProgress = ((this.time * 30 + index * 5) % 500) / 500;
      const finalY = 300 - pkg.h / 2;
      const startY = 100;

      let displayY = startY;
      if (animProgress < 0.5) {
        displayY = startY + (finalY - startY) * (animProgress * 2);
      } else {
        displayY = finalY + (animProgress - 0.5) * 2 * 100;
      }

      // Package
      this.ctx.fillStyle = "#00a3ff";
      this.ctx.shadowColor = "rgba(0, 163, 255, 0.5)";
      this.ctx.shadowBlur = 10;
      this.ctx.fillRect(pkg.x - pkg.w / 2, displayY - pkg.h / 2, pkg.w, pkg.h);

      this.ctx.shadowColor = "transparent";
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      this.ctx.fillRect(
        pkg.x - pkg.w / 2 + 5,
        displayY - pkg.h / 2 + 5,
        pkg.w - 10,
        pkg.h - 10
      );

      // Label
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      this.ctx.font = "10px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(pkg.label, pkg.x, displayY + 2);
    });

    // Draw stage labels
    const stages = ["Assembly", "Testing", "Packaging", "Shipping"];
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    for (let i = 0; i < stages.length; i++) {
      this.ctx.fillText(stages[i], 150 + i * 160, 450);
    }
  }

  animate() {
    if (this.isAnimating) {
      this.time += 0.016;
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  start() {
    this.isAnimating = true;
    this.animate();
  }
}

// ============================================================================
// CAROUSEL SYSTEM
// ============================================================================

class Carousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.track = this.container.querySelector(".carousel-track");
    this.items = this.container.querySelectorAll(".carousel-item");
    this.indicators = this.container.querySelectorAll(".carousel-indicator");
    this.prevBtn = this.container.querySelector(
      ".carousel-controls .carousel-btn:first-child"
    );
    this.nextBtn = this.container.querySelector(
      ".carousel-controls .carousel-btn:last-child"
    );

    this.currentIndex = 0;
    this.autoPlayTimer = null;
    this.animators = [];
    this.isTransitioning = false;

    this.init();
  }

  init() {
    log("Initializing carousel...");

    // Create canvas animations
    this.createAnimations();

    // Setup event listeners
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goTo(index));
    });

    // Auto-play
    if (CONFIG.carousel.autoPlay) {
      this.startAutoPlay();
    }

    // Initial state
    this.updateCarousel();
  }

  createAnimations() {
    const canvases = this.container.querySelectorAll("canvas");
    const animationClasses = [
      RawMaterialsAnimator,
      ManufacturingAnimator,
      QualityControlAnimator,
      PackagingAnimator,
    ];

    canvases.forEach((canvas, index) => {
      if (index < animationClasses.length) {
        const animator = new animationClasses[index](canvas);
        this.animators.push(animator);
        if (index === 0) animator.start();
      }
    });
  }

  updateCarousel() {
    // Update track position
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentIndex);
    });

    // Stop all animations except current
    this.animators.forEach((animator, index) => {
      if (index === this.currentIndex) {
        if (!animator.isAnimating) animator.start();
      } else {
        animator.stop();
      }
    });

    log(`Carousel updated to slide ${this.currentIndex + 1}`);
  }

  prev() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateCarousel();
    this.resetAutoPlay();
    setTimeout(() => (this.isTransitioning = false), 500);
  }

  next() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateCarousel();
    this.resetAutoPlay();
    setTimeout(() => (this.isTransitioning = false), 500);
  }

  goTo(index) {
    if (this.isTransitioning || index === this.currentIndex) return;
    this.isTransitioning = true;
    this.currentIndex = index;
    this.updateCarousel();
    this.resetAutoPlay();
    setTimeout(() => (this.isTransitioning = false), 500);
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => this.next(), CONFIG.carousel.autoPlayInterval);
  }

  resetAutoPlay() {
    if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
    if (CONFIG.carousel.autoPlay) this.startAutoPlay();
  }

  destroy() {
    if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
    this.animators.forEach((animator) => animator.stop());
  }
}

// ============================================================================
// ZOOM OVERLAY SYSTEM
// ============================================================================

class ZoomOverlay {
  constructor() {
    this.overlay = document.getElementById("zoomOverlay");
    this.canvas = document.getElementById("zoomCanvas");
    this.closeBtn = this.overlay.querySelector(".zoom-close");
    this.ctx = this.canvas.getContext("2d");
    this.currentAnimator = null;
    this.isZoomed = false;

    this.init();
  }

  init() {
    this.closeBtn.addEventListener("click", () => this.close());
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isZoomed) this.close();
    });
  }

  open(animatorInstance) {
    this.isZoomed = true;
    this.currentAnimator = animatorInstance;

    // Resize canvas for zoom
    const dpr = window.devicePixelRatio || 1;
    const width = Math.min(window.innerWidth * 0.9, 1200);
    const height = Math.min(window.innerHeight * 0.9, 800);

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";

    // Update animator for zoom
    this.currentAnimator.width = width;
    this.currentAnimator.height = height;
    this.currentAnimator.ctx = this.ctx;
    this.currentAnimator.canvas = this.canvas;

    this.overlay.classList.add("active");
    this.currentAnimator.start();
    log("Zoom overlay opened");
  }

  close() {
    this.isZoomed = false;
    this.overlay.classList.remove("active");
    if (this.currentAnimator) {
      this.currentAnimator.stop();
      this.currentAnimator = null;
    }
    log("Zoom overlay closed");
  }
}

// ============================================================================
// NAVIGATION SYSTEM
// ============================================================================

class StickyNav {
  constructor() {
    this.stickyHeader = document.querySelector(".sticky-header");
    this.mainNav = document.querySelector(".main-nav");
    this.navToggle = document.querySelector(".nav-toggle");
    this.navLinks = document.querySelector(".sticky-nav .nav-links");
    this.lastScrollTop = 0;
    this.ticking = false;

    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll(), false);
    if (this.navToggle) {
      this.navToggle.addEventListener("click", () => this.toggleMenu());
    }

    // Close menu on link click
    if (this.navLinks) {
      this.navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => this.closeMenu());
      });
    }
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateNavVisibility(currentScroll);
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateNavVisibility(currentScroll) {
    const mainNavHeight = this.mainNav.offsetHeight;
    if (currentScroll > mainNavHeight) {
      this.stickyHeader.classList.add("visible");
    } else {
      this.stickyHeader.classList.remove("visible");
    }
  }

  toggleMenu() {
    this.navLinks.classList.toggle("active");
  }

  closeMenu() {
    this.navLinks.classList.remove("active");
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function initializeApp() {
  log("Initializing Gushwork Manufacturing Showcase...");

  try {
    // Initialize navigation
    new StickyNav();

    // Initialize carousel
    const carousel = new Carousel("heroCarousel");

    // Initialize zoom overlay
    const zoomOverlay = new ZoomOverlay();

    // Add click handlers for carousel items
    const carouselItems = document.querySelectorAll(".carousel-item");
    carouselItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        if (carousel.animators[index]) {
          zoomOverlay.open(carousel.animators[index]);
        }
      });
      item.style.cursor = "pointer";
    });

    log("Gushwork initialized successfully!");
  } catch (error) {
    console.error("Error initializing Gushwork:", error);
  }
}

// Start when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  log("Cleaning up...");
  const carousel = document.getElementById("heroCarousel");
  if (carousel && carousel.__carousel) {
    carousel.__carousel.destroy();
  }
});
