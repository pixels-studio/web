<script lang="ts">
  import { onMount } from 'svelte';
  import { routes } from '$lib/routes';
  import GridLines from './GridLines.svelte';

  let headerEl: HTMLElement;
  let headerGridEl: HTMLElement;

  onMount(() => {
    function updateHeader() {
      if (window.scrollY > 96) {
        headerEl.classList.add("bg-surface-primary");
        headerGridEl.style.opacity = "1";
      } else {
        headerEl.classList.remove("bg-surface-primary");
        headerGridEl.style.opacity = "0";
      }
    }
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  });
</script>

<header
  bind:this={headerEl}
  class="sticky h-18 top-0 inset-x-0 px-6 py-6 z-50 font-mono transition-colors duration-300"
>
  <div bind:this={headerGridEl} class="transition-opacity duration-300" style="opacity: 0">
    <GridLines dark />
  </div>
  <nav
    class="mx-auto h-full w-full grid max-w-[1360px] grid-cols-6 gap-6 items-center md:grid-cols-12"
  >
    <a
      href="/"
      class="group col-span-6 md:col-span-2 flex items-center gap-3 text-sm uppercase tracking-wide"
    >
      <span class="inline-block size-3 bg-ink-primary group-hover:animate-blink"></span>
      Pixels Studio
    </a>

    <div class="hidden md:col-start-9 md:col-span-4 md:flex items-center justify-between">
      <div class="flex items-center gap-10">
        {#each routes.slice(0, 3) as { label, href }}
          <a
            {href}
            class="text-sm uppercase tracking-wide text-ink-secondary hover:text-ink-primary transition-colors"
          >
            {label}
          </a>
        {/each}
      </div>
      <a
        href={routes[3].href}
        class="text-sm uppercase tracking-wide text-ink-secondary hover:text-ink-primary transition-colors"
      >
        {routes[3].label}
      </a>
    </div>
  </nav>
</header>
