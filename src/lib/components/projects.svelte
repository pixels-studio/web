<script lang="ts">
  import origonDashboardImage from '$lib/assets/media/origon-dashboard.png?enhanced';
  import prismImage from '$lib/assets/media/prism.png?enhanced';
  import rhythmImage from '$lib/assets/media/rhythm.png?enhanced';
  import taxGermanyImage from '$lib/assets/media/tax-germany.png?enhanced';
  import tribeDocumentManagementImage from '$lib/assets/media/tribe-document-management.png?enhanced';
  import projectsYaml from '$lib/data/projects.yaml?raw';
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import type { Picture } from 'vite-imagetools';
  import { parse } from 'yaml';

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
  let projectElements: HTMLElement[] = [];
  let measureEl: HTMLElement | undefined = $state();
  let panelHeight = $state(0);

  const activeProject = $derived(data.projects[activeProjectIndex]);

  $effect(() => {
    activeProject;
    requestAnimationFrame(() => {
      if (measureEl) panelHeight = measureEl.offsetHeight;
    });
  });

  function updateActiveProject() {
    const viewportAnchor = window.innerHeight / 2;
    let closestIndex = activeProjectIndex;
    let closestDistance = Number.POSITIVE_INFINITY;
    let anyVisible = false;

    projectElements.forEach((element, index) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const isVisible = center > 0 && center < window.innerHeight;

      if (!isVisible) return;

      anyVisible = true;
      const distance = Math.abs(rect.top + rect.height / 2 - viewportAnchor);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    const nextSection = document.getElementById('services');
    if (nextSection && nextSection.getBoundingClientRect().top < window.innerHeight) {
      anyVisible = false;
    }

    isProjectsInView = anyVisible;
    activeProjectIndex = closestIndex;
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

  function fadeBlur(_node: HTMLElement, { duration = 500, delay = 0 } = {}) {
    return {
      duration,
      delay,
      easing: cubicOut,
      css: (t: number) => `
        opacity: ${t};
        filter: blur(${(1 - t) * 8}px);
        transform: translateY(${(1 - t) * 10}px);
      `
    };
  }
</script>

<section id="work" class="relative px-6 pb-40">
  <div
    class={[
      'pointer-events-none fixed inset-x-0 bottom-6 z-20 px-6 transition-opacity duration-200',
      isProjectsInView ? 'opacity-100' : 'opacity-0'
    ]}
    aria-live="polite"
  >
    <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
      <div class="relative col-span-3 md:col-span-2">
        <div
          class="grid transition-[height] duration-500 ease-out"
          style:height="{panelHeight}px"
        >
          {#key activeProjectIndex}
            <div
              class="col-start-1 row-start-1 self-end"
              in:fadeBlur={{ duration: 500, delay: 200 }}
              out:fadeBlur={{ duration: 200 }}
            >
              <h2 class="text-sm leading-snug font-medium text-ink-primary">
                {activeProject.title}
              </h2>
              <p class="text-sm leading-snug text-pretty text-ink-secondary">
                {activeProject.subtitle}
              </p>
            </div>
          {/key}
        </div>
        <div
          bind:this={measureEl}
          class="pointer-events-none invisible absolute inset-x-0 bottom-0"
          aria-hidden="true"
        >
          <h2 class="text-sm leading-snug font-medium">
            {activeProject.title}
          </h2>
          <p class="text-sm leading-snug text-pretty">
            {activeProject.subtitle}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-40 md:col-start-4 md:col-end-12">
      {#each data.projects as project, index (project.slug)}
        <article bind:this={projectElements[index]}>
          <enhanced:img
            class="w-full rounded-lg border border-white/10"
            src={imageFor(project.image.src)}
            alt={project.image.alt}
            loading="lazy"
          />
        </article>
      {/each}
    </div>
  </div>
</section>
