import { allWorks } from 'content-collections';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const work = allWorks.find((w) => w._meta.path === params.slug);

	if (!work) {
		error(404, 'Work not found');
	}

	return {
		work
	};
};
