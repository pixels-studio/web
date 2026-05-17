<script lang="ts">
  import { onMount } from 'svelte';
  import Logo from '$lib/assets/logo.svg?raw';
  import { primaryLinks, secondaryLinks } from '$lib/data/routes';

  let activeId = $state<string>('/');

  function targetId(href: string) {
    return href.startsWith('#') ? href.slice(1) : href;
  }

  onMount(() => {
    const sectionIds = primaryLinks
      .map((l) => targetId(l.href))
      .filter((id) => id !== '/');

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    function recompute() {
      const anchor = window.innerHeight / 2;
      let bestId: string | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;
        const distance = Math.abs(rect.top + rect.height / 2 - anchor);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = section.id;
        }
      }

      activeId = bestId ?? '/';
    }

    recompute();
    window.addEventListener('scroll', recompute, { passive: true });
    window.addEventListener('resize', recompute);

    return () => {
      window.removeEventListener('scroll', recompute);
      window.removeEventListener('resize', recompute);
    };
  });
</script>

<header class="site-header px-6 py-6">
  <div class="progressive-blur" aria-hidden="true">
    <div class="progressive-blur__layer progressive-blur__layer--1"></div>
    <div class="progressive-blur__layer progressive-blur__layer--2"></div>
    <div class="progressive-blur__layer progressive-blur__layer--3"></div>
    <div class="progressive-blur__layer progressive-blur__layer--4"></div>
  </div>

  <div class="mx-auto grid w-full max-w-366 grid-cols-12 items-center gap-6">
    <a href="/" class="col-span-1" aria-label="Home">
    <span class="block w-16">
      {@html Logo}
      </span>
    </a>

    <nav class="col-start-4 flex items-center gap-12">
      {#each primaryLinks as link (link.href)}
        <a
          href={link.href}
          class="text-xs font-semibold tracking-wide uppercase transition-opacity duration-200 hover:opacity-100"
          class:opacity-100={activeId === targetId(link.href)}
          class:opacity-60={activeId !== targetId(link.href)}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <nav class="col-start-10 col-span-2 flex items-center justify-end gap-12">
      {#each secondaryLinks as link (link.href)}
        <a
          href={link.href}
          class="text-xs font-semibold tracking-wide uppercase opacity-60 transition-opacity duration-200 hover:opacity-100"
        >
          {link.label}
        </a>
      {/each}
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 60;
    isolation: isolate;
  }

  .site-header::before {
    position: absolute;
    inset: 0;
    z-index: -1;
    content: '';
    background: color-mix(in srgb, var(--color-surface-primary) 68%, transparent);
  }

  .progressive-blur {
    position: absolute;
    inset: 0 0 auto;
    z-index: -2;
    height: calc(100% + 2rem);
    pointer-events: none;
    overflow: hidden;
  }

  .progressive-blur__layer {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
    mask-image: linear-gradient(to bottom, black var(--start), transparent var(--end));
    -webkit-mask-image: linear-gradient(to bottom, black var(--start), transparent var(--end));
  }

  .progressive-blur__layer--1 {
    --blur: 2px;
    --start: 38%;
    --end: 100%;
  }

  .progressive-blur__layer--2 {
    --blur: 6px;
    --start: 0%;
    --end: 82%;
  }

  .progressive-blur__layer--3 {
    --blur: 12px;
    --start: 0%;
    --end: 62%;
  }

  .progressive-blur__layer--4 {
    --blur: 20px;
    --start: 0%;
    --end: 44%;
  }
</style>
