<script lang="ts">
	import gsap from 'gsap';

	interface GridProps {
		barColor?: string;
		toggleKey?: string;
	}

	let { barColor = 'bg-base-10/8', toggleKey = 'g' }: GridProps = $props();

	let visible = $state(false);
	let mounted = $state(false);
	let bars: HTMLDivElement[] = [];

	const validBars = $derived(bars.filter((bar) => bar !== undefined));
	const prefersReducedMotion = $derived(
		mounted ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
	);

	// Animation effect
	$effect(() => {
		if (!mounted || validBars.length === 0) return;

		if (prefersReducedMotion) {
			gsap.set(validBars, {
				scaleY: visible ? 1 : 0,
				opacity: visible ? 1 : 0
			});
			return;
		}

		if (visible) {
			gsap.fromTo(
				validBars,
				{ scaleY: 0, opacity: 0 },
				{
					scaleY: 1,
					opacity: 1,
					duration: 0.4,
					stagger: 0.03,
					ease: 'power2.out'
				}
			);
		} else {
			gsap.to(validBars, {
				scaleY: 0,
				opacity: 0,
				duration: 0.3,
				stagger: { each: 0.02, from: 'end' },
				ease: 'power2.in'
			});
		}
	});

	// Lifecycle and keyboard handler effect
	$effect(() => {
		mounted = true;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.shiftKey && e.key.toLowerCase() === toggleKey.toLowerCase()) {
				e.preventDefault();
				visible = !visible;
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<div
	class="pointer-events-none fixed inset-0 z-50 grid grid-cols-6 gap-4 px-4 md:grid-cols-8 lg:grid-cols-12"
	class:hidden={!mounted}
	aria-hidden="true"
	role="presentation"
>
	{#each Array(12) as _, i (i)}
		<div
			bind:this={bars[i]}
			class="{barColor} h-full origin-bottom"
			style="transform: scaleY(0); opacity: 0;"
		></div>
	{/each}
</div>
