<script lang="ts">
	import type { PageData } from './$types';
	import { applyFlipAnimation, captureFlipState } from '$lib/stores/flip-state.svelte';
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let coverElement: HTMLElement | null = $state(null);

	onMount(() => {
		// Wait for next frame to ensure layout is complete
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (coverElement) {
					applyFlipAnimation(coverElement, data.work._meta.path);
				}
			});
		});
	});

	// Capture state before navigating away for exit animation
	beforeNavigate((navigation) => {
		// Only capture if navigating back to home or a page with work cells
		if (coverElement && navigation.to?.url.pathname === '/') {
			captureFlipState(coverElement, data.work._meta.path, 'exit');
			coverElement.style.visibility = 'hidden';
		}
	});
</script>

<svelte:head>
	<title>{data.work.title} – Abhishek Kambli</title>
	<meta
		name="description"
		content={data.work.description ||
			`${data.work.title} – A project by Abhishek Kambli. Explore the design process, challenges, and solutions.`}
	/>
</svelte:head>

<section class="detail-background flex min-h-dvh flex-1 items-center justify-center bg-base-10">
	<div class="relative aspect-2/1 w-full overflow-hidden">
		{#if data.work.type === 'video'}
			<video
				bind:this={coverElement}
				src={data.work.cover}
				class="work-cover h-full w-full object-cover"
				data-flip-id={data.work._meta.path}
				muted
				loop
				playsinline
				autoplay
			></video>
		{:else}
			<img
				bind:this={coverElement}
				src={data.work.cover}
				alt={data.work.title}
				class="work-cover h-full w-full object-cover"
				data-flip-id={data.work._meta.path}
			/>
		{/if}
	</div>
</section>

<style>
	.detail-background {
		animation: fade-in 600ms var(--ease-smooth, cubic-bezier(0.4, 0, 0.2, 1)) forwards;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
