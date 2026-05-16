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

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (visible.size === 0) {
          activeId = '/';
        } else {
          const first = sectionIds.find((id) => visible.has(id));
          activeId = first ?? '/';
        }
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  });
</script>

<header class="px-6 py-6">
  <div class="mx-auto grid w-full max-w-366 grid-cols-12 items-center gap-6">
    <a href="/" class="col-span-1" aria-label="Home">
    <span class="block w-16">
      {@html Logo}
      </span>
    </a>

    <nav class="col-start-4 flex items-center gap-12">
      {#each primaryLinks as link}
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
      {#each secondaryLinks as link}
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
