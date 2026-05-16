<script lang="ts">
  import OpenBadge from '$lib/assets/icons/open-badge.svg?raw';
  import leadYaml from '$lib/data/lead.yaml?raw';
  import { parse } from 'yaml';
  import Button from './button.svelte';
  import CopyEmailButton from './copy-email-button.svelte';
  import HexPattern from './hex-pattern.svelte';
  import ArrowRightIcon from './icons/arrow-right.svelte';

  type LeadData = {
    badge: {
      label: string;
    };
    heading: string;
    cta: {
      label: string;
      href: string;
    };
    email: string;
  };

  const lead = parse(leadYaml) as LeadData;
</script>

<section data-hex-pattern-area class="relative isolate overflow-hidden px-6 py-40">
  <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
    <HexPattern />
  </div>

  <div class="relative z-10 mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-10 md:col-start-4 md:col-end-12">
      <span
        class="block w-56 text-ink-primary"
        role="img"
        aria-label={lead.badge.label}
      >
        {@html OpenBadge}
      </span>

      <h1 class="text-pretty text-7xl font-semibold">
        {lead.heading}
      </h1>

      <div class="flex flex-wrap items-center gap-6">
        <Button href={lead.cta.href} variant="accent" class="min-w-40">
          <span>{lead.cta.label}</span>
          <span class="flex size-6 items-center justify-center">
            <ArrowRightIcon />
          </span>
        </Button>

        <CopyEmailButton email={lead.email} />
      </div>
    </div>
  </div>
</section>
