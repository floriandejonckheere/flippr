import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { all } from '$lib/server/db/actions/cardTypes';

export const load: PageServerLoad = async ({ locals }) => {
  const { err, data } = await all(locals.user);

  if (err) {
    throw error(err.status, err.message);
  }

  return {
    cardTypes: data
  };
};
