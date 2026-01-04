<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { PageData } from './$types';
	import ChevronLeft from '$lib/assets/chevron-left.svg?raw';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	function goBack() {
		history.back();
	}

	onMount(() => {
		function handleKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				goBack();
			}
		}

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
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

<section class={cn('z-50 flex min-h-dvh flex-1 items-center justify-center bg-base-0 ')}>
	<div class="relative mx-auto aspect-video w-full max-w-[1024px] overflow-hidden">
		{#if data.work.type === 'video'}
			<video
				src={data.work.cover}
				class="work-cover h-full w-full object-cover"
				style="view-transition-name: work-cover-{data.work._meta.path}"
				muted
				loop
				playsinline
				autoplay
			></video>
		{:else}
			<img
				src={data.work.cover}
				alt={data.work.title}
				class="work-cover h-full w-full object-cover"
				style="view-transition-name: work-cover-{data.work._meta.path}"
			/>
		{/if}
	</div>
</section>
