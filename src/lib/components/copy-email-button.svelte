<script lang="ts">
  import Button from './button.svelte';
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

<Button
  type="button"
  variant="secondary"
  class="w-40"
  onclick={copyEmail}
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
</Button>
