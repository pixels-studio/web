<script lang="ts">
	import HeadshotImage from '$lib/assets/about/headshot.png?enhanced';
	import { cn } from '$lib/helpers/utils';
</script>

<section class={cn('bg-base-0 px-4 pt-32 pb-8', 'md:pt-48 md:pb-12', 'lg:pt-64 lg:pb-16')}>
	<div
		class={cn(
			'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-x-4',
			'md:grid-cols-8',
			'lg:grid-cols-12'
		)}
	>
		<h1 class={cn('col-span-full text-3xl font-medium text-pretty')}>
			<span class={cn('inline', 'md:block')}>A decade spent shaping products </span>
			<span class={cn('inline text-base-5', 'md:block')}
				>From early ideas to production systems.</span
			>
		</h1>
	</div>
</section>

<div class={cn('col-span-full aspect-2/1 bg-base-1')}>
	<enhanced:img src={HeadshotImage} alt="Abhishek Kambli" class="h-full w-full object-cover" />
</div>
