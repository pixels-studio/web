<script lang="ts">
  import About from '$lib/components/about.svelte';
  import Contact from '$lib/components/contact.svelte';
  import Faqs from '$lib/components/faqs.svelte';
  import FooterMark from '$lib/components/footer-mark.svelte';
  import Lead from '$lib/components/lead.svelte';
  import Projects from '$lib/components/projects.svelte';
  import Services from '$lib/components/services.svelte';
  import Testimonials from '$lib/components/testimonials.svelte';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://pixels.studio/#studio',
        name: 'Pixels Studio',
        url: 'https://pixels.studio',
        image: 'https://pixels.studio/og-v2.png',
        description:
          'Independent design and frontend engineering practice with over a decade of experience building products from zero to scale.',
        founder: { '@id': 'https://pixels.studio/#person' },
        sameAs: ['https://twitter.com/_abhiii']
      },
      {
        '@type': 'Person',
        '@id': 'https://pixels.studio/#person',
        name: 'Abhishek Kambli',
        url: 'https://pixels.studio',
        jobTitle: 'Designer & Frontend Engineer',
        worksFor: { '@id': 'https://pixels.studio/#studio' },
        sameAs: ['https://twitter.com/_abhiii']
      },
      {
        '@type': 'WebSite',
        '@id': 'https://pixels.studio/#website',
        url: 'https://pixels.studio',
        name: 'Pixels Studio',
        publisher: { '@id': 'https://pixels.studio/#studio' }
      }
    ]
  };
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<Lead />
<Projects />
<Testimonials />
<Services /><About />
<Faqs />
<Contact />
<FooterMark />
