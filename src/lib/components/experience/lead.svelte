<script>
	import { EXPERIENCE } from '$lib/helpers/constants';
	import { cn } from '$lib/helpers/utils';
</script>

<section class={cn('px-4 py-24', 'md:py-32', 'lg:py-48')}>
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
		>
			Experience
		</p>
		<div class={cn('col-span-full mb-16 flex flex-col gap-8', 'lg:col-span-6')}>
			<h2 class="text-3xl font-medium text-pretty">
				<span class={cn('hidden', 'lg:inline-block lg:w-[3.5ch]')}></span> I've spent over a decade designing
				and building intuitive software across consumer, B2B and agentic AI platforms.
			</h2>

			<h2 class="text-3xl font-medium text-pretty">
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
