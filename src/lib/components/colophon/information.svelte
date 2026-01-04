<script>
	import { PEOPLE } from '$lib/helpers/constants';
</script>

<section class="flex flex-col gap-24 px-4 pb-48">
	<article class="mx-auto grid w-full max-w-[1512px] grid-cols-12 gap-x-4">
		<div class="col-span-2 flex flex-col gap-5 font-medium">
			<div class="flex flex-col gap-2">
				<p class="text-base-5">Font</p>
				<p>Helvetica Neue</p>
			</div>

			<div class="flex flex-col gap-2">
				<p class="text-base-5">Stack</p>
				<ul class="flex flex-col gap-2">
					<li>Svelte</li>
					<li>SvelteKit</li>
					<li>Tailwind CSS</li>
					<li>TypeScript</li>
					<li>GSAP</li>
				</ul>
			</div>
		</div>
		<div class="col-span-5 col-start-5 flex flex-col gap-5 font-medium text-pretty">
			<p>
				This site exists to present work without interference. It avoids trends, unnecessary
				movement, and decorative systems that compete with content.
			</p>

			<p>
				The design relies on typography, spacing, and structure. Inter was chosen for its neutrality
				and clarity across screens—quiet, dependable, and designed to disappear. Layouts are simple
				by intent; interaction is restrained and purposeful.
			</p>

			<p>
				The site is built with a static-first mindset, prioritising performance, accessibility, and
				long-term maintainability. Tooling is modern but conservative. Every dependency earns its
				place.
			</p>

			<p>
				Over the years, I’ve been influenced by family, teachers, colleagues, designers, writers,
				musicians, and public figures—some personally, some from a distance—who have shaped how I
				think, work, and build.
			</p>

			<ul class="mt-10 grid grid-cols-2 gap-4 text-base-5">
				{#each PEOPLE as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	</article>
</section>
