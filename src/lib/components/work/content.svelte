<script lang="ts">
	import type { Work } from 'content-collections';
	import { marked } from 'marked';

	interface Props {
		work: Work;
	}

	let { work }: Props = $props();
</script>

<section class="px-4 pb-32">
	<div class="mx-auto grid w-full max-w-[1512px] grid-cols-12 gap-4">
		<p class="col-span-4 text-xl font-medium text-base-5">Introduction</p>
		<article class="col-span-6 col-start-5 flex flex-col gap-4 text-xl font-medium">
			{@html marked(work.content)}
		</article>
	</div>
</section>
