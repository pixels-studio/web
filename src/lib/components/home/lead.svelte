<script lang="ts">
	import { ROUTES } from '$lib/helpers/routes';
	import { cn } from '$lib/helpers/utils';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	let leadLines: HTMLElement[] = [];
	let prefersReducedMotion = $state(false);

	onMount(() => {
		const loadId = String(performance.timeOrigin || Date.now());
		const animationKey = `homeLeadAnimated:${loadId}`;
		const hasAnimated = sessionStorage.getItem(animationKey) === 'true';

		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updatePreference = () => {
			prefersReducedMotion = media.matches;
		};

		updatePreference();
		media.addEventListener('change', updatePreference);

		const lines = leadLines.filter(Boolean);

		if (lines.length) {
			if (hasAnimated || prefersReducedMotion) {
				gsap.set(lines, { y: 0, opacity: 1 });
			} else {
				gsap.fromTo(
					lines,
					{ y: 24, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12 }
				);
				sessionStorage.setItem(animationKey, 'true');
			}
		}

		return () => {
			media.removeEventListener('change', updatePreference);
		};
	});
</script>

<section
	class={cn('bg-base-0 px-4 py-24', 'md:py-32', 'lg:py-48')}
	style="view-transition-name: lead"
>
	<div
		class={cn(
			'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-4',
			'md:grid-cols-8',
			'lg:grid-cols-12'
		)}
	>
		<h1
			class={cn(
				'col-span-full flex flex-col gap-8 text-2xl leading-tight font-medium text-pretty',
				'lg:col-span-6 lg:col-start-5 lg:text-3xl'
			)}
		>
			<p class="lead-line" bind:this={leadLines[0]}>
				<span class="inline-block w-[3.5ch]"></span>
				Designing and building production software for over a decade. Currently leading frontend and design
				at
				<a href={ROUTES.origon} class="text-base-5" target="_blank" rel="noopener noreferrer">
					Origon in Mumbai, India.
				</a>
			</p>
			<p class="lead-line" bind:this={leadLines[1]}>
				Below is a selection of work drawn from those efforts, along with independent projects.
			</p>
		</h1>
	</div>
</section>
