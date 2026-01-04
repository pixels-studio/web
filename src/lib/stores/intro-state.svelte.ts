// Tracks if intro animations have already played (to prevent re-animating on navigation)
let hasPlayed = $state(false);

export const introState = {
	get hasPlayed() {
		return hasPlayed;
	},
	markPlayed() {
		hasPlayed = true;
	}
};
