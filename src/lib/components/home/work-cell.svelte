<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { Work } from 'content-collections';

	interface Props {
		item?: Work;
	}

	let { item }: Props = $props();
</script>

{#if item}
	<a
		href={`/work/${item._meta.path}`}
		class={cn('group col-span-3', 'md:col-span-2')}
		data-animate="true"
	>
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
	<div class={cn('col-span-3 aspect-2/1', 'md:col-span-2')}></div>
{/if}
