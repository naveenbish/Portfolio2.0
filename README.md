# Naveen Bisht — portfolio

A single-page developer portfolio: bordered 768px column, full-bleed hairline rules, diagonal-hatch separators, an isometric **NB** hero, ⌘K search and light/dark theme.

Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, and Geist / Geist Mono / IBM Plex Serif / Caveat via `next/font`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit the content

Everything the page says lives in **`src/data/site.ts`** — name, roles, skills, experience, education, projects, contact details, social links. It was taken from <https://portfolio.errorop.com/>; change it there and the page follows.

| What | Where |
| --- | --- |
| Photo and project screenshots | `public/images/` (referenced from `site.ts`) |
| Pixel monogram (header, footer) and the hero's block letters | `src/lib/pixel-font.ts` (shared glyphs), `src/components/logo-mark.tsx`, `src/components/iso-art.tsx` |
| Favicon | `src/app/icon.svg` |
| Colours, rule lines, hatch pattern | CSS variables and the `screen-line-*` / `bg-hatch` utilities in `src/app/globals.css` |

## GitHub contribution graph

The graph under the overview is a **snapshot** of your public GitHub calendar, stored in `src/data/contributions.json`. Refresh it with:

```bash
npm run contributions
```

It only counts what GitHub shows publicly. To include private activity, turn on *Private contributions* in your GitHub profile settings, then refresh.

## Notes

- `next.config.ts` enables `cacheComponents`. Server components must not call `new Date()` / `Math.random()` while prerendering; anything time-dependent (the live clock, the greeting) is a client component that reads the time after mount.
- The theme is applied by an inline script in `<head>` before first paint, so there is no flash; the choice is stored in `localStorage`.
- Motion respects `prefers-reduced-motion` (tagline flip, disclosure transitions).

## Provenance

The layout, spacing, tokens and interaction patterns were reconstructed by observing the public site <https://chanhdai.com> (MIT-licensed) with [REA](https://github.com/morluto/rea): passive DOM/accessibility capture, static bundle analysis, scripted scroll screenshots, and its published stylesheets for design tokens. No source code or personal content was copied; the components were written from scratch against that spec.
