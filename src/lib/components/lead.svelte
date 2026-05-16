<script lang="ts">
  import OpenBadge from '$lib/assets/icons/open-badge.svg?raw';
  import leadYaml from '$lib/data/lead.yaml?raw';
  import { parse } from 'yaml';
  import CopyEmailButton from './copy-email-button.svelte';
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

<section class="px-6 py-40">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
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
        <a
          href={lead.cta.href}
          class="flex h-10 min-w-40 items-center justify-between rounded-full bg-ink-primary pr-3 pl-5 text-xs font-semibold tracking-wide text-surface-primary uppercase transition-colors duration-200"
        >
          <span>{lead.cta.label}</span>
          <span class="flex size-6 items-center justify-center">
            <ArrowRightIcon />
          </span>
        </a>

        <CopyEmailButton email={lead.email} />
      </div>
    </div>
  </div>
</section>
