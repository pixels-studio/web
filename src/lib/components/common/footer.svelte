<script lang="ts">
	import PixelLogo from './pixel-logo.svelte';
	import { SOCIAL_LINKS } from '$lib/helpers/constants';
	import { ROUTES } from '$lib/helpers/routes';
	import { cn } from '$lib/helpers/utils';
	import LayoutGrid from '$lib/assets/layout-grid.svg?raw';
	import { gridState } from '$lib/stores/grid-state.svelte';
</script>

<footer id="contact" class="mt-auto bg-base-8 text-base-0" style="view-transition-name: footer">
	<div class={cn('px-4 py-16', 'md:py-32', 'lg:py-40')}>
		<div
			class={cn(
				'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-4 gap-y-8',
				'md:grid-cols-8',
				'lg:grid-cols-12'
			)}
		>
			<p class={cn('col-span-full font-medium text-base-5', 'lg:col-span-4')}>Availability</p>
			<div
				class={cn('col-span-full flex flex-col gap-4', 'md:col-span-6 md:gap-8', 'lg:col-span-5')}
			>
				<h2 class={cn('text-lg font-medium text-pretty', 'md:text-2xl', 'lg:text-3xl')}>
					Available for remote frontend or product design roles, and selective freelance work.
				</h2>
				<a
					class={cn(
						'text-lg font-medium text-base-5 transition-colors duration-300 ease-smooth hover:text-base-0',
						'md:text-2xl',
						'lg:text-3xl'
					)}
					href={ROUTES.email}
				>
					hello@pixels.studio
				</a>
			</div>
			<div
				class={cn(
					'col-span-full flex flex-row flex-wrap gap-4',
					'md:col-span-2 md:flex-col md:gap-2',
					'lg:col-span-1 lg:col-start-11'
				)}
			>
				{#each SOCIAL_LINKS as item (item.href)}
					<a
						href={item.href}
						class={cn(
							'text-lg font-medium text-base-5 transition-colors duration-300 ease-smooth hover:text-base-0',
							'md:text-xl',
							'lg:text-3xl'
						)}
					>
						{item.label}
					</a>
				{/each}
				<a
					href={ROUTES.resume}
					class={cn(
						'text-lg font-medium text-base-5 transition-colors duration-300 ease-smooth hover:text-base-0',
						'md:text-xl',
						'lg:text-3xl'
					)}
				>
					Resume
				</a>
			</div>
		</div>
	</div>
	<div class="px-4 py-4">
		<div class="mx-auto w-full max-w-[1512px]">
			<PixelLogo />
		</div>
	</div>

	<div class="border-t border-base-0/5 px-4 py-4">
		<div
			class={cn(
				'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-4',
				'md:grid-cols-8',
				'lg:grid-cols-12'
			)}
		>
			<p class={cn('col-span-2 font-medium opacity-30', 'md:col-span-4')}>© Pixels Studio.</p>
			<a
				href={'#'}
				class={cn(
					'col-span-2 w-fit text-center font-medium text-base-5 transition-colors duration-300 ease-smooth hover:text-base-0',
					'md:col-span-3 md:text-left',
					'lg:col-span-4'
				)}
			>
				Back to top
			</a>
			<a
				href={ROUTES.colophon}
				class={cn(
					'col-span-1 w-fit font-medium text-base-5 transition-colors duration-300 ease-smooth hover:text-base-0',
					'md:col-start-6',
					'lg:col-start-11'
				)}
			>
				Colophon
			</a>

			<button
				class="col-span-1 grid hidden size-6 cursor-pointer place-items-center justify-self-end text-base-5 transition-colors duration-300 ease-smooth hover:text-base-0 md:block"
				onclick={() => gridState.toggle()}
			>
				<span class="block size-4">{@html LayoutGrid}</span>
			</button>
		</div>
	</div>
</footer>
