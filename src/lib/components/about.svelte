<script lang="ts">
  import meImage from '$lib/assets/media/me.png?enhanced';
  import aboutYaml from '$lib/data/about.yaml?raw';
  import { parse } from 'yaml';
  import Badge from './badge.svelte';

  type AboutData = {
    label: string;
    heading: string;
    paragraphs: string[];
    image: {
      alt: string;
    };
  };

  const data = parse(aboutYaml) as AboutData;
</script>

<section id="information" class="relative px-6 pb-24 md:pb-40">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 grid grid-cols-1 gap-6 md:col-start-4 md:col-end-12 md:grid-cols-8">
      <div class="flex flex-col gap-10 md:col-span-4">
        <header class="flex flex-col gap-10">
          <Badge>{data.label}</Badge>
          <h2 class="text-pretty text-4xl leading-none font-semibold text-ink-primary md:text-6xl">
            {data.heading}
          </h2>
        </header>

        <div class="mt-auto flex flex-col gap-6">
          {#each data.paragraphs as paragraph}
            <p class="text-base leading-7 text-pretty text-ink-secondary md:text-lg">
              {paragraph}
            </p>
          {/each}
        </div>
      </div>
      <div class="md:col-span-4">
        <enhanced:img
          class="w-full border border-white/10"
          src={meImage}
          alt={data.image.alt}
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>
