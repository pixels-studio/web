<script lang="ts">
  import '../app.css';
  import GridLines from '$lib/components/grid-lines.svelte';
  import Header from '$lib/components/header.svelte';

  let { children } = $props();
</script>

<GridLines dark />
<div data-hero class="relative min-h-screen bg-surface-primary text-ink-primary">
  <div class="relative z-10">
    <Header />
    {@render children()}
  </div>
</div>
