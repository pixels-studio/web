<script lang="ts">
  import OpenBadge from '$lib/assets/icons/open-badge.svg?raw';
  import leadYaml from '$lib/data/lead.yaml?raw';
  import { parse } from 'yaml';
  import Button from './button.svelte';
  import HexPattern from './hex-pattern.svelte';
  import ArrowRightIcon from './icons/arrow-right.svelte';
  import CheckIcon from './icons/check.svelte';
  import CopyIcon from './icons/copy.svelte';

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

  let copied = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  async function copyEmail() {
    await navigator.clipboard.writeText(lead.email);

    copied = true;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copied = false;
    }, 1800);
  }
</script>

<section data-hex-pattern-area class="relative isolate overflow-hidden px-6 py-24 md:py-40">
  <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
    <HexPattern />
  </div>

  <div class="relative z-10 mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-10 md:col-start-4 md:col-end-12">
      <span
        class="block w-44 text-ink-primary md:w-56"
        role="img"
        aria-label={lead.badge.label}
      >
        {@html OpenBadge}
      </span>

      <h1 class="text-pretty text-4xl font-semibold sm:text-6xl md:text-7xl">
        {lead.heading}
      </h1>

      <div class="flex flex-wrap items-center gap-4 md:gap-6">
        <Button href={lead.cta.href} variant="primary" class="min-w-40 flex-1 sm:flex-none">
          <span>{lead.cta.label}</span>
          <span class="flex size-5 items-center justify-center">
            <ArrowRightIcon />
          </span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          class="w-40 flex-1 sm:flex-none"
          onclick={copyEmail}
          aria-label={`Copy ${lead.email}`}
        >
          <span>{copied ? 'Copied' : 'Copy email'}</span>
          <span class="flex size-5 items-center justify-center">
            {#if copied}
              <CheckIcon />
            {:else}
              <CopyIcon />
            {/if}
          </span>
        </Button>
      </div>
    </div>
  </div>
</section>
