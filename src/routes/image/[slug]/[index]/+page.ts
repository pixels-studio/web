import { error } from '@sveltejs/kit';
import { findProjectImage } from '$lib/media';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const index = Number(params.index);
  if (!Number.isInteger(index) || index < 0) error(404, 'Image not found');
  const result = findProjectImage(params.slug, index);
  if (!result) error(404, 'Image not found');
  return {
    slug: params.slug,
    index,
    image: result.image,
    picture: result.picture,
    projectTitle: result.project.title
  };
};
