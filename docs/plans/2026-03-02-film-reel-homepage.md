# Film Reel Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the homepage work grid with an infinite-loop horizontal film reel that responds to vertical scroll, fitting everything in 100dvh with no footer or testimonial.

**Architecture:** The page locks to 100dvh with overflow hidden. Header and lead text sit at top, a new `WorkReel.astro` component fills remaining space via `flex-1`. Wheel events translate to horizontal CSS `translateX` with momentum damping. Images are tripled (prepend + original + append) for seamless infinite looping.

**Tech Stack:** Astro, Tailwind CSS v4, vanilla JS (requestAnimationFrame), existing content collection for work items.

---

### Task 1: Add `fullHeight` prop to MainLayout

**Files:**
- Modify: `src/layouts/MainLayout.astro`

**Step 1: Add the prop and conditional classes**

The layout needs to optionally hide the footer and constrain to 100dvh. Update `MainLayout.astro` to:

```astro
---
import BaseLayout from './BaseLayout.astro';
import Header from '@components/common/Header.astro';
import Footer from '@components/common/Footer.astro';

interface Props {
	title: string;
	description: string;
	fullHeight?: boolean;
}

const { title, description, fullHeight = false } = Astro.props;
---

<BaseLayout title={title} description={description}>
	<main
		class:list={[
			'relative z-10 flex flex-col bg-base-0',
			fullHeight ? 'h-dvh overflow-hidden' : 'min-h-dvh'
		]}
	>
		<Header />
		<slot />
		{!fullHeight && <Footer />}
	</main>
</BaseLayout>
```

**Step 2: Verify no regressions**

