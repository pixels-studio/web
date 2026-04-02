# Astro to SvelteKit Migration — Design Spec

## Overview

Convert the Pixels Studio portfolio site from Astro 6 to SvelteKit. Single-page static site with heavy canvas animations, GSAP scroll effects, and Lenis smooth scrolling. Deployed on Vercel.

## Architecture

- **Framework**: SvelteKit with `adapter-vercel`
- **Rendering**: Static prerendering (`prerender = true`)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite` plugin
- **Animations**: GSAP + Lenis (unchanged logic, wrapped in `onMount`/`onDestroy`)
- **Images**: `@sveltejs/enhanced-img` for all portfolio PNGs
- **Analytics**: `@vercel/analytics` + `@vercel/speed-insights`

## File Structure

```
copenhagen-v1/
├── src/
│   ├── lib/
│   │   ├── assets/
│   │   │   ├── fonts/InterVariable.woff2
│   │   │   ├── media/*.png
│   │   │   └── logos/*.svg
│   │   ├── components/
│   │   │   ├── Icons.svelte          # SVG sprite sheet (all icons as <symbol>)
│   │   │   ├── Icon.svelte           # Reusable icon: accepts name + class props
│   │   │   ├── Header.svelte
│   │   │   ├── Lead.svelte
│   │   │   ├── HexPattern.svelte
│   │   │   ├── FooterLogo.svelte
│   │   │   ├── GridLines.svelte
│   │   │   ├── Ruler.svelte
│   │   │   ├── ScrollAnimations.svelte
│   │   │   ├── About.svelte
│   │   │   ├── Contact.svelte
│   │   │   ├── Playground.svelte
│   │   │   ├── Origon.svelte
│   │   │   ├── Prism.svelte
│   │   │   ├── Rhythm.svelte
│   │   │   ├── Samespace.svelte
│   │   │   ├── TaxGermany.svelte
│   │   │   ├── Tlkn.svelte
│   │   │   ├── TribeCommunicationApp.svelte
│   │   │   └── TribeDocumentManagement.svelte
│   │   └── routes.ts                 # Navigation routes + social links (unchanged)
│   ├── routes/
│   │   ├── +layout.svelte            # Root layout (GridLines, Header, Ruler, ScrollAnimations, Lenis, analytics)
│   │   └── +page.svelte              # Single page composing all content sections
│   ├── app.html                      # HTML shell (meta tags, OG tags, font loading)
│   └── app.css                       # Global styles (Tailwind import, theme vars, animation initial states)
├── static/
│   └── favicon.svg
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Component Conversion Rules

| Astro Pattern | Svelte Equivalent |
|---|---|
| Frontmatter (`---` block) | `<script>` block |
| Template HTML | Svelte markup |
| `<style>` (global by default) | `<style>` (scoped by default; use `:global()` where needed) |
| Inline `<script>` tags | `onMount()` lifecycle |
| `client:load` directive | Not needed (Svelte hydrates by default) |
| `Astro.props` | `export let propName` (or `$props()` rune in Svelte 5) |
| `{variable}` expressions | `{variable}` (same syntax) |
| `set:html` directive | `{@html rawHtml}` |
| Astro `<Image>` component | `<enhanced:img>` from `@sveltejs/enhanced-img` |

## Icons System

### Icons.svelte
Hidden SVG element containing all icons as `<symbol>` elements:
- `bolt`, `divider`, `grid-dots`, `open-badge` (from src/assets/icons/)
- All logo SVGs inlined as symbols: `origon`, `pulse`, `samespace`, `taxgermany`, `tlkn`, `wbp`

### Icon.svelte
Reusable component:
```svelte
<script>
  let { name, class: className = '' } = $props();
</script>

<svg class={className}>
  <use href="#{name}" />
</svg>
```

Usage: `<Icon name="bolt" class="w-4 h-4" />`

## Fonts

- **Inter Variable**: Local `@font-face` in `app.css`, loaded from `$lib/assets/fonts/InterVariable.woff2`
  - Feature settings: `'ss07' 1, 'cv06' 1, 'cv12' 1, 'cv13' 1`
  - Weight range: `100 900`
- **Fragment Mono**: Google Fonts, loaded via `<link>` in `app.html`

## Canvas Components

HexPattern, FooterLogo, and Ruler contain complex canvas/DOM animation logic. Migration approach:
1. Move all JS logic into `onMount()`
2. Use `onDestroy()` for cleanup (RAF cancellation, event listener removal, ResizeObserver disconnect)
3. Use `bind:this` for canvas/DOM element references (replaces `document.querySelector`)
4. Template markup stays the same

## ScrollAnimations

GSAP ScrollTrigger setup moves into `onMount()` in `ScrollAnimations.svelte`. The component:
- Registers GSAP plugins (ScrollTrigger)
- Sets up all scroll-triggered animations targeting `data-*` attributes
- Split-text animations for hero
- Reveal, stagger, scale, fade animations
- Cleanup via `ScrollTrigger.killAll()` in `onDestroy()`

## Lenis Smooth Scroll

Initialized in `+layout.svelte` `onMount()`:
- Creates Lenis instance for desktop only
- Integrates with GSAP ticker
- Handles anchor link smooth scrolling
- Cleanup in `onDestroy()`

## Dependencies

### Add
- `@sveltejs/kit`
- `svelte`
- `@sveltejs/adapter-vercel`
- `@sveltejs/enhanced-img`
- `@sveltejs/vite-plugin-svelte`

### Keep
- `@tailwindcss/vite`
- `tailwindcss`
- `gsap`
- `lenis`
- `@vercel/analytics`
- `@vercel/speed-insights`

### Remove
- `astro`
- `@astrojs/vercel`

## Files to Remove

- `astro.config.mjs`
- `src/pages/` directory
- `src/layouts/` directory
- All `*.astro` files in `src/components/`
- `.astro/` generated types directory
- `.vscode/extensions.json` (Astro-specific)
- `.vscode/launch.json` (Astro-specific)

## .gitignore Updates

Replace Astro-specific entries with SvelteKit:
```
.svelte-kit/
build/
node_modules/
.env
.env.*
!.env.example
.DS_Store
.vercel
.idea/
```

## Prerendering

In `+layout.svelte` or `+layout.server.ts`:
```ts
export const prerender = true;
```

This ensures the entire site is statically generated at build time, matching Astro's `output: 'static'` behavior.
