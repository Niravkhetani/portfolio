# Implementation Plan: portfolio-gsap-redesign

## Overview

Incrementally layer GSAP animations, Lenis smooth scroll, a custom cursor, magnetic elements, a scroll progress bar, and a particle hero background onto the existing React 18 portfolio. Each task builds on the previous one, ending with all components wired together. The existing Google Sheets data-fetching, MUI theming, and section anchor IDs are preserved throughout.

## Tasks

- [x] 1. Install dependencies and register GSAP plugins
  - Run `npm install gsap @gsap/react lenis @tsparticles/react @tsparticles/slim` and `npm install --save-dev fast-check`
  - In `src/App.js`, import `gsap`, `ScrollTrigger`, and `ScrollToPlugin` at module scope and call `gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)` before the component definition
  - Verify the existing `ThemeProvider` and `Home` render are untouched
  - _Requirements: 1.1, 1.2_

- [x] 2. Create animation utilities and constants
  - [x] 2.1 Create `src/utils/animConstants.js` exporting the `ANIM` object with all animation constants (`navbarStagger`, `heroStagger`, `sectionRevealDuration`, `cardStagger`, `contactStagger`, `hoverScale`, `cursorDotLag`, `cursorRingLag`, `magneticMaxFraction`, `scrollThreshold`)
    - _Requirements: 1.1, 11.3_

  - [x] 2.2 Create `src/hooks/useReducedMotion.js` that reads `window.matchMedia('(prefers-reduced-motion: reduce)')` and returns a boolean, updating on media query change
    - _Requirements: 4.4, 11.5_

  - [x] 2.3 Create `src/utils/animDuration.js` exporting `animDuration(type, defaultMs)` — returns `0` for `'transform'` when reduced motion is active, `min(defaultMs, 150) / 1000` for `'opacity'`, and `defaultMs / 1000` otherwise
    - _Requirements: 4.4, 11.5_

  - [x] 2.4 Write property test for `animDuration` (Property 1)
    - **Property 1: Reduced-motion utility caps animation durations**
    - **Validates: Requirements 4.4, 11.5**
    - Use `fast-check` with `fc.constantFrom('transform', 'opacity')` and `fc.integer({ min: 0, max: 10000 })` to assert transform returns `0` and opacity returns `≤ 0.15` when reduced motion is mocked true
    - Tag: `// Feature: portfolio-gsap-redesign, Property 1: reduced-motion utility caps animation durations`

- [x] 3. Implement `LenisProvider`
  - Create `src/shared/LenisProvider/LenisProvider.jsx` that instantiates `Lenis({ lerp: 0.1, smoothWheel: true })`, adds its `raf` callback to `gsap.ticker`, and destroys the instance on unmount
  - Export `LenisContext` and a `useLenis` hook that returns `{ lenis }`
  - Wrap the entire app in `LenisProvider` inside `App.js` (inside `ThemeProvider`, wrapping `Home`)
  - _Requirements: 1.3_

- [x] 4. Implement `ScrollProgressBar`
  - Create `src/components/ScrollProgressBar/ScrollProgressBar.jsx` — a `<div>` fixed at `top: 0`, full width, `3px` height, background `#339ec0`, `transform-origin: left`
  - On mount, create a ScrollTrigger that drives `scaleX` from `0` → `1` across the full document height with `scrub: true`; kill it on unmount
  - Render `<ScrollProgressBar />` inside `App.js` (sibling of `Home`, inside `LenisProvider`)
  - _Requirements: 10.1, 10.2, 10.3_

- [x] 5. Implement `SectionReveal` wrapper
  - Create `src/shared/SectionReveal/SectionReveal.jsx` accepting `{ children, className }`
  - On mount, create a ScrollTrigger with `start: 'top 85%'`, `once: true`; on trigger call `gsap.from(ref.current, { opacity: 0, y: 50, duration: animDuration('transform', 700), ease: 'power3.out' })`; set `will-change: transform, opacity` before the tween and remove it in `onComplete`; kill ScrollTrigger on unmount
  - _Requirements: 4.1, 4.2, 4.3, 11.3_

  - [x] 5.1 Write property test for `SectionReveal` ScrollTrigger config (Property 2)
    - **Property 2: Section reveal triggers for any section component**
    - **Validates: Requirements 4.1, 4.3**
    - Use `fast-check` to assert that for any rendered `SectionReveal`, the captured ScrollTrigger config has `start: 'top 85%'`, `once: true`, and the `from` vars include `opacity: 0` and `y: 50`
    - Tag: `// Feature: portfolio-gsap-redesign, Property 2: section reveal triggers for any section component`

