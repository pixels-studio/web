<script lang="ts">
	import { allWorks } from 'content-collections';
	import WorkCell from './work-cell.svelte';

	// Get only published works
	const publishedWorks = allWorks.filter((work) => work.status === 'published');

	// Create grid items with dynamic empty cells
	// Pattern: Each row has 6 positions (col-span-2 each)
	// We'll insert empty cells at varying positions for visual interest
	function createGridItems() {
		const items: Array<{ id: string; type: 'work' | 'empty'; work?: (typeof publishedWorks)[0] }> =
			[];
		let workIndex = 0;
		let row = 0;
		let emptyIndex = 0;

		while (workIndex < publishedWorks.length) {
			// Different patterns for different rows to create visual variety
			const pattern = row % 5;
			const positionsInRow = 6; // 12 columns / 2 col-span = 6 positions

			for (let pos = 0; pos < positionsInRow && workIndex < publishedWorks.length; pos++) {
				// Dynamic empty cell logic based on row pattern
				const shouldBeEmpty =
					(pattern === 0 && pos === 1) ||
					(pattern === 1 && (pos === 0 || pos === 4)) ||
					(pattern === 2 && pos === 5) ||
					(pattern === 3 && (pos === 2 || pos === 3)) ||
					(pattern === 4 && pos === 0);

				if (shouldBeEmpty) {
					items.push({ id: `empty-${emptyIndex++}`, type: 'empty' });
				} else {
					const work = publishedWorks[workIndex];
					items.push({ id: work._meta.path, type: 'work', work });
					workIndex++;
				}
			}
			row++;
		}

		return items;
	}

	const gridItems = createGridItems();
</script>

<section class="px-4 pb-48">
	<div class="mx-auto grid w-full max-w-[1512px] grid-cols-12 gap-4">
		{#each gridItems as gridItem (gridItem.id)}
			{#if gridItem.type === 'empty'}
				<WorkCell isEmpty />
			{:else}
				<WorkCell item={gridItem.work} />
			{/if}
		{/each}
	</div>
</section>
