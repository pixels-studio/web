<script lang="ts">
  import '../app.css';
  import GridLines from '$lib/components/grid-lines.svelte';
  import Header from '$lib/components/header.svelte';

  let { children } = $props();
</script>

<GridLines dark />
<Header />
{@render children()}
