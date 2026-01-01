<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="flex min-h-dvh flex-1 items-center justify-center bg-base-10">
	<div class="relative aspect-2/1 w-full overflow-hidden">
		{#if data.work.type === 'video'}
			<video
				src={data.work.cover}
				class="work-cover h-full w-full object-cover"
				style="view-transition-name: work-cover-{data.work._meta.path}"
				muted
				loop
				playsinline
				autoplay
			></video>
		{:else}
			<img
				src={data.work.cover}
				alt={data.work.title}
				class="work-cover h-full w-full object-cover"
				style="view-transition-name: work-cover-{data.work._meta.path}"
			/>
		{/if}
	</div>
</section>
