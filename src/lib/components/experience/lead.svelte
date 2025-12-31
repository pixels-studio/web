<script>
	import { EXPERIENCE } from '$lib/helpers/constants';
</script>

<section class="px-4 py-48">
	<div class="mx-auto grid w-full max-w-[1512px] grid-cols-12 gap-x-4">
		<p class="col-span-4 text-xl font-medium text-base-5">Experience</p>
		<div class="col-span-6 mb-16 flex flex-col gap-8">
			<h2 class="text-3xl font-medium text-pretty">
				<span class="inline-block w-[5ch]"></span> I've spent over a decade designing and building intuitive
				software across consumer, B2B and agentic AI platforms.
			</h2>

			<h2 class="text-3xl font-medium text-pretty">
				My work spans across product design, frontend engineering, and leadership.
			</h2>
		</div>

		<!-- Timeline -->
		<div class="col-span-6 col-start-5 flex flex-col">
			{#each EXPERIENCE as experience (experience.company)}
				<article
					class="flex flex-col gap-8 border-b border-base-3 py-24 text-xl leading-tight font-medium first:border-t last:border-b-0 last:pb-0"
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
