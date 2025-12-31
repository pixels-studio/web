<script lang="ts">
	import { page } from '$app/stores';
	import { ROUTES } from '$lib/helpers/routes';
	import { PRIMARY_NAVIGATION, SOCIAL_LINKS } from '$lib/helpers/constants';

	function isActive(href: string): boolean {
		return $page.url.pathname === href;
	}
</script>

<header class="sticky top-0 z-40 bg-base-0 p-4">
	<div class="mx-auto grid w-full max-w-[1512px] grid-cols-12 gap-4">
		<a class="col-span-4 text-xs font-medium tracking-wide uppercase" href={ROUTES.home}>
			<p>Abhishek Kambli</p>
			<p class="text-base-5">Product Designer & Frontend Engineer</p>
		</a>

		<nav class="col-span-5 flex gap-8 self-end">
			{#each PRIMARY_NAVIGATION as item (item.href)}
				<a
					class="text-xs font-medium tracking-wide uppercase transition-colors duration-300 ease-smooth hover:text-base-10 {isActive(
						item.href
					)
						? 'text-base-10'
						: 'text-base-5'}"
					href={item.href}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<nav class="col-span-3 flex justify-end gap-8 self-end">
			{#each SOCIAL_LINKS as item (item.href)}
				<a
					class="text-xs font-medium tracking-wide text-base-5 uppercase transition-colors duration-300 ease-smooth hover:text-base-10"
					href={item.href}
				>
					{item.shortLabel}
				</a>
			{/each}
		</nav>
	</div>
</header>
