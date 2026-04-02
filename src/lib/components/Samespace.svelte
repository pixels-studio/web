<script lang="ts">
  import type { z } from 'zod';
  import type { projectSchema } from '$lib/schemas/home';

  let { content }: { content: z.infer<typeof projectSchema> } = $props();
</script>

<section class="relative z-10 flex md:min-h-dvh flex-col px-6 py-20 md:py-40">
  <div class="mx-auto w-full max-w-[1360px] flex flex-1 flex-col gap-8 md:gap-15">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12 md:items-start">
      <p class="col-span-6 md:col-span-12 font-mono text-xs uppercase text-ink-secondary" data-reveal>{content.label}</p>

      <h2 data-split-text class="col-span-6 md:col-span-5 text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
        {content.heading}
      </h2>

      <div class="col-span-6 md:col-span-4 md:col-start-9 grid grid-cols-subgrid gap-6">
        <p
          data-reveal
          class="col-span-full text-lg leading-relaxed text-ink-secondary text-pretty"
        >
          {content.description}
        </p>
        {#if content.link}
        <a
          href={content.link?.href}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          class="col-span-full md:col-span-2 bg-surface-secondary px-5 py-2.5 font-mono text-sm text-ink-secondary uppercase tracking-wide text-center transition-colors hover:bg-white hover:text-black"
        >
          {content.link?.label}
        </a>
        {/if}
      </div>
    </div>

    <div class="mt-auto grid grid-cols-6 gap-6 md:grid-cols-12">
      <div class="col-span-6 md:col-span-8">
        <enhanced:img
          src="$lib/assets/media/samespace-01.png"
          alt={content.images?.[0]?.alt}
          class="w-full aspect-video object-cover"
        />
      </div>
      <div
        class="bg-surface-secondary w-full col-span-6 md:col-span-4 grid place-items-center"
      >
        <enhanced:img
          src="$lib/assets/media/samespace-02.png"
          alt={content.images?.[1]?.alt}
          class="col-span-6 md:col-span-4 object-cover"
        />
      </div>
    </div>
  </div>
</section>
