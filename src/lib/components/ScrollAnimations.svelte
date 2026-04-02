<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const EASE = "power3.out";
    const DURATION = 0.8;
    const HERO_DURATION = 1.2;
    const STAGGER = 0.05;
    const SPLIT_STAGGER = 0.04;
    const REVEAL_Y = 30;
    const BLUR = 6;
    const TRIGGER_START = "top 85%";

    function splitTextIntoWords(el: HTMLElement): HTMLSpanElement[] {
      const text = el.textContent || "";
      el.textContent = "";
      const words = text.split(/\s+/).filter(Boolean);
      const spans = words.map((word, i) => {
        const span = document.createElement("span");
        span.textContent = word + (i < words.length - 1 ? "\u00A0" : "");
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.filter = `blur(${BLUR}px)`;
        span.style.transform = `translateY(${REVEAL_Y}px)`;
        el.appendChild(span);
        return span;
      });
      el.style.opacity = "1";
      return spans;
    }

    function initHeroAnimation() {
      const heroSection = document.querySelector("[data-hero]");
      if (!heroSection) return;

      const tl = gsap.timeline({ delay: 0.2 });

      const step1Els = heroSection.querySelectorAll<HTMLElement>('[data-hero-step="1"]');
      step1Els.forEach((el) => {
        if (el.hasAttribute("data-split-text")) {
          const words = splitTextIntoWords(el);
          tl.to(words, {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: HERO_DURATION, stagger: SPLIT_STAGGER, ease: EASE,
          }, tl.duration() > 0 ? "-=0.8" : 0);
        } else {
          gsap.set(el, { y: REVEAL_Y, filter: `blur(${BLUR}px)` });
          tl.to(el, {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: DURATION, ease: EASE,
          }, tl.duration() > 0 ? "-=1" : 0);
        }
      });

      const step2Els = heroSection.querySelectorAll<HTMLElement>('[data-hero-step="2"]');
      step2Els.forEach((el) => {
        gsap.set(el, { y: REVEAL_Y, filter: `blur(${BLUR}px)` });
        tl.to(el, {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: DURATION, ease: EASE,
        }, "-=0.9");
      });

      const step3Els = heroSection.querySelectorAll<HTMLElement>('[data-hero-step="3"]');
      step3Els.forEach((el) => {
        if (el.children.length > 1) {
          el.style.opacity = "1";
          gsap.set(el.children, { y: REVEAL_Y, opacity: 0, filter: `blur(${BLUR}px)` });
          tl.to(el.children, {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: DURATION, stagger: STAGGER, ease: EASE,
          }, "-=0.6");
        } else {
          gsap.set(el, { y: REVEAL_Y, filter: `blur(${BLUR}px)` });
          tl.to(el, {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: DURATION, ease: EASE,
          }, "-=0.6");
        }
      });

      const heroPattern = heroSection.querySelector<HTMLElement>("[data-hero-pattern]");
      if (heroPattern) {
        tl.to(heroPattern, { opacity: 0.3, duration: 1.5, ease: "power2.inOut" }, "-=0.8");
      }
    }

    function initRevealAnimations() {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-hero] [data-reveal])").forEach((el) => {
        gsap.set(el, { y: REVEAL_Y, filter: `blur(${BLUR}px)` });
        gsap.to(el, {
          opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION, ease: EASE,
          scrollTrigger: { trigger: el, start: TRIGGER_START, once: true },
        });
      });
    }

    function initStaggerAnimations() {
      document.querySelectorAll<HTMLElement>("[data-reveal-stagger]:not([data-hero] [data-reveal-stagger])").forEach((container) => {
        gsap.set(container.children, { y: REVEAL_Y, filter: `blur(${BLUR}px)` });
        gsap.to(container.children, {
          opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION, stagger: STAGGER, ease: EASE,
          scrollTrigger: { trigger: container, start: TRIGGER_START, once: true },
        });
      });
    }

    function initSplitTextAnimations() {
      document.querySelectorAll<HTMLElement>("[data-split-text]:not([data-hero] [data-split-text])").forEach((el) => {
        const words = splitTextIntoWords(el);
        gsap.to(words, {
          opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION, stagger: SPLIT_STAGGER, ease: EASE,
          scrollTrigger: { trigger: el, start: TRIGGER_START, once: true },
        });
      });
    }

    function initScaleAnimations() {
      document.querySelectorAll<HTMLElement>("[data-scale-in]").forEach((el) => {
        gsap.fromTo(el, { scale: 1.1 }, {
          scale: 1, ease: EASE,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }

    function initFadeAnimations() {
      document.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.to(el, {
          opacity: 1, duration: DURATION, ease: EASE,
          scrollTrigger: { trigger: el, start: TRIGGER_START, once: true },
        });
      });
    }

    initHeroAnimation();
    initRevealAnimations();
    initStaggerAnimations();
    initSplitTextAnimations();
    initScaleAnimations();
    initFadeAnimations();

    return () => {
      ScrollTrigger.killAll();
    };
  });
</script>
