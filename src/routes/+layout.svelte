<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Grid from '$lib/components/common/grid.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{@render children()}
<Grid />
