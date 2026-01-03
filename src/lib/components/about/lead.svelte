<script lang="ts">
	import HeadshotImage from '$lib/assets/about/headshot.png?enhanced';
	import { cn } from '$lib/helpers/utils';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	let prefersReducedMotion = $state(false);
	let section: HTMLElement | null = null;

	const markReady = (elements: HTMLElement[]) => {
		elements.forEach((element) => {
			element.dataset.animateReady = 'true';
		});
	};

	onMount(() => {
		if (!section) return;

		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updatePreference = () => {
			prefersReducedMotion = media.matches;
		};

		updatePreference();
		media.addEventListener('change', updatePreference);

		const items = Array.from(section.querySelectorAll<HTMLElement>('[data-animate="true"]'));

		if (!items.length) {
			return () => {
				media.removeEventListener('change', updatePreference);
			};
		}

		if (prefersReducedMotion) {
			gsap.set(items, { y: 0, opacity: 1 });
			markReady(items);
			return () => {
				media.removeEventListener('change', updatePreference);
			};
		}

		gsap.set(items, { y: 24, opacity: 0 });
		markReady(items);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					gsap.to(items, {
						y: 0,
						opacity: 1,
						duration: 0.7,
						ease: 'power3.out',
						stagger: 0.12,
						clearProps: 'transform'
					});
					observer.unobserve(entry.target);
				});
			},
			{ threshold: 0.2 }
		);

		observer.observe(section);

		return () => {
			media.removeEventListener('change', updatePreference);
			observer.disconnect();
		};
	});
</script>

<div bind:this={section}>
	<section class={cn('bg-base-0 px-4 pt-32 pb-8', 'md:pt-48 md:pb-12', 'lg:pt-64 lg:pb-16')}>
		<div
			class={cn(
				'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-x-4',
				'md:grid-cols-8',
				'lg:grid-cols-12'
			)}
		>
			<h1
				class={cn(
					'col-span-full text-4xl leading-[1.1] font-bold tracking-tight text-pretty',
					'md:text-5xl',
					'lg:text-6xl'
				)}
				data-animate="true"
			>
				<span class={cn('inline', 'md:block')}>A decade spent shaping products </span>
				<span class={cn('inline text-base-5', 'md:block')}
					>From early ideas to production systems.</span
				>
			</h1>
		</div>
	</section>

	<div class={cn('col-span-full aspect-2/1 bg-base-1')} data-animate="true">
		<enhanced:img src={HeadshotImage} alt="Abhishek Kambli" class="h-full w-full object-cover" />
	</div>
</div>
