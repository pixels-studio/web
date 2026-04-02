<script lang="ts">
  import { socials } from '$lib/routes';

  import samespace from '$lib/assets/logos/samespace.svg?raw';
  import origon from '$lib/assets/logos/origon.svg?raw';
  import tlkn from '$lib/assets/logos/tlkn.svg?raw';
  import pulse from '$lib/assets/logos/pulse.svg?raw';
  import taxgermany from '$lib/assets/logos/taxgermany.svg?raw';
  import wbp from '$lib/assets/logos/wbp.svg?raw';

  const logos = [
    { svg: samespace, class: "h-6 w-auto" },
    { svg: origon, class: "h-8 w-auto" },
    { svg: tlkn, class: "h-6 w-auto" },
    { svg: pulse, class: "h-5 w-auto" },
    { svg: taxgermany, class: "w-auto h-6" },
    { svg: wbp, class: "h-7 w-12" },
  ];

  const testimonials = [
    {
      quote:
        "I had a memorable time working with Abhishek; his grasp on UI and UX design theory was evident. He was a notable asset to the tlkn app with relentless motivation towards creating a perfect product.",
      name: "Raja Sandhu",
      role: "Co-Founder, tlkn Inc.",

      variant: "light" as const,
      span: "col-span-6 md:col-span-8",
    },
    {
      quote:
        "Abhishek is a versatile designer with great work ethic and strong problem solving skills.",
      name: "Karthik Iyenger",
      role: "Co-Founder, wbp",

      variant: "dark" as const,
      span: "col-span-6 md:col-span-4",
    },
  ];
</script>

<section id="contact" class="relative z-10 flex md:min-h-dvh flex-col px-6 py-20 md:py-40">
  <div class="mx-auto flex w-full max-w-[1360px] flex-col">
    <h2
      data-split-text
      class="mb-16 md:mb-30 text-pretty text-balance text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.05] tracking-tight md:max-w-[80%]"
    >
      Let's build something that ships.
    </h2>

    <div
      class="grid grid-cols-6 gap-6 mb-15 md:grid-cols-12"
      data-reveal-stagger
    >
      <!-- Testimonial 1: Raja Sandhu -->
      <div class="col-span-6 md:col-span-8 flex flex-col justify-start gap-16 md:gap-30 p-6 md:p-12 bg-[#A3A3A3] text-surface-primary">
        <p class="text-lg md:text-3xl font-medium leading-snug text-pretty">{testimonials[0].quote}</p>
        <div class="flex items-center gap-3 mt-auto">
          <enhanced:img src="$lib/assets/media/raja-sandhu.png" alt="Raja Sandhu" class="size-10 object-cover" />
          <div>
            <p class="font-medium">{testimonials[0].name}</p>
            <p class="text-surface-primary/60">{testimonials[0].role}</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 2: Karthik Iyenger -->
      <div class="col-span-6 md:col-span-4 flex flex-col justify-start gap-16 md:gap-30 p-6 md:p-12 bg-surface-secondary text-ink-primary">
        <p class="text-lg md:text-3xl font-medium leading-snug text-pretty">{testimonials[1].quote}</p>
        <div class="flex items-center gap-3 mt-auto">
          <enhanced:img src="$lib/assets/media/karthik-iyenger.png" alt="Karthik Iyenger" class="size-10 object-cover" />
          <div>
            <p class="font-medium">{testimonials[1].name}</p>
            <p class="text-ink-secondary">{testimonials[1].role}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-16 md:gap-30">
      <div class="hidden md:grid grid-cols-6 gap-6 md:grid-cols-12" data-reveal-stagger>
        {#each logos as { svg, class: className }}
          <div class="col-span-3 flex min-h-20 items-center justify-center md:col-span-2">
            <span class="{className} opacity-40 [&>svg]:h-full [&>svg]:w-auto">{@html svg}</span>
          </div>
        {/each}
      </div>

      <div class="grid grid-cols-6 items-end gap-16 md:gap-6 md:grid-cols-12">
        <div class="col-span-6 flex flex-col gap-4" data-reveal>
          <p class="font-mono text-xs uppercase text-ink-secondary">
            Available for new opportunities
          </p>
          <a
            href="mailto:hello@pixels.studio"
            class="text-3xl md:text-6xl font-semibold leading-tight tracking-tight break-all md:break-normal"
          >
            hello@pixels.studio
          </a>
        </div>

        <div
          class="col-span-6 flex flex-col gap-4 md:col-span-4 md:col-start-9"
          data-reveal
        >
          <p class="font-mono text-xs uppercase text-ink-secondary">Social</p>
          <div class="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3">
            {#each socials as { label, href }}
              <a
                {href}
                target="_blank"
                rel="noopener noreferrer"
                class="text-lg hover:text-ink-secondary transition-colors"
              >
                {label}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
