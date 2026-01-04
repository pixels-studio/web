// Reactive state for grid visibility
let visible = $state(false);

export const gridState = {
	get visible() {
		return visible;
	},
	toggle() {
		visible = !visible;
	},
	show() {
		visible = true;
	},
	hide() {
		visible = false;
	}
};
