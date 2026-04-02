<script lang="ts">
  import type { z } from 'zod';
  import type { aboutSchema } from '$lib/schemas/home';

  let { content }: { content: z.infer<typeof aboutSchema> } = $props();
</script>

<section id="about" class="relative z-10 flex flex-col px-6 py-20 md:py-40">
  <div class="mx-auto w-full max-w-[1360px]">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12">
      <div class="col-span-6 flex flex-col md:col-span-5">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>{content.label}</p>
        <h2
          data-reveal
          class="mt-4 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
        >
          {content.heading}
        </h2>

        <div class="mt-6 md:mt-auto flex flex-col gap-5" data-reveal>
          {#each content.paragraphs as paragraph}
            <p class="text-lg leading-relaxed text-ink-secondary text-pretty">
              {paragraph}
            </p>
          {/each}
        </div>
      </div>

      <div class="col-span-6 md:col-span-4 md:col-start-9" data-reveal>
        <enhanced:img
          src="$lib/assets/media/me.png"
          alt={content.image.alt}
          class="w-full aspect-4/5 object-cover"
        />
      </div>
    </div>
  </div>
</section>
