<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { Work } from 'content-collections';
	import { introState } from '$lib/stores/intro-state.svelte';

	interface Props {
		item?: Work;
		index?: number;
	}

	let { item, index = 0 }: Props = $props();

	// Only animate on initial load, not on navigation
	const shouldAnimate = !introState.hasPlayed;
</script>

{#if item}
	<a
		href={`/work/${item._meta.path}`}
		class={cn('group col-span-3', 'md:col-span-2', shouldAnimate && 'work-cell-animate')}
		style="--index: {index}"
	>
		<div
			class="work-cell-wrapper relative aspect-video overflow-hidden bg-base-2"
			style="view-transition-name: work-cell-{item._meta.path}"
		>
			{#if item.type === 'video'}
				<video
					src={item.cover}
					class="work-cover h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
					style="view-transition-name: work-cover-{item._meta.path}"
					muted
					loop
					playsinline
				></video>
			{:else}
				<img
					src={item.cover}
					alt={item.title}
					class="work-cover h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
					style="view-transition-name: work-cover-{item._meta.path}"
					loading="lazy"
				/>
			{/if}
		</div>
	</a>
{:else}
	<div class={cn('col-span-3 aspect-video', 'md:col-span-2')}></div>
{/if}

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.work-cell-animate {
		opacity: 0;
		animation: fadeInUp 0.6s var(--ease-smooth) forwards;
		animation-delay: calc(0.6s + var(--index, 0) * 0.08s);
	}
</style>
