# Scroll Animations & Parallax — Design Spec

## Summary

Add scroll-triggered animations, parallax effects, and text reveals to Pixels Studio to elevate it to Awwwards-level quality. The approach is subtle and refined — matching the site's existing restrained, typographic aesthetic. Uses GSAP + ScrollTrigger with a centralized animation controller.

## Decisions

- **Animation style:** Subtle & refined (Linear/Stripe tier, not Locomotive/Rejouice)
- **Library:** GSAP + ScrollTrigger (~30KB gzipped)
- **Architecture:** Centralized controller with data attributes (not per-component scripts)
- **Parallax style:** Vertical translate at slower-than-scroll rate (no scale)
- **Motion hierarchy:** Hero (cinematic) > Case Studies (parallax + reveals) > Playground (marquee parallax) > About/Contact (light fades)

## Architecture

### Centralized Controller

A single `src/components/ScrollAnimations.astro` component is added to `Layout.astro`. It imports GSAP + ScrollTrigger and registers animations by querying data attributes on the page.

### Data Attributes

| Attribute | Effect | Used On |
|-----------|--------|---------|
| `data-reveal` | Fade up + translateY on scroll enter | Text blocks, cards, images |
| `data-reveal-stagger` | Staggered children fade up | Feature grids, logo rows, card groups |
| `data-parallax` | Vertical translate at slower-than-scroll rate | Case study images, playground marquee |
| `data-split-text` | Word-level reveal animation | Hero heading, section titles |
| `data-fade` | Simple opacity fade-in | Footer, lighter elements |

### Global Motion Tokens

- **Easing:** `power3.out` (smooth deceleration)
- **Reveal duration:** `0.8s`
- **Hero entrance duration:** `1.2s`
- **Stagger interval:** `0.05s` between children
- **Split text stagger:** `0.04s` per word
- **Parallax default speed:** `0.15` (15% slower than scroll), configurable via `data-speed`
- **Scroll trigger start:** `top 85%` (element 85% down viewport)

### Lenis + GSAP Sync

The Lenis script in `Layout.astro` exposes the instance globally via `window.lenis`. The animation controller syncs them by:
1. Connecting Lenis scroll events to ScrollTrigger updates: `lenis.on('scroll', ScrollTrigger.update)`
2. Adding Lenis RAF to GSAP's ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
3. Disabling Lenis's own RAF loop (since GSAP's ticker drives it): `lagSmoothing(0)`

## Section-by-Section Behavior

### Hero (Lead) — Cinematic Page-Load Entrance

This is a page-load animation, not scroll-triggered. Fires once on `DOMContentLoaded` after a 0.2s delay.

**Timeline sequence:**
1. **Heading** (`data-split-text`) — Words reveal one by one with upward translate + fade. Stagger: `0.04s/word`. Duration: `1.2s`.
2. **Subtext paragraph** (`data-reveal`) — Fades up 0.3s after heading completes.
3. **Feature cards** (`data-reveal-stagger`) — Each card fades up with `0.05s` stagger. Starts 0.2s after subtext.
4. **CTA button** (`data-reveal`) — Last to appear.

**Initial state:** All hero animated elements start with `opacity: 0; transform: translateY(30px)` via CSS to prevent flash of unstyled content before JS loads.

### Case Studies (Origon, Tribe Communication, Tribe Document, Samespace, Tlkn)

All case studies follow the same consistent motion pattern:

- **Images:** `data-parallax data-speed="0.15"` — Image container has `overflow: hidden` with extra vertical space. Image translates vertically at 15% slower than scroll. ScrollTrigger scrubs position continuously (tied to scroll, not one-time).
- **Section headings:** `data-split-text` — Words reveal with staggered fade-up on viewport enter.
- **Body text, metadata, tags:** `data-reveal` — Opacity 0→1 + translateY 20px→0.
- **Divider lines:** `data-reveal` — Subtle fade-in.

### Playground

- **Marquee container:** `data-parallax data-speed="0.2"` — Slightly stronger parallax than case studies. Vertical shift only; existing CSS marquee animation (40s infinite, pause on hover) is untouched.
- **Section title:** `data-split-text` — Word reveal on scroll.
- **Subtitle:** `data-reveal` — Simple fade up.

### About

- **Portrait image:** `data-reveal` — Fade up on scroll.
- **Bio heading + paragraph:** `data-reveal` — Slight stagger between them.
- No parallax or split text.

### Contact

- **Testimonial cards:** `data-reveal-stagger` — Cards fade up sequentially.
- **Client logos:** `data-reveal-stagger` — Logos stagger in.
- **Email/social links:** `data-reveal` — Simple fade up.
- **"Say Hello" heading:** `data-split-text` — Typographic flair as a closer.

### FooterLogo

- `data-fade` — Simple opacity transition on viewport enter.

## Files

### New File

- `src/components/ScrollAnimations.astro` — Centralized animation controller:
  - GSAP + ScrollTrigger registration
  - Lenis <-> ScrollTrigger sync
  - All animation registrations (reveal, stagger, parallax, split-text, fade)
  - CSS for initial hidden states

### Modified Files

- `Layout.astro` — Add `ScrollAnimations.astro` import, expose Lenis instance globally
- `Lead.astro` — Add data attributes to heading, text, cards, CTA
- `Origon.astro` — Add `data-parallax` to images, `data-split-text` to heading, `data-reveal` to text
- `TribeCommunicationApp.astro` — Same pattern as Origon
- `TribeDocumentManagement.astro` — Same pattern as Origon
- `Samespace.astro` — Same pattern as Origon
- `Tlkn.astro` — Same pattern as Origon
- `Playground.astro` — Add `data-parallax` to marquee, `data-split-text` to title, `data-reveal` to subtitle
- `About.astro` — Add `data-reveal` to elements
- `Contact.astro` — Add `data-reveal-stagger` to card/logo groups, `data-split-text` to heading
- `FooterLogo.astro` — Add `data-fade`

### No Files Deleted

Existing CSS animations (marquee, blink, scramble) are untouched.

### New Dependency

- `gsap` (includes ScrollTrigger plugin)

## Performance

- All ScrollTrigger instances use `lazy: true` — only calculates when near viewport
- Parallax uses `will-change: transform` for GPU compositing
- Split text creates `<span>` wrappers at init time, not on every frame
- Existing Lenis RAF loop is reused, not duplicated
