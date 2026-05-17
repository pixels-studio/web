<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  type Variant = 'primary' | 'accent' | 'secondary' | 'outline' | 'link';
  type Size = 'sm' | 'md' | 'lg';

  type CommonProps = {
    variant?: Variant;
    size?: Size;
    class?: string;
    children: Snippet;
  };

  type Props = CommonProps &
    (
      | ({ href: string; onclick?: never } & Omit<HTMLAnchorAttributes, 'href' | 'class'>)
      | ({ href?: never; onclick?: HTMLButtonAttributes['onclick'] } & Omit<
          HTMLButtonAttributes,
          'onclick' | 'class'
        >)
    );

  let {
    variant = 'primary',
    size = 'md',
    href,
    class: className = '',
    children,
    ...rest
  }: Props = $props();

  const isLink = variant === 'link';

  const base = isLink
    ? 'inline-flex cursor-pointer items-center text-ink-primary underline underline-offset-8 decoration-ink-primary/30 transition-colors duration-200 hover:decoration-ink-primary/60'
    : 'inline-flex cursor-pointer items-center justify-between rounded-full text-xs font-semibold tracking-wide uppercase transition-colors duration-200';

  const sizes: Record<Size, string> = {
    sm: 'h-8 pr-2 pl-4',
    md: 'h-10 pr-3 pl-5',
    lg: 'h-11 pr-4 pl-6'
  };

  const variants: Record<Variant, string> = {
    primary: 'bg-ink-primary text-surface-primary hover:bg-ink-primary/90',
    accent: 'bg-accent text-ink-primary hover:brightness-110',
    secondary: 'bg-ink-primary/10 text-ink-primary hover:bg-ink-primary/15',
    outline:
      'ring-2 ring-ink-primary ring-inset text-ink-primary hover:bg-ink-primary hover:text-surface-primary',
    link: ''
  };

  const classes = [base, isLink ? '' : sizes[size], variants[variant], className];
</script>

{#if href}
  <a {href} class={classes} {...rest as HTMLAnchorAttributes}>
    {@render children()}
  </a>
{:else}
  <button class={classes} {...rest as HTMLButtonAttributes}>
    {@render children()}
  </button>
{/if}
