<script lang="ts">
  import type { z } from 'zod';
  import type { playgroundSchema } from '$lib/schemas/home';

  let { content }: { content: z.infer<typeof playgroundSchema> } = $props();
</script>

<section id="playground" class="relative z-10 flex flex-col px-6 py-20 md:py-40">
  <div class="mx-auto w-full max-w-[1360px] flex flex-col gap-16 md:gap-30">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12">
      <div class="col-span-6 flex flex-col gap-4 md:col-span-5">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>{content.label}</p>
        <h2 data-split-text class="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
          {content.heading}
        </h2>
      </div>
    </div>
  </div>

  <!-- Mobile: grid -->
  <div class="grid grid-cols-1 gap-3 mt-8 md:hidden">
    <enhanced:img src="$lib/assets/media/claude-memory.png" alt={content.items[0].alt} class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/photography-portfolio.png" alt={content.items[1].alt} class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/sleep-app.png" alt={content.items[2].alt} class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/app-installation-ui.png" alt={content.items[3].alt} class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/new-tax-application.png" alt={content.items[4].alt} class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/resolve-accounts-list.png" alt={content.items[5].alt} class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/resolve-bot.png" alt={content.items[6].alt} class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/ticketing-app.png" alt={content.items[7].alt} class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/origon-welcome.png" alt={content.items[8].alt} class="w-full aspect-video object-cover rounded-sm" />
  </div>

  <!-- Desktop: marquee -->
  <div class="hidden md:block overflow-hidden mt-30">
    <div class="marquee-track flex gap-6 will-change-transform">
      {#each Array(2) as _}
        <div class="marquee-item shrink-0"><enhanced:img src="$lib/assets/media/claude-memory.png" alt={content.items[0].alt} class="w-full aspect-video object-cover" /></div>
        <div class="marquee-item shrink-0"><enhanced:img src="$lib/assets/media/photography-portfolio.png" alt={content.items[1].alt} class="w-full aspect-video object-cover" /></div>
        <div class="marquee-item shrink-0"><enhanced:img src="$lib/assets/media/sleep-app.png" alt={content.items[2].alt} class="w-full aspect-video object-cover" /></div>
        <div class="marquee-item shrink-0"><enhanced:img src="$lib/assets/media/app-installation-ui.png" alt={content.items[3].alt} class="w-full aspect-video object-cover" /></div>
        <div class="marquee-item shrink-0"><enhanced:img src="$lib/assets/media/new-tax-application.png" alt={content.items[4].alt} class="w-full aspect-video object-cover" /></div>
        <div class="marquee-item shrink-0"><enhanced:img src="$lib/assets/media/resolve-accounts-list.png" alt={content.items[5].alt} class="w-full aspect-video object-cover" /></div>
        <div class="marquee-item shrink-0"><enhanced:img src="$lib/assets/media/resolve-bot.png" alt={content.items[6].alt} class="w-full aspect-video object-cover" /></div>
        <div class="marquee-item shrink-0"><enhanced:img src="$lib/assets/media/ticketing-app.png" alt={content.items[7].alt} class="w-full aspect-video object-cover" /></div>
        <div class="marquee-item shrink-0"><enhanced:img src="$lib/assets/media/origon-welcome.png" alt={content.items[8].alt} class="w-full aspect-video object-cover" /></div>
      {/each}
    </div>
  </div>

  <div class="mx-auto w-full max-w-[1360px] mt-16 md:mt-30">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12">
      <p
        data-reveal
        class="col-span-6 md:col-span-4 md:col-start-9 text-lg leading-relaxed text-ink-secondary text-pretty"
      >
        {content.description}
      </p>
    </div>
  </div>
</section>

<style>
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    animation: marquee 40s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
  .marquee-item {
    width: calc((min(1464px, 100vw - 3rem) - 11 * 1.5rem) / 12 * 4 + 3 * 1.5rem);
  }
</style>
