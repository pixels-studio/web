import { error, redirect } from '@sveltejs/kit';
import { imagesFor, mediaNameFor, projects } from '$lib/media';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const index = Number(params.index);
  if (!Number.isInteger(index) || index < 0) error(404, 'Image not found');
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) error(404, 'Image not found');
  const image = imagesFor(project)[index];
  if (!image) error(404, 'Image not found');
  redirect(308, `/m/${project.slug}/${mediaNameFor(project.slug, image.src)}`);
};
