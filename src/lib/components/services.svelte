<script lang="ts">
  import ServicesBadge from '$lib/assets/icons/services-badge.svg?raw';
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
  import ArrowRightIcon from './icons/arrow-right.svelte';
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
        <span
          class="block w-fit text-ink-primary [&>svg]:h-6 [&>svg]:w-auto"
          role="img"
          aria-label={data.heading}
        >
          {@html ServicesBadge}
        </span>
        <h2 class="text-pretty text-5xl leading-none font-semibold text-ink-primary md:text-6xl">
          {data.title}
        </h2>
        <p class="max-w-2xl text-pretty text-lg leading-8 text-ink-secondary">
          {data.description}
        </p>
      </header>

      <div class="flex flex-col gap-5">
        {#each data.plans as plan, index (plan.id)}
          <article
            class={[
              'grid grid-cols-1 gap-x-16 gap-y-16 rounded-lg bg-surface-secondary p-8 text-ink-primary md:grid-cols-2 md:p-10',
              index === 0 && 'inset-ring-2 inset-ring-accent'
            ]}
          >
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

            <Button href={plan.cta.href} variant="accent" class="w-full self-end">
              <span>{plan.cta.label}</span>
              <span class="flex size-6 items-center justify-center">
                <ArrowRightIcon />
              </span>
            </Button>
          </article>
        {/each}
      </div>

      {#if data.faqs.length}
        <div class="flex flex-col gap-10">
          <ul class="flex flex-col border-t border-white/10">
            {#each data.faqs as faq, index}
              {@const isOpen = openFaq === index}
              <li class="border-b border-white/10">
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
                      'flex size-6 shrink-0 items-center justify-center text-ink-primary transition-transform duration-200',
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
