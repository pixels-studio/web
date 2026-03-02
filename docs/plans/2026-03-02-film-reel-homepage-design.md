# Film Reel Homepage Design

## Summary
Replace the homepage work grid with a horizontal film reel that fills 100dvh alongside the header and lead text. Vertical scroll (wheel/trackpad) moves the reel left/right. Infinite loop. No footer or testimonial on homepage.

## Layout
- Page: `100dvh`, `overflow: hidden`, `flex flex-col`
- Header: sticky, unchanged
- Lead: reduced vertical padding (~pt-12 pb-8 mobile, ~pt-16 pb-8 desktop)
- Film reel: `flex-1`, fills remaining height

## Film Reel Mechanics
- Approach: CSS `translateX` driven by `wheel` event listener
- Images: 16:9 aspect ratio, clickable links to `/work/[slug]`
- Infinite loop: render images 3x (prepend + original + append), silently reset position at boundaries
- Gap: ~12px between images
- Momentum: track velocity from wheel deltas, apply damping via `requestAnimationFrame`

## Files
- **Modify** `src/pages/index.astro` — remove Testimonial/WorkGrid, add WorkReel
- **Modify** `src/components/home/Lead.astro` — reduce vertical padding
- **Modify** `src/layouts/MainLayout.astro` — add prop to hide footer + set 100dvh
- **Create** `src/components/home/WorkReel.astro` — horizontal film reel component