- [x] 6. Implement `Navbar` (replaces `Header`)
  - Create `src/components/Navbar/Navbar.jsx` with the same `{ githubLink, linkedinLink }` props as `Header`
  - On mount, run a GSAP timeline staggering logo + nav links from `{ y: -40, opacity: 0 }` → `{ y: 0, opacity: 1 }` over 600 ms total, stagger `ANIM.navbarStagger`
  - Add a toggle-based ScrollTrigger that adds/removes a `.scrolled` CSS class at `ANIM.scrollThreshold` (80 px); CSS handles `backdrop-filter: blur(12px)` transition
  - Nav link clicks call `lenis.scrollTo(anchor)` via `useLenis` instead of native hash navigation
  - Below 768 px: render a hamburger icon; toggle `isOpen` state; animate mobile menu `height` from `0` → `auto` on open and reverse on close using GSAP
  - Implement a `useClickOutside` hook in `src/hooks/useClickOutside.js` and use it to close the mobile menu
  - Wrap GitHub and LinkedIn icon anchors with `useMagnetic` (implemented in task 9) and add `data-cursor-hover` attribute
  - Update `Home.js` to import `Navbar` instead of `Header`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 12.3_

- [x] 7. Implement `HeroSection` (replaces `About`)
  - Create `src/pages/HeroSection/HeroSection.jsx` with the same `{ aboutDescription, cvUrl }` props as `About`
  - Preserve the existing greeting `h1`, `TypeAnimation` roles block (sequence and accent color `#339ec0` unchanged), description `p`, and CV button; keep `id="about"`
  - On mount via `useGSAP`, run an entrance timeline: targets greeting, roles wrapper, description, CV button from `{ y: 60, opacity: 0 }`, stagger `ANIM.heroStagger`, ease `power3.out`, total ~800 ms; pass durations through `animDuration`
  - Add a ScrollTrigger parallax on the text container: `scrub: true`, translates `y` at 40% scroll speed
  - Lazy-load `ParticleBackground` (task 8) via `React.lazy` inside `React.Suspense`; pass `onInitError` callback that sets `heroFallback` state and applies a CSS gradient class to the hero wrapper
  - Wrap CV button with `useMagnetic` (task 9) and add `data-cursor-hover`
  - Update `Home.js` to import `HeroSection` instead of `About`
  - _Requirements: 3.1, 3.4, 3.5, 3.6, 12.3_

- [x] 8. Implement `ParticleBackground`
  - Create `src/components/ParticleBackground/ParticleBackground.jsx` accepting `{ onInitError }`
  - Initialise `@tsparticles/react` with a config including pointer-attract interactivity within 120 px radius
  - Position the canvas `absolute`, `z-index: 0`, behind all text content
  - Wrap initialisation in `try/catch`; on failure call `onInitError?.()` without throwing
  - _Requirements: 3.2, 3.3, 3.5, 11.4_

- [x] 9. Implement `useMagnetic` hook
  - Create `src/hooks/useMagnetic.js` accepting a `ref`
  - On `mousemove` within the element's bounding rect, compute `dx`/`dy` as a fraction of element dimensions capped at `±ANIM.magneticMaxFraction` (30%) and call `gsap.to(ref.current, { x: dx, y: dy, ease: 'power2.out', duration: 0.3 })`
  - On `mouseleave`, return to `{ x: 0, y: 0, ease: 'elastic.out(1, 0.4)', duration: 0.6 }`
  - No-op when `prefersReducedMotion()` returns `true`; clean up event listeners on unmount
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 9.1 Write property test for magnetic translation cap (Property 6)
    - **Property 6: Magnetic translation capped at 30% for any pointer position**
    - **Validates: Requirements 9.2, 9.3**
    - Export a pure `computeMagneticTranslation(width, height, pointerX, pointerY)` helper from `useMagnetic.js`
    - Use `fast-check` with `fc.record({ width, height, pointerX, pointerY })` (500 runs) to assert `|dx| ≤ width * 0.3` and `|dy| ≤ height * 0.3`
    - Tag: `// Feature: portfolio-gsap-redesign, Property 6: magnetic translation capped at 30% for any pointer position`

