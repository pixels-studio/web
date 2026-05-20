import { error } from '@sveltejs/kit';
import { findProjectImage } from '$lib/media';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const result = findProjectImage(params.slug, params.name);
  if (!result) error(404, 'Image not found');
  return {
    slug: params.slug,
    name: params.name,
    image: result.image,
    picture: result.picture,
    projectTitle: result.project.title
  };
};
