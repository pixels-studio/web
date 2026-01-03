<script lang="ts">
	import type { Work } from 'content-collections';
	import { goto } from '$app/navigation';
	import {
		captureFlipState,
		applyFlipAnimation,
		getAnimationDirection
	} from '$lib/stores/flip-state.svelte';
	import { onMount } from 'svelte';

	interface Props {
		item?: Work;
		isEmpty?: boolean;
	}

	let { item, isEmpty = false }: Props = $props();

	let coverElement: HTMLElement | null = $state(null);

	onMount(() => {
		// Check if we have a pending exit animation for this item
		if (item && getAnimationDirection() === 'exit') {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					if (coverElement) {
						applyFlipAnimation(coverElement, item._meta.path);
					}
				});
			});
		}
	});

	function handleClick(e: MouseEvent) {
		if (!item || !coverElement) return;
		e.preventDefault();

		// Capture the FLIP state before navigation
		captureFlipState(coverElement, item._meta.path, 'enter');

		// Hide the source element immediately for seamless transition
		coverElement.style.visibility = 'hidden';

		// Navigate to the detail page
		goto(`/work/${item._meta.path}`);
	}
</script>

{#if isEmpty}
	<div class="col-span-2 aspect-video"></div>
{:else if item}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<a href={`/work/${item._meta.path}`} class="group col-span-2" onclick={handleClick}>
		<div class="work-cell-wrapper relative aspect-[2/1] overflow-hidden bg-base-2">
			{#if item.type === 'video'}
				<video
					bind:this={coverElement}
					src={item.cover}
					class="work-cover h-full w-full object-cover transition-transform duration-500 ease-smooth"
					data-flip-id={item._meta.path}
					muted
					loop
					playsinline
				></video>
			{:else}
				<img
					bind:this={coverElement}
					src={item.cover}
					alt={item.title}
					class="work-cover h-full w-full object-cover transition-transform duration-500 ease-smooth"
					data-flip-id={item._meta.path}
					loading="lazy"
				/>
			{/if}
		</div>
	</a>
{/if}
