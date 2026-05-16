<script lang="ts">
  import OpenBadge from '$lib/assets/icons/open-badge.svg?raw';
  import CopyEmailButton from './copy-email-button.svelte';
  import ArrowRightIcon from './icons/arrow-right.svelte';

  const email = 'hello@pixels.studio';
</script>

<section class="px-6 py-40">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-10 md:col-start-4 md:col-end-11">
      <span
        class="block w-45 text-ink-primary [&_svg]:h-auto [&_svg]:w-full"
        role="img"
        aria-label="Open for new opportunities"
      >
        {@html OpenBadge}
      </span>

      <h1 class="text-pretty text-7xl font-semibold">
        Design partner who ships, Concept to Code.
      </h1>

      <div class="flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${email}`}
          class="inline-flex h-10 min-w-40 items-center justify-center gap-8 rounded-full bg-ink-primary py-0 pr-3 pl-5 text-xs font-semibold tracking-wide text-surface-primary uppercase transition-opacity duration-200 hover:opacity-80"
        >
          <span>Let's talk</span>
          <ArrowRightIcon />
        </a>

        <CopyEmailButton {email} />
      </div>
    </div>
  </div>
</section>
