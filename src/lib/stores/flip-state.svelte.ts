import gsap from 'gsap';

// Store the captured element bounds for cross-page FLIP animation
interface CapturedState {
	bounds: DOMRect;
	src: string;
	id: string;
	isVideo: boolean;
	clone: HTMLElement;
}

let capturedState = $state<CapturedState | null>(null);

// Direction of the current animation
let animationDirection = $state<'enter' | 'exit' | null>(null);

function createClone(element: HTMLElement, bounds: DOMRect, isVideo: boolean): HTMLElement {
	const clone = isVideo ? document.createElement('video') : document.createElement('img');

	if (isVideo) {
		const videoEl = element as HTMLVideoElement;
		(clone as HTMLVideoElement).src = videoEl.src;
		(clone as HTMLVideoElement).muted = true;
		(clone as HTMLVideoElement).autoplay = true;
		(clone as HTMLVideoElement).loop = true;
		(clone as HTMLVideoElement).playsInline = true;
		// Copy current time for seamless video transition
		(clone as HTMLVideoElement).currentTime = videoEl.currentTime;
	} else {
		(clone as HTMLImageElement).src = (element as HTMLImageElement).src;
	}

	// Style the clone to match the source position
	Object.assign(clone.style, {
		position: 'fixed',
		top: `${bounds.top}px`,
		left: `${bounds.left}px`,
		width: `${bounds.width}px`,
		height: `${bounds.height}px`,
		objectFit: 'cover',
		zIndex: '9999',
		pointerEvents: 'none',
		margin: '0',
		padding: '0',
		border: 'none'
	});

	return clone;
}

export function captureFlipState(
	element: HTMLElement | null,
	id: string,
	direction: 'enter' | 'exit' = 'enter'
) {
	if (!element) return;

	const bounds = element.getBoundingClientRect();
	const isVideo = element.tagName.toLowerCase() === 'video';

	// Create clone immediately
	const clone = createClone(element, bounds, isVideo);
	document.body.appendChild(clone);

	capturedState = {
		bounds,
		src: isVideo ? (element as HTMLVideoElement).src : (element as HTMLImageElement).src,
		id,
		isVideo,
		clone
	};

	animationDirection = direction;
}

export function applyFlipAnimation(element: HTMLElement | null, id: string): Promise<void> {
	return new Promise((resolve) => {
		if (!element || !capturedState || capturedState.id !== id) {
			resolve();
			return;
		}

		const state = capturedState;
		const direction = animationDirection;
		capturedState = null;
		animationDirection = null;

		const sourceBounds = state.bounds;
		const targetBounds = element.getBoundingClientRect();

		// Hide the target element during animation
		element.style.visibility = 'hidden';

		// For enter animation: Use transform-based FLIP for seamless morphing
		// Set the clone to target dimensions immediately, then use transform to position at source
		const scaleX = sourceBounds.width / targetBounds.width;
		const scaleY = sourceBounds.height / targetBounds.height;

		// Calculate the translation needed to position the scaled element at source location
		// We need to account for the fact that scaling happens from center by default
		const translateX =
			sourceBounds.left - targetBounds.left + (sourceBounds.width - targetBounds.width) / 2;
		const translateY =
			sourceBounds.top - targetBounds.top + (sourceBounds.height - targetBounds.height) / 2;

		// Update clone to target dimensions and position, but transform it to source position
		Object.assign(state.clone.style, {
			top: `${targetBounds.top}px`,
			left: `${targetBounds.left}px`,
			width: `${targetBounds.width}px`,
			height: `${targetBounds.height}px`,
			transformOrigin: 'center center',
			transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
		});

		// Animate from source (transformed state) to target (identity transform)
		gsap.to(state.clone, {
			x: 0,
			y: 0,
			scaleX: 1,
			scaleY: 1,
			duration: 0.6,
			ease: 'power2.inOut',
			onComplete: () => {
				// Remove clone and show target
				state.clone.remove();
				element.style.visibility = 'visible';
				resolve();
			}
		});
	});
}

export function getCapturedState() {
	return capturedState;
}

export function getAnimationDirection() {
	return animationDirection;
}

// Clean up any orphaned clones (e.g., if navigation was cancelled)
export function cleanup() {
	if (capturedState?.clone) {
		capturedState.clone.remove();
	}
	capturedState = null;
	animationDirection = null;
}
