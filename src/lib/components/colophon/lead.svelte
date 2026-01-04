<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import { introState } from '$lib/stores/intro-state.svelte';

	// Only animate on initial load, not on navigation
	const shouldAnimate = !introState.hasPlayed;
</script>

<section class={cn('px-4 pt-24 pb-24', 'md:pt-32 md:pb-32', 'lg:pt-48 lg:pb-24')}>
	<div class="mx-auto grid w-full max-w-[1512px] grid-cols-12 gap-x-4">
		<h1 class={cn('col-span-5 col-start-5 text-3xl font-medium text-pretty')}>
			<span class={cn('block', shouldAnimate && 'lead-line-animate')} style="--delay: 0.4s"
				>Colophon</span
			>
			<span
				class={cn('block text-base-5', shouldAnimate && 'lead-line-animate')}
				style="--delay: 0.55s">A note on how this site is made.</span
			>
		</h1>
	</div>
</section>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			filter: blur(10px);
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			filter: blur(0px);
			transform: translateY(0);
		}
	}

	.lead-line-animate {
		opacity: 0;
		animation: fadeInUp 0.7s var(--ease-smooth) forwards;
		animation-delay: var(--delay, 0s);
	}
</style>
