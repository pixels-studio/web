<script lang="ts">
  import '../app.css';
  import BottomStatus from '$lib/components/bottom-status.svelte';
  import GridLines from '$lib/components/grid-lines.svelte';
  import Header from '$lib/components/header.svelte';
  import Ruler from '$lib/components/ruler.svelte';

  let { children } = $props();
</script>

<GridLines dark />
<div data-hero class="relative min-h-screen bg-surface-primary text-ink-primary">
  <div class="relative z-10">
    <Header />
    {@render children()}
  </div>
</div>
<BottomStatus />
<Ruler />
