let hasPlayed = false;

export const introState = {
	get hasPlayed() {
		return hasPlayed;
	},
	markPlayed() {
		hasPlayed = true;
	}
};