- [x] 10. Implement `CustomCursor`
  - Create `src/components/CustomCursor/CustomCursor.jsx`
  - Return `null` when `window.matchMedia('(pointer: coarse)').matches` or `prefersReducedMotion()` is true
  - Otherwise render two `<div>` elements (dot 8 px, ring 32 px) via `ReactDOM.createPortal` into `document.body`
  - Use `gsap.quickTo` (with fallback to `gsap.to` if unavailable) for `x`/`y` on each element with lags `ANIM.cursorDotLag` and `ANIM.cursorRingLag`
  - Listen to `mousemove` on `window`; update quickTo targets
  - Add global `mouseenter`/`mouseleave` listeners on `[data-cursor-hover]` elements: enter → `gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.2 })`, leave → `gsap.to(ring, { scale: 1, opacity: 1, duration: 0.2 })`
  - Render `<CustomCursor />` inside `App.js` (sibling of `ScrollProgressBar`, inside `LenisProvider`)
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [x] 10.1 Write property test for cursor ring hover round-trip (Property 5)
    - **Property 5: Cursor ring hover round-trip for any interactive element**
    - **Validates: Requirements 8.3, 8.4**
    - Use `fast-check` with `fc.constantFrom('a', 'button', '[data-cursor-hover]')` to assert `afterEnter.scale === 2 && afterEnter.opacity === 0.5` and `afterLeave.scale === 1 && afterLeave.opacity === 1`
    - Tag: `// Feature: portfolio-gsap-redesign, Property 5: cursor ring hover round-trip for any interactive element`

- [x] 11. Implement `AnimatedTimeline`
  - Create `src/components/AnimatedTimeline/AnimatedTimeline.jsx` accepting `{ children, direction: 'left' | 'right' }`
  - Render the vertical line as a `<div>` with `transform-origin: top`, initial `scaleY: 0`
  - On mount, create a ScrollTrigger with `scrub: true`, `start: 'top 80%'`, `end: 'bottom 20%'` that animates `scaleY` from `0` → `1`; kill on unmount
  - Render `children` alongside the line
  - _Requirements: 5.3, 6.3_

- [x] 12. Update `Experience` with GSAP animations
  - In `src/pages/Experience/Experience.js`, remove the `FadeSection` wrapper and the `@mui/lab` Timeline imports
  - Wrap the card list in `<AnimatedTimeline direction="left">`
  - Animate section title/description on scroll: `gsap.from({ opacity: 0, x: -60, duration: animDuration('transform', 600) })` via ScrollTrigger
  - Collect card refs and animate with `gsap.from(cardRefs, { opacity: 0, x: -80, stagger: ANIM.cardStagger, ease: 'power3.out' })` via ScrollTrigger batch; set `will-change` before and clear in `onComplete`
  - Add `onMouseEnter`/`onMouseLeave` handlers on each `ExperienceCard` ref: enter → `gsap.to(ref, { scale: ANIM.hoverScale, duration: 0.2 })`, leave → `gsap.to(ref, { scale: 1, duration: 0.2 })`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 11.3_

  - [x] 12.1 Write property test for card stagger covers all N cards (Property 3)
    - **Property 3: Card stagger animation covers all N cards**
    - **Validates: Requirements 5.2, 6.2**
    - Export a `getStaggerTargets(cards)` helper that returns the array of refs passed to GSAP
    - Use `fast-check` with `fc.array(fc.record({ JobRole: fc.string(), companyName: fc.string() }), { minLength: 1, maxLength: 20 })` to assert `gsapTargets.length === cards.length && stagger === 0.15`
    - Tag: `// Feature: portfolio-gsap-redesign, Property 3: card stagger animation covers all N cards`

- [x] 13. Update `Education` with GSAP animations
  - In `src/pages/Education/Education.js`, wrap the card list in `<AnimatedTimeline direction="right">`
  - Animate section title/description: `gsap.from({ opacity: 0, x: 60, duration: animDuration('transform', 600) })` via ScrollTrigger (enters from right)
  - Collect card refs and animate with `gsap.from(cardRefs, { opacity: 0, x: 80, stagger: ANIM.cardStagger })` via ScrollTrigger batch; set `will-change` before and clear in `onComplete`
  - _Requirements: 6.1, 6.2, 6.3, 11.3_

