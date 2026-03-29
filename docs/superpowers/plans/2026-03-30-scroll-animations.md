# Scroll Animations & Parallax Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add GSAP-powered scroll animations, parallax effects, and text reveals to create an Awwwards-level experience while matching the site's refined, minimalist aesthetic.

**Architecture:** A centralized `ScrollAnimations.astro` component queries data attributes (`data-reveal`, `data-parallax`, `data-split-text`, etc.) across all sections and registers GSAP ScrollTrigger animations. Lenis smooth scroll syncs with GSAP's ticker. Components only need data attributes added — no per-component animation scripts.

**Tech Stack:** Astro, GSAP + ScrollTrigger, Lenis, Tailwind CSS

---

### Task 1: Install GSAP and Update Lenis Integration

**Files:**
- Modify: `package.json`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Install GSAP**

Run:
```bash
npm install gsap
```

Expected: `gsap` added to `package.json` dependencies.

- [ ] **Step 2: Update Lenis script in Layout.astro to expose instance globally and sync with GSAP**

Replace the existing Lenis `<script>` block (lines 27-38) in `src/layouts/Layout.astro` with:

```astro
<script>
  import Lenis from "lenis";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  (window as any).lenis = lenis;
</script>
```

- [ ] **Step 3: Add ScrollAnimations component import to Layout.astro**

In the frontmatter (lines 1-6), add the import:

```astro
---
import { Font } from "astro:assets";
import "../styles/global.css";
import GridLines from "../components/GridLines.astro";
import Header from "../components/Header.astro";
import ScrollAnimations from "../components/ScrollAnimations.astro";
---
```

Add `<ScrollAnimations />` just before the closing `</body>` tag (after the `<script>` block):

```html
    <ScrollAnimations />
  </body>
</html>
```

- [ ] **Step 4: Verify dev server starts without errors**

Run:
```bash
npm run dev
```

Expected: Dev server starts, no console errors. Site renders as before (no visual changes yet).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/layouts/Layout.astro
git commit -m "feat: install GSAP and sync Lenis with ScrollTrigger"
```

---

### Task 2: Create ScrollAnimations.astro — Centralized Animation Controller

**Files:**
- Create: `src/components/ScrollAnimations.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add initial hidden state CSS to global.css**

Add the following after the existing `@keyframes blink` block (after line 24) in `src/styles/global.css`:

```css
[data-reveal],
[data-reveal-stagger] > *,
[data-split-text],
[data-fade] {
  opacity: 0;
}
```

- [ ] **Step 2: Create ScrollAnimations.astro with all animation registrations**

Create `src/components/ScrollAnimations.astro`:

