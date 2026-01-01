<script lang="ts">
	import Header from '$lib/components/common/header.svelte';
	import Grid from '$lib/components/common/grid.svelte';
	import Footer from '$lib/components/common/footer.svelte';

	let { children } = $props();
</script>

<main class="flex min-h-dvh flex-col">
	<Header />
	{@render children()}
	<Footer />
</main>
