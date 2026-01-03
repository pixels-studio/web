<script>
	import { cn } from '$lib/helpers/utils';
</script>

<section class={cn('px-4 py-24', 'md:py-32', 'lg:py-48')}>
	<div
		class={cn(
			'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-x-4 gap-y-8',
			'md:grid-cols-8',
			'lg:grid-cols-12'
		)}
	>
		<h2 class={cn('col-span-full text-lg font-medium text-base-5', 'md:text-xl', 'lg:col-span-4')}>
			My Story
		</h2>

		<article
			class={cn(
				'col-span-full grid grid-cols-1 gap-y-2',
				'md:col-span-full md:grid-cols-8 md:gap-x-4',
				'lg:col-span-8 lg:mb-16 lg:grid-cols-subgrid'
			)}
		>
			<p class={cn('text-lg font-medium text-base-5', 'md:col-span-2 md:text-xl', 'lg:col-span-2')}>
				Background
			</p>
			<p class={cn('text-base font-medium', 'md:col-span-6 md:text-xl', 'lg:col-span-5')}>
				Over the past decade, I've worked across consumer products, B2B platforms, and agentic AI
				systems. I currently lead design and frontend at Origon, building AI-native software used in
				real operational environments.
			</p>
		</article>

		<article
			class={cn(
				'col-span-full grid grid-cols-1 gap-y-2',
				'md:col-span-full md:grid-cols-8 md:gap-x-4',
				'lg:col-span-8 lg:col-start-5 lg:mb-16 lg:grid-cols-subgrid'
			)}
		>
			<p class={cn('text-lg font-medium text-base-5', 'md:col-span-2 md:text-xl', 'lg:col-span-2')}>
				Approach
			</p>
			<p class={cn('text-base font-medium', 'md:col-span-6 md:text-xl', 'lg:col-span-5')}>
				I focus on long-lived systems—interfaces that scale in complexity without losing clarity,
				and frontend architectures built to last. I prefer owning problems end to end, from early
				product definition to shipped code, and collaborate selectively on a small number of
				freelance projects.
			</p>
		</article>

		<article
			class={cn(
				'col-span-full grid grid-cols-1 gap-y-2',
				'md:col-span-full md:grid-cols-8 md:gap-x-4',
				'lg:col-span-8 lg:col-start-5 lg:mb-16 lg:grid-cols-subgrid'
			)}
		>
			<p class={cn('text-lg font-medium text-base-5', 'md:col-span-2 md:text-xl', 'lg:col-span-2')}>
				Perspective
			</p>
			<p class={cn('text-base font-medium', 'md:col-span-6 md:text-xl', 'lg:col-span-5')}>
				I care deeply about clarity, restraint, and craft. I value thinking through problems before
				reaching for solutions, and I'm drawn to work that rewards patience, curiosity, and
				long-term responsibility over short-term outcomes.
			</p>
		</article>
	</div>
</section>
