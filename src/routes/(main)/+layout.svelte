<script lang="ts">
	import Header from '$lib/components/common/header.svelte';
	import Grid from '$lib/components/common/grid.svelte';
	import Footer from '$lib/components/common/footer.svelte';

	let { children } = $props();
</script>

<main class="relative z-10 flex min-h-dvh flex-col bg-base-0" style="margin-bottom: var(--footer-height, 0px)">
	<Header />
	{@render children()}
</main>
<Footer />
