<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onNavigate } from '$app/navigation';
	import Grid from '$lib/components/common/grid.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{@render children()}
<Grid />

<style>
	@media (prefers-reduced-motion: no-preference) {
		:global(::view-transition-group(*)) {
			animation-duration: 600ms;
			animation-timing-function: var(--ease-smooth);
		}

		:global(.work-cover) {
			view-transition-class: work-cover;
		}

		:global(::view-transition-group(.work-cover)) {
			z-index: 100;
		}

		/* Fade out header, footer, lead, testimonial, and non-clicked work cells */
		:global(::view-transition-old(header)),
		:global(::view-transition-old(footer)),
		:global(::view-transition-old(lead)),
		:global(::view-transition-old(testimonial)),
		:global(::view-transition-old(work-cell-*)) {
			animation: fade-out 200ms var(--ease-smooth);
		}

		/* Hide new versions of these elements on work detail page */
		:global(::view-transition-new(header)),
		:global(::view-transition-new(footer)),
		:global(::view-transition-new(lead)),
		:global(::view-transition-new(testimonial)),
		:global(::view-transition-new(work-cell-*)) {
			animation: none;
		}

		@keyframes fade-out {
			to {
				opacity: 0;
			}
		}
	}

	@media (prefers-reduced-motion) {
		:global(::view-transition-group(*)),
		:global(::view-transition-old(*)),
		:global(::view-transition-new(*)) {
			animation: none !important;
		}
	}
</style>
