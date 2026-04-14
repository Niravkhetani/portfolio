# Requirements Document

## Introduction

This feature is a complete visual and interaction redesign of an existing React 18 portfolio website. The current site uses Material UI v5, a basic IntersectionObserver fade-in, and react-type-animation. The redesign introduces GSAP (GreenSock Animation Platform) as the primary animation engine alongside complementary libraries (e.g. Lenis for smooth scrolling, Three.js or tsParticles for background effects) to deliver a modern, highly interactive, and visually stunning single-page portfolio. All existing data-fetching from the Google Sheets API and the existing section structure (Header, About, Experience, Education, Contact, Footer) are preserved. The dark teal/cyan color palette (`#042530` primary, `#339ec0` accent) is retained and extended.

---

## Glossary

- **Portfolio_App**: The React 18 single-page application being redesigned.
- **GSAP**: GreenSock Animation Platform — the primary JavaScript animation library used for timeline-based and scroll-triggered animations.
- **ScrollTrigger**: The official GSAP plugin that ties animation playback to scroll position.
- **Lenis**: A lightweight smooth-scroll library that normalizes scroll velocity across browsers and integrates with GSAP's ticker.
- **Particle_Background**: A canvas-based animated particle or mesh effect rendered behind the Hero section.
- **Hero_Section**: The About/landing section containing the greeting, TypeAnimation roles, and CV download button.
- **Navbar**: The sticky top navigation bar containing the logo, section links, and social icons.
- **Timeline_Section**: Either the Experience or Education section rendered as a vertical animated timeline.
- **Experience_Card**: A card component displaying job role, company, duration, skills, and description.
- **Contact_Form**: The form section containing email, name, subject, and message fields plus a send button.
- **Cursor**: A custom animated cursor element that replaces or augments the default browser cursor on pointer devices.
- **Section_Reveal**: A GSAP ScrollTrigger-driven entrance animation applied to each page section as it enters the viewport.
- **Stagger_Animation**: A GSAP animation where child elements animate in sequence with a configurable delay between each.
- **Magnetic_Element**: A UI element that subtly moves toward the pointer when the pointer is nearby, creating a magnetic pull effect.
- **Reduced_Motion**: The `prefers-reduced-motion` CSS media query and its corresponding user preference for minimal animation.
- **Google_Sheets_API**: The external data source providing dynamic content (links, about text, experience, education, email).
- **FPS**: Frames per second — a measure of animation smoothness; target is 60 FPS on modern hardware.

---

## Requirements

### Requirement 1: GSAP Core Integration

**User Story:** As a developer, I want GSAP and its essential plugins registered globally, so that all animation code across the Portfolio_App can use a single, consistent animation engine.

#### Acceptance Criteria

1. THE Portfolio_App SHALL install and register `gsap`, `ScrollTrigger`, and `ScrollToPlugin` as peer dependencies available to all components.
2. WHEN the Portfolio_App mounts, THE Portfolio_App SHALL register `ScrollTrigger` and `ScrollToPlugin` with `gsap.registerPlugin()` exactly once.
3. THE Portfolio_App SHALL integrate Lenis smooth scroll and connect its `raf` loop to GSAP's ticker so that ScrollTrigger scroll positions remain accurate.
4. IF a GSAP animation targets a DOM element that has been unmounted, THEN THE Portfolio_App SHALL kill the associated ScrollTrigger instance to prevent memory leaks.
5. WHILE the Portfolio_App is running, THE Portfolio_App SHALL maintain animation rendering at a minimum of 60 FPS on a device with a modern mid-range GPU under normal load.

---

### Requirement 2: Animated Navbar

**User Story:** As a visitor, I want the navigation bar to animate in on page load and respond to scroll, so that the site feels polished from the first moment.

#### Acceptance Criteria

1. WHEN the page first loads, THE Navbar SHALL animate its logo and navigation links into view using a GSAP stagger from `y: -40, opacity: 0` to `y: 0, opacity: 1` over 600 ms.
2. WHEN the visitor scrolls down more than 80 px from the top, THE Navbar SHALL transition its background from fully transparent to a semi-transparent frosted-glass style (`backdrop-filter: blur`) within 300 ms.
3. WHEN the visitor scrolls back to within 80 px of the top, THE Navbar SHALL transition its background back to fully transparent within 300 ms.
4. WHEN a visitor clicks a navigation link, THE Portfolio_App SHALL use GSAP `ScrollToPlugin` to smoothly scroll to the target section anchor.
5. WHERE the device viewport width is less than 768 px, THE Navbar SHALL render a hamburger menu icon that, WHEN clicked, reveals the navigation links with a GSAP slide-down animation.
6. WHEN the hamburger menu is open and the visitor clicks outside the menu, THE Navbar SHALL close the menu with a GSAP slide-up animation.

---

### Requirement 3: Hero Section — Entrance and Particle Background

**User Story:** As a visitor, I want the Hero section to make a strong first impression with layered entrance animations and an animated background, so that the portfolio immediately communicates creativity and technical skill.

#### Acceptance Criteria

