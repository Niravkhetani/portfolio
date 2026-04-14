# Design Document — portfolio-gsap-redesign

## Overview

This document describes the technical design for a complete visual and interaction redesign of the existing React 18 portfolio. The redesign replaces the basic `IntersectionObserver`-based `FadeSection` with GSAP (GreenSock Animation Platform) as the primary animation engine, adds Lenis smooth scroll, a custom cursor, magnetic elements, a scroll progress bar, and a particle hero background — while preserving all existing data-fetching, section structure, MUI theming, and anchor IDs.

The guiding principle is **progressive enhancement**: every animation is gated behind a `prefersReducedMotion` utility so the site remains fully usable without motion. All new animation code is isolated in hooks and utility modules so the existing component tree changes minimally.

### Key Libraries Added

| Library | Version (target) | Purpose |
|---|---|---|
| `gsap` | ^3.12 | Core animation engine |
| `@gsap/react` | ^2.1 | React-friendly GSAP context/cleanup |
| `lenis` | ^1.1 | Smooth scroll normalisation |
| `@tsparticles/react` + `@tsparticles/slim` | ^2.x | Hero particle background |

GSAP's `ScrollTrigger` and `ScrollToPlugin` are bundled with `gsap` — no separate install needed.

---

## Architecture

### High-Level Component Tree (after redesign)

```
App
└── ThemeProvider (MUI, unchanged)
    └── LenisProvider          ← new: wraps entire app, owns Lenis instance
        ├── CustomCursor       ← new: portal-rendered, hidden on touch/reduced-motion
        ├── ScrollProgressBar  ← new: fixed top bar
        └── Home
            ├── Navbar         ← replaces Header; adds scroll-glass + hamburger
            └── body-wrapper
                ├── HeroSection        ← replaces About; adds particles + entrance timeline
                ├── SectionReveal      ← new wrapper (replaces FadeSection)
                │   └── Experience     ← adds self-drawing line + staggered cards
                ├── SectionReveal
                │   └── Education      ← mirrors Experience, enters from right
                ├── SectionReveal
                │   └── Contact        ← adds animated focus states + shake/pulse
                └── Footer             ← adds magnetic social icons
```

### Animation Responsibility Map

| Concern | Owner |
|---|---|
| Plugin registration | `App.js` (once, on module load) |
| Lenis ↔ GSAP ticker bridge | `LenisProvider` |
| Scroll progress bar | `ScrollProgressBar` (self-contained ScrollTrigger) |
| Custom cursor tracking | `CustomCursor` (self-contained, `quickTo`) |
| Magnetic pull | `useMagnetic` hook (consumed by buttons/icons) |
| Section entrance | `SectionReveal` wrapper (ScrollTrigger per section) |
| Hero entrance timeline | `HeroSection` (local `useGSAP`) |
| Timeline line draw | `AnimatedTimeline` (ScrollTrigger `scaleY`) |
| Card stagger | `Experience` / `Education` (ScrollTrigger batch) |
| Contact field focus | `Contact` (local GSAP tweens on focus/blur) |
| Reduced-motion gating | `useReducedMotion` hook + `animDuration` utility |

---

## Components and Interfaces

### `App.js` — Plugin Registration

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
```

Registration happens at module scope (before any component mounts) so it runs exactly once regardless of React strict-mode double-invocation.

---

### `LenisProvider`

**Path:** `src/shared/LenisProvider/LenisProvider.jsx`

**Responsibilities:**
- Instantiates `Lenis` with `{ lerp: 0.1, smoothWheel: true }`.
- Adds Lenis's `raf` callback to `gsap.ticker` so ScrollTrigger reads Lenis-normalised scroll positions.
- Removes the ticker callback and destroys the Lenis instance on unmount.
- Exposes the Lenis instance via a `LenisContext` for child components that need `lenis.scrollTo()`.

**Props:** `{ children }`

**Interface:**
```ts
interface LenisContextValue {
  lenis: Lenis | null;
}
export const LenisContext: React.Context<LenisContextValue>;
export const useLenis: () => LenisContextValue;
```

---

### `ScrollProgressBar`

**Path:** `src/components/ScrollProgressBar/ScrollProgressBar.jsx`

**Responsibilities:**
- Renders a `<div>` fixed to `top: 0`, full width, height `3px`, background `#339ec0`, `transform-origin: left`.
- Creates a single ScrollTrigger on mount that drives `scaleX` from `0` → `1` across the full document height with `scrub: true`.
- Kills the ScrollTrigger on unmount.

