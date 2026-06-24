<script lang="ts">
  import faqsYaml from '$lib/data/faqs.yaml?raw';
  import { parse } from 'yaml';
  import Badge from './badge.svelte';
  import PlusIcon from './icons/plus.svelte';

  type Faq = {
    question: string;
    answer: string;
  };

  type FaqsData = {
    heading: string;
    title: string;
    faqs: Faq[];
  };

  const data = parse(faqsYaml) as FaqsData;

  let openFaq = $state<number | null>(null);

  function toggleFaq(index: number) {
    openFaq = openFaq === index ? null : index;
  }
</script>

<section id="faqs" class="relative px-6 pb-24 md:pb-30">
  <div class="mx-auto grid w-full max-w-366 grid-cols-6 gap-6 md:grid-cols-12">
    <div class="col-span-6 flex flex-col gap-10 md:col-start-4 md:col-end-12 md:gap-16">
      <header class="flex flex-col gap-10">
        <Badge>{data.heading}</Badge>
        <h2 class="text-pretty text-4xl leading-none font-semibold text-ink-primary md:text-6xl">
          {data.title}
        </h2>
      </header>

      {#if data.faqs.length}
        <ul class="flex flex-col border-t border-dashed border-white/16">
          {#each data.faqs as faq, index}
            {@const isOpen = openFaq === index}
            <li class="border-b border-dashed border-white/16">
              <button
                type="button"
                class="flex w-full items-center gap-3 py-6 text-left"
                aria-expanded={isOpen}
                onclick={() => toggleFaq(index)}
              >
                <span
                  class={[
                    'flex size-5 shrink-0 items-center justify-center text-ink-secondary transition-transform duration-200 [&>svg]:size-5',
                    isOpen && 'rotate-45'
                  ]}
                  aria-hidden="true"
                >
                  <PlusIcon />
                </span>
                <span class="text-pretty text-base font-medium text-ink-primary md:text-lg">
                  {faq.question}
                </span>
              </button>
              <div class="faq-answer overflow-hidden" data-open={isOpen}>
                <p class="max-w-2xl pb-6 pl-8 text-pretty text-base leading-7 text-ink-secondary">
                  {faq.answer}
                </p>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</section>

<style>
  .faq-answer {
    interpolate-size: allow-keywords;
    height: 0;
    transition: height 200ms ease;
  }
  .faq-answer[data-open='true'] {
    height: auto;
  }
</style>
