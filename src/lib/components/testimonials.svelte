<script lang="ts">
  import testimonialsYaml from '$lib/data/testimonials.yaml?raw';
  import rajaImage from '$lib/assets/media/raja-sandhu.png?enhanced';
  import { parse } from 'yaml';
  import Badge from './badge.svelte';

  type Testimonial = {
    quote: string;
    name: string;
    role: string;
    image: string;
  };

  type TestimonialsData = {
    heading: string;
    title: string;
    testimonials: Testimonial[];
  };

  const data = parse(testimonialsYaml) as TestimonialsData;

  const images: Record<string, typeof rajaImage> = {
    raja: rajaImage
  };
</script>

<section id="testimonials" class="relative px-6 pb-24 md:pb-40">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-8 md:col-start-4 md:col-end-12 md:gap-16">
      <header class="flex flex-col gap-10">
        <Badge>{data.heading}</Badge>
        <h2 class="text-pretty text-4xl leading-none font-semibold text-ink-primary md:text-6xl">
          {data.title}
        </h2>
      </header>

      {#each data.testimonials as testimonial}
        <figure
          class="flex flex-col gap-6 border-y border-dashed border-ink-primary/16 py-6 md:py-12"
        >
          <blockquote
            class="text-pretty text-2xl leading-9 font-normal text-ink-secondary md:text-3xl md:leading-10"
          >
            <span aria-hidden="true" class="text-ink-secondary">“</span>{testimonial.quote}<span
              aria-hidden="true"
              class="text-ink-secondary">”</span
            >
          </blockquote>

          <figcaption class="flex items-center gap-4">
            <enhanced:img
              class="size-12 rounded-full border border-white/10 object-cover"
              src={images[testimonial.image]}
              alt={testimonial.name}
              loading="lazy"
            />
            <div class="flex flex-col">
              <span class="text-base font-medium text-ink-primary">{testimonial.name}</span>
              <span class="text-sm text-ink-secondary">{testimonial.role}</span>
            </div>
          </figcaption>
        </figure>
      {/each}
    </div>
  </div>
</section>
