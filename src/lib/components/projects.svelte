<script lang="ts">
  import appInstallationUiImage from '$lib/assets/media/app-installation-ui.png?enhanced';
  import claudeMemoryImage from '$lib/assets/media/claude-memory.png?enhanced';
  import groupCallUiImage from '$lib/assets/media/group-call-ui.jpg?enhanced';
  import hubAccountProductsImage from '$lib/assets/media/hub-account-products.png?enhanced';
  import hubAccountsImage from '$lib/assets/media/hub-accounts.png?enhanced';
  import hubBillingImage from '$lib/assets/media/hub-billing.png?enhanced';
  import hubDashboardImage from '$lib/assets/media/hub-dashboard.png?enhanced';
  import hubInfrastructureImage from '$lib/assets/media/hub-infrastructure.png?enhanced';
  import hubNewAccountImage from '$lib/assets/media/hub-new-account.png?enhanced';
  import hubProductsImage from '$lib/assets/media/hub-products.png?enhanced';
  import hubSearchImage from '$lib/assets/media/hub-search.png?enhanced';
  import origonAccountsImage from '$lib/assets/media/origon-accounts.png?enhanced';
  import origonDashboardImage from '$lib/assets/media/origon-dashboard.png?enhanced';
  import origonHelpdeskImage from '$lib/assets/media/origon-helpdesk.png?enhanced';
  import origonSigninImage from '$lib/assets/media/origon-signin.png?enhanced';
  import photographyPortfolioImage from '$lib/assets/media/photography-portfolio.png?enhanced';
  import prismImage from '$lib/assets/media/prism.png?enhanced';
  import resolve1Image from '$lib/assets/media/resolve-1.png?enhanced';
  import resolve2Image from '$lib/assets/media/resolve-2.png?enhanced';
  import resolve3Image from '$lib/assets/media/resolve-3.png?enhanced';
  import resolve4Image from '$lib/assets/media/resolve-4.png?enhanced';
  import resolve5Image from '$lib/assets/media/resolve-5.png?enhanced';
  import rhythmImage from '$lib/assets/media/rhythm.png?enhanced';
  import samespace1Image from '$lib/assets/media/samespace-1.png?enhanced';
  import samespace2Image from '$lib/assets/media/samespace-2.png?enhanced';
  import samespace3Image from '$lib/assets/media/samespace-3.png?enhanced';
  import sleepAppImage from '$lib/assets/media/sleep-app.png?enhanced';
  import taxCheck1Image from '$lib/assets/media/tax-check-1.png?enhanced';
  import taxCheck2Image from '$lib/assets/media/tax-check-2.png?enhanced';
  import taxCheck3Image from '$lib/assets/media/tax-check-3.png?enhanced';
  import taxGermanyBookkeepingImage from '$lib/assets/media/tax-germany-bookkeeping.png?enhanced';
  import taxGermanyImage from '$lib/assets/media/tax-germany.png?enhanced';
  import tlknImage from '$lib/assets/media/tlkn.png?enhanced';
  import tribe1Image from '$lib/assets/media/tribe-1.png?enhanced';
  import tribe2Image from '$lib/assets/media/tribe-2.png?enhanced';
  import tribe3Image from '$lib/assets/media/tribe-3.png?enhanced';
  import tribe4Image from '$lib/assets/media/tribe-4.png?enhanced';
  import tribeDocumentManagementImage from '$lib/assets/media/tribe-document-management.png?enhanced';
  import projectsYaml from '$lib/data/projects.yaml?raw';
  import type { Picture } from 'vite-imagetools';
  import { parse } from 'yaml';

  type ProjectImage = {
    src: string;
    alt: string;
  };

  type ProjectLink = {
    label: string;
    href: string;
  };

  type Project = {
    slug: string;
    title: string;
    subtitle: string;
    image?: ProjectImage;
    images?: ProjectImage[];
    link?: ProjectLink;
  };

  type ProjectsData = {
    projects: Project[];
  };

  const data = parse(projectsYaml) as ProjectsData;
  const media: Record<string, Picture> = {
    'app-installation-ui.png': appInstallationUiImage,
    'claude-memory.png': claudeMemoryImage,
    'group-call-ui.jpg': groupCallUiImage,
    'hub-dashboard.png': hubDashboardImage,
    'hub-accounts.png': hubAccountsImage,
    'hub-account-products.png': hubAccountProductsImage,
    'hub-products.png': hubProductsImage,
    'hub-billing.png': hubBillingImage,
    'hub-infrastructure.png': hubInfrastructureImage,
    'hub-search.png': hubSearchImage,
    'hub-new-account.png': hubNewAccountImage,
    'origon-accounts.png': origonAccountsImage,
    'origon-dashboard.png': origonDashboardImage,
    'origon-helpdesk.png': origonHelpdeskImage,
    'origon-signin.png': origonSigninImage,
    'photography-portfolio.png': photographyPortfolioImage,
    'prism.png': prismImage,
    'resolve-1.png': resolve1Image,
    'resolve-2.png': resolve2Image,
    'resolve-3.png': resolve3Image,
    'resolve-4.png': resolve4Image,
    'resolve-5.png': resolve5Image,
    'rhythm.png': rhythmImage,
    'samespace-1.png': samespace1Image,
    'samespace-2.png': samespace2Image,
    'samespace-3.png': samespace3Image,
    'sleep-app.png': sleepAppImage,
    'tax-check-1.png': taxCheck1Image,
    'tax-check-2.png': taxCheck2Image,
    'tax-check-3.png': taxCheck3Image,
    'tax-germany.png': taxGermanyImage,
    'tax-germany-bookkeeping.png': taxGermanyBookkeepingImage,
    'tlkn.png': tlknImage,
    'tribe-1.png': tribe1Image,
    'tribe-2.png': tribe2Image,
    'tribe-3.png': tribe3Image,
    'tribe-4.png': tribe4Image,
    'tribe-document-management.png': tribeDocumentManagementImage
  };

  function imageFor(src: string) {
    return media[src];
  }

  function imagesFor(project: Project): ProjectImage[] {
    if (project.images && project.images.length > 0) return project.images;
    if (project.image) return [project.image];
    return [];
  }
</script>

<section id="work" class="relative px-6 pb-24 md:pb-40">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-24 md:col-start-4 md:col-end-12 md:gap-40">
      {#each data.projects as project (project.slug)}
        <article
          class="flex flex-col gap-6"
          data-project={project.slug}
          data-project-title={project.title}
          data-project-subtitle={project.subtitle}
          data-project-link-label={project.link?.label ?? ''}
          data-project-link-href={project.link?.href ?? ''}
        >
          <div class="md:hidden">
            <h2 class="text-base leading-snug font-medium text-ink-primary mb-1">
              {project.title}
            </h2>
            <p class="text-base leading-snug text-pretty text-ink-secondary">
              {project.subtitle}
            </p>
          </div>
          {#each imagesFor(project) as image (image.src)}
            <enhanced:img
              class="w-full rounded-lg border border-white/10"
              src={imageFor(image.src)}
              alt={image.alt}
              loading="lazy"
            />
          {/each}
        </article>
      {/each}
    </div>
  </div>
</section>
