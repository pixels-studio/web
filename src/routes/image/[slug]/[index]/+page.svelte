<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/button.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  function close() {
    if (typeof history !== 'undefined' && history.length > 1) {
      history.back();
    } else {
      goto('/#work');
    }
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }
</script>

<svelte:head>
  <title>{data.image.alt} — {data.projectTitle}</title>
</svelte:head>

<svelte:window on:keydown={onKey} />

<div
  class="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black p-4 sm:p-8"
  onclick={close}
  role="presentation"
>
  <div
    class="absolute top-4 right-4 z-10 cursor-auto"
    onclick={(e) => e.stopPropagation()}
    role="presentation"
  >
    <Button
      variant="secondary"
      onclick={close}
      aria-label="Close"
      class="h-10 w-10 justify-center !p-0"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-5 w-5">
        <path
          d="M16.793 5.79289C17.1835 5.40237 17.8165 5.40237 18.207 5.79289C18.5975 6.18342 18.5975 6.81643 18.207 7.20696L13.414 11.9999L18.207 16.7929C18.5975 17.1834 18.5975 17.8164 18.207 18.207C17.8165 18.5975 17.1835 18.5975 16.793 18.207L12 13.414L7.20702 18.207C6.81649 18.5975 6.18348 18.5975 5.79295 18.207C5.40243 17.8164 5.40243 17.1834 5.79295 16.7929L10.5859 11.9999L5.79295 7.20696C5.40243 6.81643 5.40243 6.18342 5.79295 5.79289C6.18348 5.40237 6.81649 5.40237 7.20702 5.79289L12 10.5859L16.793 5.79289Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  </div>

  <enhanced:img
    src={data.picture}
    alt={data.image.alt}
    class="image w-full max-w-320 max-h-full rounded-lg object-contain"
  />
</div>

<style>
  :global(html:has(.image)) {
    background: #000;
  }

  .image {
    view-transition-name: project-image;
  }
</style>
