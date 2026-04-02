<script lang="ts">
  import { onMount } from 'svelte';

  let canvasEl: HTMLCanvasElement;

  onMount(() => {
    const canvas = canvasEl;
    const ctx = canvas.getContext("2d")!;

    const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ+-=/:;.,<>!?#^*|'\"\\(){}[]".split("");
    const CHAR_W = 7;
    const CHAR_H = 9;
    const SWAP_INTERVAL = 600;
    const FADE_DURATION = 1400;
    const BASE_OPACITY = 0.14;

    // Subtle explosion
    const EXPLODE_RADIUS = 40;
    const EXPLODE_FORCE = 8;
    const EXPLODE_RETURN = 0.04;

    // Rainbow color radius — large and gradual to avoid visible disc
    const COLOR_INNER = 30;
    const COLOR_OUTER = 300;

    type CharCell = {
      x: number;
      y: number;
      char: string;
      state: "visible" | "fading-out" | "fading-in";
      stateStart: number;
      fade: number;
      dx: number;
      dy: number;
      vx: number;
      vy: number;
    };

    let cells: CharCell[] = [];
    let mask: Uint8Array;
    let cols: number;
    let rows: number;
    let dpr: number;
    let lastSwap = 0;
    let animId: number;
    let hueOffset = 0;

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseInCanvas = false;

    function randomChar(): string {
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function remapHue(h: number): number {
      h = ((h % 360) + 360) % 360;
      if (h >= 45 && h <= 170) {
        const t = (h - 45) / (170 - 45);
        return 188 + t * 52;
      }
      return h;
    }

    function hslToRgb(h: number, s: number, l: number): [number, number, number] {
      h = remapHue(h) / 360;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) => {
        const k = (n + h * 12) % 12;
        return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      };
      return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
    }

    function buildMask() {
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const offCtx = offscreen.getContext("2d")!;

      offCtx.textBaseline = "middle";
      offCtx.fillStyle = "#fff";

      let fontSize = canvas.height * 0.7;
      offCtx.font = `800 ${fontSize}px Inter, sans-serif`;
      let measured = offCtx.measureText("PIXELS STUDIO").width;
      const targetWidth = canvas.width;
      fontSize = fontSize * (targetWidth / measured);
      offCtx.font = `800 ${fontSize}px Inter, sans-serif`;

      offCtx.textAlign = "center";
      offCtx.fillText("PIXELS STUDIO", canvas.width / 2, canvas.height / 2);

      const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      cols = Math.floor(canvas.width / (CHAR_W * dpr));
      rows = Math.floor(canvas.height / (CHAR_H * dpr));
      mask = new Uint8Array(cols * rows);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = Math.floor((c + 0.5) * CHAR_W * dpr);
          const py = Math.floor((r + 0.5) * CHAR_H * dpr);
          const idx = (py * canvas.width + px) * 4;
          mask[r * cols + c] = data[idx + 3] > 40 ? 1 : 0;
        }
      }
    }

    function initCells() {
      cells = [];
      const now = performance.now();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (mask[r * cols + c]) {
            cells.push({
              x: c,
              y: r,
              char: randomChar(),
              state: "visible",
              stateStart: now - Math.random() * FADE_DURATION,
              fade: 1,
              dx: 0, dy: 0,
              vx: 0, vy: 0,
            });
          }
        }
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      buildMask();
      initCells();
    }

    function swapChars(now: number) {
      if (now - lastSwap < SWAP_INTERVAL) return;
      lastSwap = now;

      const visible = cells.filter((c) => c.state === "visible");
      const count = Math.min(visible.length, 4 + Math.floor(Math.random() * 5));

      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * visible.length);
        const cell = visible[idx];
        cell.state = "fading-out";
        cell.stateStart = now;
        visible.splice(idx, 1);
      }
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hueOffset = (now * 0.06) % 360;

      const charSize = CHAR_H * dpr * 0.75;
      const explodeR = EXPLODE_RADIUS * dpr;
      const explodeR2 = explodeR * explodeR;
      const colorInner = COLOR_INNER * dpr;
      const colorOuter = COLOR_OUTER * dpr;

      ctx.font = `${charSize}px "Fragment Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const cell of cells) {
        const elapsed = now - cell.stateStart;

        if (cell.state === "fading-out") {
          const t = Math.min(elapsed / FADE_DURATION, 1);
          cell.fade = 1 - t;
          if (t >= 1) {
            cell.state = "fading-in";
            cell.stateStart = now;
            cell.char = randomChar();
            cell.fade = 0;
          }
        } else if (cell.state === "fading-in") {
          const t = Math.min(elapsed / FADE_DURATION, 1);
          cell.fade = t;
          if (t >= 1) {
            cell.state = "visible";
            cell.stateStart = now;
            cell.fade = 1;
          }
        } else {
          cell.fade = 1;
        }

        if (cell.fade <= 0.01) continue;

        const homeX = (cell.x + 0.5) * CHAR_W * dpr;
        const homeY = (cell.y + 0.5) * CHAR_H * dpr;

        // Subtle explosion physics
        if (mouseInCanvas) {
          const toX = homeX + cell.dx - mouseX;
          const toY = homeY + cell.dy - mouseY;
          const dist2 = toX * toX + toY * toY;

          if (dist2 < explodeR2 && dist2 > 0) {
            const dist = Math.sqrt(dist2);
            const force = (1 - dist / explodeR) * EXPLODE_FORCE * dpr;
            const nx = toX / dist;
            const ny = toY / dist;
            cell.vx += nx * force * 0.15;
            cell.vy += ny * force * 0.15;
          }
        }

        // Spring back
        cell.vx -= cell.dx * EXPLODE_RETURN;
        cell.vy -= cell.dy * EXPLODE_RETURN;
        cell.vx *= 0.88;
        cell.vy *= 0.88;
        cell.dx += cell.vx;
        cell.dy += cell.vy;

        if (Math.abs(cell.dx) < 0.05 && Math.abs(cell.vx) < 0.005) { cell.dx = 0; cell.vx = 0; }
        if (Math.abs(cell.dy) < 0.05 && Math.abs(cell.vy) < 0.005) { cell.dy = 0; cell.vy = 0; }

        const px = homeX + cell.dx;
        const py = homeY + cell.dy;

        // Rainbow text coloring near cursor (no spotlight, just character color)
        let intensity = 0;
        let charHue = 0;

        if (mouseInCanvas) {
          const dx = px - mouseX;
          const dy = py - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < colorOuter) {
            intensity = dist < colorInner
              ? 1 - (dist / colorInner) * 0.15
              : Math.max(0, 1 - (dist - colorInner) / (colorOuter - colorInner));
            const angle = Math.atan2(dy, dx);
            charHue = (hueOffset + (angle * 180) / Math.PI + 360) % 360;
          }
        }

        intensity = Math.min(1, intensity) * cell.fade;

        if (intensity > 0.01) {
          // Blend: colored characters smoothly mix with the base white
          const saturation = 0.58 + intensity * 0.08;
          const lightness = 0.34 + intensity * 0.18;
          const [r, g, b] = hslToRgb(charHue, saturation, lightness);
          const colorAlpha = intensity * 0.6;
          const baseAlpha = BASE_OPACITY * cell.fade;
          // Draw base white first, then colored on top
          ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha * (1 - intensity)})`;
          ctx.fillText(cell.char, px, py);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${colorAlpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${BASE_OPACITY * cell.fade})`;
        }

        ctx.fillText(cell.char, px, py);
      }

      swapChars(now);
      animId = requestAnimationFrame(draw);
    }

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * dpr;
      mouseY = (e.clientY - rect.top) * dpr;
      mouseInCanvas = true;
    });

    canvas.addEventListener("mouseleave", () => {
      mouseInCanvas = false;
    });

    async function init() {
      try {
        await document.fonts.load("800 100px Inter");
      } catch {}
      resize();
      animId = requestAnimationFrame(draw);
    }

    init();

    const resizeHandler = () => {
      cancelAnimationFrame(animId);
      resize();
      animId = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeHandler);
    };
  });
</script>

<div data-fade class="relative z-10 w-full overflow-hidden px-6 pt-6">
  <div class="mx-auto w-full max-w-[1360px]">
    <canvas bind:this={canvasEl} class="w-full" style="aspect-ratio: 1200/200;" aria-hidden="true"></canvas>
  </div>
</div>
