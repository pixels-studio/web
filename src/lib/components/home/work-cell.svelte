<script lang="ts">
	import type { Work } from 'content-collections';

	interface Props {
		item?: Work;
		isEmpty?: boolean;
	}

	let { item, isEmpty = false }: Props = $props();
</script>

{#if isEmpty}
	<div class="col-span-2 aspect-video"></div>
{:else if item}
	<a href={`/work/${item._meta.path}`} class="group col-span-2">
		<div class="relative aspect-video overflow-hidden bg-base-2">
			{#if item.type === 'video'}
				<video
					src={item.cover}
					class="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
					muted
					loop
					playsinline
				></video>
			{:else}
				<img
					src={item.cover}
					alt={item.title}
					class="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
					loading="lazy"
				/>
			{/if}
		</div>
	</a>
{/if}
