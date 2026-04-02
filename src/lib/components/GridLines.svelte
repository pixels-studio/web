<script lang="ts">
  let { dark = false }: { dark?: boolean } = $props();
  const border = dark ? "border-white/4" : "border-black/4";
</script>

<div
  class="absolute inset-0 flex pointer-events-none select-none"
  aria-hidden="true"
>
  <div
    class="mx-auto grid h-full w-full max-w-[1360px] grid-cols-6 gap-6 md:grid-cols-12"
  >
    {#each Array(12) as _, i}
      <div
        class="border-x border-dashed {border} {i >= 6 ? 'hidden md:block' : ''}"
      ></div>
    {/each}
  </div>
</div>
