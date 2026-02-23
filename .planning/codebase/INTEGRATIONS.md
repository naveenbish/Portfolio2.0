# External Integrations

**Analysis Date:** 2026-02-23

## APIs & External Services

**Form Submission:**
- FormSubmit (formsubmit.co) - Contact form backend
  - Service: `https://formsubmit.co/bishtnitin003@gmail.com`
  - Method: POST form submission
  - Fields: name, email, subject, message
  - Location: `index.html` line 521

**Icon Library:**
- Unicons (IconScout) - Icon library for UI icons
  - CDN: `https://unicons.iconscout.com/release/v4.0.0/css/line.css`
  - Version: 4.0.0
  - Used for: Navigation, social media, feature icons throughout portfolio

## Data Storage

**Databases:**
- None - Static site with no backend database

**File Storage:**
- Local filesystem only
- Assets served from GitHub Pages repository
- File types: Images (PNG, JPG), PDFs, SVG graphics

**Client-Side Storage:**
- Browser localStorage - Theme preference persistence
  - Keys: `selected-theme`, `selected-icon`
  - Location: `assets/js/main.js` lines 184-211
  - Purpose: Dark/light mode toggle state

**Caching:**
- None explicit - Standard HTTP caching via GitHub Pages headers

## Authentication & Identity

**Auth Provider:**
- None - Public portfolio (no authentication required)

**Social Media Links:**
- LinkedIn: `https://www.linkedin.com/in/naveen-bisht-775410221`
- Instagram: `https://instagram.com/errorop003`
- GitHub: `https://github.com/naveenbish`
- Facebook: `https://www.facebook.com/naveen.bisht.965580`
- Twitter: `https://twitter.com/NitinBi64120443`

**Related Services:**
- NeuralEDGE Consultant (linked site): `https://neuraledge.in`
- Todo web app: `https://todo.errorop.com/`

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Browser console only (development/debugging)
- No server-side logging

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (automatic deployment from repository)
- Custom domain: portfolio.errorop.com

**CI Pipeline:**
- None explicit - Automatic GitHub Pages deployment on push

**Environment Configuration:**
- CNAME file: `portfolio.errorop.com` (custom domain setup)

## External CDN Resources

**Google Fonts:**
- URL: `https://fonts.googleapis.com/css2`
- Font: Poppins (weights 400, 500, 600, 700)
- Preconnect: `https://fonts.googleapis.com`, `https://fonts.gstatic.com`
- Purpose: Primary typography for entire site

**Swiper Carousel Library:**
- Bundled locally (not CDN) - `assets/js/swiper-bundle.min.js`

## Contact & Communication

**Contact Form Integration:**
- Service: FormSubmit.co
- Email recipient: `bishtnitin003@gmail.com`
- Form endpoint: `https://formsubmit.co/bishtnitin003@gmail.com`
- Form location: `index.html` lines 521-540
- Methods: Form submits via POST to FormSubmit API
- No authentication required - public form

**Direct Contact Channels:**
- Email: `bishtnitin003@gmail.com`
- Phone: +91 95XXX 0XX0X (displayed on contact section)
- Location: New Delhi, India

## Webhooks & Callbacks

**Incoming:**
- Contact form submissions via FormSubmit.co

**Outgoing:**
- None detected

## SEO & Meta Integration

**Sitemap:**
- `sitemap.xml` - XML sitemap for search engines
- Entries: Main portfolio pages and QR profile page

**Robots Configuration:**
- `robots.txt` - Disallows crawler access to certain asset paths
- Disallowed paths: `https://www.errorop.com/assets/`

**Open Graph:**
- Meta tags for social media sharing
- Site title, description, author metadata in `index.html`

---

*Integration audit: 2026-02-23*
