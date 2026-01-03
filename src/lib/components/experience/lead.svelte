<script lang="ts">
	import { EXPERIENCE } from '$lib/helpers/constants';
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

<section class={cn('px-4 py-24 bg-origon-0', 'md:py-32', 'lg:py-48')} bind:this={section}>
	<div
		class={cn(
			'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-x-4',
			'md:grid-cols-8',
			'lg:grid-cols-12'
		)}
	>
		<p
			class={cn(
				'col-span-full mb-8 text-lg font-medium text-base-5',
				'md:col-span-full md:text-xl',
				'lg:col-span-4 lg:mb-0'
			)}
			data-animate="true"
		>
			Experience
		</p>
		<div class={cn('col-span-full mb-16 flex flex-col gap-8', 'lg:col-span-6')}>
			<h2 class="text-3xl font-medium text-pretty" data-animate="true">
				<span class={cn('hidden', 'lg:inline-block lg:w-[3.5ch]')}></span> I've spent over a decade designing
				and building intuitive software across consumer, B2B and agentic AI platforms.
			</h2>

			<h2 class="text-3xl font-medium text-pretty" data-animate="true">
				My work spans across product design, frontend engineering, and leadership.
			</h2>
		</div>

		<!-- Timeline -->
		<div class={cn('col-span-full  flex flex-col', 'lg:col-span-6 lg:col-start-5')}>
			{#each EXPERIENCE as experience (experience.company)}
				<article
					class={cn(
						'flex flex-col gap-8 border-b border-base-3 py-16 text-lg leading-tight font-medium first:border-t last:border-b-0 last:pb-0',
						'lg:py-24 lg:text-xl'
					)}
					data-animate="true"
				>
					<div class="flex items-start justify-between">
						<div class="flex flex-col">
							<h3 class="">{experience.title}</h3>
							<p class=" text-base-5">{experience.company}</p>
						</div>
						<p class=" text-base-5">{experience.period}</p>
					</div>

					<ul class="flex flex-col gap-2">
						{#each experience.highlights as highlight (highlight)}
							<li class="flex gap-2">
								<span class="my-2 size-2 shrink-0 bg-base-4"></span>
								<span>{highlight}</span>
							</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>
