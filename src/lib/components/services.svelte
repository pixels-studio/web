<script lang="ts">
  import BrowserIcon from '$lib/assets/icons/services/browser.svg?raw';
  import ChartIcon from '$lib/assets/icons/services/chart.svg?raw';
  import ClockIcon from '$lib/assets/icons/services/clock.svg?raw';
  import FounderIcon from '$lib/assets/icons/services/founder.svg?raw';
  import InfinityIcon from '$lib/assets/icons/services/infinity.svg?raw';
  import MonitorIcon from '$lib/assets/icons/services/monitor.svg?raw';
  import PhoneIcon from '$lib/assets/icons/services/phone.svg?raw';
  import TabletIcon from '$lib/assets/icons/services/tablet.svg?raw';
  import servicesYaml from '$lib/data/services.yaml?raw';
  import { parse } from 'yaml';
  import Button from './button.svelte';
  import Badge from './badge.svelte';
  import ChevronRightIcon from './icons/chevron-right.svelte';
  import PlusIcon from './icons/plus.svelte';

  const featureIcons: Record<string, string> = {
    founder: FounderIcon,
    infinity: InfinityIcon,
    clock: ClockIcon,
    monitor: MonitorIcon,
    browser: BrowserIcon,
    tablet: TabletIcon,
    phone: PhoneIcon,
    chart: ChartIcon
  };

  type Plan = {
    id: string;
    eyebrow: string;
    summary: string;
    price: string;
    priceSuffix: string;
    features: { label: string; icon: string }[];
    cta: {
      label: string;
      href: string;
    };
  };

  type Faq = {
    question: string;
    answer: string;
  };

  type ServicesData = {
    heading: string;
    title: string;
    description: string;
    plans: Plan[];
    faqs: Faq[];
  };

  const data = parse(servicesYaml) as ServicesData;

  let openFaq = $state<number | null>(null);

  function toggleFaq(index: number) {
    openFaq = openFaq === index ? null : index;
  }
</script>

<section id="services" class="relative px-6 pb-40">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-16 md:col-start-4 md:col-end-12">
      <header class="flex flex-col gap-5">
        <Badge>{data.heading}</Badge>
        <h2 class="text-pretty text-5xl leading-none font-semibold text-ink-primary md:text-6xl">
          {data.title}
        </h2>
        <p class="max-w-2xl text-pretty text-lg leading-8 text-ink-secondary">
          {data.description}
        </p>
      </header>

      <div class="flex flex-col">
        {#each data.plans as plan (plan.id)}
          <article
            class="relative grid grid-cols-1 gap-x-16 gap-y-16 border border-dashed border-ink-primary/20 p-8 text-ink-primary not-first:border-t-0 md:grid-cols-2 md:p-10"
          >
            <span
              class="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 bg-ink-primary ring-1 ring-surface-primary"
              aria-hidden="true"
            ></span>
            <span
              class="absolute top-0 right-0 size-1.5 -translate-y-1/2 translate-x-1/2 bg-ink-primary ring-1 ring-surface-primary"
              aria-hidden="true"
            ></span>
            <span
              class="absolute bottom-0 left-0 size-1.5 -translate-x-1/2 translate-y-1/2 bg-ink-primary ring-1 ring-surface-primary"
              aria-hidden="true"
            ></span>
            <span
              class="absolute right-0 bottom-0 size-1.5 translate-x-1/2 translate-y-1/2 bg-ink-primary ring-1 ring-surface-primary"
              aria-hidden="true"
            ></span>
            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-medium">{plan.eyebrow}</h3>
              <p class="text-base leading-6 text-ink-secondary">
                {plan.summary}
              </p>
            </div>

            <ul class="flex flex-col gap-3">
              {#each plan.features as feature}
                <li class="flex items-center gap-3 text-ink-secondary">
                  <span
                    class="flex size-5 items-center justify-center text-ink-secondary [&>svg]:size-5"
                    aria-hidden="true"
                  >
                    {@html featureIcons[feature.icon]}
                  </span>
                  <span>{feature.label}</span>
                </li>
              {/each}
            </ul>

            <div class="flex items-baseline gap-2 self-end">
              <span class="text-6xl font-medium tracking-tight">{plan.price}</span>
              <span class="text-sm text-ink-secondary">{plan.priceSuffix}</span>
            </div>

            <Button href={plan.cta.href} variant="primary" class="min-w-40 self-end justify-self-start">
              <span>{plan.cta.label}</span>
              <span class="flex size-5 items-center justify-center">
                <ChevronRightIcon />
              </span>
            </Button>
          </article>
        {/each}
      </div>

      {#if data.faqs.length}
        <div class="flex flex-col gap-10">
          <ul class="flex flex-col border-t border-dashed border-white/20">
            {#each data.faqs as faq, index}
              {@const isOpen = openFaq === index}
              <li class="border-b border-dashed border-white/20">
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  onclick={() => toggleFaq(index)}
                >
                  <span class="text-base font-medium text-ink-primary md:text-lg">
                    {faq.question}
                  </span>
                  <span
                    class={[
                      'flex size-6 shrink-0 items-center justify-center text-ink-secondary transition-transform duration-200',
                      isOpen && 'rotate-45'
                    ]}
                  >
                    <PlusIcon />
                  </span>
                </button>
                <div class="faq-answer overflow-hidden" data-open={isOpen}>
                  <p class="max-w-2xl pb-6 text-base leading-7 text-ink-secondary">
                    {faq.answer}
                  </p>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .faq-answer {
    interpolate-size: allow-keywords;
    height: 0;
    transition: height 200ms ease;
  }
  .faq-answer[data-open='true'] {
    height: auto;
  }
</style>
