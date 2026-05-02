<script lang="ts">
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.shiftKey && (e.key === 'G' || e.key === 'g')) {
        const target = e.target as HTMLElement | null;
        if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
        e.preventDefault();
        visible = !visible;
      }
    }
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  });
</script>

{#if visible}
  <div
    class="fixed inset-0 z-[60] flex pointer-events-none select-none"
    aria-hidden="true"
  >
    <div
      class="mx-auto grid h-full w-full max-w-[1360px] grid-cols-6 gap-6 md:grid-cols-12"
    >
      {#each Array(12) as _, i}
        <div
          class="bg-white/8 {i >= 6 ? 'hidden md:block' : ''}"
        ></div>
      {/each}
    </div>
  </div>
{/if}