```astro
<script>
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  const EASE = "power3.out";
  const DURATION = 0.8;
  const HERO_DURATION = 1.2;
  const STAGGER = 0.05;
  const SPLIT_STAGGER = 0.04;
  const REVEAL_Y = 30;
  const TRIGGER_START = "top 85%";

  // --- Split Text Utility ---
  function splitTextIntoWords(el: HTMLElement): HTMLSpanElement[] {
    const text = el.textContent || "";
    el.textContent = "";
    const words = text.split(/\s+/).filter(Boolean);
    return words.map((word, i) => {
      const span = document.createElement("span");
      span.textContent = word + (i < words.length - 1 ? "\u00A0" : "");
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = `translateY(${REVEAL_Y}px)`;
      el.appendChild(span);
      return span;
    });
  }

  // --- Hero Entrance (page-load, not scroll-triggered) ---
  function initHeroAnimation() {
    const heroSection = document.querySelector("[data-hero]");
    if (!heroSection) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Split text in hero
    const heroSplitEls = heroSection.querySelectorAll<HTMLElement>("[data-split-text]");
    heroSplitEls.forEach((el) => {
      const words = splitTextIntoWords(el);
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: HERO_DURATION,
          stagger: SPLIT_STAGGER,
          ease: EASE,
        },
        tl.duration() > 0 ? "-=0.8" : 0
      );
    });

    // Reveal elements in hero (sequential)
    const heroReveals = heroSection.querySelectorAll<HTMLElement>("[data-reveal]");
    heroReveals.forEach((el, i) => {
      tl.to(
        el,
        {
          opacity: 1,
          y: 0,
          duration: DURATION,
          ease: EASE,
        },
        i === 0 ? "-=0.3" : "-=0.5"
      );
    });

    // Staggered reveals in hero
    const heroStaggers = heroSection.querySelectorAll<HTMLElement>("[data-reveal-stagger]");
    heroStaggers.forEach((container) => {
      tl.to(
        container.children,
        {
          opacity: 1,
          y: 0,
          duration: DURATION,
          stagger: STAGGER,
          ease: EASE,
        },
        "-=0.4"
      );
    });
  }

  // --- Scroll-Triggered Reveals ---
  function initRevealAnimations() {
    const reveals = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-hero] [data-reveal])"
    );

    reveals.forEach((el) => {
      gsap.set(el, { y: REVEAL_Y });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: DURATION,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: TRIGGER_START,
          once: true,
        },
      });
    });
  }

  // --- Scroll-Triggered Stagger Reveals ---
  function initStaggerAnimations() {
    const containers = document.querySelectorAll<HTMLElement>(
      "[data-reveal-stagger]:not([data-hero] [data-reveal-stagger])"
    );

    containers.forEach((container) => {
      gsap.set(container.children, { y: REVEAL_Y });
      gsap.to(container.children, {
        opacity: 1,
        y: 0,
        duration: DURATION,
        stagger: STAGGER,
        ease: EASE,
        scrollTrigger: {
          trigger: container,
          start: TRIGGER_START,
          once: true,
        },
      });
    });
  }

  // --- Scroll-Triggered Split Text ---
  function initSplitTextAnimations() {
    const els = document.querySelectorAll<HTMLElement>(
      "[data-split-text]:not([data-hero] [data-split-text])"
    );

    els.forEach((el) => {
      const words = splitTextIntoWords(el);
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: DURATION,
        stagger: SPLIT_STAGGER,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: TRIGGER_START,
          once: true,
        },
      });
    });
  }

  // --- Parallax ---
  function initParallaxAnimations() {
    const els = document.querySelectorAll<HTMLElement>("[data-parallax]");

    els.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0.15");
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  // --- Simple Fade ---
  function initFadeAnimations() {
    const els = document.querySelectorAll<HTMLElement>("[data-fade]");

    els.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        duration: DURATION,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: TRIGGER_START,
          once: true,
        },
      });
    });
  }

  // --- Initialize All ---
  initHeroAnimation();
  initRevealAnimations();
  initStaggerAnimations();
  initSplitTextAnimations();
  initParallaxAnimations();
  initFadeAnimations();
</script>
```

- [ ] **Step 3: Verify dev server runs and no visual regressions**

Run:
```bash
npm run dev
```

Expected: Site loads. No elements should be invisible yet (no data attributes have been added to components). No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ScrollAnimations.astro src/styles/global.css
git commit -m "feat: add centralized scroll animation controller with GSAP ScrollTrigger"
```

---

### Task 3: Add Hero (Lead) Entrance Animations

**Files:**
- Modify: `src/components/Lead.astro`

- [ ] **Step 1: Add data-hero attribute to the section and data attributes to elements**

Replace the full content of `src/components/Lead.astro` with:

```astro
---
import HexPattern from "./HexPattern.astro";
import OpenBadge from "../assets/icons/open-badge.svg";
import Bolt from "../assets/icons/bolt.svg";
import GridDots from "../assets/icons/grid-dots.svg";

const features = [
  {
    Icon: Bolt,
    title: "Faster delivery",
    description: "Fewer revisions keep the work moving forward faster.",
  },
  {
    Icon: GridDots,
    title: "Clear experience",
    description:
      "Intuitive user interfaces reduce confusion, support requests.",
  },
];
---

