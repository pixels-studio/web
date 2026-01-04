<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { PageData } from './$types';
	import CloseIcon from '$lib/assets/close.svg?raw';
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
	<button
		onclick={goBack}
		class="fixed top-4 right-4 z-50 size-8 cursor-pointer text-base-5 transition-colors duration-300 ease-smooth hover:text-base-10"
	>
		<span class="block size-5">
			{@html CloseIcon}
		</span>
	</button>

	<div class="relative mx-auto aspect-video w-full max-w-[1280px] overflow-hidden">
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
			<enhanced:img
				src={data.work.cover}
				alt={data.work.title}
				class="work-cover h-full w-full object-cover"
				style="view-transition-name: work-cover-{data.work._meta.path}"
			/>
		{/if}
	</div>
</section>
