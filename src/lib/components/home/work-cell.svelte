<script lang="ts">
	import type { Work } from 'content-collections';

	interface Props {
		item?: Work;
	}

	let { item }: Props = $props();
</script>

{#if item}
	<a href={`/work/${item._meta.path}`} class="group col-span-2">
		<div
			class="work-cell-wrapper relative aspect-video overflow-hidden bg-base-2"
			style="view-transition-name: work-cell-{item._meta.path}"
		>
			{#if item.type === 'video'}
				<video
					src={item.cover}
					class="work-cover h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
					style="view-transition-name: work-cover-{item._meta.path}"
					muted
					loop
					playsinline
				></video>
			{:else}
				<img
					src={item.cover}
					alt={item.title}
					class="work-cover h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
					style="view-transition-name: work-cover-{item._meta.path}"
					loading="lazy"
				/>
			{/if}
		</div>
	</a>
{:else}
	<div class="col-span-2 aspect-video"></div>
{/if}
