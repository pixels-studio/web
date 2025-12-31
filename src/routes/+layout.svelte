<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/common/header.svelte';
	import Grid from '$lib/components/common/grid.svelte';
	import Footer from '$lib/components/common/footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main class="flex min-h-dvh flex-col">
	<Header />
	{@render children()}
	<Footer />
</main>

<Grid />
