# Coding Conventions

**Analysis Date:** 2026-02-23

## Naming Patterns

**Files:**
- HTML files: lowercase with hyphens for multi-word names (`index.html`, `settings.json`)
- CSS files: lowercase with hyphens (`styles.css`, `swiper-bundle.min.css`)
- JavaScript files: lowercase with hyphens (`main.js`)
- Class names in HTML: double underscore namespace pattern (BEM: `nav__menu`, `nav__link`, `skills__content`)

**Functions:**
- Declared as function expressions with `const` keyword: `const linkAction = function() { }`
- camelCase naming: `toggleSkills()`, `scrollActive()`, `scrollHeader()`
- Event handlers use descriptive names: `linkAction()`, `toggleSkills()`

**Variables:**
- camelCase for all variables: `navMenu`, `navToggle`, `navClose`, `navLink`, `skillsContent`, `skillsHeader`
- Descriptive names indicating their element type: `navMenu`, `themeButton`, `scrollUp`
- Const preferred over let/var for DOM elements and configuration: `const navMenu = document.getElementById("nav-menu")`

**CSS Custom Properties (Variables):**
- Double-dash kebab-case: `--header-height`, `--hue-color`, `--first-color`, `--mb-1`, `--z-tooltip`
- Semantic grouping: color variables, font variables, margin variables, z-index variables
- Documented in CSS comments: sections labeled with `/*=== VARIABLES CSS ===*/`

**CSS Class Names:**
- BEM (Block Element Modifier) pattern: `block__element`, `block__element--modifier`
- Examples: `nav__logo`, `nav__menu`, `nav__item`, `nav__link`, `home__title`, `about__description`
- Modifier classes: `active-link`, `show-menu`, `skills__open`, `skills__close`
- Semantic descriptive names: `contact__input`, `button-flex`, `section__title`

## Code Style

**Formatting:**
- No linter/formatter detected (no `.eslintrc`, `.prettierrc`, or similar config)
- Indentation: 2 spaces (observed in CSS and JavaScript)
- Line length: generally kept under 100 characters
- HTML attributes: new line for multiple attributes on complex elements

**JavaScript Formatting:**
- Single-line comments for functionality: `/*===== MENU SHOW =====*/`
- Arrow functions used: `navToggle.addEventListener("click", () => { navMenu.classList.add("show-menu"); })`
- Traditional function syntax also used: `function scrollActive() { }`
- No semicolons consistently applied (some statements end without semicolon)

**CSS Formatting:**
- Comments used extensively: `/*==================== VARIABLES CSS ====================*/`
- Grouped by functionality: variables section, colors section, typography section
- Media queries at end of ruleset or in separate sections
- Custom properties (variables) centralized in `:root` selector

## Import Organization

**Not Applicable:** This is a vanilla HTML/CSS/JavaScript project with no module system or imports.

**Script Loading:**
- External libraries loaded before custom scripts in HTML `<head>` and `<body>`
- Order in `index.html`:
  1. Unicons CSS (icon library)
  2. Swiper CSS (carousel library)
  3. Custom styles.css
  4. Swiper JavaScript library
  5. Custom main.js

**Path Aliases:**
- Not used. Relative paths used directly: `./assets/css/`, `./assets/js/`, `./assets/img/`

## Error Handling

**Patterns:**
- Conditional element existence checks before attaching listeners:
  ```javascript
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }
  ```
- No try-catch blocks observed
- Silent failures for missing elements (listeners only attached if element exists)
- Form submission delegated to external service (FormSubmit.co)

## Logging

**Framework:** None - uses `console` methods directly

**Patterns:**
- No console logging observed in the code
- No debug output or logging statements in main.js
- Error tracking handled by external service (Form submissions)

## Comments

**When to Comment:**
- Section headers with multiple equals: `/*==================== MENU SHOW Y HIDDEN ====================*/`
- Step descriptions: `/* Validate if constant exists */`, `/*===== MENU SHOW =====*/`
- Comments placed before functionality they describe
- Minimal inline comments; most comments are block-level

**JSDoc/TSDoc:**
- Not used. No formal documentation comments observed
- Inline comments are informal and descriptive

## Function Design

**Size:**
- Generally small, focused functions (most are 5-20 lines)
- Example `linkAction()` is 3 lines
- Example `scrollActive()` is ~15 lines

**Parameters:**
- Minimal parameters; most functions take none or use closure access to variables
- Event handlers use arrow functions to avoid `this` context issues
- Element references passed implicitly through scope

**Return Values:**
- Most functions don't return values; they manipulate DOM directly
- Functions use side effects (classList modifications) rather than returning data
- Arrow functions in event listeners: `=> { navMenu.classList.add("show-menu"); }`

## Module Design

**Exports:**
- Not applicable; no module system (vanilla JavaScript)

**Barrel Files:**
- Not used; single entry point is `main.js`

## BEM Naming Convention

The project uses BEM (Block Element Modifier) consistently for CSS classes:

- **Block**: top-level component (`nav`, `home`, `about`, `skills`, `contact`)
- **Element**: constituent part of a block (`nav__menu`, `nav__link`, `home__title`)
- **Modifier**: variant or state of block/element (`nav__link--active`, `skills__open`, `show-menu`)

Example from code:
```html
<nav class="nav container">
  <a href="#" class="nav__logo">Naveen Bisht</a>
  <div class="nav__menu" id="nav-menu">
    <ul class="nav__list grid">
      <li class="nav__item"><a href="#home" class="nav__link active-link">Home</a></li>
    </ul>
  </div>
</nav>
```

## HTML Practices

**Semantic HTML:**
- Proper semantic tags: `<header>`, `<main>`, `<section>`, `<footer>`
- Form using external service: `action="https://formsubmit.co/bishtnitin003@gmail.com"`
- Section IDs for navigation anchors: `<section class="home section" id="home">`

**Attributes:**
- `id` attributes for JavaScript targeting (camelCase): `id="nav-menu"`, `id="theme-button"`
- `class` attributes for styling (BEM pattern)
- `data-*` attributes for configuration: `data-target='#education'`, `data-content`
- SVG inline in HTML for icons
- `target="_blank"` with `rel="noopener noreferrer"` for external links

---

*Convention analysis: 2026-02-23*
