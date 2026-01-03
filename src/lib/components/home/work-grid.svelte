<script lang="ts">
	import { allWorks } from 'content-collections';
	import WorkCell from './work-cell.svelte';

	// Get only published works
	const publishedWorks = allWorks.filter((work) => work.status === 'published');

	// Create grid items with dynamic empty cells
	// Pattern: Each row has 6 positions (col-span-2 each)
	// We'll insert empty cells at varying positions for visual interest
	function createGridItems() {
		const items: Array<{ id: string; work?: (typeof publishedWorks)[0] }> = [];
		let workIndex = 0;
		let row = 0;
		let emptyIndex = 0;
		const emptyPatterns = [[1], [0, 4], [5], [2, 3], [0]];

		while (workIndex < publishedWorks.length) {
			// Different patterns for different rows to create visual variety
			const positionsInRow = 6; // 12 columns / 2 col-span = 6 positions
			const emptyPositions = emptyPatterns[row % emptyPatterns.length];

			for (let pos = 0; pos < positionsInRow && workIndex < publishedWorks.length; pos++) {
				if (emptyPositions.includes(pos)) {
					items.push({ id: `empty-${emptyIndex++}` });
				} else {
					const work = publishedWorks[workIndex];
					items.push({ id: work._meta.path, work });
					workIndex++;
				}
			}
			row++;
		}

		return items;
	}

	const gridItems = createGridItems();
</script>

<section class="bg-base-0 px-4 pb-48">
	<div class="mx-auto grid w-full max-w-[1512px] grid-cols-12 gap-4">
		{#each gridItems as gridItem (gridItem.id)}
			<WorkCell item={gridItem.work} isEmpty={!gridItem.work} />
		{/each}
	</div>
</section>
