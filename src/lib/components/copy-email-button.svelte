<script lang="ts">
  import CheckIcon from './icons/check.svelte';
  import CopyIcon from './icons/copy.svelte';

  let { email, label = 'Copy email' }: { email: string; label?: string } = $props();

  let copied = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  async function copyEmail() {
    await navigator.clipboard.writeText(email);

    copied = true;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copied = false;
    }, 1800);
  }
</script>

<button
  type="button"
  onclick={copyEmail}
  class="flex h-10 w-40 items-center justify-between rounded-full ring-2 ring-primary ring-inset pr-3 pl-5 text-xs font-semibold tracking-wide uppercase transition-colors duration-200 hover:bg-ink-primary hover:text-surface-primary"
  aria-label={`Copy ${email}`}
>
  <span>{copied ? 'Copied' : label}</span>
  <span class="flex size-6 items-center justify-center">
    {#if copied}
      <CheckIcon />
    {:else}
      <CopyIcon />
    {/if}
  </span>
</button>
