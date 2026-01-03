<script lang="ts">
	import { ROUTES } from '$lib/helpers/routes';
	import { cn } from '$lib/helpers/utils';
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
			<p>
				<span class="inline-block w-[3.5ch]"></span>
				Designing and building production software for over a decade. Currently leading frontend and design
				at
				<a href={ROUTES.origon} class="text-base-5" target="_blank" rel="noopener noreferrer">
					Origon in Mumbai, India.
				</a>
			</p>
			<p>Below is a selection of work drawn from those efforts, along with independent projects.</p>
		</h1>
	</div>
</section>
