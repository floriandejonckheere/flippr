import { error, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { find, destroy } from '$lib/server/db/actions/cards';

export const load: PageServerLoad = async ({ locals, params }) => {
  const { err, data } = await find(params.cardId, locals.user);

  if (err) {
    throw error(err.status, err.message);
  }

  return { cardAndCardType: data };
};

export const actions = {
  delete: async ({ locals, params }) => {
    const { err } = await destroy(params.cardId, locals.user);

    if (err) {
      throw error(err.status, err.message);
    }

    throw redirect(303, '/app/cards');
  }
}
