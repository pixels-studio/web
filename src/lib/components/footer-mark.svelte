<script lang="ts">
  import wordmark from '$lib/assets/pixels-studio-wordmark.svg?raw';
</script>

<div class="px-6">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-x-6 md:grid-cols-12">
    <div
      class="col-span-6 overflow-hidden md:col-start-4 md:col-end-12"
      aria-hidden="true"
    >
      <div class="translate-y-[25%] select-none opacity-50 [&>svg]:block [&>svg]:w-full">
        {@html wordmark}
      </div>
    </div>
  </div>
</div>
