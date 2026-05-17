<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();
</script>

<span
  class="relative block w-fit border border-dashed border-ink-primary/16 px-3 py-2 text-xs font-bold tracking-wide text-ink-primary uppercase"
>
  {@render children()}
  <span
    class="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-ink-primary ring-1 ring-surface-primary"
    aria-hidden="true"
  ></span>
  <span
    class="absolute top-0 right-0 size-1 -translate-y-1/2 translate-x-1/2 bg-ink-primary ring-1 ring-surface-primary"
    aria-hidden="true"
  ></span>
  <span
    class="absolute bottom-0 left-0 size-1 -translate-x-1/2 translate-y-1/2 bg-ink-primary ring-1 ring-surface-primary"
    aria-hidden="true"
  ></span>
  <span
    class="absolute right-0 bottom-0 size-1 translate-x-1/2 translate-y-1/2 bg-ink-primary ring-1 ring-surface-primary"
    aria-hidden="true"
  ></span>
</span>