1. WHEN the Hero_Section mounts, THE Hero_Section SHALL animate the greeting text, TypeAnimation roles block, about description, and CV button in sequence using a GSAP timeline with a stagger of 120 ms between each element, starting from `y: 60, opacity: 0`.
2. THE Hero_Section SHALL render a Particle_Background on a `<canvas>` element positioned behind all text content using either tsParticles or a custom Three.js scene.
3. WHEN the visitor moves the pointer over the Hero_Section, THE Particle_Background SHALL respond to pointer position by attracting nearby particles within a 120 px radius.
4. WHEN the visitor scrolls past the Hero_Section, THE Hero_Section SHALL apply a GSAP ScrollTrigger parallax effect that translates the text content upward at 40% of the scroll speed.
5. IF the Particle_Background canvas fails to initialize (e.g. WebGL not supported), THEN THE Hero_Section SHALL fall back to a CSS animated gradient background without throwing a JavaScript error.
6. THE TypeAnimation component SHALL retain its existing role sequence (`Software Developer`, `Backend Developer`, `Programmer`, `Student`) with the accent color `#339ec0`.

---

### Requirement 4: Section Reveal Animations

**User Story:** As a visitor, I want each section to animate into view as I scroll, so that the page feels dynamic and engaging throughout.

#### Acceptance Criteria

1. WHEN a section's top edge enters the viewport by 15%, THE Section_Reveal SHALL trigger a GSAP animation that transitions the section from `opacity: 0, y: 50` to `opacity: 1, y: 0` over 700 ms with an `ease: "power3.out"` easing.
2. THE Portfolio_App SHALL replace the existing `FadeSection` IntersectionObserver wrapper with ScrollTrigger-driven Section_Reveal for all sections (Experience, Education, Contact, Footer).
3. WHEN a Section_Reveal animation has completed once, THE Portfolio_App SHALL not replay the animation if the visitor scrolls back up and then down again.
4. WHERE the visitor has enabled Reduced_Motion, THE Portfolio_App SHALL skip all translate and scale transforms and reduce opacity transitions to a maximum duration of 150 ms.

---

### Requirement 5: Experience Timeline Animation

**User Story:** As a visitor, I want the Experience timeline to animate each card in as I scroll, so that the work history feels like a story unfolding.

#### Acceptance Criteria

1. WHEN the Experience Timeline_Section enters the viewport, THE Timeline_Section SHALL animate the section title and description from `opacity: 0, x: -60` to `opacity: 1, x: 0` over 600 ms.
2. WHEN each Experience_Card enters the viewport, THE Experience_Card SHALL animate from `opacity: 0, x: -80` to `opacity: 1, x: 0` with a stagger of 150 ms between consecutive cards.
3. THE Timeline_Section SHALL render a vertical line that draws itself downward using a GSAP ScrollTrigger `scaleY` animation from `0` to `1` as the visitor scrolls through the section.
4. WHEN the visitor hovers over an Experience_Card, THE Experience_Card SHALL scale to `1.03` and elevate its box-shadow over 200 ms using a GSAP hover tween.
5. WHEN the visitor moves the pointer away from an Experience_Card, THE Experience_Card SHALL return to `scale: 1` and its default box-shadow over 200 ms.

---

### Requirement 6: Education Timeline Animation

**User Story:** As a visitor, I want the Education timeline to mirror the visual quality of the Experience section, so that the portfolio feels consistent.

#### Acceptance Criteria

1. WHEN the Education Timeline_Section enters the viewport, THE Timeline_Section SHALL animate the section title and description from `opacity: 0, x: 60` to `opacity: 1, x: 0` over 600 ms (entering from the right, opposite to Experience).
2. WHEN each education card enters the viewport, THE Timeline_Section SHALL animate each card from `opacity: 0, x: 80` to `opacity: 1, x: 0` with a stagger of 150 ms between consecutive cards.
3. THE Education Timeline_Section SHALL share the same vertical-line draw animation behavior defined in Requirement 5, Criterion 3.

---

### Requirement 7: Contact Form Interactions

**User Story:** As a visitor, I want the Contact section to feel interactive and responsive, so that reaching out feels inviting rather than transactional.

#### Acceptance Criteria

1. WHEN the Contact_Form enters the viewport, THE Contact_Form SHALL animate its title, description, and each input field in sequence using a GSAP stagger of 100 ms from `opacity: 0, y: 40`.
2. WHEN a visitor focuses on a Contact_Form input field, THE Contact_Form SHALL animate the field's border color from the default `#b1b2b3` to the accent `#339ec0` over 250 ms using a GSAP tween.
3. WHEN a visitor blurs a Contact_Form input field that contains text, THE Contact_Form SHALL retain the accent border color.
4. WHEN a visitor blurs a Contact_Form input field that is empty, THE Contact_Form SHALL animate the border color back to `#b1b2b3` over 250 ms.
5. WHEN the visitor clicks the Send button and all four fields (email, name, subject, message) are non-empty, THE Contact_Form SHALL animate the button with a brief GSAP pulse (`scale: 1.08` then back to `1`) before submitting.
6. IF the API call to the node server fails, THEN THE Contact_Form SHALL display an inline error message with a GSAP shake animation (`x` oscillation of ±8 px over 400 ms).
7. WHEN the API call succeeds, THE Contact_Form SHALL display a success confirmation message and reset all fields to empty strings.

