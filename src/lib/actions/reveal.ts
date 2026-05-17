import type { Action } from 'svelte/action';

type RevealOptions = {
  delay?: number;
  duration?: number;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

// Elements start hidden via the [data-reveal] CSS rule in app.css —
// this avoids a flash between SSR paint and JS hydration.

function show(node: HTMLElement, duration: number, delay: number) {
  node.style.transition = `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms, filter ${duration}ms ${EASE} ${delay}ms`;
  node.style.opacity = '1';
  node.style.transform = 'translate3d(0, 0, 0)';
  node.style.filter = 'blur(0px)';

  const clear = () => {
    node.style.willChange = '';
  };
  node.addEventListener('transitionend', clear, { once: true });
}

function reveal_now(node: HTMLElement) {
  node.style.transition = '';
  node.style.opacity = '1';
  node.style.transform = 'none';
  node.style.filter = 'none';
  node.style.willChange = '';
}

export const appear: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
  const { delay = 0, duration = 1100 } = options ?? {};

  if (prefersReducedMotion()) {
    reveal_now(node);
    return;
  }

  const id = requestAnimationFrame(() => show(node, duration, delay));

  return {
    destroy() {
      cancelAnimationFrame(id);
    }
  };
};

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
  const { delay = 0, duration = 1300 } = options ?? {};

  if (prefersReducedMotion()) {
    reveal_now(node);
    return;
  }

  const vh = window.innerHeight;
  const rect = node.getBoundingClientRect();

  // If any part of the element is at or above the viewport on mount,
  // animate it in immediately. Only elements still below the fold
  // wait for the IntersectionObserver to fire.
  if (rect.top < vh) {
    const id = requestAnimationFrame(() => show(node, duration, delay));
    return {
      destroy() {
        cancelAnimationFrame(id);
      }
    };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(node, duration, delay);
          observer.unobserve(node);
        }
      }
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
};
