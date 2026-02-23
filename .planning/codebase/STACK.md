# Technology Stack

**Analysis Date:** 2026-02-23

## Languages

**Primary:**
- HTML5 - Main markup for portfolio pages
- CSS3 - Styling and responsive design
- JavaScript (ES6+) - DOM manipulation and interactivity

**Secondary:**
- SVG - Vector graphics and animations (blob effects, icons)

## Runtime

**Environment:**
- Browser-based (no backend runtime required)
- Static site hosted on GitHub Pages

**Deployment:**
- GitHub Pages (primary hosting)
- Custom domain: portfolio.errorop.com (via CNAME)

## Frameworks

**Frontend:**
- Swiper.js v4+ - Carousel/slider library for portfolio items and testimonials
- Unicons v4.0.0 - Icon library for UI elements

**CSS:**
- Custom CSS (no framework) - Pure CSS3 with CSS variables for theming

## Key Dependencies

**Critical:**
- `swiper-bundle.min.js` - Provides portfolio carousel and testimonial slider functionality
  - Location: `/assets/js/swiper-bundle.min.js`
  - Used for project showcase and testimonial sections
- `swiper-bundle.min.css` - Styling for Swiper components
  - Location: `/assets/css/swiper-bundle.min.css`

**Icons & Fonts:**
- Unicons Icon Library (v4.0.0) - Icon set loaded from `https://unicons.iconscout.com`
- Google Fonts (Poppins font family) - Typography loaded from `https://fonts.googleapis.com`
  - Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## Configuration

**Environment:**
- No environment variables required
- Static configuration in HTML/CSS

**Build:**
- No build process - files served as-is
- VS Code development configuration: `.vscode/settings.json`
  - Live Server port: 5501

**Served Files:**
- Main portfolio: `index.html`
- QR digital business card: `qr-profile/index.html`
- Assets:
  - CSS: `assets/css/styles.css`, `assets/css/swiper-bundle.min.css`
  - JavaScript: `assets/js/main.js`, `assets/js/swiper-bundle.min.js`
  - Images: `assets/img/*` (PNG, JPG, SVG formats)
  - PDFs: `assets/pdf/*` (Resume and portfolio documents)

## Platform Requirements

**Development:**
- Modern web browser with ES6+ support
- VS Code or any text editor
- Node.js NOT required (no build step)

**Production:**
- GitHub Pages static hosting
- Custom domain DNS configuration (CNAME record pointing to portfolio.errorop.com)
- Standard HTTPS support (provided by GitHub Pages)

## Deployment Target

**Hosting Platform:**
- GitHub Pages (static site hosting)
- Repository-based deployment (auto-published on push to main branch)
- CNAME file: `portfolio.errorop.com` (custom domain configured)

---

*Stack analysis: 2026-02-23*
