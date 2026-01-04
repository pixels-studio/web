<script lang="ts">
	import { page } from '$app/state';
	import { ROUTES } from '$lib/helpers/routes';
	import { PRIMARY_NAVIGATION, SOCIAL_LINKS } from '$lib/helpers/constants';
	import { fade, fly } from 'svelte/transition';
	import { cn } from '$lib/helpers/utils';

	function isActive(href: string): boolean {
		return page.url.pathname === href;
	}
</script>

<header class="sticky top-0 z-40 bg-base-0 p-4 text-base-10" style="view-transition-name: header">
	<div
		class={cn(
			'mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-4',
			'md:grid-cols-8',
			'lg:grid-cols-12'
		)}
	>
		<a class={cn('col-span-full font-medium', 'lg:col-span-4')} href={ROUTES.home}>
			Abhishek Kambli
		</a>

		<p
			class={cn(
				'text-base-full col-span-full hidden font-medium text-base-5',
				'lg:col-span-5 lg:block'
			)}
		>
			Product Designer & Frontend Engineer
		</p>

		<nav class={cn('col-span-full flex  gap-8', 'lg:col-span-3 lg:justify-end')}>
			{#each PRIMARY_NAVIGATION as item}
				<a
					class="font-medium text-base-5 transition-colors duration-300 ease-smooth hover:text-base-10"
					href={item.href}>{item.label}</a
				>
			{/each}
		</nav>
	</div>
</header>
