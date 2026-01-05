<script lang="ts">
	import { allWorks } from 'content-collections';
	import WorkCell from './work-cell.svelte';
	import { cn } from '$lib/helpers/utils';

	const publishedWorks = allWorks
		.filter((work) => work.status === 'published')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const gridConfigs = {
		mobile: {
			columns: 2,
			emptyPatterns: [[1], [], [0]]
		},

		tablet: {
			columns: 4,
			emptyPatterns: [[1], [2], [0], [3]]
		},

		desktop: {
			columns: 6,
			emptyPatterns: [[1], [0, 4], [5], [2, 3], [0]]
		}
	};

	// Generic function to create grid items for any breakpoint
	function createGridItems(breakpoint: keyof typeof gridConfigs) {
		const config = gridConfigs[breakpoint];
		const items: Array<{ id: string; work?: (typeof publishedWorks)[0] }> = [];
		let workIndex = 0;
		let row = 0;

		while (workIndex < publishedWorks.length) {
			const emptyPositions = config.emptyPatterns[row % config.emptyPatterns.length];

			for (let pos = 0; pos < config.columns && workIndex < publishedWorks.length; pos++) {
				if (emptyPositions.includes(pos)) {
					items.push({ id: `${breakpoint}-empty-${row}-${pos}` });
				} else {
					const work = publishedWorks[workIndex];
					items.push({ id: `${breakpoint}-${work._meta.path}`, work });
					workIndex++;
				}
			}
			row++;
		}

		return items;
	}

	const mobileGridItems = createGridItems('mobile');
	const tabletGridItems = createGridItems('tablet');
	const desktopGridItems = createGridItems('desktop');
</script>

<section class={cn('bg-base-0 px-4 pb-24', 'md:pb-32', 'lg:pb-48')}>
	<!-- Mobile grid: 2 columns (visible below md) -->
	<div class={cn('mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-4', 'md:hidden')}>
		{#each mobileGridItems as gridItem, i (gridItem.id)}
			<WorkCell item={gridItem.work} index={i} />
		{/each}
	</div>

	<!-- Tablet grid: 4 columns (visible md to lg) -->
	<div class={cn('mx-auto hidden w-full max-w-[1512px] grid-cols-8 gap-4', 'md:grid', 'lg:hidden')}>
		{#each tabletGridItems as gridItem, i (gridItem.id)}
			<WorkCell item={gridItem.work} index={i} />
		{/each}
	</div>

	<!-- Desktop grid: 6 columns (visible lg and above) -->
	<div class={cn('mx-auto hidden w-full max-w-[1512px] grid-cols-12 gap-4', 'lg:grid')}>
		{#each desktopGridItems as gridItem, i (gridItem.id)}
			<WorkCell item={gridItem.work} index={i} />
		{/each}
	</div>
</section>