**Props:** none

---

### `CustomCursor`

**Path:** `src/components/CustomCursor/CustomCursor.jsx`

**Responsibilities:**
- Renders two `<div>` elements (dot 8 px, ring 32 px) via `ReactDOM.createPortal` into `document.body`.
- Uses `gsap.quickTo` for `x`/`y` on each element with configurable lag (`dot: 0.15`, `ring: 0.08`).
- Listens to `mousemove` on `window`; updates quickTo targets.
- Delegates hover expansion (`scale: 2, opacity: 0.5`) to a global `mouseenter`/`mouseleave` listener on `[data-cursor-hover]` attribute — components opt in by adding this attribute.
- Hidden (returns `null`) when `window.matchMedia('(pointer: coarse)').matches` or `prefersReducedMotion()`.

**Props:** none

**CSS variables used:** `--cursor-dot-size: 8px`, `--cursor-ring-size: 32px`

---

### `useMagnetic`

**Path:** `src/hooks/useMagnetic.js`

**Responsibilities:**
- Accepts a `ref` to the target element.
- On `mousemove` within the element's bounding rect, computes `dx`/`dy` as a fraction of element dimensions (capped at ±30%) and applies `gsap.to(ref.current, { x: dx, y: dy, ease: 'power2.out', duration: 0.3 })`.
- On `mouseleave`, returns to `{ x: 0, y: 0, ease: 'elastic.out(1, 0.4)', duration: 0.6 }`.
- No-ops when `prefersReducedMotion()` returns `true`.
- Cleans up event listeners on unmount.

**Signature:**
```ts
function useMagnetic(ref: React.RefObject<HTMLElement>): void
```

**Applied to:** CV button (`HeroSection`), Send button (`Contact`), GitHub/LinkedIn icons (`Navbar`, `Footer`).

---

### `Navbar` (replaces `Header`)

**Path:** `src/components/Navbar/Navbar.jsx`

**Responsibilities:**
- On mount: GSAP timeline staggers logo + nav links from `{ y: -40, opacity: 0 }` → `{ y: 0, opacity: 1 }` over 600 ms total, stagger 80 ms.
- ScrollTrigger (scrub-less, toggle-based) watches scroll position; adds/removes `.scrolled` class at 80 px threshold. CSS handles `backdrop-filter: blur(12px)` transition.
- Nav link clicks call `lenis.scrollTo(anchor)` (via `useLenis`) instead of native hash navigation.
- Below 768 px: renders hamburger icon; click toggles `isOpen` state; GSAP animates mobile menu `height` from `0` → `auto` (using `gsap.set` + `gsap.to` with `height: 'auto'`) on open and reverse on close.
- Click-outside handled via `useClickOutside` hook.
- Social icons wrapped with `useMagnetic`.

**Props:** `{ githubLink, linkedinLink }` (unchanged from `Header`)

---

### `HeroSection` (replaces `About`)

**Path:** `src/pages/HeroSection/HeroSection.jsx`

**Responsibilities:**
- Entrance GSAP timeline (runs once on mount via `useGSAP`):
  - Targets: greeting `h1`, roles wrapper, description `p`, CV button.
  - From: `{ y: 60, opacity: 0 }`, stagger `0.12`, ease `power3.out`, total ~800 ms.
