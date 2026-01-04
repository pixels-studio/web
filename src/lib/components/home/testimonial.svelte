<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import RajaImage from '$lib/assets/raja.png?enhanced';
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
		<p class={cn('col-span-full mb-8 font-medium text-base-5', 'md:col-span-4 md:mb-0')}>
			Testimonial
		</p>

		<div class="col-span-6 flex flex-col gap-8">
			<h2 class={cn('text-2xl font-medium text-pretty', 'md:text-3xl')}>
				I had a memorable time working with Abhishek. His grasp on UI and UX design theory was
				evident. He was a notable asset to the tlkn app with relentless motivation towards creating
				a perfect product.
			</h2>

			<div class="flex items-center gap-4">
				<div class="relative grid size-10 place-items-center bg-base-1">
					<enhanced:img class="absolute inset-0 object-cover" src={RajaImage} alt="Raja Sandhu" />
				</div>
				<div class={cn('flex flex-col font-medium')}>
					<p>Raja Sandhu</p>
					<p class="text-base-5">Co-Founder, tlkn</p>
				</div>
			</div>
		</div>
	</div>
</section>
