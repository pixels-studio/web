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

  onMount(async () => {
    // Vercel analytics
    inject({ mode: dev ? 'development' : 'production' });
    injectSpeedInsights();

    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (isDesktop) {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis();

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          const href = anchor.getAttribute("href");
          if (!href || href === "#") return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target);
          }
        });
      });
    }
  });
</script>

<Icons />
<GridLines dark />
<Ruler />
<Header />

{@render children()}

<!-- Progressive blur bar at bottom of viewport -->
<div class="pointer-events-none fixed bottom-0 left-0 z-40 h-[64px] w-full" aria-hidden="true">
  <div class="absolute inset-0 backdrop-blur-[1px]" style="mask-image: linear-gradient(to bottom, transparent, transparent 0%, black 25%)"></div>
  <div class="absolute inset-0 backdrop-blur-[2px]" style="mask-image: linear-gradient(to bottom, transparent, transparent 25%, black 50%)"></div>
  <div class="absolute inset-0 backdrop-blur-[4px]" style="mask-image: linear-gradient(to bottom, transparent, transparent 50%, black 75%)"></div>
  <div class="absolute inset-0 backdrop-blur-[8px]" style="mask-image: linear-gradient(to bottom, transparent, transparent 75%, black 100%)"></div>
</div>

<ScrollAnimations />
