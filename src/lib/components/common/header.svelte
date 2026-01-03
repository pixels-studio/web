<script lang="ts">
	import { page } from '$app/stores';
	import { ROUTES } from '$lib/helpers/routes';
	import { PRIMARY_NAVIGATION, SOCIAL_LINKS } from '$lib/helpers/constants';
	import { fade, fly } from 'svelte/transition';

	let isMenuOpen = $state(false);

	function isActive(href: string): boolean {
		return $page.url.pathname === href;
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		isMenuOpen = false;
		document.body.style.overflow = '';
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isMenuOpen) {
			closeMenu();
		}
	}

	function handleNavClick() {
		closeMenu();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<header
	class="sticky top-0 z-40 bg-base-0/90 p-4 backdrop-blur-md"
	style="view-transition-name: header"
>
	<div class="mx-auto grid w-full max-w-[1512px] grid-cols-6 gap-4 md:grid-cols-8 lg:grid-cols-12">
		<a
			class="col-span-5 text-xs font-medium tracking-wide uppercase md:col-span-4"
			href={ROUTES.home}
		>
			<p>Abhishek Kambli</p>
			<p class="text-base-5">Product Designer & Frontend Engineer</p>
		</a>

		<!-- Mobile/Tablet: Hamburger Menu Button -->
		<button
			class="col-span-1 flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1.5 self-center justify-self-end md:col-span-4 md:justify-self-end lg:hidden"
			onclick={toggleMenu}
			aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isMenuOpen}
		>
			<span
				class="block h-0.5 w-5 bg-base-10 transition-all duration-300 ease-smooth {isMenuOpen
					? 'translate-y-2 rotate-45'
					: ''}"
			></span>
			<span
				class="block h-0.5 w-5 bg-base-10 transition-all duration-300 ease-smooth {isMenuOpen
					? '-translate-y-0 -rotate-45'
					: ''}"
			></span>
		</button>

		<!-- Desktop: Primary Navigation -->
		<nav class="col-span-5 hidden gap-8 self-end lg:flex">
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

		<!-- Desktop: Social Links -->
		<nav class="col-span-3 hidden justify-end gap-8 self-end lg:flex">
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

<!-- Fullscreen Mobile Menu Overlay -->
{#if isMenuOpen}
	<div
		class="fixed inset-0 z-50 flex flex-col bg-base-0 lg:hidden"
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
	>
		<!-- Overlay Header -->
		<div class="flex items-center justify-between p-4">
			<a
				class="text-xs font-medium tracking-wide uppercase"
				href={ROUTES.home}
				onclick={handleNavClick}
			>
				<p>Abhishek Kambli</p>
				<p class="text-base-5">Product Designer & Frontend Engineer</p>
			</a>
			<button class="relative h-8 w-8 cursor-pointer" onclick={closeMenu} aria-label="Close menu">
				<span
					class="absolute top-1/2 left-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-base-10 transition-all duration-300 ease-smooth"
				></span>
				<span
					class="absolute top-1/2 left-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-base-10 transition-all duration-300 ease-smooth"
				></span>
			</button>
		</div>

		<!-- Menu Content -->
		<div class="flex flex-1 flex-col gap-12 px-4 py-12">
			<!-- Primary Navigation -->
			<nav class="flex flex-col gap-3">
				{#each PRIMARY_NAVIGATION as item, i (item.href)}
					<a
						class="text-2xl font-medium text-base-10 transition-colors duration-300 ease-smooth"
						href={item.href}
						onclick={handleNavClick}
						in:fly={{ y: 20, delay: i * 50, duration: 300 }}
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<!-- Social Links -->
			<nav class="flex flex-col gap-3">
				<p class="text-xs font-medium tracking-wide text-base-5 uppercase">Let's Connect</p>
				{#each SOCIAL_LINKS as item, i (item.href)}
					<a
						class="text-2xl font-medium transition-colors duration-300 ease-smooth"
						href={item.href}
						in:fly={{ y: 20, delay: (PRIMARY_NAVIGATION.length + i) * 50, duration: 300 }}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
{/if}