- Parallax: ScrollTrigger on the text container, `scrub: true`, translates `y` at 40% scroll speed.
- Renders `<React.Suspense>` wrapping lazy-loaded `<ParticleBackground>`.
- CV button wrapped with `useMagnetic` and `data-cursor-hover`.

**Props:** `{ aboutDescription, cvUrl }` (unchanged)

---

### `ParticleBackground`

**Path:** `src/components/ParticleBackground/ParticleBackground.jsx`

**Responsibilities:**
- Lazy-loaded via `React.lazy`.
- Initialises `@tsparticles/react` with a config that includes pointer-attract interactivity within 120 px radius.
- On init failure (WebGL/canvas unavailable), catches the error and sets a `fallback` state that applies a CSS animated gradient class to the hero wrapper via a callback prop.
- Positioned `absolute`, `z-index: 0`, behind all text content.

**Props:** `{ onInitError?: () => void }`

---

### `SectionReveal`

**Path:** `src/shared/SectionReveal/SectionReveal.jsx`

**Responsibilities:**
- Replaces `FadeSection` everywhere.
- Creates a ScrollTrigger on mount: `start: 'top 85%'`, `once: true`.
- On trigger: `gsap.from(ref.current, { opacity: 0, y: 50, duration: 0.7, ease: 'power3.out' })`.
- Passes `duration` through `animDuration('transform', 700)` to respect reduced motion.
- Kills ScrollTrigger on unmount.

**Props:** `{ children, className? }`

---

### `AnimatedTimeline`

**Path:** `src/components/AnimatedTimeline/AnimatedTimeline.jsx`

**Responsibilities:**
- Renders the vertical line as a `<div>` with `transform-origin: top`, initial `scaleY: 0`.
- ScrollTrigger: `scrub: true`, `start: 'top 80%'`, `end: 'bottom 20%'`, animates `scaleY` from `0` → `1`.
- Accepts `direction` prop (`'left' | 'right'`) to control which side cards enter from.
- Renders `children` (the card list) alongside the line.

**Props:** `{ children, direction: 'left' | 'right' }`

---

### `Experience` (updated)

**Path:** `src/pages/Experience/Experience.js`

**Changes:**
- Wraps card list in `AnimatedTimeline direction="left"`.
- Section title/description: `gsap.from({ opacity: 0, x: -60, duration: 0.6 })` via ScrollTrigger.
- Cards: `gsap.from(cardRefs, { opacity: 0, x: -80, stagger: 0.15, ease: 'power3.out' })` via ScrollTrigger batch.
- Each `ExperienceCard` gains `onMouseEnter`/`onMouseLeave` handlers that call `gsap.to(ref, { scale: 1.03 })` / `gsap.to(ref, { scale: 1 })` over 200 ms.

---

### `Education` (updated)

**Path:** `src/pages/Education/Education.js`

**Changes:**
- Wraps card list in `AnimatedTimeline direction="right"`.
- Section title/description: `gsap.from({ opacity: 0, x: 60, duration: 0.6 })` (enters from right).
- Cards: `gsap.from(cardRefs, { opacity: 0, x: 80, stagger: 0.15 })`.

---

### `Contact` (updated)

**Path:** `src/pages/Contact/Contact.jsx`

**Changes:**
- Section entrance: stagger `0.1` from `{ opacity: 0, y: 40 }` via ScrollTrigger.
- Each `TextField` gains `onFocus`/`onBlur` handlers:
  - Focus: `gsap.to(fieldRef, { borderColor: '#339ec0', duration: 0.25 })`.
  - Blur (empty): `gsap.to(fieldRef, { borderColor: '#b1b2b3', duration: 0.25 })`.
  - Blur (has value): retain accent color.
- Send button: on valid submit, `gsap.to(btnRef, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 })` before API call.
- On API error: `gsap.to(formRef, { x: 8, duration: 0.05, repeat: 7, yoyo: true, ease: 'none' })` + show inline error.
- Send button wrapped with `useMagnetic` and `data-cursor-hover`.

---

### `useReducedMotion` + `animDuration`

