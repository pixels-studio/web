<script lang="ts">
  let { dark = false }: { dark?: boolean } = $props();

  let visible = $state(false);

  function onKeydown(e: KeyboardEvent) {
    if (e.shiftKey && (e.key === 'G' || e.key === 'g')) {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      visible = !visible;
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

{#if visible}
  <div
    class="fixed inset-0 flex pointer-events-none select-none z-50"
    aria-hidden="true"
  >
    <div
      class="mx-auto grid h-full w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12"
    >
      {#each Array(12) as _, i}
        <div
          class="border-x border-dashed {dark ? 'border-white/10' : 'border-black/10'} {i >= 6 ? 'hidden md:block' : ''}"
        ></div>
      {/each}
    </div>
  </div>
{/if}
