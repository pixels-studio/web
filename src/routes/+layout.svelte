<script lang="ts">
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { onNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import { inject } from '@vercel/analytics';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import '../app.css';
  import BottomStatus from '$lib/components/bottom-status.svelte';
  import GridLines from '$lib/components/grid-lines.svelte';
  import Header from '$lib/components/header.svelte';
  import Ruler from '$lib/components/ruler.svelte';

  let { children } = $props();

  const isImageRoute = $derived(page.url.pathname.startsWith('/image/'));

  const IMAGE_ROUTE_RE = /^\/image\/([^/]+)\/(\d+)\/?$/;

  function tagProjectImage(slug: string, index: number) {
    const article = document.querySelector(`[data-project="${slug}"]`);
    if (!article) return;
    const link = article.querySelector(`a[data-project-image-index="${index}"]`);
    const img = link?.querySelector('img') as HTMLElement | null;
    if (img) img.style.viewTransitionName = 'project-image';
  }

  function clearProjectImageTags() {
    document
      .querySelectorAll<HTMLElement>('[data-project] a[data-project-image-index] img')
      .forEach((img) => {
        img.style.removeProperty('view-transition-name');
      });
  }

  onNavigate((navigation) => {
    if (typeof document === 'undefined' || !document.startViewTransition) return;
    if (!navigation.to || !navigation.from) return;

    const fromMatch = navigation.from.url.pathname.match(IMAGE_ROUTE_RE);
    const toMatch = navigation.to.url.pathname.match(IMAGE_ROUTE_RE);

    if (!fromMatch && !toMatch) return;

    if (toMatch && !fromMatch) {
      tagProjectImage(toMatch[1], Number(toMatch[2]));
    }

    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    return new Promise((resolve) => {
      const transition = document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
        if (fromMatch && !toMatch) {
          tagProjectImage(fromMatch[1], Number(fromMatch[2]));
        }
      });

      transition.finished.finally(() => {
        clearProjectImageTags();
        html.style.scrollBehavior = previousScrollBehavior;
      });
    });
  });

  onMount(() => {
    inject({ mode: dev ? 'development' : 'production' });
    injectSpeedInsights();
  });
</script>

<GridLines dark />
<div data-hero class="relative min-h-screen bg-surface-primary text-ink-primary">
  <div class="relative z-10">
    <Header />
    {@render children()}
  </div>
</div>
{#if !isImageRoute}
  <BottomStatus />
{/if}
<Ruler />
