<script lang="ts">
  import BehanceIcon from '$lib/assets/icons/socials/behance.svg?raw';
  import CosmosIcon from '$lib/assets/icons/socials/cosmos.svg?raw';
  import EmailIcon from '$lib/assets/icons/socials/email.svg?raw';
  import InstagramIcon from '$lib/assets/icons/socials/instagram.svg?raw';
  import LinkedinIcon from '$lib/assets/icons/socials/linkedin.svg?raw';
  import ResumeIcon from '$lib/assets/icons/socials/resume.svg?raw';
  import SaveeIcon from '$lib/assets/icons/socials/savee.svg?raw';
  import TwitterIcon from '$lib/assets/icons/socials/twitter.svg?raw';
  import contactYaml from '$lib/data/contact.yaml?raw';
  import { parse } from 'yaml';
  import Badge from './badge.svelte';

  const socialIcons: Record<string, string> = {
    email: EmailIcon,
    twitter: TwitterIcon,
    linkedin: LinkedinIcon,
    instagram: InstagramIcon,
    behance: BehanceIcon,
    savee: SaveeIcon,
    cosmos: CosmosIcon,
    resume: ResumeIcon
  };

  type ContactLink = {
    label: string;
    href: string;
    icon: string;
  };

  type ContactData = {
    heading: string;
    title: string;
    description: string;
    email: string;
    links: ContactLink[];
  };

  const data = parse(contactYaml) as ContactData;
</script>

<section id="contact" class="relative flex flex-col gap-16 px-6 pb-24 md:pb-40">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-x-6 gap-y-10 md:grid-cols-12">
    <header class="col-span-6 flex flex-col gap-5 md:col-start-4 md:col-end-12">
      <Badge>{data.heading}</Badge>
    </header>
    <h2
      class="col-span-6 text-pretty text-4xl leading-none font-semibold text-ink-primary md:col-start-4 md:col-end-8 md:text-6xl"
    >
      {data.title}
    </h2>
    <p
      class="col-span-6 self-end text-pretty text-lg leading-relaxed text-ink-secondary md:col-start-8 md:col-end-12"
    >
      {data.description}
    </p>
  </div>

  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-x-6 md:grid-cols-12">
    <ul
      class="col-span-6 grid grid-cols-2 gap-x-6 md:col-start-4 md:col-end-12 md:grid-cols-4"
    >
      {#each data.links as link}
        <li
          class="border-t border-dashed border-ink-primary/16 py-4 [&:nth-last-child(-n+2)]:border-b md:[&:nth-last-child(-n+4)]:border-b"
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 text-base text-ink-primary transition-opacity hover:opacity-70 md:text-lg"
          >
            <span class="flex size-5 items-center justify-center text-ink-secondary [&>svg]:size-5" aria-hidden="true">
              {@html socialIcons[link.icon]}
            </span>
            <span>{link.label}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>
