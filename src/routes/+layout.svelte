<script lang="ts">
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import '../app.css';
  import Icons from '$lib/components/Icons.svelte';
  import GridLines from '$lib/components/GridLines.svelte';
  import Ruler from '$lib/components/Ruler.svelte';
  import Header from '$lib/components/Header.svelte';
  import ScrollAnimations from '$lib/components/ScrollAnimations.svelte';

  let { children } = $props();

  onMount(() => {
    inject({ mode: dev ? 'development' : 'production' });
    injectSpeedInsights();

    let isUnmounted = false;
    let cleanup: () => void = () => {};

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const cleanupFns: Array<() => void> = [];

      let lenis: InstanceType<typeof import('lenis').default> | null = null;
      let tickerFn: ((time: number) => void) | null = null;

      if (isDesktop) {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis();

        lenis.on("scroll", ScrollTrigger.update);

        tickerFn = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
          const onClick = (e: MouseEvent) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (target instanceof HTMLElement) {
              e.preventDefault();
              lenis?.scrollTo(target);
            }
          };

          anchor.addEventListener("click", onClick);
          cleanupFns.push(() => anchor.removeEventListener("click", onClick));
        });
      }

      cleanup = () => {
        cleanupFns.forEach((fn) => fn());
        lenis?.destroy();
        if (tickerFn) gsap.ticker.remove(tickerFn);
      };

      if (isUnmounted) cleanup();
    })().catch((error) => {
      console.error("Failed to initialize layout animations", error);
    });

    return () => {
      isUnmounted = true;
      cleanup();
    };
  });
</script>

<Icons />
<GridLines dark />
<Ruler />
<Header />

{@render children()}

<!-- Progressive blur bar at bottom of viewport -->
<div class="pointer-events-none fixed bottom-0 left-0 z-40 hidden h-[64px] w-full md:block" aria-hidden="true">
  <div class="absolute inset-0 backdrop-blur-[1px]" style="mask-image: linear-gradient(to bottom, transparent, transparent 0%, black 25%)"></div>
  <div class="absolute inset-0 backdrop-blur-[2px]" style="mask-image: linear-gradient(to bottom, transparent, transparent 25%, black 50%)"></div>
  <div class="absolute inset-0 backdrop-blur-[4px]" style="mask-image: linear-gradient(to bottom, transparent, transparent 50%, black 75%)"></div>
  <div class="absolute inset-0 backdrop-blur-[8px]" style="mask-image: linear-gradient(to bottom, transparent, transparent 75%, black 100%)"></div>
</div>

<ScrollAnimations />