<section data-hero class="relative z-10 flex min-h-dvh flex-col px-6 py-30">
  <div
    class="absolute mask-radial-farthest-side mask-radial-at-bottom-right mask-radial-from-10% mask-radial-to-80% opacity-30 inset-x-0 top-0 h-full max-h-140 pointer-events-none select-none"
    aria-hidden="true"
  >
    <HexPattern />
  </div>
  <div class="relative mx-auto flex w-full max-w-[1464px] flex-1 flex-col">
    <div class="flex flex-col gap-6">
      <OpenBadge class="h-6 text-ink-secondary w-auto self-start" data-reveal />
      <h1
        data-split-text
        class="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.05] tracking-tight"
      >
        Design partner for startups that don't cut corners.
      </h1>
    </div>

    <div class="mt-auto grid items-end grid-cols-6 gap-6 md:grid-cols-12">
      <div
        class="col-span-6 flex flex-col gap-6 text-xl text-pretty md:col-span-5 md:col-start-1"
        data-reveal
      >
        <p class="text-ink-secondary">
          Pixels Studio is an independent design and engineering practice with
          over a decade of experience building products from zero to scale. The
          work focuses on clarity, structure, and execution.
        </p>
        <p class="text-ink-secondary">
          From defining problems to delivering production-ready interfaces,
          design and code live under one roof. No handoffs. No shortcuts. No
          loose ends.
        </p>
      </div>

      <div class="col-span-6 flex flex-col gap-12 md:col-span-4 md:col-start-9">
        <div class="grid grid-cols-2 gap-6" data-reveal-stagger>
          {
            features.map(({ Icon, title, description }) => (
              <div class="flex flex-col">
                <Icon class="size-6" />
                <h3 class="mt-6 font-medium">{title}</h3>
                <p class="mt-1 text-sm text-ink-secondary">{description}</p>
              </div>
            ))
          }
        </div>

        <a
          href="mailto:hello@pixels.studio"
          class="flex h-12 w-full items-center justify-center border border-ink-primary bg-white font-mono text-sm uppercase tracking-wide text-surface-primary transition-colors hover:bg-ink-primary"
          data-reveal
        >
          Start a project
        </a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify hero entrance animation in browser**

Run dev server and open the site. Expected:
1. Page loads with content hidden
2. After 0.2s delay, the h1 heading reveals word by word
3. OpenBadge fades up before the heading
4. Description text fades up
5. Feature cards stagger in
6. CTA button fades up last

- [ ] **Step 3: Commit**

```bash
git add src/components/Lead.astro
git commit -m "feat: add hero entrance animation with split text and staggered reveals"
```

---

### Task 4: Add Animations to Origon Case Study

**Files:**
- Modify: `src/components/Origon.astro`

- [ ] **Step 1: Add data attributes to Origon.astro**

Replace the full content of `src/components/Origon.astro` with:

```astro
---
import { Image } from "astro:assets";
import origonDashboard from "../assets/media/origon-dashboard.png";
---

<section id="work" class="relative z-10 flex min-h-dvh flex-col px-6 py-30">
  <div class="mx-auto w-full max-w-[1464px] flex flex-1 flex-col gap-15">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12 md:items-end">
      <div class="col-span-6 flex flex-col gap-6">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>Origon</p>
        <h2
          data-split-text
          class="text-6xl font-semibold leading-none tracking-tight text-pretty"
        >
          Operating AI systems at scale
        </h2>
      </div>

      <p
        data-reveal
        class="col-span-6 md:col-span-4 md:col-start-9 md:self-end text-xl leading-relaxed text-ink-secondary text-pretty"
      >
        Leading design and frontend for an AI platform used to build and run
        multi-agent systems in real-world operations.
      </p>
    </div>

    <div class="mt-auto grid grid-cols-6 gap-6 md:grid-cols-12">
      <div class="col-span-6 md:col-span-12 overflow-hidden">
        <Image
          src={origonDashboard}
          alt="Origon dashboard preview"
          data-parallax
          data-speed="0.15"
          class="w-full object-cover will-change-transform"
        />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to Origon section. Expected:
- "Origon" label fades up
- Heading reveals word by word
- Description text fades up
- Dashboard image has parallax shift (moves slower than scroll)

- [ ] **Step 3: Commit**

```bash
git add src/components/Origon.astro
git commit -m "feat: add scroll animations to Origon case study"
```

---

### Task 5: Add Animations to TribeCommunicationApp Case Study

**Files:**
- Modify: `src/components/TribeCommunicationApp.astro`

- [ ] **Step 1: Add data attributes to TribeCommunicationApp.astro**

Replace the full content of `src/components/TribeCommunicationApp.astro` with:

```astro
---
import { Image } from "astro:assets";
import tribeCommunicationApp from "../assets/media/tribe-communication-app.png";
---