**Path:** `src/hooks/useReducedMotion.js` and `src/utils/animDuration.js`

```ts
// Returns true if user prefers reduced motion
function useReducedMotion(): boolean

// Returns appropriate duration in seconds for GSAP
// type: 'transform' | 'opacity'
// defaultMs: the full-motion duration in milliseconds
function animDuration(type: 'transform' | 'opacity', defaultMs: number): number
// When reduced motion: transform → 0, opacity → min(defaultMs, 150) / 1000
// When full motion: defaultMs / 1000
```

All GSAP `duration` values in the codebase are passed through `animDuration` rather than hardcoded.

---

## Data Models

No new data models are introduced. The existing Google Sheets API response shape is preserved:

```ts
interface SheetRow {
  Github: string;
  Linkedin: string;
  About: string;
  ExperienceTimeLineTitle: string;
  Email: string;
  cvUrl: string;
  Experience: string;       // JSON-encoded ExperienceItem[]
  EducationTitle: string;
  Education: string;        // JSON-encoded EducationItem[]
}

interface ExperienceItem {
  JobRole: string;
  companyName: string;
  startDate: string;
  endDate: string;
  Skills: string[];
  description: string;
}

interface EducationItem {
  college: string;
  degree: string;
  startDate: string;
  endDate: string;
}
```

### Animation Constants

Stored in `src/utils/animConstants.js` and imported wherever needed (not in the MUI theme, to avoid coupling):

```js
export const ANIM = {
  navbarStagger: 0.08,
  heroStagger: 0.12,
  sectionRevealDuration: 0.7,
  cardStagger: 0.15,
  contactStagger: 0.1,
  hoverScale: 1.03,
  cursorDotLag: 0.15,
  cursorRingLag: 0.08,
  magneticMaxFraction: 0.3,
  scrollThreshold: 80,
};
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Reduced-motion utility caps animation durations

*For any* animation type (`'transform'` or `'opacity'`) and any default duration value, when `prefersReducedMotion` is `true`, `animDuration('transform', n)` SHALL return `0` and `animDuration('opacity', n)` SHALL return at most `0.15` (150 ms in seconds).

**Validates: Requirements 4.4, 11.5**

---

### Property 2: Section reveal triggers for any section component

*For any* React component wrapped in `SectionReveal`, a ScrollTrigger SHALL be created with `start: 'top 85%'` and `once: true`, and the GSAP `from` config SHALL include `opacity: 0` and `y: 50`.

**Validates: Requirements 4.1, 4.3**

---

### Property 3: Card stagger animation covers all N cards

*For any* array of N experience or education cards (N ≥ 1), the GSAP stagger animation SHALL target all N card elements with `stagger: 0.15` and no card SHALL be omitted from the animation targets.

**Validates: Requirements 5.2, 6.2**

---

### Property 4: Contact form input focus/blur border animation for any field

*For any* of the four Contact form input fields, focusing the field SHALL trigger a GSAP tween to `borderColor: '#339ec0'` with `duration: 0.25`, and blurring an empty field SHALL trigger a GSAP tween back to `borderColor: '#b1b2b3'` with `duration: 0.25`.

**Validates: Requirements 7.2, 7.4**

---

### Property 5: Cursor ring hover round-trip for any interactive element

*For any* element with `data-cursor-hover` (anchors, buttons, magnetic elements), `mouseenter` SHALL trigger a GSAP tween on the cursor ring to `{ scale: 2, opacity: 0.5 }` and `mouseleave` SHALL trigger a tween back to `{ scale: 1, opacity: 1 }`, restoring the original state.

**Validates: Requirements 8.3, 8.4**

---

### Property 6: Magnetic translation capped at 30% for any pointer position

*For any* magnetic element with arbitrary dimensions and *any* pointer position within its bounding box, the computed `x` and `y` translation applied by `useMagnetic` SHALL satisfy `|dx| ≤ 0.3 × elementWidth` and `|dy| ≤ 0.3 × elementHeight`.

**Validates: Requirements 9.2, 9.3**

---

### Property 7: `will-change` is set before and cleared after every GSAP tween

*For any* GSAP tween created by the redesign, the target element SHALL have `will-change: transform, opacity` applied before the tween starts and the property SHALL be removed (set to `auto`) in the tween's `onComplete` callback.

**Validates: Requirements 11.3**

---

### Property 8: Fallback content renders for any API failure scenario

*For any* simulated Google Sheets API failure (network error, malformed JSON, empty response), all six sections (Navbar, HeroSection, Experience, Education, Contact, Footer) SHALL render with non-empty fallback strings and no uncaught JavaScript error SHALL be thrown.

**Validates: Requirements 12.2**

---

## Error Handling

| Scenario | Handling |
|---|---|
| Google Sheets API failure | `try/catch` in `Home.js` `useEffect`; state remains at initial empty strings; each component renders hardcoded fallback text |
| Particle canvas init failure | `onInitError` callback from `ParticleBackground` sets `heroFallback` state in `HeroSection`; CSS gradient class applied |
| GSAP tween on unmounted element | `useGSAP` context cleanup + explicit `ScrollTrigger.kill()` in `useEffect` return functions |
| Lenis not supported | `try/catch` around Lenis instantiation; falls back to native scroll (ScrollTrigger still works) |
| `gsap.quickTo` unavailable (old GSAP) | Guard with `typeof gsap.quickTo === 'function'`; fall back to `gsap.to` with short duration |
| Touch device cursor | `CustomCursor` returns `null` when `pointer: coarse` detected |
| Reduced motion | `animDuration` returns `0` for transforms; all GSAP calls still execute (no branching) so cleanup paths remain intact |

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

Focus on specific examples, edge cases, and error conditions:

- `animDuration` utility: full-motion and reduced-motion branches for both types.
- `useMagnetic`: translation computation for boundary pointer positions.
- `CustomCursor`: renders on mouse device, returns null on touch device and reduced-motion.
- `Navbar`: scroll threshold class toggle at 79 px and 81 px; hamburger open/close.
- `Contact`: focus/blur border color transitions; shake on API error; success reset.
- `HeroSection`: fallback gradient applied when `ParticleBackground` init fails.
- `Home`: API failure renders all sections with fallback strings.
- Anchor IDs: `#about`, `#experience`, `#education`, `#contacts` present in DOM.

