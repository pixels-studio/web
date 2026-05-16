<script lang="ts">
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
  class="inline-flex h-10 min-w-40 items-center justify-center gap-8 rounded-full border-2 border-ink-primary py-0 pr-3 pl-5 text-xs font-semibold tracking-wide uppercase transition-colors duration-200 hover:bg-ink-primary hover:text-surface-primary"
  aria-label={`Copy ${email}`}
>
  <span>{copied ? 'Copied' : label}</span>
  <CopyIcon />
</button>