<section
  class="relative z-10 flex min-h-dvh flex-col justify-center px-6 py-30"
>
  <div class="mx-auto w-full max-w-[1464px]">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12 md:items-center">
      <div class="col-span-6 md:col-span-4 flex flex-col gap-6">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>
          Tribe Communication App
        </p>
        <h2
          data-split-text
          class="text-6xl font-semibold leading-none tracking-tight text-pretty"
        >
          Talk that keeps teams moving
        </h2>
        <p data-reveal class="text-xl leading-relaxed text-ink-secondary text-pretty">
          A team communication platform built for speed and clarity. Channels,
          threads, and calls in one place — so nothing gets lost and no one gets
          left behind.
        </p>
      </div>

      <div class="col-span-6 md:col-span-6 md:col-start-7 overflow-hidden">
        <Image
          src={tribeCommunicationApp}
          alt="Tribe Communication App preview"
          data-parallax
          data-speed="0.15"
          class="w-full will-change-transform"
        />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to Tribe Communication section. Expected: label fades, heading splits, description reveals, image has parallax.

- [ ] **Step 3: Commit**

```bash
git add src/components/TribeCommunicationApp.astro
git commit -m "feat: add scroll animations to Tribe Communication case study"
```

---

### Task 6: Add Animations to TribeDocumentManagement Case Study

**Files:**
- Modify: `src/components/TribeDocumentManagement.astro`

- [ ] **Step 1: Add data attributes to TribeDocumentManagement.astro**

Replace the full content of `src/components/TribeDocumentManagement.astro` with:

```astro
---
import { Image } from "astro:assets";
import tribeDocumentManagement from "../assets/media/tribe-document-management.png";
---

<section class="relative z-10 flex min-h-dvh flex-col px-6 py-30">
  <div class="mx-auto w-full max-w-[1464px] flex flex-1 flex-col gap-15">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12 md:items-end">
      <div class="col-span-6 flex flex-col gap-6">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>
          Tribe Document Management
        </p>
        <h2 data-split-text class="text-6xl font-semibold leading-[1.05] tracking-tight">
          One place for every page
        </h2>
      </div>

      <p
        data-reveal
        class="col-span-6 md:col-span-4 md:col-start-9 md:self-end text-xl leading-relaxed text-ink-secondary text-pretty"
      >
        A document management system designed for teams that move fast.
        Organized storage, quick retrieval, and seamless collaboration —
        without the overhead.
      </p>
    </div>

    <div class="mt-auto grid grid-cols-6 gap-6 md:grid-cols-12">
      <div class="col-span-6 md:col-span-12 overflow-hidden">
        <Image
          src={tribeDocumentManagement}
          alt="Tribe Document Management preview"
          data-parallax
          data-speed="0.15"
          class="w-full aspect-video object-cover will-change-transform"
        />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to section. Expected: same pattern — label reveal, heading split, description reveal, image parallax.

- [ ] **Step 3: Commit**

```bash
git add src/components/TribeDocumentManagement.astro
git commit -m "feat: add scroll animations to Tribe Document Management case study"
```

---

### Task 7: Add Animations to Samespace Case Study

**Files:**
- Modify: `src/components/Samespace.astro`

- [ ] **Step 1: Add data attributes to Samespace.astro**

Replace the full content of `src/components/Samespace.astro` with:

```astro
---
import { Image } from "astro:assets";
import samespace01 from "../assets/media/samespace-01.png";
import samespace02 from "../assets/media/samespace-02.png";
---

