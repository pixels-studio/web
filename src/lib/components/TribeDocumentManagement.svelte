<script lang="ts">
  import type { z } from 'zod';
  import type { projectSchema } from '$lib/schemas/home';

  let { content }: { content: z.infer<typeof projectSchema> } = $props();
</script>

<section class="relative z-10 flex md:min-h-dvh flex-col px-6 py-20 md:py-40">
  <div class="mx-auto w-full max-w-[1360px] flex flex-1 flex-col gap-8 md:gap-15">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12 md:items-end">
      <div class="col-span-6 md:col-span-5 flex flex-col gap-6">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>
          {content.label}
        </p>
        <h2 data-split-text class="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
          {content.heading}
        </h2>
      </div>

      <p
        data-reveal
        class="col-span-6 md:col-span-4 md:col-start-9 md:self-end text-lg leading-relaxed text-ink-secondary text-pretty"
      >
        {content.description}
      </p>
    </div>

    <enhanced:img
      src="$lib/assets/media/tribe-document-management.png"
      alt={content.image?.alt}
      class="w-full col-span-full border border-ink-primary/8 rounded-lg"
      style="mask-image: linear-gradient(to bottom, black 70%, transparent 95%); -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 95%);"
    />
  </div>
</section>
