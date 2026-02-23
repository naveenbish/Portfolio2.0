# Testing Patterns

**Analysis Date:** 2026-02-23

## Test Framework

**Runner:** Not configured

No test framework detected in the project. No `jest.config.js`, `vitest.config.js`, `package.json`, or testing configuration files found.

**Assertion Library:** Not applicable

**Run Commands:** Not applicable

This is a vanilla HTML/CSS/JavaScript static site with no automated testing infrastructure.

## Test File Organization

**Location:** No test files detected

No `.test.js`, `.spec.js`, or similar test files found in the codebase.

**Naming:** Not applicable

**Structure:** Not applicable

## Test Structure

Not applicable. The project has no automated test suite.

## Manual Testing Approach

The codebase relies on manual testing through browser interaction:

**Testing Scenarios (Based on Code):**

1. **Navigation Menu Toggle:**
   - Click hamburger icon (`nav__toggle`)
   - Verify `show-menu` class is added to `nav__menu`
   - Click close icon (`nav__close`)
   - Verify `show-menu` class is removed

2. **Navigation Link Click:**
   - Click any `.nav__link`
   - Verify `show-menu` class is removed from menu
   - Verify smooth scroll to target section

3. **Skills Accordion:**
   - Click skill header (`.skills__header`)
   - Verify clicked section gets `skills__open` class
   - Verify other sections get `skills__close` class
   - Only one skill section should be open at a time

4. **Qualification Tabs:**
   - Click education/work tabs
   - Verify corresponding `qualification__content` shows (`.qualification__active` class)
   - Verify tab color styling updates (`.eduWtext` class)

5. **Dark/Light Theme Toggle:**
   - Click theme button (`theme-button`)
   - Verify `dark-theme` class toggles on `body`
   - Verify icon class toggles between `uil-sun` and `uil-moon`
   - Verify localStorage saves `selected-theme` and `selected-icon`

6. **Scroll Indicators:**
   - Scroll page to section
   - Verify active nav link highlights (`.active-link` class)
   - Verify scroll header adds shadow at 80px scroll (`.scroll-header`)
   - Verify scroll-up button appears at 560px scroll (`.show-scroll`)

7. **Carousel/Swiper:**
   - Verify Swiper.js carousels function correctly
   - Verify testimonial carousel has dynamic bullets pagination
   - Verify portfolio carousel loop works

8. **Form Submission:**
   - Fill contact form
   - Submit to FormSubmit.co endpoint
   - Verify form data is sent successfully
   - Verify no client-side validation (delegated to server)

## Mocking

**Framework:** Not used

**What NOT to Mock:**
- All DOM operations are direct; no mocking framework is present
- External libraries (Swiper, Unicons) are assumed to work as documented
- Form submission delegated to external FormSubmit.co service

## Fixtures and Factories

**Test Data:** Not applicable

No test data fixtures needed as the codebase is a static portfolio with hardcoded content.

**Location:** Not applicable

## Coverage

**Requirements:** None enforced

No coverage tracking configured or required.

## Test Types

**Unit Tests:** Not present

No unit tests found. Individual functions like `toggleSkills()`, `scrollActive()` are not tested in isolation.

**Integration Tests:** Not present

No integration testing framework configured. Manual browser testing would be the only integration approach.

**E2E Tests:** Not used

No E2E testing framework (Cypress, Playwright, etc.) configured.

## Testing Gaps & Concerns

**Untested Areas:**

1. **Event Handlers:** `linkAction()`, `toggleSkills()`, `scrollActive()`, `scrollHeader()`
   - Files: `/home/naveensynlex/Documents/portfolio/Portfolio2.0/assets/js/main.js`
   - Risk: Changes to DOM selectors or event logic could break without detection
   - Priority: Medium

2. **Theme Persistence:**
   - Files: `/home/naveensynlex/Documents/portfolio/Portfolio2.0/assets/js/main.js` (lines 184-212)
   - Risk: localStorage interaction untested; theme restoration on page reload could fail
   - Priority: Medium

3. **Scroll Event Listeners:**
   - Files: `/home/naveensynlex/Documents/portfolio/Portfolio2.0/assets/js/main.js`
   - Functions: `scrollActive()`, `scrollHeader()`, `scrollUp()`
   - Risk: Scroll performance and accuracy not validated
   - Priority: Medium

4. **Form Validation:**
   - Files: `/home/naveensynlex/Documents/portfolio/Portfolio2.0/index.html` (lines 521-547)
   - Risk: No client-side validation; form submission depends entirely on external service
   - Priority: Low (intentional delegation to FormSubmit.co)

5. **Responsive Design:**
   - Files: `/home/naveensynlex/Documents/portfolio/Portfolio2.0/assets/css/styles.css`
   - Risk: Breakpoints and media queries not tested across devices
   - Priority: High (portfolio should display well on all devices)

6. **Swiper.js Integration:**
   - Files: `/home/naveensynlex/Documents/portfolio/Portfolio2.0/assets/js/main.js` (lines 105-135)
   - Risk: Carousel behavior depends on Swiper library version compatibility
   - Priority: Medium

## Current Testing Approach

**Manual Browser Testing:**

The project relies entirely on manual testing through browser interaction:

- No automated test suite
- No CI/CD test gates
- No test reporting
- Testing done by visiting `index.html` and `qr-profile/index.html` directly

**Recommended Testing Implementation:**

For future improvements, consider:

1. **Unit Testing Framework:**
   - Jest or Vitest for testing individual functions
   - Test DOM manipulation functions in isolation

2. **E2E Testing:**
   - Playwright or Cypress for testing user flows
   - Test navigation, scrolling, theme toggle, form submission

3. **Responsive Testing:**
   - BrowserStack or local device testing
   - Verify breakpoints work at: 568px, 968px, and mobile devices

4. **Performance Testing:**
   - Lighthouse for performance metrics
   - Test scroll performance with many listeners

---

*Testing analysis: 2026-02-23*