<section class="relative z-10 flex min-h-dvh flex-col px-6 py-30">
  <div class="mx-auto w-full max-w-[1464px] flex flex-1 flex-col">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12 md:items-end">
      <div class="col-span-6 flex flex-col gap-6">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>Samespace</p>
        <h2 data-split-text class="text-6xl font-semibold leading-[1.05] tracking-tight">
          The full-stack CX platform
        </h2>
      </div>

      <p
        data-reveal
        class="col-span-6 md:col-span-4 md:col-start-9 md:self-end text-xl leading-relaxed text-ink-secondary text-pretty"
      >
        Intelligent automation meets human expertise. A unified platform for
        AI-driven customer experiences across every channel, built without
        custom development.
      </p>
    </div>

    <div class="mt-auto grid grid-cols-6 gap-6 md:grid-cols-12">
      <div class="col-span-6 md:col-span-7 overflow-hidden">
        <Image
          src={samespace01}
          alt="Samespace preview 1"
          data-parallax
          data-speed="0.15"
          class="w-full aspect-video object-cover will-change-transform"
        />
      </div>
      <div
        class="bg-surface-secondary w-full col-span-6 md:col-span-5 grid place-items-center overflow-hidden"
      >
        <Image
          src={samespace02}
          alt="Samespace preview 2"
          data-parallax
          data-speed="0.1"
          class="col-span-6 md:col-span-5 object-cover will-change-transform"
        />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to Samespace. Expected: both images have parallax (left at 0.15 speed, right at 0.1 for variety).

- [ ] **Step 3: Commit**

```bash
git add src/components/Samespace.astro
git commit -m "feat: add scroll animations to Samespace case study"
```

---

### Task 8: Add Animations to Tlkn Case Study

**Files:**
- Modify: `src/components/Tlkn.astro`

- [ ] **Step 1: Add data attributes to Tlkn.astro**

Replace the full content of `src/components/Tlkn.astro` with:

```astro
---
import { Image } from "astro:assets";
import tlkn from "../assets/media/tlkn.png";
---

<section class="relative z-10 flex flex-col px-6 py-30">
  <div
    class="mx-auto w-full max-w-[1464px] grid grid-cols-6 gap-6 md:grid-cols-12"
  >
    <div class="col-span-6 flex flex-col gap-6 md:col-span-3 md:self-start">
      <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>Tlkn</p>
      <h2 data-split-text class="text-6xl font-semibold leading-[1.05] tracking-tight">
        Voice without friction
      </h2>
    </div>

    <div class="col-span-6 overflow-hidden">
      <Image
        src={tlkn}
        alt="Tlkn preview"
        data-parallax
        data-speed="0.15"
        class="max-w-8/10 mx-auto will-change-transform"
      />
    </div>

    <p
      data-reveal
      class="col-span-6 md:col-span-3 md:self-end text-xl leading-relaxed text-ink-secondary text-pretty"
    >
      Designed to make every call feel effortless. Free HD calls, simple contact
      management, and privacy baked in from the start.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to Tlkn. Expected: label reveal, heading split, image parallax, description reveal.

- [ ] **Step 3: Commit**

```bash
git add src/components/Tlkn.astro
git commit -m "feat: add scroll animations to Tlkn case study"
```

---

### Task 9: Add Animations to Playground Section

**Files:**
- Modify: `src/components/Playground.astro`

- [ ] **Step 1: Add data attributes to Playground.astro**

Replace the full content of `src/components/Playground.astro` with:

```astro
---
import { Image } from "astro:assets";
import claudeMemory from "../assets/media/claude-memory.png";
import photographyPortfolio from "../assets/media/photography-portfolio.png";
import sleepApp from "../assets/media/sleep-app.png";
import appInstallationUi from "../assets/media/app-installation-ui.png";
import newTaxApplication from "../assets/media/new-tax-application.png";
import resolveAccountsList from "../assets/media/resolve-accounts-list.png";
import resolveBot from "../assets/media/resolve-bot.png";
import ticketingApp from "../assets/media/ticketing-app.png";

const images = [
  { src: claudeMemory, alt: "Claude Memory" },
  { src: photographyPortfolio, alt: "Photography Portfolio" },
  { src: sleepApp, alt: "Sleep App" },
  { src: appInstallationUi, alt: "App Installation UI" },
  { src: newTaxApplication, alt: "New Tax Application" },
  { src: resolveAccountsList, alt: "Resolve Accounts List" },
  { src: resolveBot, alt: "Resolve Bot" },
  { src: ticketingApp, alt: "Ticketing App" },
];
---

