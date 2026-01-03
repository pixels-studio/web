<script lang="ts">
	import FooterLogo from '$lib/assets/footer-logo.svg?raw';
	import { SOCIAL_LINKS } from '$lib/helpers/constants';
	import { ROUTES } from '$lib/helpers/routes';
	import { cn } from '$lib/helpers/utils';
</script>

<footer class="mt-auto bg-base-8 text-base-0" style="view-transition-name: footer">
	<div class={cn('px-4 py-16', 'md:py-32', 'lg:py-48')}>
		<div
			class={cn(
				'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-4 gap-y-8',
				'md:grid-cols-8',
				'lg:grid-cols-12'
			)}
		>
			<p class={cn('col-span-full text-lg font-medium text-base-5', 'md:text-xl', 'lg:col-span-4')}>
				Availability
			</p>
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
					href={ROUTES.contact}
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
		<div class="mx-auto w-full max-w-[1512px] text-base-7">
			{@html FooterLogo}
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
			<p
				class={cn(
					'col-span-2 text-xs font-medium tracking-wide text-base-0/40 uppercase',
					'md:col-span-4'
				)}
			>
				© Pixels Studio.
			</p>
			<a
				href={'#'}
				class={cn(
					'col-span-2 text-center text-xs font-medium tracking-wide text-base-0/40 uppercase transition-colors duration-300 ease-smooth hover:text-base-0',
					'md:col-span-3 md:text-left',
					'lg:col-span-4'
				)}
			>
				Back to top
			</a>
			<a
				href={ROUTES.colophon}
				class={cn(
					'col-span-2 text-right text-xs font-medium tracking-wide text-base-0/40 uppercase transition-colors duration-300 ease-smooth hover:text-base-0',
					'md:col-span-1 md:col-start-8',
					'lg:col-start-12'
				)}
			>
				Colophon
			</a>
		</div>
	</div>
</footer>
