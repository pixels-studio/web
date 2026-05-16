<script lang="ts">
  import origonDashboardImage from '$lib/assets/media/origon-dashboard.png?enhanced';
  import prismImage from '$lib/assets/media/prism.png?enhanced';
  import rhythmImage from '$lib/assets/media/rhythm.png?enhanced';
  import taxGermanyImage from '$lib/assets/media/tax-germany.png?enhanced';
  import tribeDocumentManagementImage from '$lib/assets/media/tribe-document-management.png?enhanced';
  import projectsYaml from '$lib/data/projects.yaml?raw';
  import { onMount } from 'svelte';
  import type { Picture } from 'vite-imagetools';
  import { parse } from 'yaml';
  import ArrowRightIcon from './icons/arrow-right.svelte';

  type Project = {
    slug: string;
    title: string;
    subtitle: string;
    image: {
      src: string;
      alt: string;
    };
    link?: {
      label: string;
      href: string;
    };
  };

  type ProjectsData = {
    projects: Project[];
  };

  const data = parse(projectsYaml) as ProjectsData;
  const media: Record<string, Picture> = {
    'origon-dashboard.png': origonDashboardImage,
    'prism.png': prismImage,
    'rhythm.png': rhythmImage,
    'tax-germany.png': taxGermanyImage,
    'tribe-document-management.png': tribeDocumentManagementImage
  };

  function imageFor(src: string) {
    return media[src];
  }

  let activeProjectIndex = $state(0);
  let isProjectsInView = $state(false);
  let sectionElement: HTMLElement;
  let projectElements: HTMLElement[] = [];

  function updateActiveProject() {
    const sectionRect = sectionElement?.getBoundingClientRect();
    isProjectsInView = Boolean(
      sectionRect && sectionRect.bottom > 0 && sectionRect.top < window.innerHeight
    );

    const viewportAnchor = window.innerHeight / 2;
    let closestIndex = activeProjectIndex;
    let closestDistance = Number.POSITIVE_INFINITY;

    projectElements.forEach((element, index) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

      if (!isVisible) return;

      const distance = Math.abs(rect.top + rect.height / 2 - viewportAnchor);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    activeProjectIndex = closestIndex;
  }

  function scrollToProject(index: number) {
    projectElements[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  onMount(() => {
    updateActiveProject();

    window.addEventListener('scroll', updateActiveProject, { passive: true });
    window.addEventListener('resize', updateActiveProject);

    return () => {
      window.removeEventListener('scroll', updateActiveProject);
      window.removeEventListener('resize', updateActiveProject);
    };
  });
</script>

<section id="work" class="relative px-6 pb-40" bind:this={sectionElement}>
  <nav
    class={[
      'fixed bottom-6 left-6 z-20 flex w-fit flex-col gap-2.5 transition-opacity duration-200',
      isProjectsInView ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
    ]}
    aria-label="Project timeline"
  >
    {#each data.projects as project, index (project.slug)}
      <button
        type="button"
        aria-label={`Scroll to ${project.title}`}
        onclick={() => scrollToProject(index)}
        class={[
          "group relative block h-px cursor-pointer appearance-none border-0 bg-transparent p-0 after:absolute after:top-1/2 after:left-0 after:h-6 after:w-12 after:-translate-y-1/2 after:content-['']",
          activeProjectIndex === index ? 'w-8' : 'w-4'
        ]}
      >
        <span
          class={[
            'block h-px bg-ink-primary transition-[width,opacity] duration-300',
            activeProjectIndex === index ? 'w-8 opacity-100 group-hover:w-10' : 'w-4 opacity-30 group-hover:w-6'
          ]}
        ></span>
      </button>
    {/each}
  </nav>

  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-40 md:col-start-4 md:col-end-12">
      {#each data.projects as project, index (project.slug)}
        <article class="group" bind:this={projectElements[index]}>
          <enhanced:img
            class="w-full rounded-lg border border-white/10"
            src={imageFor(project.image.src)}
            alt={project.image.alt}
            loading="lazy"
          />

          <div class="mt-6 grid grid-cols-6 items-start gap-6 md:grid-cols-12">
            <div class="col-span-5 md:col-span-8">
              <h2 class="text-base leading-6 font-medium text-ink-primary">
                {project.title}
              </h2>
              <p class="text-base leading-6 text-ink-secondary">
                {project.subtitle}
              </p>
            </div>

            {#if project.link}
              <a
                href={project.link.href}
                target="_blank"
                rel="noreferrer"
                class="col-span-1 ml-auto flex h-10 w-full max-w-40 min-w-24 items-center justify-between rounded-full bg-ink-primary pr-4 pl-5 text-xs font-semibold tracking-wide text-surface-primary uppercase transition-opacity duration-200 hover:opacity-80 md:col-span-4"
              >
                <span>{project.link.label}</span>
                <span class="flex size-6 items-center justify-center">
                  <ArrowRightIcon />
                </span>
              </a>
            {/if}
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