<section id="playground" class="relative z-10 flex flex-col px-6 py-30">
  <div class="mx-auto w-full max-w-[1464px] flex flex-col gap-30">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12">
      <div class="col-span-6 flex flex-col gap-4 md:col-span-5">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>Playground</p>
        <h2 data-split-text class="text-[64px] font-bold leading-[1.05] tracking-tight">
          Experiments in form and function
        </h2>
      </div>
    </div>
  </div>

  <div class="overflow-hidden mt-30" data-parallax data-speed="0.2">
    <div class="flex gap-6 animate-marquee will-change-transform">
      {
        [...images, ...images].map(({ src, alt }) => (
          <Image
            src={src}
            alt={alt}
            class="w-[calc((100vw-5*1.5rem)/3)] md:w-[calc((min(1464px,100vw-3rem)-11*1.5rem)/12*4+3*1.5rem)] aspect-video object-cover shrink-0"
          />
        ))
      }
    </div>
  </div>

  <div class="mx-auto w-full max-w-[1464px] mt-30">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12">
      <p
        data-reveal
        class="col-span-6 md:col-span-4 md:col-start-5 text-xl leading-relaxed text-ink-secondary text-pretty"
      >
        A space for exploring ideas before they become products. New
        interactions, visual systems, and small tools take shape here. It is
        where direction is tested and boundaries are pushed.
      </p>
      <p
        data-reveal
        class="col-span-6 md:col-span-4 md:col-start-9 text-xl leading-relaxed text-ink-secondary text-pretty"
      >
        Some ideas move forward. Some stay as studies. Each one sharpens the
        thinking behind the work and informs what gets built next.
      </p>
    </div>
  </div>
</section>

<style>
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-marquee {
    animation: marquee 40s linear infinite;
  }

  .animate-marquee:hover {
    animation-play-state: paused;
  }
</style>
```

- [ ] **Step 2: Verify in browser**

Scroll to Playground. Expected:
- "Playground" label fades up
- Heading reveals word by word
- Marquee has vertical parallax shift while continuing horizontal scroll
- Description paragraphs fade up

- [ ] **Step 3: Commit**

```bash
git add src/components/Playground.astro
git commit -m "feat: add scroll animations and marquee parallax to Playground section"
```

---

### Task 10: Add Animations to About Section

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: Add data attributes to About.astro**

Replace the full content of `src/components/About.astro` with:

```astro
---
import { Image } from "astro:assets";
import meImage from "../assets/media/me.png";
---

<section id="about" class="relative z-10 flex flex-col px-6 py-30">
  <div class="mx-auto w-full max-w-[1464px]">
    <div class="grid grid-cols-6 gap-6 md:grid-cols-12">
      <div class="col-span-6 flex flex-col md:col-span-5">
        <p class="font-mono text-xs uppercase text-ink-secondary" data-reveal>About</p>
        <h2
          data-reveal
          class="mt-4 text-[64px] font-bold leading-[1.05] tracking-tight"
        >
          The practice
        </h2>

        <div class="mt-auto flex flex-col gap-5" data-reveal>
          <p class="text-xl leading-relaxed text-ink-secondary text-pretty">
            I'm a designer and frontend developer with over a decade of
            experience building products from zero to scale. My focus has always
            been the same: clarity, structure, and execution.
          </p>
          <p class="text-xl leading-relaxed text-ink-secondary text-pretty">
            I work across product design, design systems, and frontend
            engineering. From early problem definition through to production
            code, I handle every layer myself.
          </p>
          <p class="text-xl leading-relaxed text-ink-secondary text-pretty">
            Pixels Studio is how I take on independent work. A small number of
            projects where decisions are direct, standards are high, and outcomes
            matter.
          </p>
        </div>
      </div>

      <Image
        src={meImage}
        alt="Abhishek"
        data-reveal
        class="col-span-6 md:col-span-5 md:col-start-8 aspect-4/5 object-cover"
      />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to About. Expected: label, heading, text block, and portrait all fade up on scroll.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: add scroll reveal animations to About section"