- [x] 14. Update `Contact` with GSAP animations
  - In `src/pages/Contact/Contact.jsx`, add a ScrollTrigger entrance that staggers title, description, and each field from `{ opacity: 0, y: 40 }` with `ANIM.contactStagger`
  - Add `onFocus`/`onBlur` handlers to each `TextField` using refs: focus → `gsap.to(fieldRef, { borderColor: '#339ec0', duration: 0.25 })`, blur-empty → `gsap.to(fieldRef, { borderColor: '#b1b2b3', duration: 0.25 })`, blur-with-value → retain accent color
  - On valid submit, animate the Send button: `gsap.to(btnRef, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 })` before the API call
  - On API error, set inline error state and animate: `gsap.to(formRef, { x: 8, duration: 0.05, repeat: 7, yoyo: true, ease: 'none' })`
  - On API success, display success message and reset all fields
  - Wrap Send button with `useMagnetic` and add `data-cursor-hover`
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [x] 14.1 Write property test for contact form border animation (Property 4)
    - **Property 4: Contact form input focus/blur border animation for any field**
    - **Validates: Requirements 7.2, 7.4**
    - Use `fast-check` with `fc.constantFrom('email', 'name', 'subject', 'message')` and `fc.boolean()` (hasValue) to assert focus tween targets `borderColor: '#339ec0'` with `duration: 0.25`, and blur-empty tween targets `borderColor: '#b1b2b3'` with `duration: 0.25`
    - Tag: `// Feature: portfolio-gsap-redesign, Property 4: contact form input focus/blur border animation for any field`

- [x] 15. Update `Footer` with magnetic social icons
  - In `src/components/Footer/Footer.js`, wrap GitHub and LinkedIn icon anchors with `useMagnetic` and add `data-cursor-hover`
  - _Requirements: 9.1_

- [x] 16. Update `Home.js` to use `SectionReveal` and wire all new components
  - Replace the single `FadeSection` wrapper with individual `<SectionReveal>` wrappers around `Experience`, `Education`, `Contact`, and `Footer`
  - Ensure `HeroSection` and `Navbar` are imported in place of `About` and `Header`
  - Wrap the `try/catch` in `fetchResponse` to ensure all state variables retain their initial empty-string/array fallbacks on API failure
  - Verify all anchor IDs (`#about`, `#experience`, `#education`, `#contacts`) are present in the rendered DOM
  - _Requirements: 4.2, 12.1, 12.2, 12.3, 12.4_

- [x] 17. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 18. Write `will-change` lifecycle property test (Property 7)
  - [x] 18.1 Write property test for `will-change` set before and cleared after every GSAP tween (Property 7)
    - **Property 7: `will-change` is set before and cleared after every GSAP tween**
    - **Validates: Requirements 11.3**
    - Create a `runTrackedTween(el, tweenConfig)` test helper that wraps a GSAP tween and captures `will-change` before start and in `onComplete`
    - Use `fast-check` with `fc.record({ duration: fc.float({ min: 0.1, max: 2 }), ease: fc.string() })` to assert `willChangeBefore === 'transform, opacity'` and `willChangeAfter === 'auto'`
    - Tag: `// Feature: portfolio-gsap-redesign, Property 7: will-change set before and cleared after every GSAP tween`

- [x] 19. Write API fallback property test (Property 8)
  - [x] 19.1 Write property test for fallback content on any API failure scenario (Property 8)
    - **Property 8: Fallback content renders for any API failure scenario**
    - **Validates: Requirements 12.2**
    - Mock `axios` to simulate `network`, `malformed`, and `empty` failure modes
    - Use `fast-check` with `fc.oneof(fc.constant({ type: 'network' }), fc.constant({ type: 'malformed' }), fc.constant({ type: 'empty' }))` to assert all six sections render non-empty text and no uncaught errors are thrown
    - Tag: `// Feature: portfolio-gsap-redesign, Property 8: fallback content renders for any API failure scenario`

- [x] 20. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties defined in the design document
- Unit tests validate specific examples and edge cases
- All GSAP `duration` values must be passed through `animDuration` — never hardcoded
- `will-change` must be set before each tween and cleared in `onComplete` (Requirement 11.3)
- The existing Google Sheets data-fetching, MUI ThemeProvider, and anchor IDs must remain intact throughout
