<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { projects, imageFor, imagesFor } from '$lib/media';
</script>

<section id="work" class="relative px-6 pb-24 md:pb-40">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-24 md:col-start-4 md:col-end-12 md:gap-40">
      {#each projects as project (project.slug)}
        <article
          class="flex flex-col gap-6"
          data-project={project.slug}
          data-project-title={project.title}
          data-project-subtitle={project.subtitle}
          data-project-link-label={project.link?.label ?? ''}
          data-project-link-href={project.link?.href ?? ''}
        >
          <div class="md:hidden" data-reveal use:reveal>
            <h2 class="text-base leading-snug font-medium text-ink-primary mb-1">
              {project.title}
            </h2>
            <p class="text-base leading-snug text-pretty text-ink-secondary">
              {project.subtitle}
            </p>
          </div>
          {#each imagesFor(project) as image, i (image.src)}
            <a
              href="/image/{project.slug}/{i}"
              class="block cursor-zoom-in rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              data-project-image-index={i}
              aria-label="Open {image.alt}"
            >
              <enhanced:img
                class="w-full rounded-lg border border-white/10"
                src={imageFor(image.src)}
                alt={image.alt}
                loading="lazy"
                data-reveal
                use:reveal
              />
            </a>
          {/each}
        </article>
      {/each}
    </div>
  </div>
</section>
