<script lang="ts">
  import Lead from '$lib/components/Lead.svelte';
  import Divider from '$lib/components/Divider.svelte';
  import Prism from '$lib/components/Prism.svelte';
  import Origon from '$lib/components/Origon.svelte';
  import Rhythm from '$lib/components/Rhythm.svelte';
  import TribeCommunicationApp from '$lib/components/TribeCommunicationApp.svelte';
  import TribeDocumentManagement from '$lib/components/TribeDocumentManagement.svelte';
  import Samespace from '$lib/components/Samespace.svelte';
  import TaxGermany from '$lib/components/TaxGermany.svelte';
  import Tlkn from '$lib/components/Tlkn.svelte';
  import Playground from '$lib/components/Playground.svelte';
  import About from '$lib/components/About.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import FooterLogo from '$lib/components/FooterLogo.svelte';

  let { data } = $props();
</script>

<Lead content={data.lead} />
<Divider />
<Prism content={data.prism} />
<Divider />
<Origon content={data.origon} />
<Divider />
<Rhythm content={data.rhythm} />
<Divider />
<TribeCommunicationApp content={data.tribeCommunication} />
<Divider />
<TribeDocumentManagement content={data.tribeDocuments} />
<Divider />
<Samespace content={data.samespace} />
<Divider />
<TaxGermany content={data.taxGermany} />
<Divider />
<Tlkn content={data.tlkn} />
<Divider />
<Playground content={data.playground} />
<Divider />
<About content={data.about} />
<Divider />
<Contact content={data.contact} />
<Divider />
<FooterLogo />
