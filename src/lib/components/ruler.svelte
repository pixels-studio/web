<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const rulers = document.querySelectorAll<HTMLElement>(".ruler");
    const TICK_SPACING = 10;
    const LABEL_INTERVAL = 100;
    const TICK_AREA = 10;
    const CANVAS_WIDTH = 80;
    const HOVER_RADIUS = 150;
    const PAD_X = 8;
    const PAD_Y = 4;
    const FONT = "500 8px var(--font-mono, monospace)";

    const cleanupFns: (() => void)[] = [];

    function buildRuler(container: HTMLElement, side: "left" | "right") {
      const canvas = document.createElement("canvas");
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.width = `${CANVAS_WIDTH}px`;
      canvas.style.pointerEvents = "none";

      if (side === "left") {
        canvas.style.left = "0";
      } else {
        canvas.style.right = "0";
      }

      container.appendChild(canvas);

      const dpr = window.devicePixelRatio || 1;
      let mouseY: number | null = null;
      const labelOpacity: Map<number, number> = new Map();
      let animating = false;

      function animateOpacities() {
        let needsUpdate = false;
        const scrollY = window.scrollY || 0;

        for (const [px, current] of labelOpacity) {
          const y = px - scrollY;
          let target = 0;

          if (mouseY !== null) {
            const dist = Math.abs(y - mouseY);
            if (dist < HOVER_RADIUS) {
              let prox = 1 - dist / HOVER_RADIUS;
              prox = prox * prox;
              if (prox > 0.85) {
                target = Math.min(1, (prox - 0.85) / 0.15);
              }
            }
          }

          const diff = target - current;
          if (Math.abs(diff) > 0.01) {
            labelOpacity.set(px, current + diff * 0.15);
            needsUpdate = true;
          } else if (current !== target) {
            labelOpacity.set(px, target);
            needsUpdate = true;
          }
        }

        if (needsUpdate) {
          render();
          requestAnimationFrame(animateOpacities);
        } else {
          animating = false;
        }
      }

      function startAnimation() {
        if (!animating) {
          animating = true;
          requestAnimationFrame(animateOpacities);
        }
      }

      const onMouseMove = (e: MouseEvent) => {
        mouseY = e.clientY;
        render();
        startAnimation();
      };
      const onMouseLeave = () => {
        mouseY = null;
        render();
        startAnimation();
      };

      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);

      function render() {
        const viewportHeight = window.innerHeight;
        canvas.width = CANVAS_WIDTH * dpr;
        canvas.height = viewportHeight * dpr;
        canvas.style.height = `${viewportHeight}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, CANVAS_WIDTH, viewportHeight);

        const scrollY = window.scrollY || 0;
        const startPx = scrollY;
        const endPx = scrollY + viewportHeight;
        const firstTick = Math.floor(startPx / TICK_SPACING) * TICK_SPACING;

        ctx.font = FONT;

        for (let px = firstTick; px <= endPx; px += TICK_SPACING) {
          const y = px - scrollY;
          const isLabel = px % LABEL_INTERVAL === 0;
          const isMidTick = px % 50 === 0 && !isLabel;

          let proximity = 0;
          if (mouseY !== null) {
            const distToMouse = Math.abs(y - mouseY);
            if (distToMouse < HOVER_RADIUS) {
              proximity = 1 - distToMouse / HOVER_RADIUS;
              proximity = proximity * proximity;
            }
          }

          let baseTickLen: number;
          let maxTickLen: number;
          if (isLabel) { baseTickLen = 8; maxTickLen = 20; }
          else if (isMidTick) { baseTickLen = 6; maxTickLen = 14; }
          else { baseTickLen = 4; maxTickLen = 10; }
          const tickLen = baseTickLen + proximity * (maxTickLen - baseTickLen);

          if (isLabel && proximity > 0.05) {
            const label = String(px);
            const textWidth = ctx.measureText(label).width;
            const textHeight = 8;
            const targetW = textWidth + PAD_X * 2;
            const targetH = textHeight + PAD_Y * 2;
            const rectW = tickLen + proximity * (targetW - tickLen);
            const rectH = 1 + proximity * (targetH - 1);
            const ry = Math.round(y) - rectH / 2;
            let rx: number;
            if (side === "left") { rx = 0; } else { rx = CANVAS_WIDTH - rectW; }

            ctx.fillStyle = `rgba(255,255,255,${0.06 + proximity * 0.12})`;
            ctx.fillRect(rx, ry, rectW, rectH);

            if (!labelOpacity.has(px)) labelOpacity.set(px, 0);
            const textAlpha = labelOpacity.get(px)!;

            if (textAlpha > 0.01) {
              ctx.save();
              ctx.globalAlpha = textAlpha;
              ctx.fillStyle = "rgba(255,255,255,0.7)";
              ctx.font = FONT;
              ctx.textBaseline = "middle";
              if (side === "left") {
                ctx.fillText(label, rx + PAD_X, Math.round(y));
              } else {
                ctx.fillText(label, rx + rectW - PAD_X - textWidth, Math.round(y));
              }
              ctx.restore();
            }
          } else {
            if (isLabel && !labelOpacity.has(px)) labelOpacity.set(px, 0);
            let alpha: number;
            if (isLabel) { alpha = 0.2; }
            else if (isMidTick) { alpha = 0.09; }
            else { alpha = 0.06; }

            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (side === "left") {
              ctx.moveTo(0, Math.round(y) + 0.5);
              ctx.lineTo(tickLen, Math.round(y) + 0.5);
            } else {
              ctx.moveTo(CANVAS_WIDTH, Math.round(y) + 0.5);
              ctx.lineTo(CANVAS_WIDTH - tickLen, Math.round(y) + 0.5);
            }
            ctx.stroke();
          }
        }
      }

      cleanupFns.push(() => {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
        canvas.remove();
      });

      return render;
    }

    const renderers: (() => void)[] = [];
    rulers.forEach((ruler) => {
      const side = ruler.classList.contains("ruler-left") ? "left" : "right";
      const render = buildRuler(ruler, side);
      renderers.push(render);
    });

    function onFrame() { renderers.forEach((r) => r()); }
    onFrame();

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => { onFrame(); ticking = false; });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onFrame, { passive: true });

    cleanupFns.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onFrame);
    });

    return () => { cleanupFns.forEach(fn => fn()); };
  });
</script>

<div class="ruler ruler-left" aria-hidden="true"></div>
<div class="ruler ruler-right" aria-hidden="true"></div>

<style>
  .ruler {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 50;
    pointer-events: auto;
    overflow: visible;
  }
  .ruler-left {
    left: 0;
    width: 10px;
  }
  .ruler-right {
    right: 0;
    width: 10px;
  }
</style>
