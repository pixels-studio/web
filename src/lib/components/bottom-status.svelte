<script lang="ts">
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import Button from './button.svelte';

  const copyright = `© ${new Date().getFullYear()} Pixels Studio`;

  type ActiveProject = {
    slug: string;
    title: string;
    subtitle: string;
    linkLabel?: string;
    linkHref?: string;
  };

  let active = $state<ActiveProject | null>(null);
  let measureEl: HTMLElement | undefined = $state();
  let panelHeight = $state(0);

  $effect(() => {
    active;
    requestAnimationFrame(() => {
      if (measureEl) panelHeight = measureEl.offsetHeight;
    });
  });

  function update() {
    const articles = Array.from(
      document.querySelectorAll<HTMLElement>('[data-project]')
    );
    if (articles.length === 0) {
      active = null;
      return;
    }

    const viewportBottom = window.innerHeight;
    let candidate: HTMLElement | null = null;
    let anyVisible = false;

    for (const el of articles) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < viewportBottom) anyVisible = true;
      if (rect.top < viewportBottom) candidate = el;
    }

    const nextSection = articles[articles.length - 1]?.closest('section')
      ?.nextElementSibling as HTMLElement | null;
    if (nextSection && nextSection.getBoundingClientRect().top < viewportBottom) {
      anyVisible = false;
    }

    if (!anyVisible || !candidate) {
      active = null;
      return;
    }

    const slug = candidate.dataset.project ?? '';
    if (active?.slug === slug) return;

    active = {
      slug,
      title: candidate.dataset.projectTitle ?? '',
      subtitle: candidate.dataset.projectSubtitle ?? '',
      linkLabel: candidate.dataset.projectLinkLabel || undefined,
      linkHref: candidate.dataset.projectLinkHref || undefined
    };
  }

  onMount(() => {
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  });

  function fadeBlur(_node: HTMLElement, { duration = 500, delay = 0 } = {}) {
    return {
      duration,
      delay,
      easing: cubicOut,
      css: (t: number) => `
        opacity: ${t};
        filter: blur(${(1 - t) * 8}px);
      `
    };
  }
</script>

<div
  class="pointer-events-none fixed inset-x-0 bottom-6 z-20 hidden px-6 md:block"
  aria-live="polite"
>
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="relative col-span-3 md:col-span-2">
      <div
        class="grid transition-[height] duration-500 ease-out"
        style:height="{panelHeight}px"
      >
        {#if active}
          {#key active.slug}
            <div
              class="col-start-1 row-start-1 self-end"
              in:fadeBlur={{ duration: 500, delay: 200 }}
              out:fadeBlur={{ duration: 200 }}
            >
              <h2 class="text-sm leading-snug font-medium text-ink-primary mb-1">
                {active.title}
              </h2>
              <p class="text-sm leading-snug text-pretty text-ink-secondary">
                {active.subtitle}
              </p>
              {#if active.linkHref && active.linkLabel}
                <div class="pointer-events-auto mt-3">
                  <Button
                    href={active.linkHref}
                    variant="link"
                    class="text-sm"
                    target={active.linkHref.startsWith('http') ? '_blank' : undefined}
                    rel={active.linkHref.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined}
                  >
                    {active.linkLabel}
                  </Button>
                </div>
              {/if}
            </div>
          {/key}
        {:else}
          <div
            class="col-start-1 row-start-1 self-end text-xs leading-snug font-semibold tracking-wide uppercase text-ink-primary/35"
            in:fadeBlur={{ duration: 500, delay: 200 }}
            out:fadeBlur={{ duration: 200 }}
          >
            {copyright}
          </div>
        {/if}
      </div>
      <div
        bind:this={measureEl}
        class="pointer-events-none invisible absolute inset-x-0 bottom-0"
        aria-hidden="true"
      >
        {#if active}
          <h2 class="text-sm leading-snug font-medium mb-1">{active.title}</h2>
          <p class="text-sm leading-snug text-pretty">{active.subtitle}</p>
          {#if active.linkLabel}
            <div class="mt-3 text-sm leading-snug">{active.linkLabel}</div>
          {/if}
        {:else}
          <div class="text-xs leading-snug font-semibold tracking-wide uppercase">{copyright}</div>
        {/if}
      </div>
    </div>
  </div>
</div>