Run: `npm run build`
Expected: Build succeeds. All existing pages still render footer (they don't pass `fullHeight`).

**Step 3: Commit**

```bash
git add src/layouts/MainLayout.astro
git commit -m "feat: add fullHeight prop to MainLayout for 100dvh pages"
```

---

### Task 2: Reduce Lead vertical padding

**Files:**
- Modify: `src/components/home/Lead.astro`

**Step 1: Update padding classes**

Change the `<section>` class from heavy padding to tighter spacing. Replace:

```
class={cn('bg-base-0 px-4 pt-24 pb-24', 'md:pt-32 md:pb-32', 'lg:pt-48 lg:pb-24')}
```

With:

```
class={cn('bg-base-0 px-4 pt-8 pb-8', 'md:pt-12 md:pb-8', 'lg:pt-16 lg:pb-8')}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/home/Lead.astro
git commit -m "feat: reduce Lead section vertical padding for film reel layout"
```

---

### Task 3: Create WorkReel component

**Files:**
- Create: `src/components/home/WorkReel.astro`

**Step 1: Create the component**

This is the core component. It queries all published works, renders them as a horizontal strip with 3x duplication for infinite loop, and handles wheel-to-horizontal-scroll with momentum.

```astro
---
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';
import { cn } from '@helpers/utils';

const allWorks = await getCollection('work');
const publishedWorks = allWorks
	.filter((work) => work.data.status === 'published')
	.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---

<section class="flex-1 overflow-hidden" data-work-reel>
	<div
		class="flex h-full items-center gap-3 px-4 will-change-transform"
		data-reel-track
	>
		{/* Three copies for infinite loop: clone | original | clone */}
		{
			[...publishedWorks, ...publishedWorks, ...publishedWorks].map((work, i) => (
				<a
					href={`/work/${work.id}`}
					class="group h-[70%] flex-shrink-0"
					data-reel-item
				>
					<div
						class="relative h-full overflow-hidden bg-base-2"
						style={i < publishedWorks.length || i >= publishedWorks.length * 2
							? ''
							: `view-transition-name: work-cell-${work.id}`}
					>
						<Image
							src={work.data.cover}
							alt={work.data.title}
							class="work-cover h-full w-auto object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
							style={i < publishedWorks.length || i >= publishedWorks.length * 2
								? ''
								: `view-transition-name: work-cover-${work.id}`}
							loading={i < publishedWorks.length * 2 ? 'eager' : 'lazy'}
						/>
					</div>
				</a>
			))
		}
	</div>
</section>

<style>
	[data-reel-item] {
		aspect-ratio: 16 / 9;
	}
</style>

<script>
	document.addEventListener('astro:page-load', () => {
		const reel = document.querySelector('[data-work-reel]') as HTMLElement | null;
		const track = document.querySelector('[data-reel-track]') as HTMLElement | null;
		if (!reel || !track) return;

		const items = track.querySelectorAll('[data-reel-item]');
		const totalItems = items.length;
		const setSize = totalItems / 3; // One third is one full set

		let currentX = 0;
		let targetX = 0;
		let velocity = 0;
		let isInitialized = false;
		let singleSetWidth = 0;

		function measureAndInit() {
			// Measure the width of one full set of items
			const firstItem = items[0] as HTMLElement;
			if (!firstItem) return;
			const gap = 12; // gap-3 = 12px
			const itemWidth = firstItem.offsetWidth + gap;
			singleSetWidth = itemWidth * setSize;

			// Start at the middle set (offset by one full set)
			currentX = -singleSetWidth;
			targetX = currentX;
			track!.style.transform = `translateX(${currentX}px)`;
			isInitialized = true;
		}

		// Initialize after images have a chance to lay out
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				measureAndInit();
			});
		});

		// Handle resize
		window.addEventListener('resize', () => {
			if (isInitialized) measureAndInit();
		});

		// Wheel handler: translate vertical scroll to horizontal movement
		reel.addEventListener(
			'wheel',
			(e: WheelEvent) => {
				e.preventDefault();
				// Use deltaY for vertical scroll -> horizontal, also support deltaX for horizontal trackpad gestures
				const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
				targetX -= delta;
			},
			{ passive: false }
		);

		// Animation loop with momentum
		function animate() {
			if (!isInitialized) {
				requestAnimationFrame(animate);
				return;
			}

			// Smooth interpolation
			const ease = 0.08;
			currentX += (targetX - currentX) * ease;

			// Infinite loop: wrap around when we've scrolled past one full set
			if (currentX > 0) {
				currentX -= singleSetWidth;
				targetX -= singleSetWidth;
			} else if (currentX < -singleSetWidth * 2) {
				currentX += singleSetWidth;
				targetX += singleSetWidth;
			}

			track!.style.transform = `translateX(${currentX}px)`;
			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	});
</script>
```

Key implementation details:
- Images are rendered 3x: items 0..N-1 (clone), N..2N-1 (original, with view-transition-names), 2N..3N-1 (clone)
- The track starts positioned at the middle set (`-singleSetWidth`)
- When scrolling past boundaries, position silently wraps by one set width
- `ease = 0.08` gives smooth momentum that feels natural with trackpad
- `will-change-transform` on the track for GPU compositing
- View transition names only on the middle (original) set to avoid duplicates

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/home/WorkReel.astro
git commit -m "feat: create WorkReel component with infinite horizontal scroll"
```

---

### Task 4: Wire up index.astro

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Replace WorkGrid and Testimonial with WorkReel**

Update `index.astro` to:

```astro
---
import MainLayout from '@layouts/MainLayout.astro';
import Lead from '@components/home/Lead.astro';
import WorkReel from '@components/home/WorkReel.astro';
---

<MainLayout
	title="Abhishek Kambli – Product Designer"
	description="Portfolio of Abhishek Kambli, a product designer crafting intuitive digital experiences. Explore my latest work, projects, and design process."
	fullHeight
>
	<Lead />
	<WorkReel />
</MainLayout>

<script>
	import { introState } from '@helpers/intro-state';

	document.addEventListener('astro:page-load', () => {
		if (introState.hasPlayed) return;
		setTimeout(() => {
			introState.markPlayed();
		}, 2000);
	});
</script>
```

Changes:
- Removed `WorkGrid` and `Testimonial` imports and usage
- Added `WorkReel` import and usage
- Added `fullHeight` prop to `MainLayout`

**Step 2: Verify build and dev server**

Run: `npm run build`
Expected: Build succeeds.

Run: `npm run dev`
Expected: Homepage shows header, lead text, and horizontal film reel in 100dvh. Scrolling with trackpad/mouse moves reel horizontally. Infinite loop works.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire up film reel homepage layout"
```

---

### Task 5: Visual polish and testing

**Step 1: Test in dev server**

Run: `npm run dev`

Verify:
- [ ] Page fits in 100dvh, no vertical scrollbar
- [ ] Header renders correctly at top
- [ ] Lead text has reduced spacing
- [ ] Film reel fills remaining space
- [ ] Vertical scroll moves reel horizontally
- [ ] Infinite loop is seamless (no jump/flash)
- [ ] Clicking an image navigates to `/work/[slug]`
- [ ] View transitions work when clicking a work item
- [ ] Other pages (about, experience, colophon) still have footer
- [ ] Responsive: works on smaller viewports

**Step 2: Adjust if needed**

Potential tweaks:
- Image height percentage (`h-[70%]`) may need adjustment to look right
- Ease factor (`0.08`) may need tuning for scroll feel
- Gap size may need adjustment

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: film reel homepage - polish and adjustments"
```
