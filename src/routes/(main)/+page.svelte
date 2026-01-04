<script>
	import { onMount } from 'svelte';
	import Lead from '$lib/components/home/lead.svelte';
	import WorkGrid from '$lib/components/home/work-grid.svelte';
	import Testimonial from '$lib/components/home/testimonial.svelte';
	import { introState } from '$lib/stores/intro-state.svelte';

	onMount(() => {
		// Mark intro as played after animations complete (header + lead + work cells)
		// This prevents re-animation when navigating back to home
		const timeout = setTimeout(() => {
			introState.markPlayed();
		}, 2000); // Wait for all animations to complete

		return () => clearTimeout(timeout);
	});
</script>

<svelte:head>
	<title>Abhishek Kambli – Product Designer</title>
	<meta
		name="description"
		content="Portfolio of Abhishek Kambli, a product designer crafting intuitive digital experiences. Explore my latest work, projects, and design process."
	/>
</svelte:head>

<Lead />
<WorkGrid />
<Testimonial />
