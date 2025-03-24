import { error, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { HTTPError } from '$lib/server/errors';
import { find, destroy } from '$lib/server/db/actions/cards';

export const load: PageServerLoad = async ({ locals, params }) => {
  try {
    const cardAndCardType = await find(params.cardId, locals.user);

    return { cardAndCardType };
  } catch (e: HTTPError) {
    error(e.status, e.message);
  }
};

export const actions = {
  delete: async ({ locals, params }) => {
    try {
      await destroy(params.cardId, locals.user);
    } catch (e: HTTPError) {
      throw error(e.status, e.message);
    }

    throw redirect(303, '/app/cards');
  }
}
