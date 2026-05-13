# Gushwork - Premium HDPE Pipes & Coils

A responsive, modern product showcase website for premium HDPE pipes and coils infrastructure solutions. Built with vanilla HTML, CSS, and JavaScript for maximum performance and compatibility.

## 🎯 Project Overview

This project is a pixel-perfect implementation of a Figma design specification, featuring a professional product showcase page with interactive elements, responsive design, and modern UI/UX patterns.

### Key Features

- **Sticky Navigation Header** - Appears on scroll past the hero section
- **Interactive Image Carousel** - 6 product items with smooth transitions
- **Navigation Controls** - Previous/Next buttons and indicator dots
- **Zoom Preview** - Click on carousel items to view zoomed product preview
- **Technical Specifications Modal** - Detailed product information in a modal dialog
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - CSS transitions and transforms throughout
- **Accessibility Features** - ARIA labels, semantic HTML, keyboard navigation
- **Mobile Menu** - Hamburger menu for navigation on small screens

## 📁 Project Structure

```
gushwork/
├── index.html           # Main HTML file with page structure
├── styles.css          # Complete responsive CSS styling
├── script.js           # JavaScript for interactive features
├── FIGMA_ANALYSIS.md   # Detailed Figma design specifications
└── README.md           # This file
```

## 🎨 Design System

### Colors
- **Primary Dark**: `#444444` - Used for text, headings, buttons
- **Primary Light**: `#FFFFFF` - Background and text accents
- **Accent Blue**: `#0066cc` - Call-to-action buttons, highlights
- **Accent Green**: `#27ae60` - Pricing, success states
- **Accent Orange**: `#e67e22` - Warnings, secondary accents

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Font Sizes**: Responsive scaling from `0.75rem` to `2.5rem`
- **Line Height**: `1.6` for body text, `1.2` for headings

### Spacing
- Uses CSS custom properties for consistent spacing
- Base unit: `1rem` (16px)
- Scale: `0.5rem`, `1rem`, `1.5rem`, `2rem`, `3rem`, `4rem`

### Border & Radius
- **Border**: `1px solid` on interactive elements
- **Border Radius**: `8px` globally
- **Box Shadows**: Three levels (light, medium, large)

## 🔧 Technical Details

### HTML (530+ lines)
- Semantic HTML5 structure
- Proper heading hierarchy
- ARIA labels for accessibility
- Mobile viewport meta tag
- Semantic elements for main content sections

### CSS (600+ lines)
- **CSS Custom Properties** for maintaiability
- **Responsive Media Queries** at 1200px and 768px breakpoints
- **Flexbox & Grid** layouts for responsiveness
- **Animations** for smooth transitions
- **Accessibility** with focus states and reduced-motion support

### JavaScript (400+ lines)
- **No external dependencies** - Pure vanilla JavaScript
- **Event-driven architecture** for interactions
- **DOM manipulation** for carousel and modal control
- **Keyboard navigation** support (arrow keys, ESC)
- **Mobile menu** hamburger toggle

## 📱 Responsive Breakpoints

### Desktop (1200px and above)
- Full two-column layout
- Side-by-side image carousel and product details
- Visible desktop navigation
- Standard button sizing

### Tablet (768px to 1199px)
- Adjusted spacing and font sizes
- Responsive grid adjustments
- Optimized button sizes
- Better spacing efficiency

### Mobile (767px and below)
- Single-column layout
- Hamburger menu for navigation
- Full-width buttons
- Optimized image carousel
- Vertical stacking of content

## 🚀 Getting Started

### Installation
1. Clone or download the project files
2. Ensure all files are in the same directory:
   - `index.html`
   - `styles.css`
   - `script.js`

### Running the Project
Simply open `index.html` in any modern web browser:
```bash
# On macOS
open index.html

# Or use a live server for better experience
# With Python 3
python3 -m http.server 8000

# Then visit http://localhost:8000
```

## 🎮 User Interactions

### Carousel Navigation
- **Next Button**: Click `>` button to advance to next product
- **Previous Button**: Click `<` button to go to previous product
- **Indicators**: Click any dot to jump to that product
- **Keyboard**: Use arrow keys (← →) to navigate

### Product Preview
- **Click on Carousel**: Click any carousel item to view zoomed preview
- **Close Zoom**: Click outside the preview, press ESC, or click close button

### Technical Specifications
- **View Specs Button**: Click to open technical specifications modal
- **Close Modal**: Click X button, click outside modal, or press ESC

### Sticky Header
- **Auto-appear**: Header appears when scrolling down past hero section
- **Smooth transitions**: Header slides in smoothly

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<footer>`
- **ARIA Labels**: Buttons have descriptive labels for screen readers
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Focus Indicators**: Clear visual indication of focused elements
- **Color Contrast**: Meets WCAG AA standards
- **Reduced Motion**: Respects user's motion preferences
- **Skip Link**: Jump to main content option

## 🔍 Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 12+)
- **Mobile Browsers**: Full responsive support

### Requirements
- ES6+ JavaScript support
- CSS3 support (Flexbox, Grid, Custom Properties)
- Modern HTML5 features

## 📊 Performance Optimizations

- **Minimal HTTP requests**: Single HTML, CSS, and JS file
- **Efficient CSS**: Uses custom properties and inheritance
- **Hardware acceleration**: Animations use `transform` and `opacity`
- **Semantic HTML**: Reduces rendering overhead
- **Optimized event listeners**: Delegated where possible
- **Canvas rendering**: For zoom preview generation

## 🔐 Security

- No external dependencies or CDN reliance
- No tracking or analytics code
- Clean, auditable source code
- No sensitive data storage

## 📝 Code Comments

All code includes helpful comments explaining:
- Section purposes
- Complex logic
- CSS breakpoints
- JavaScript functionality
- Accessibility considerations

## 🛠️ Maintenance & Customization

### Updating Colors
Edit CSS variables in `:root`:
```css
:root {
    --primary-dark: #444444;
    --primary-light: #ffffff;
    /* ... other variables ... */
}
```

### Adding More Products
Edit the `CAROUSEL_ITEMS` array in `script.js`:
```javascript
{
    id: 7,
    title: 'Your Product Name',
    color: '#your-color',
    gradient: 'linear-gradient(135deg, #color1 0%, #color2 100%)'
}
```

### Modifying Content
Edit `index.html` to update:
- Product title and description
- Certification badges
- Features list
- Pricing information
- Modal specifications
- About section text

## 📄 Files Reference

### FIGMA_ANALYSIS.md
Contains detailed analysis of the original Figma design including:
- Complete design system specifications
- Color palette and typography
- Layout and spacing details
- Component breakdown
- Responsive breakpoints
- Implementation checklist

## 🎓 Learning Resources

This project demonstrates:
- Responsive web design best practices
- CSS custom properties usage
- Vanilla JavaScript DOM manipulation
- Accessibility implementation
- Performance optimization techniques
- Modern HTML5 semantics

## 📞 Support

For issues or questions:
1. Check if JavaScript is enabled in browser
2. Verify all files are in the same directory
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Try in a different browser
5. Check browser console for error messages

## 📄 License

This project is created for educational and commercial use.

## ✨ Credits

Designed and developed as a responsive web implementation of a premium HDPE pipes & coils product showcase.

---

**Project Status**: ✅ Complete and Production Ready

Last Updated: 2024
