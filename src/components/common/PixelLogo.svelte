<script lang="ts">
	import { onMount } from 'svelte';

	// Canvas refs
	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;

	// Particle class for each pixel
	interface Particle {
		x: number;
		y: number;
		originX: number;
		originY: number;
		size: number;
		distortion: number; // 0 = at origin, 1 = fully scattered
	}

	// Configuration
	const PIXEL_SIZE = 2; // Reduced by 30% from 3
	const PIXEL_GAP = 1;
	const INFLUENCE_RADIUS = 120;
	const EASE_SPEED = 0.06; // Smooth, elegant easing
	const VERTICAL_PADDING = 0.1; // 15% padding top and bottom to prevent cropping

	let particles: Particle[] = [];
	let mouseX = -1000;
	let mouseY = -1000;
	let isHovering = false;
	let animationId: number;
	let ctx: CanvasRenderingContext2D | null;
	let dpr = 1;

	function initCanvas() {
		if (!canvas || !container) return;

		dpr = window.devicePixelRatio || 1;
		const rect = container.getBoundingClientRect();

		// Set canvas size
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		canvas.style.width = `${rect.width}px`;
		canvas.style.height = `${rect.height}px`;

		ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.scale(dpr, dpr);

		// Generate particles from text
		generateParticles(rect.width, rect.height);
	}

	function generateParticles(width: number, height: number) {
		if (!ctx) return;

		particles = [];

		// Create offscreen canvas for text rendering
		const offscreen = document.createElement('canvas');
		offscreen.width = width;
		offscreen.height = height;
		const offCtx = offscreen.getContext('2d');
		if (!offCtx) return;

		// Calculate available height with padding
		const availableHeight = height * (1 - VERTICAL_PADDING * 2);
		const textY = height / 2;

		// Calculate font size - use height as constraint
		const fontSize = availableHeight * 0.9;
		offCtx.font = `bold ${fontSize}px "Helvetica Neue", Arial, sans-serif`;
		offCtx.textAlign = 'center';
		offCtx.textBaseline = 'middle';

		// Measure text and adjust to fit full width
		const textMetrics = offCtx.measureText('PIXELS STUDIO');
		const textWidth = textMetrics.width;
		const scaleFactor = (width * 0.98) / textWidth; // 98% of container width
		const adjustedFontSize = fontSize * scaleFactor;

		offCtx.font = `bold ${adjustedFontSize}px "Helvetica Neue", Arial, sans-serif`;
		offCtx.fillStyle = '#262626';
		offCtx.fillText('PIXELS STUDIO', width / 2, textY);

		// Sample pixels from the rendered text
		const imageData = offCtx.getImageData(0, 0, width, height);
		const data = imageData.data;
		const step = PIXEL_SIZE + PIXEL_GAP;

		for (let y = 0; y < height; y += step) {
			for (let x = 0; x < width; x += step) {
				const i = (y * width + x) * 4;
				const alpha = data[i + 3];

				if (alpha > 128) {
					particles.push({
						x: x,
						y: y,
						originX: x,
						originY: y,
						size: PIXEL_SIZE,
						distortion: 0
					});
				}
			}
		}
	}

	function drawPixels(animated = false) {
		if (!ctx || !canvas) return;

		const width = canvas.width / dpr;
		const height = canvas.height / dpr;
		ctx.clearRect(0, 0, width, height);

		let needsAnimation = false;

		for (const p of particles) {
			// Calculate distance from mouse
			const dx = mouseX - p.originX;
			const dy = mouseY - p.originY;
			const dist = Math.sqrt(dx * dx + dy * dy);

			// Target distortion based on mouse proximity
			let targetDistortion = 0;
			if (isHovering && dist < INFLUENCE_RADIUS) {
				targetDistortion = 1 - dist / INFLUENCE_RADIUS;
			}

			if (animated) {
				// Smooth easing toward target
				p.distortion += (targetDistortion - p.distortion) * EASE_SPEED;

				// Clamp small values
				if (Math.abs(p.distortion) < 0.001) {
					p.distortion = 0;
				}

				if (Math.abs(targetDistortion - p.distortion) > 0.001) {
					needsAnimation = true;
				}
			}

			// Calculate scatter offset based on distortion
			let drawX = p.originX;
			let drawY = p.originY;

			if (p.distortion > 0.01) {
				const scatterAngle = Math.atan2(p.originY - mouseY, p.originX - mouseX);
				const scatterDistance = p.distortion * 20;
				drawX = p.originX + Math.cos(scatterAngle) * scatterDistance;
				drawY = p.originY + Math.sin(scatterAngle) * scatterDistance;
			}

			// Elegant opacity - brighter when scattered
			const baseOpacity = 0.08;
			const opacity = baseOpacity + p.distortion * 0.4;
			ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
			ctx.fillRect(drawX, drawY, p.size, p.size);
		}

		return needsAnimation;
	}

	function animate() {
		const needsAnimation = drawPixels(true);

		if (needsAnimation || isHovering) {
			animationId = requestAnimationFrame(animate);
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	}

	function handleMouseEnter() {
		isHovering = true;
		cancelAnimationFrame(animationId);
		animationId = requestAnimationFrame(animate);
	}

	function handleMouseLeave() {
		isHovering = false;
		mouseX = -1000;
		mouseY = -1000;
	}

	function handleResize() {
		initCanvas();
		drawPixels(false);
	}

	onMount(() => {
		initCanvas();
		drawPixels(false);

		// Setup resize observer
		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(container);

		return () => {
			cancelAnimationFrame(animationId);
			resizeObserver.disconnect();
		};
	});
</script>

<div class="pixel-logo-container" bind:this={container} role="img" aria-label="PIXELS STUDIO">
	<canvas
		bind:this={canvas}
		onmousemove={handleMouseMove}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	></canvas>
</div>

<style>
	.pixel-logo-container {
		width: 100%;
		aspect-ratio: 1501 / 180; /* Increased height ratio to prevent cropping */
		position: relative;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
