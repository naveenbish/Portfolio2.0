# Architecture

**Analysis Date:** 2026-02-23

## Pattern Overview

**Overall:** Static Single-Page Application (SPA) with Multi-Route Design

**Key Characteristics:**
- Server-less static hosting (GitHub Pages / traditional web hosting)
- Client-side DOM manipulation via vanilla JavaScript
- Component-based HTML structure with CSS styling
- No build process, direct browser execution
- Progressive enhancement pattern (works without JavaScript for basic content)

## Layers

**Presentation Layer:**
- Purpose: Render user interface and handle visual interactions
- Location: `index.html`, `/assets/css/`, `/assets/js/main.js`
- Contains: HTML structure, CSS styling, DOM event handlers, UI state management
- Depends on: External libraries (Swiper.js, Unicons), Google Fonts
- Used by: Browser/Client

**Static Assets Layer:**
- Purpose: Store and serve media resources
- Location: `/assets/img/`, `/assets/pdf/`, `/assets/css/`, `/assets/js/`
- Contains: Images, PDFs, stylesheets, JavaScript libraries, fonts
- Depends on: Web server for HTTP delivery
- Used by: HTML documents via relative paths

**Routing/Navigation Layer:**
- Purpose: Single-page routing via hash-based navigation
- Location: `index.html` sections with id attributes, `/assets/js/main.js` scroll detection
- Contains: Section elements, navigation links, scroll event listeners
- Depends on: Browser History API, scroll events
- Used by: Navigation menu, scroll-to-section functionality

**Interactive Behavior Layer:**
- Purpose: Handle user interactions and dynamic DOM updates
- Location: `/assets/js/main.js`
- Contains: Event listeners, CSS class toggles, theme persistence
- Depends on: localStorage, DOM query selectors
- Used by: All interactive features (menu, skills accordion, tabs, theme switching)

**Digital Business Card Sub-App:**
- Purpose: Standalone QR-code accessible contact card
- Location: `/qr-profile/index.html`
- Contains: Inline styles, contact information display, vCard download functionality
- Depends on: External image asset (`../assets/img/naveen_image.jpeg`)
- Used by: Mobile users scanning QR code

## Data Flow

**Page Load Flow:**

1. Browser requests `/index.html`
2. HTML parser builds DOM, loads external CSS from `./assets/css/swiper-bundle.min.css` and `./assets/css/styles.css`
3. Unicons icon library loaded via CDN
4. Main script `./assets/js/main.js` executes, initializing:
   - DOM element references (nav, skills, tabs, theme button)
   - Event listener attachments
   - localStorage checks for saved theme preference
5. Page rendered with Poppins font (Google Fonts)
6. User interactions trigger JavaScript handlers

**Navigation Flow:**

1. User clicks nav link or scroll occurs
2. `scrollActive()` function detects current section
3. Active link styling applied via `active-link` class toggle
4. Hash anchor updates in browser URL (via link href)
5. Browser scrolls to matching section id

**Theme Toggle Flow:**

1. User clicks theme button (`#theme-button`)
2. `dark-theme` class toggled on `document.body`
3. `iconTheme` CSS class toggled on button
4. New theme state persisted to `localStorage`:
   - `selected-theme`: "dark" or "light"
   - `selected-icon`: "uil-moon" or "uil-sun"
5. CSS variables automatically adapt via dark-theme selector

**Skill Accordion Flow:**

1. User clicks skill header (`.skills__header`)
2. `toggleSkills()` function closes all skill sections
3. Clicked section reopened by toggling classes:
   - Remove `skills__close` class
   - Add `skills__open` class
4. CSS transition animates the change

**State Management:**
- localStorage for user preferences (theme selection)
- DOM class attributes for UI state (active menu items, open accordion sections)
- No external state management library
- Minimal in-memory state during page session

## Key Abstractions

**Section Component:**
- Purpose: Reusable content container with semantic structure
- Examples: `#home`, `#about`, `#skills`, `#project`, `#contact` sections
- Pattern: HTML5 `<section>` elements with unique IDs and consistent class naming

**Skill Card Component:**
- Purpose: Collapsible skill category with progress bars
- Examples: Cloud skills, Deployment Tools, Web Dev, Database sections
- Pattern: Accordion UI with `skills__content`, `skills__header`, `skills__list` structure

**Contact Row Component:**
- Purpose: Reusable contact information display in business card
- Examples: Phone, email, website, company contact rows in `/qr-profile/`
- Pattern: `.contact-row` flexbox container with icon, info, arrow

**Form Component:**
- Purpose: Contact form with email submission
- Location: `index.html` lines 521-547
- Pattern: Standard HTML form with FormSubmit.co integration (third-party form handling)

**Navigation Component:**
- Purpose: Header navigation with mobile menu support
- Location: `index.html` header section, managed by `/assets/js/main.js`
- Pattern: Toggle-based mobile menu (`nav__menu`, `show-menu` class)

## Entry Points

**Primary Portfolio Entry Point:**
- Location: `/index.html`
- Triggers: Direct browser navigation to domain root
- Responsibilities:
  - Render complete portfolio layout
  - Load all styling and scripts
  - Handle main navigation and interactions
  - Display projects, skills, qualifications, contact form

**QR Profile Entry Point:**
- Location: `/qr-profile/index.html`
- Triggers: QR code scan pointing to `/qr-profile/` URL
- Responsibilities:
  - Display digital business card
  - Provide quick contact actions (call, email)
  - Generate and download vCard file
  - Mobile-optimized responsive design

## Error Handling

**Strategy:** Graceful Degradation

**Patterns:**
- No explicit error catching in JavaScript
- Defensive element existence checks before event listener attachment:
  ```javascript
  if (navToggle) {
    navToggle.addEventListener("click", () => { ... });
  }
  ```
- Form submission delegates to third-party service (FormSubmit.co)
- Missing images degrade gracefully (HTML alt text provided)
- JavaScript-disabled fallback: HTML structure remains accessible with hash navigation

## Cross-Cutting Concerns

**Logging:**
- None implemented
- No console.log statements in production code
- Browser DevTools console available for debugging

**Validation:**
- Form validation delegated to HTML5 form attributes:
  - `type="email"` for email inputs
  - `type="text"` for text inputs
  - `required` attribute for required fields (not visible but standard)
- FormSubmit.co handles server-side validation and spam protection

**Authentication:**
- Not applicable (portfolio is public-facing)
- No user authentication or access control
- Contact form uses FormSubmit.co's bot protection

**Performance Optimization:**
- CSS variable system for theme switching (reduces repaints)
- Event delegation patterns for multiple listeners
- Swiper.js for optimized carousel rendering (not heavily used currently)
- External assets cached via browser cache headers

**Accessibility:**
- Semantic HTML5 structure (`<section>`, `<header>`, `<footer>`, `<main>`)
- Icon library (Unicons) used with text labels
- Image alt attributes provided
- Color contrast considerations in CSS variables
- Mobile-responsive meta viewport tag present

---

*Architecture analysis: 2026-02-23*
