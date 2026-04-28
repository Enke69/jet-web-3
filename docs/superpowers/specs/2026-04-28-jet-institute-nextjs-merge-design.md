# JET Institute — Next.js Merge Design

**Date:** 2026-04-28
**Status:** Approved (pending user review of this written spec)
**Output project:** `C:\Users\User\Newstart1-next\`

## Summary

Merge the existing vanilla HTML/CSS/JS site at `C:\Users\User\Newstart1\` (JET Institute IELTS test centre, 5 pages, EN/MN bilingual) into the existing Next.js scaffold at `C:\Users\User\Downloads\jettest-main\jettest-main\` (single page with a custom hero — dot grid, animated arcs, TT Hoves typography). The result is a single Next.js 16 app where:

- The jettest hero becomes the homepage hero (untouched)
- The four inner pages (Book IELTS, About the Test, Preparation, About Us) are ported as Next.js routes
- Every page shares a unified visual language ("medium match" — same fonts, colors, button styles, plus a smaller dot-grid hero on inner pages)
- The site ships English-only for now (Mongolian translations deferred)

## Decisions

| # | Decision | Choice |
|---|---|---|
| 1 | Scope | Port everything from Newstart1 (all sections + all 4 inner pages) and restyle inner pages to match jettest visual language |
| 2 | Bilingual support | English only — drop Mongolian translations for now |
| 3 | Inner-page visual depth | Medium match — same fonts/colors/buttons + smaller dot-grid hero on each inner page |
| 4 | Homepage hero | Use jettest hero exactly as-is — drop BC logo, floating stat cards, "since 1995" description |
| 5 | Homepage sections below hero | Keep Services, Why IELTS, FAQ, Location, Footer — drop Testimonials |
| 6 | Project location | New folder at `C:\Users\User\Newstart1-next\` |
| 7 | Folder name (within Q6) | `Newstart1-next` (sibling to existing `Newstart1`) |
| 8 | Chatbase chatbot | Keep — same widget ID `ytJWlCoYUFz3FrdeQ30_n` |

## Architecture

### Project setup

- Create `C:\Users\User\Newstart1-next\` by copying `C:\Users\User\Downloads\jettest-main\jettest-main\` (preserves Next.js 16 + Turbopack + jsconfig + ESLint config + existing hero components).
- Copy assets from `C:\Users\User\Newstart1\images\` into `public\images\`, merging with existing jettest images. Normalize file names to lowercase with hyphens (e.g. `BC LOGO.png` → `bc-logo.png`) to avoid case-sensitivity surprises on Linux deploys.
- Initialize fresh `git` in the new folder. The existing `Newstart1\.git` history stays untouched.
- Update `package.json` `name` field from `jettest` → `jet-institute`.
- Copy this design doc into the new project at `docs/superpowers/specs/2026-04-28-jet-institute-nextjs-merge-design.md` as part of the scaffolding step.

### Navigation (resolved during planning)

The existing `HeroSection` already contains a built-in `HeroHeader` (brand logo + nav menu + register button). This stays as the homepage's navigation.

- `TopBar` lives in `layout.jsx` and appears on every page (homepage included).
- `Footer`, `BackToTop`, and `Chatbase` live in `layout.jsx` and appear on every page.
- **Homepage nav**: `HeroHeader` (built into `HeroSection`) — kept as-is, but its menus are populated from `src/data/nav.js` so links go to real routes.
- **Inner-page nav**: a separate `Navbar` component, rendered by each inner `page.jsx`. Visually matches `HeroHeader` (same logo, font, red active underline, register CTA) but without the hero animations and with mobile hamburger behavior. It is NOT placed in `layout.jsx` — that would cause a double-navbar on the homepage.

### Folder structure

```
Newstart1-next/
├── public/
│   ├── fonts/         (TT Hoves family)
│   └── images/        (newlogo.png, banner-image.png, line.svg, logo.svg, pattern.svg)
├── src/
│   ├── app/
│   │   ├── layout.jsx              ← TopBar + {children} + Footer + BackToTop + Chatbase
│   │   ├── page.jsx                ← Homepage (HeroSection + home sections)
│   │   ├── book-ielts/page.jsx     ← Navbar + PageHero + content
│   │   ├── about-test/page.jsx
│   │   ├── preparation/page.jsx
│   │   ├── about/page.jsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx
│   │   │   ├── Navbar.jsx          ← inner-page navbar ('use client', mobile hamburger)
│   │   │   ├── Footer.jsx
│   │   │   ├── BackToTop.jsx       ← 'use client'
│   │   │   └── Chatbase.jsx        ← 'use client'
│   │   ├── sections/hero/          ← existing jettest hero (untouched, still includes HeroHeader)
│   │   ├── home/
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── WhyIeltsSection.jsx
│   │   │   ├── FaqSection.jsx      ← 'use client' (accordion)
│   │   │   └── LocationSection.jsx
│   │   └── ui/
│   │       ├── PageHero.jsx        ← shared inner-page hero
│   │       ├── SectionHeader.jsx   ← shared (badge + h2 + accent line)
│   │       └── Reveal.jsx          ← 'use client' wrapper using useReveal hook
│   ├── data/
│   │   ├── sections/hero.js        ← existing (will gain real nav links)
│   │   ├── nav.js                  ← shared nav links data, used by both HeroHeader and Navbar
│   │   └── pages/                  ← per-page content (book-ielts.js, about-test.js, preparation.js, about.js)
│   ├── lib/
│   │   └── useReveal.js            ← reveal-on-scroll hook
│   └── styles/
│       ├── layout/                 ← TopBar/Navbar/Footer/BackToTop module CSS
│       ├── home/                   ← ServicesSection/WhyIeltsSection/FaqSection/LocationSection module CSS
│       ├── ui/                     ← PageHero/SectionHeader module CSS
│       └── sections/               ← existing jettest module CSS (untouched)
```

### Routing

| Route | Source HTML | Notes |
|---|---|---|
| `/` | `Newstart1/index.html` | jettest hero + Services + Why IELTS + FAQ + Location |
| `/book-ielts` | `Newstart1/book-ielts.html` | Test fees, bank info, registration steps, payment proof |
| `/about-test` | `Newstart1/about-test.html` | Listening / Reading / Writing / Speaking format, scoring, Academic vs General |
| `/preparation` | `Newstart1/preparation.html` | Course offerings, schedule, instructors, register CTA |
| `/about` | `Newstart1/about.html` | History (since 1995), British Council partnership, team, contact |

Same nav order on every page. Active link gets a red underline matching the existing site. Right-side "Register Now" CTA links to `/book-ielts`.

### Styling

**CSS Modules** (one per component) — same pattern as the existing jettest hero. No Tailwind, no styled-components.

**Global tokens** in `globals.css`:

- Carry over jettest's existing tokens
- Add ported brand tokens from `Newstart1/css/style.css`: `--brand-red`, `--text-dark`, `--text-muted`, `--bg-soft`, `--border`
- TT Hoves remains the global body font (jettest already configures this)

**Per-component CSS Modules**:

- `PageHero.module.css` reuses the existing `dotGridBackground.module.css` pattern with reduced height and fewer arcs — the visual signature of the jettest homepage hero, scaled down for inner-page heroes.
- `SectionHeader.module.css` ports the badge / h2 / accent-line look from the existing site.
- `Footer.module.css`, `Navbar.module.css`, `TopBar.module.css` ported faithfully from `Newstart1/css/style.css`, refactored to reference the new tokens.

**Dropped CSS** (from `Newstart1/css/style.css` during port):

- `data-i18n` selectors and any styles tied to language toggle
- `.lang-toggle` button styles
- `.testimonials`, `.testimonial-track`, `.testimonial-card`, `.testimonial-*` (testimonials cut)
- `.hero-*` (replaced by jettest hero)
- Counter animation logic / styles (was tied to dropped floating cards)

### Interactivity

Each interactive piece becomes a small `'use client'` component:

| Component | Behavior |
|---|---|
| `Navbar` | Mobile hamburger toggles nav drawer, active route gets underline |
| `FaqSection` | Click question to expand/collapse answer |
| `BackToTop` | Appears after scroll, scrolls smoothly to top |
| `Reveal` | Wraps any element; uses `useReveal` (IntersectionObserver) to add a `revealed` class on scroll-into-view |

### Content fidelity

Port all existing copy verbatim from the source HTML. No rewriting unless explicitly requested. If a section's existing markup doesn't translate cleanly, adapt the layout but preserve the exact words.

## What's dropped (from the existing Newstart1 site)

- Mongolian translations (`js/translations.js`, `data-i18n`, `data-i18n-html` attributes, `.lang-toggle` button)
- Testimonials section (homepage)
- BC logo + floating stat cards on the homepage hero (replaced by the jettest hero)
- Counter animations on hero stats
- Hero badge ("🏆 Official IELTS Centre"), "since 1995" description, dual hero CTAs (homepage hero is replaced)

## What's deferred (out of scope, log for later)

- Mongolian translations re-introduction
- Testimonials section
- Per-page SEO polish: OG images, Twitter cards, JSON-LD structured data (basic `<title>` + `<meta description>` will be set via Next.js `metadata` export per page)
- Contact form / submission backends — pages display contact info only
- Analytics, error tracking
- Domain configuration and deployment pipeline

## Build order

Each step ends with `npm run dev` and a visual check in the browser before moving on.

1. **Scaffold** — copy jettest-main → Newstart1-next, copy + rename assets, init git, rename package, copy this spec into the new project, run `npm install` and `npm run dev`. Verify the existing hero still renders at `/`.
2. **Shared layout** — TopBar, Navbar (with mobile hamburger), Footer, BackToTop, Chatbase. Wire into `layout.jsx`. Verify on the existing hero page.
3. **Shared UI** — `PageHero`, `SectionHeader`, `Reveal` wrapper, `useReveal` hook.
4. **Homepage sections** — Services, Why IELTS, FAQ, Location. Drop into `src/app/page.jsx` below the hero.
5. **Inner pages** — `/book-ielts`, `/about-test`, `/preparation`, `/about` one at a time. Each starts with `PageHero`, then ports content sections.
6. **Polish pass** — responsive check at 360px / 768px / 1280px, verify navbar active states, FAQ accordion, back-to-top, chatbot load. Run `npm run build` to catch SSR/import errors.

## Testing approach

- Per-step `npm run dev` + visual browser check.
- No automated tests — this is a marketing site; visual review is the right verification.
- Final `npm run build` to surface SSR or import errors.

## Risks and unknowns

- **Turbopack on inner pages**: should be fine, but if any animation library breaks under SSR, mark the affected component `'use client'` and continue.
- **Image path case sensitivity**: original site uses `BC LOGO.png` with spaces and uppercase. Normalize to `bc-logo.png` during the asset copy step to avoid Linux deploy surprises later.
- **Content depth on inner pages**: porting copy verbatim assumes the existing HTML has enough content. If a page is thin, flag during the porting step rather than inventing content.
