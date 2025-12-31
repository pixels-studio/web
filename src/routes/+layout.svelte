<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/common/header.svelte';
	import Grid from '$lib/components/common/grid.svelte';
	import Footer from '$lib/components/common/footer.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main class="flex min-h-dvh flex-col">
	<Header />
	{@render children()}
	<Footer />
</main>

<Grid />

<style>
	@media (prefers-reduced-motion: no-preference) {
		:global(::view-transition-group(*)) {
			animation-duration: 500ms;
			animation-timing-function: var(--ease-smooth);
		}

		:global(.work-cover) {
			view-transition-class: work-cover;
		}

		:global(::view-transition-group(.work-cover)) {
			z-index: 100;
		}
	}

	@media (prefers-reduced-motion) {
		:global(::view-transition-group(*)),
		:global(::view-transition-old(*)),
		:global(::view-transition-new(*)) {
			animation: none !important;
		}
	}
</style>
