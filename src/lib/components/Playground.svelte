<section id="playground" class="relative z-10 flex flex-col px-6 py-20 md:py-40">
  <div class="mx-auto w-full max-w-[1360px] flex flex-col gap-16 md:gap-30">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12">
      <div class="col-span-6 flex flex-col gap-4 md:col-span-5">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>Playground</p>
        <h2 data-split-text class="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
          Design explorations and experiments
        </h2>
      </div>
    </div>
  </div>

  <!-- Mobile: grid -->
  <div class="grid grid-cols-1 gap-3 mt-8 md:hidden">
    <enhanced:img src="$lib/assets/media/claude-memory.png" alt="Claude Memory" class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/photography-portfolio.png" alt="Photography Portfolio" class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/sleep-app.png" alt="Sleep App" class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/app-installation-ui.png" alt="App Installation UI" class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/new-tax-application.png" alt="New Tax Application" class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/resolve-accounts-list.png" alt="Resolve Accounts List" class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/resolve-bot.png" alt="Resolve Bot" class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/ticketing-app.png" alt="Ticketing App" class="w-full aspect-video object-cover rounded-sm" />
    <enhanced:img src="$lib/assets/media/origon-welcome.png" alt="Origon Welcome" class="w-full aspect-video object-cover rounded-sm" />
  </div>

  <!-- Desktop: marquee -->
  <div class="hidden md:block overflow-hidden mt-30">
    <div class="marquee-track flex gap-6 will-change-transform">
      {#each Array(2) as _}
        <enhanced:img src="$lib/assets/media/claude-memory.png" alt="Claude Memory" class="marquee-img aspect-video object-cover shrink-0" />
        <enhanced:img src="$lib/assets/media/photography-portfolio.png" alt="Photography Portfolio" class="marquee-img aspect-video object-cover shrink-0" />
        <enhanced:img src="$lib/assets/media/sleep-app.png" alt="Sleep App" class="marquee-img aspect-video object-cover shrink-0" />
        <enhanced:img src="$lib/assets/media/app-installation-ui.png" alt="App Installation UI" class="marquee-img aspect-video object-cover shrink-0" />
        <enhanced:img src="$lib/assets/media/new-tax-application.png" alt="New Tax Application" class="marquee-img aspect-video object-cover shrink-0" />
        <enhanced:img src="$lib/assets/media/resolve-accounts-list.png" alt="Resolve Accounts List" class="marquee-img aspect-video object-cover shrink-0" />
        <enhanced:img src="$lib/assets/media/resolve-bot.png" alt="Resolve Bot" class="marquee-img aspect-video object-cover shrink-0" />
        <enhanced:img src="$lib/assets/media/ticketing-app.png" alt="Ticketing App" class="marquee-img aspect-video object-cover shrink-0" />
        <enhanced:img src="$lib/assets/media/origon-welcome.png" alt="Origon Welcome" class="marquee-img aspect-video object-cover shrink-0" />
      {/each}
    </div>
  </div>

  <div class="mx-auto w-full max-w-[1360px] mt-16 md:mt-30">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12">
      <p
        data-reveal
        class="col-span-6 md:col-span-4 md:col-start-9 text-lg leading-relaxed text-ink-secondary text-pretty"
      >
        A space for practicing new concepts and exploring new tools — ideas
        take shape here in design before they become real products. Some move
        forward. Some stay as studies. Each one sharpens the thinking behind
        the work and informs what gets built next.
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
  .marquee-img {
    width: calc((min(1464px, 100vw - 3rem) - 11 * 1.5rem) / 12 * 4 + 3 * 1.5rem);
  }
</style>
