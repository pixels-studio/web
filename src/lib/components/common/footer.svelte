<script lang="ts">
	import FooterLogo from '$lib/assets/footer-logo.svg?raw';
	import { SOCIAL_LINKS } from '$lib/helpers/constants';
	import { ROUTES } from '$lib/helpers/routes';
</script>

<footer class="mt-auto bg-base-8 text-base-0">
	<div class="px-4 py-48">
		<div class="mx-auto grid w-full max-w-[1512px] grid-cols-12 gap-4">
			<p class="col-span-4 text-xl font-medium text-base-5">Availability</p>
			<div class="col-span-5 flex flex-col gap-8">
				<h2 class="text-3xl font-medium text-pretty">
					Available for remote frontend or product design roles, and selective freelance work.
				</h2>
				<a
					class="text-3xl font-medium text-base-5 transition-colors duration-300 ease-smooth hover:text-base-0"
					href={ROUTES.contact}
				>
					hello@pixels.studio
				</a>
			</div>
			<div class="col-span-1 col-start-11 flex flex-col gap-2">
				{#each SOCIAL_LINKS as item (item.href)}
					<a
						href={item.href}
						class="text-3xl font-medium text-base-5 transition-colors duration-300 ease-smooth hover:text-base-0"
					>
						{item.label}
					</a>
				{/each}
				<a
					href={ROUTES.resume}
					class="text-3xl font-medium text-base-5 transition-colors duration-300 ease-smooth hover:text-base-0"
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
		<div class="mx-auto grid w-full max-w-[1512px] grid-cols-12 gap-4">
			<p class="col-span-4 text-xs font-medium tracking-wide text-base-0/40 uppercase">
				© Pixels Studio.
			</p>
			<a
				href={'#'}
				class="col-span-4 text-xs font-medium tracking-wide text-base-0/40 uppercase transition-colors duration-300 ease-smooth hover:text-base-0"
				>Back to top</a
			>
			<a
				href={ROUTES.colophon}
				class="col-span-1 col-start-12 text-right text-xs font-medium tracking-wide text-base-0/40 uppercase transition-colors duration-300 ease-smooth hover:text-base-0"
				>Colophon</a
			>
		</div>
	</div>
</footer>
