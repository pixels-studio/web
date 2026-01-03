<script lang="ts">
	import { cn } from '$lib/helpers/utils';
</script>

<section
	class={cn('border-t border-base-3 px-4 py-24', 'md:py-32', 'lg:py-48')}
	style="view-transition-name: testimonial"
>
	<div
		class={cn(
			'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-4',
			'md:grid-cols-8',
			'lg:grid-cols-12'
		)}
	>
		<p
			class={cn(
				'col-span-full mb-8 text-lg font-medium text-base-5',
				'md:col-span-4 md:mb-0 md:text-xl'
			)}
		>
			Testimonial
		</p>

		<div class="col-span-6 flex flex-col gap-8">
			<h2 class={cn('text-2xl font-medium text-pretty', 'md:text-3xl')}>
				<span class={cn('hidden w-[4ch]', 'md:inline-block')}></span>I had a memorable time working
				with Abhishek. His grasp on UI and UX design theory was evident. He was a notable asset to
				the tlkn app with relentless motivation towards creating a perfect product.
			</h2>

			<div class={cn('flex flex-col text-lg font-medium', 'md:text-xl')}>
				<p>Raja Sandhu</p>
				<p class="text-base-5">Co-Founder, tlkn</p>
			</div>
		</div>
	</div>
</section>
