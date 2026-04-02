<script lang="ts">
  import type { z } from 'zod';
  import type { projectSchema } from '$lib/schemas/home';

  let { content }: { content: z.infer<typeof projectSchema> } = $props();
</script>

<section
  class="relative z-10 flex md:min-h-dvh flex-col justify-center px-6 py-20 md:py-40"
>
  <div class="mx-auto w-full max-w-[1360px]">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12 md:items-center">
      <div class="col-span-6 md:col-span-5 flex flex-col gap-6">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>
          {content.label}
        </p>
        <h2
          data-split-text
          class="text-4xl md:text-6xl font-semibold leading-none tracking-tight text-pretty"
        >
          {content.heading}
        </h2>
        <p data-reveal class="text-lg leading-relaxed text-ink-secondary text-pretty">
          {content.description}
        </p>
      </div>

      <div class="col-span-6 md:col-span-6 md:col-start-7">
        <enhanced:img
          src="$lib/assets/media/tribe-communication-app.png"
          alt={content.image?.alt}
          class="w-full"
        />
      </div>
    </div>
  </div>
</section>
