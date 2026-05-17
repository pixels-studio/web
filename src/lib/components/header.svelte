<script lang="ts">
  import { onMount } from 'svelte';
  import { appear } from '$lib/actions/reveal';
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

<header class="site-header px-6 py-6" data-reveal style="--reveal-y: 0px; --reveal-blur: 0px" use:appear={{ delay: 120, duration: 600 }}>
  <div
    class="mx-auto flex w-full max-w-366 items-center justify-between gap-6 md:grid md:grid-cols-12"
  >
    <a href="/" class="md:col-span-1" aria-label="Home">
      <span class="block w-12 md:w-16">
        {@html Logo}
      </span>
    </a>

    <nav class="flex items-center gap-5 sm:gap-8 md:col-start-4 md:gap-12">
      {#each primaryLinks as link (link.href)}
        {@const mobileVisible = link.label === 'Work' || link.label === 'Contact'}
        <a
          href={link.href}
          class={[
            'text-xs font-semibold tracking-wide uppercase transition-opacity duration-200 hover:opacity-100',
            mobileVisible ? 'inline' : 'hidden md:inline'
          ]}
          class:opacity-100={activeId === targetId(link.href)}
          class:opacity-60={activeId !== targetId(link.href)}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <nav
      class="hidden items-center justify-end gap-12 md:col-start-10 md:col-span-2 md:flex"
    >
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
    background: color-mix(in srgb, var(--color-surface-primary) 95%, transparent);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
  }
</style>