---

### Requirement 8: Custom Animated Cursor

**User Story:** As a visitor on a desktop device, I want a custom cursor that reacts to interactive elements, so that the site feels premium and unique.

#### Acceptance Criteria

1. THE Portfolio_App SHALL render a custom Cursor element consisting of a small filled dot (8 px diameter) and a larger hollow ring (32 px diameter) that follow the pointer position using GSAP `quickTo` for low-latency tracking.
2. WHEN the visitor moves the pointer, THE Cursor dot SHALL update its position with a lag factor of `0.15` and the ring SHALL update with a lag factor of `0.08` to create a trailing effect.
3. WHEN the visitor hovers over any anchor, button, or Magnetic_Element, THE Cursor ring SHALL scale to `2.0` and reduce opacity to `0.5` over 200 ms.
4. WHEN the visitor moves the pointer away from an interactive element, THE Cursor ring SHALL return to `scale: 1, opacity: 1` over 200 ms.
5. WHERE the device is a touch device (no pointer of type `mouse`), THE Portfolio_App SHALL not render the Cursor element.
6. WHERE the visitor has enabled Reduced_Motion, THE Portfolio_App SHALL hide the Cursor element and restore the default browser cursor.

---

### Requirement 9: Magnetic Interactive Elements

**User Story:** As a visitor, I want certain buttons and social icons to feel magnetic when I hover near them, so that the interactions feel tactile and memorable.

#### Acceptance Criteria

1. THE Portfolio_App SHALL apply Magnetic_Element behavior to the CV download button, the Send button, and all social icon links (GitHub, LinkedIn) in the Navbar and Footer.
2. WHEN the visitor's pointer enters the bounding box of a Magnetic_Element, THE Magnetic_Element SHALL translate toward the pointer by up to 30% of its own width/height using a GSAP tween with `ease: "power2.out"`.
3. WHEN the visitor's pointer leaves the bounding box of a Magnetic_Element, THE Magnetic_Element SHALL return to its original position using a GSAP tween with `ease: "elastic.out(1, 0.4)"` over 600 ms.
4. WHERE the visitor has enabled Reduced_Motion, THE Portfolio_App SHALL disable Magnetic_Element translations and leave elements in their default positions.

---

### Requirement 10: Scroll Progress Indicator

**User Story:** As a visitor, I want a visual indicator of how far I have scrolled through the page, so that I can orient myself within the portfolio.

#### Acceptance Criteria

1. THE Portfolio_App SHALL render a fixed scroll progress bar at the top of the viewport, spanning the full viewport width.
2. WHEN the visitor scrolls, THE Portfolio_App SHALL update the progress bar's `scaleX` transform (from `0` to `1`) in real time using a GSAP ScrollTrigger linked to the full document height.
3. THE progress bar SHALL use the accent color `#339ec0` and have a height of 3 px.

---

### Requirement 11: Performance and Accessibility

**User Story:** As a visitor, I want the animated portfolio to load quickly and remain accessible, so that the experience is inclusive and does not penalize users on slower connections.

#### Acceptance Criteria

1. THE Portfolio_App SHALL achieve a Lighthouse Performance score of 80 or above on a simulated mid-tier mobile device (Moto G4 equivalent throttling).
2. THE Portfolio_App SHALL achieve a Lighthouse Accessibility score of 90 or above.
3. WHEN GSAP animations are active, THE Portfolio_App SHALL use `will-change: transform, opacity` only on elements currently being animated and remove the property after the animation completes.
4. THE Portfolio_App SHALL lazy-load the Particle_Background canvas module so that it does not block the initial page render.
5. WHERE the visitor has enabled Reduced_Motion, THE Portfolio_App SHALL pass all GSAP durations through a utility that returns `0` for transforms and a maximum of `150` ms for opacity-only transitions.
6. THE Portfolio_App SHALL preserve all existing keyboard navigation and focus management behaviors present before the redesign.

---

### Requirement 12: Data Integrity and Backward Compatibility

**User Story:** As a developer, I want the redesign to preserve all existing data-fetching and section content, so that no dynamic content is lost during the visual overhaul.

#### Acceptance Criteria

1. THE Portfolio_App SHALL continue to fetch all dynamic data (GitHub link, LinkedIn link, about text, experience list, education list, BCC email, CV URL) from the Google_Sheets_API on mount.
2. IF the Google_Sheets_API request fails, THEN THE Portfolio_App SHALL render each section with its existing hardcoded fallback strings without throwing a JavaScript error.
3. THE Portfolio_App SHALL preserve the existing section anchor IDs (`#about`, `#experience`, `#education`, `#contacts`) so that existing external links remain valid.
4. THE Portfolio_App SHALL retain the existing MUI ThemeProvider and color palette as the design token source, extending it with GSAP animation constants rather than replacing it.
