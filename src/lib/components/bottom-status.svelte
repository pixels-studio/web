<script lang="ts">
  const copyright = `© ${new Date().getFullYear()} Pixels Studio`;
</script>

<div
  class="pointer-events-none fixed inset-x-0 bottom-6 z-20 hidden px-6 md:block"
  aria-live="polite"
>
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div
      class="col-span-3 md:col-span-2 text-xs leading-snug font-semibold tracking-wide uppercase text-ink-primary/35"
    >
      {copyright}
    </div>
  </div>
</div>