```

---

### Task 11: Add Animations to Contact Section

**Files:**
- Modify: `src/components/Contact.astro`

- [ ] **Step 1: Add data attributes to Contact.astro**

Replace the full content of `src/components/Contact.astro` with:

```astro
---
import { Image } from "astro:assets";
import { socials } from "../lib/routes";
import rajaAvatar from "../assets/media/raja-sandhu.png";
import karthikAvatar from "../assets/media/karthik-iyenger.png";

import Samespace from "../assets/logos/samespace.svg";
import Origon from "../assets/logos/origon.svg";
import Tlkn from "../assets/logos/tlkn.svg";
import Pulse from "../assets/logos/pulse.svg";
import TaxGermany from "../assets/logos/taxgermany.svg";
import Wbp from "../assets/logos/wbp.svg";

const logos = [
  { Icon: Samespace, class: "h-6 w-auto" },
  { Icon: Origon, class: "h-8 w-auto" },
  { Icon: Tlkn, class: "h-6 w-auto" },
  { Icon: Pulse, class: "h-5 w-auto" },
  { Icon: TaxGermany, class: "w-auto h-6" },
  { Icon: Wbp, class: "h-7 w-12" },
];

const testimonials = [
  {
    quote:
      "I had a memorable time working with Abhishek; his grasp on UI and UX design theory was evident. He was a notable asset to the tlkn app with relentless motivation towards creating a perfect product.",
    name: "Raja Sandhu",
    role: "Co-Founder, tlkn Inc.",
    avatar: rajaAvatar,
    variant: "light" as const,
    span: "col-span-6 md:col-span-8",
  },
  {
    quote:
      "Abhishek is a versatile designer with great work ethic and strong problem solving skills.",
    name: "Karthik Iyenger",
    role: "Co-Founder, wbp",
    avatar: karthikAvatar,
    variant: "dark" as const,
    span: "col-span-6 md:col-span-4",
  },
];
---

