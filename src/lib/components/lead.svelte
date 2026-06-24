<script lang="ts">
  import OpenBadge from '$lib/assets/icons/open-badge.svg?raw';
  import leadYaml from '$lib/data/lead.yaml?raw';
  import { parse } from 'yaml';
  import { appear } from '$lib/actions/reveal';
  import Button from './button.svelte';
  import HexPattern from './hex-pattern.svelte';
  import ChevronRightIcon from './icons/chevron-right.svelte';

  type LeadData = {
    badge: {
      label: string;
    };
    heading: string;
    cta: {
      label: string;
      href: string;
    };
    resume: string;
  };

  const lead = parse(leadYaml) as LeadData;
</script>

<section data-hex-pattern-area class="relative isolate overflow-hidden px-6 py-24 md:py-30">
  <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
    <HexPattern />
  </div>

  <div class="relative z-10 mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-10 md:col-start-4 md:col-end-12">
      <span
        class="block w-44 text-ink-primary md:w-56"
        role="img"
        aria-label={lead.badge.label}
        data-reveal
        style="--reveal-y: 24px; --reveal-blur: 8px"
        use:appear={{ delay: 0 }}
      >
        {@html OpenBadge}
      </span>

      <h1
        class="text-pretty text-4xl font-semibold sm:text-6xl md:text-7xl"
        data-reveal
        style="--reveal-y: 24px; --reveal-blur: 8px"
        use:appear={{ delay: 120 }}
      >
        {lead.heading}
      </h1>

      <div
        class="flex flex-wrap items-center gap-4 md:gap-6"
        data-reveal
        style="--reveal-y: 24px; --reveal-blur: 8px"
        use:appear={{ delay: 260 }}
      >
        <Button href={lead.cta.href} variant="primary" class="min-w-40 flex-1 sm:flex-none">
          <span>{lead.cta.label}</span>
          <span class="flex size-5 items-center justify-center">
            <ChevronRightIcon />
          </span>
        </Button>

        <Button
          href={lead.resume}
          variant="secondary"
          class="w-40 flex-1 sm:flex-none"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>View resume</span>
          <span class="flex size-5 items-center justify-center">
            <ChevronRightIcon />
          </span>
        </Button>
      </div>
    </div>
  </div>
</section>
