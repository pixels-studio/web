<script lang="ts">
	import Lead from '$lib/components/work/lead.svelte';
	import Content from '$lib/components/work/content.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Lead work={data.work} />
<Content work={data.work} />