### Property-Based Tests (fast-check, minimum 100 iterations each)

The property-based testing library chosen is **fast-check** (`npm install --save-dev fast-check`), which integrates cleanly with Jest.

Each test is tagged with a comment in the format:
`// Feature: portfolio-gsap-redesign, Property N: <property_text>`

**Property 1 — Reduced-motion duration capping**
```
// Feature: portfolio-gsap-redesign, Property 1: reduced-motion utility caps animation durations
fc.assert(fc.property(
  fc.constantFrom('transform', 'opacity'),
  fc.integer({ min: 0, max: 10000 }),
  (type, ms) => {
    mockReducedMotion(true);
    const result = animDuration(type, ms);
    if (type === 'transform') return result === 0;
    return result <= 0.15;
  }
), { numRuns: 100 });
```

**Property 2 — Section reveal ScrollTrigger config**
```
// Feature: portfolio-gsap-redesign, Property 2: section reveal triggers for any section component
fc.assert(fc.property(
  fc.record({ id: fc.string(), children: fc.constant(<div />) }),
  (props) => {
    const { scrollTriggerConfig } = renderSectionReveal(props);
    return scrollTriggerConfig.start === 'top 85%' &&
           scrollTriggerConfig.once === true &&
           scrollTriggerConfig.fromVars.opacity === 0 &&
           scrollTriggerConfig.fromVars.y === 50;
  }
), { numRuns: 100 });
```

