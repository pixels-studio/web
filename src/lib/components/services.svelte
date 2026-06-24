<script lang="ts">
  import BrowserIcon from '$lib/assets/icons/services/browser.svg?raw';
  import DesignSystemIcon from '$lib/assets/icons/services/design-system.svg?raw';
  import MonitorIcon from '$lib/assets/icons/services/monitor.svg?raw';
  import PhoneIcon from '$lib/assets/icons/services/phone.svg?raw';
  import RefineIcon from '$lib/assets/icons/services/refine.svg?raw';
  import SparkleIcon from '$lib/assets/icons/services/sparkle.svg?raw';
  import TabletIcon from '$lib/assets/icons/services/tablet.svg?raw';
  import servicesYaml from '$lib/data/services.yaml?raw';
  import { parse } from 'yaml';
  import Button from './button.svelte';
  import Badge from './badge.svelte';
  import ChevronRightIcon from './icons/chevron-right.svelte';

  const featureIcons: Record<string, string> = {
    monitor: MonitorIcon,
    browser: BrowserIcon,
    tablet: TabletIcon,
    phone: PhoneIcon,
    sparkle: SparkleIcon,
    'design-system': DesignSystemIcon,
    refine: RefineIcon
  };

  type Plan = {
    id: string;
    eyebrow: string;
    summary: string;
    price: string;
    features: { label: string; icon: string }[];
    cta: {
      label: string;
      href: string;
    };
  };

  type ServicesData = {
    heading: string;
    title: string;
    description: string;
    plans: Plan[];
  };

  const data = parse(servicesYaml) as ServicesData;
</script>

<section id="services" class="relative px-6 pb-24 md:pb-30">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-16 md:col-start-4 md:col-end-12">
      <header class="flex flex-col gap-10">
        <Badge>{data.heading}</Badge>
        <h2 class="text-pretty text-4xl leading-none font-semibold text-ink-primary md:text-6xl">
          {data.title}
        </h2>
      </header>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        {#each data.plans as plan (plan.id)}
          <article
            class="relative flex flex-col gap-12 border border-dashed border-ink-primary/16 p-8 text-ink-primary md:p-10"
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
              <p class="mt-1 text-base font-medium text-ink-primary">{plan.price}</p>
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
                  <span class="text-pretty">{feature.label}</span>
                </li>
              {/each}
            </ul>

            <Button href={plan.cta.href} variant="primary" class="mt-auto w-full justify-between">
              <span>{plan.cta.label}</span>
              <span class="flex size-5 items-center justify-center">
                <ChevronRightIcon />
              </span>
            </Button>
          </article>
        {/each}
      </div>

    </div>
  </div>
</section>
