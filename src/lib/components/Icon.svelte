<script lang="ts">
  let { name, class: className = '', ...rest }: { name: string; class?: string; [key: string]: any } = $props();
</script>

<svg class={className} aria-hidden="true" {...rest}>
  <use href="#{name}" />
</svg>