**Property 3 — Card stagger covers all N cards**
```
// Feature: portfolio-gsap-redesign, Property 3: card stagger animation covers all N cards
fc.assert(fc.property(
  fc.array(fc.record({ JobRole: fc.string(), companyName: fc.string() }), { minLength: 1, maxLength: 20 }),
  (cards) => {
    const { gsapTargets, stagger } = renderExperienceWithCards(cards);
    return gsapTargets.length === cards.length && stagger === 0.15;
  }
), { numRuns: 100 });
```

**Property 4 — Contact form border animation for any field**
```
// Feature: portfolio-gsap-redesign, Property 4: contact form input focus/blur border animation for any field
fc.assert(fc.property(
  fc.constantFrom('email', 'name', 'subject', 'message'),
  fc.boolean(), // hasValue
  (fieldName, hasValue) => {
    const { focusTween, blurTween } = simulateFieldInteraction(fieldName, hasValue);
    const focusOk = focusTween.borderColor === '#339ec0' && focusTween.duration === 0.25;
    const blurOk = hasValue
      ? blurTween === null  // no tween when field has value
      : blurTween.borderColor === '#b1b2b3' && blurTween.duration === 0.25;
    return focusOk && blurOk;
  }
), { numRuns: 100 });
```

**Property 5 — Cursor ring hover round-trip**
```
// Feature: portfolio-gsap-redesign, Property 5: cursor ring hover round-trip for any interactive element
fc.assert(fc.property(
  fc.constantFrom('a', 'button', '[data-cursor-hover]'),
  (selector) => {
    const { afterEnter, afterLeave } = simulateCursorHover(selector);
    return afterEnter.scale === 2 && afterEnter.opacity === 0.5 &&
           afterLeave.scale === 1 && afterLeave.opacity === 1;
  }
), { numRuns: 100 });
```

**Property 6 — Magnetic translation capped at 30%**
```
// Feature: portfolio-gsap-redesign, Property 6: magnetic translation capped at 30%
fc.assert(fc.property(
  fc.record({
    width:  fc.integer({ min: 50, max: 400 }),
    height: fc.integer({ min: 20, max: 200 }),
    pointerX: fc.float({ min: 0, max: 1 }),  // fraction of width
    pointerY: fc.float({ min: 0, max: 1 }),  // fraction of height
  }),
  ({ width, height, pointerX, pointerY }) => {
    const { dx, dy } = computeMagneticTranslation(width, height, pointerX * width, pointerY * height);
    return Math.abs(dx) <= width * 0.3 && Math.abs(dy) <= height * 0.3;
  }
), { numRuns: 500 });
```

**Property 7 — will-change lifecycle**
```
// Feature: portfolio-gsap-redesign, Property 7: will-change set before and cleared after every GSAP tween
fc.assert(fc.property(
  fc.record({ duration: fc.float({ min: 0.1, max: 2 }), ease: fc.string() }),
  (tweenConfig) => {
    const el = document.createElement('div');
    const { willChangeBefore, willChangeAfter } = runTrackedTween(el, tweenConfig);
    return willChangeBefore === 'transform, opacity' && willChangeAfter === 'auto';
  }
), { numRuns: 100 });
```

**Property 8 — Fallback content on API failure**
```
// Feature: portfolio-gsap-redesign, Property 8: fallback content renders for any API failure scenario
fc.assert(fc.property(
  fc.oneof(
    fc.constant({ type: 'network' }),
    fc.constant({ type: 'malformed' }),
    fc.constant({ type: 'empty' }),
  ),
  (failureMode) => {
    mockApiFailure(failureMode);
    const { sections } = renderHome();
    return sections.every(s => s.textContent.trim().length > 0) && noUncaughtErrors();
  }
), { numRuns: 100 });
```

### Integration / Smoke Tests

- Lighthouse CI: Performance ≥ 80, Accessibility ≥ 90 (run in CI against production build).
- Manual: 60 FPS verification in Chrome DevTools Performance panel.
- Manual: particle pointer-attract interaction.
- Manual: keyboard tab order through all interactive elements.