<section id="contact" class="relative z-10 flex min-h-dvh flex-col px-6 py-30">
  <div class="mx-auto flex w-full max-w-[1464px] flex-col">
    <h2
      data-split-text
      class="mb-30 text-pretty text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.05] tracking-tight md:max-w-[83%]"
    >
      Good work starts with the right partner.
    </h2>

    <div class="grid grid-cols-6 gap-6 mb-15 md:grid-cols-12" data-reveal-stagger>
      {
        testimonials.map(({ quote, name, role, avatar, variant, span }) => (
          <div
            class:list={[
              span,
              "flex flex-col justify-start gap-24 p-12",
              variant === "light"
                ? "bg-[#C4967C] text-surface-primary"
                : "bg-surface-secondary text-ink-primary",
            ]}
          >
            <p class="text-3xl font-medium leading-snug text-pretty">{quote}</p>

            <div class="flex items-center gap-3 mt-auto">
              <Image src={avatar} alt={name} class="size-10 object-cover" />
              <div>
                <p class="font-medium">{name}</p>
                <p
                  class:list={[
                    variant === "light"
                      ? "text-surface-primary/60"
                      : "text-ink-secondary",
                  ]}
                >
                  {role}
                </p>
              </div>
            </div>
          </div>
        ))
      }
    </div>

    <div class="flex flex-col gap-30">
      <div class="grid grid-cols-6 gap-6 md:grid-cols-12" data-reveal-stagger>
        {
          logos.map(({ Icon, class: className }) => (
            <div class="col-span-3 flex min-h-20 items-center justify-center md:col-span-2">
              <Icon class:list={[className, "opacity-40"]} />
            </div>
          ))
        }
      </div>

      <div class="grid grid-cols-6 items-end gap-6 md:grid-cols-12">
        <div class="col-span-6 flex flex-col gap-4" data-reveal>
          <p class="font-mono text-xs uppercase text-ink-secondary">
            Reach out to connect or collaborate
          </p>
          <a
            href="mailto:hello@pixels.studio"
            class="text-[64px] font-semibold leading-tight tracking-tight"
          >
            hello@pixels.studio
          </a>
        </div>

        <div
          class="col-span-6 flex flex-col gap-4 md:col-span-3 md:col-start-10"
          data-reveal
        >
          <p class="font-mono text-xs uppercase text-ink-secondary">Social</p>
          <div class="flex gap-6 flex-wrap md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-2">
            {
              socials.map(({ label, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xl hover:text-ink-secondary transition-colors"
                  data-scramble
                >
                  {label}
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to Contact. Expected:
- "Good work starts..." heading reveals word by word
- Testimonial cards stagger in
- Logo row staggers in
- Email and social sections fade up

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: add scroll animations to Contact section"
```

---

### Task 12: Add Animations to DividerLines and FooterLogo

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/FooterLogo.astro`

- [ ] **Step 1: Add data-reveal to DividerLine instances in index.astro**

Replace the full content of `src/pages/index.astro` with:

```astro
---
import Layout from "../layouts/Layout.astro";
import Lead from "../components/Lead.astro";
import Origon from "../components/Origon.astro";
import TribeCommunicationApp from "../components/TribeCommunicationApp.astro";
import TribeDocumentManagement from "../components/TribeDocumentManagement.astro";
import Samespace from "../components/Samespace.astro";
import Tlkn from "../components/Tlkn.astro";
import Playground from "../components/Playground.astro";
import About from "../components/About.astro";
import Contact from "../components/Contact.astro";
import DividerLine from "../assets/icons/divider.svg";
import FooterLogo from "../components/FooterLogo.astro";
---

<Layout>
  <Lead />
  <DividerLine data-reveal />
  <Origon />
  <DividerLine data-reveal />
  <TribeCommunicationApp />
  <DividerLine data-reveal />
  <TribeDocumentManagement />
  <DividerLine data-reveal />
  <Samespace />
  <DividerLine data-reveal />
  <Tlkn />
  <DividerLine data-reveal />
  <Playground />
  <DividerLine data-reveal />
  <About />
  <DividerLine data-reveal />
  <Contact />
  <DividerLine data-reveal />
  <FooterLogo />
</Layout>
```

Note: SVG components imported via Astro may not pass through arbitrary data attributes. If `data-reveal` doesn't work on `<DividerLine>`, wrap each in a `<div data-reveal>` instead:

```astro
<div data-reveal><DividerLine /></div>
```

- [ ] **Step 2: Add data-fade to FooterLogo.astro**

Replace the opening `<div>` tag (line 5) in `src/components/FooterLogo.astro`:

From:
```html
<div class="relative z-10 w-full overflow-hidden px-6 pt-12 pb-6">
```

To:
```html
<div data-fade class="relative z-10 w-full overflow-hidden px-6 pt-12 pb-6">
```

- [ ] **Step 3: Verify in browser**

Scroll through full page. Expected:
- Divider lines fade in as they enter viewport
- Footer logo fades in at the bottom

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro src/components/FooterLogo.astro
git commit -m "feat: add fade animations to divider lines and footer logo"
```

---

### Task 13: Final Verification and Polish

**Files:**
- Possibly tweak: `src/components/ScrollAnimations.astro` (timing adjustments)

- [ ] **Step 1: Full page scroll-through test**

Run dev server and scroll through the entire page top to bottom. Check:
1. Hero entrance plays on page load (not on scroll)
2. All case study images have smooth parallax
3. All headings reveal word by word
4. All text blocks fade up
5. Playground marquee has parallax + continues horizontal animation
6. About section elements fade up
7. Contact testimonials and logos stagger in
8. Footer logo fades in
9. No elements are permanently invisible (hidden but never triggered)
10. No console errors

- [ ] **Step 2: Test responsive behavior**

Resize browser to mobile width. Check:
1. Animations still trigger correctly
2. Parallax doesn't cause layout overflow
3. Split text wraps correctly on smaller viewports

- [ ] **Step 3: Test scroll performance**

Open DevTools Performance tab, record a scroll through the full page. Check:
1. No frame drops below 30fps
2. No layout thrashing (no forced reflows in animation loop)

- [ ] **Step 4: Build test**

Run:
```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 5: Final commit if any polish changes were made**

```bash
git add -A
git commit -m "feat: polish scroll animation timing and responsiveness"
```
