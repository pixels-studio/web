<script lang="ts">
	import type { Work } from 'content-collections';

	interface Props {
		work: Work;
	}

	let { work }: Props = $props();
</script>

<section class="px-4 pb-16 pt-32">
	<div class="mx-auto w-full max-w-[1512px]">
		<div class="lead-content mb-8">
			<p class="mb-2 text-sm text-base-6">{work.project}</p>
			<h1 class="mb-4 text-4xl font-medium text-base-10 md:text-5xl">{work.title}</h1>
			<p class="max-w-2xl text-lg text-base-7">{work.description}</p>
		</div>

		<div class="lead-content mb-8 flex flex-wrap gap-2">
			{#each work.tags as tag (tag)}
				<span class="rounded-full bg-base-2 px-3 py-1 text-sm text-base-7">{tag}</span>
			{/each}
		</div>

		<div class="relative aspect-video overflow-hidden bg-base-2">
			{#if work.type === 'video'}
				<video
					src={work.cover}
					class="work-cover h-full w-full object-cover"
					style="view-transition-name: work-cover-{work._meta.path}"
					muted
					loop
					playsinline
					autoplay
				></video>
			{:else}
				<img
					src={work.cover}
					alt={work.title}
					class="work-cover h-full w-full object-cover"
					style="view-transition-name: work-cover-{work._meta.path}"
				/>
			{/if}
		</div>
	</div>
</section>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.lead-content {
		animation: fade-in-up 500ms var(--ease-smooth) 400ms both;
	}

	@media (prefers-reduced-motion) {
		.lead-content {
			animation: none;
		}
	}
</style>
