import { error } from '@sveltejs/kit';

import { HTTPError } from '$lib/server/errors';
import { all } from '$lib/server/db/actions/cards';

export const load = async ({ locals }) => {
  try {
    const cardAndCardTypes = await all(locals.user);

    return { cardAndCardTypes };
  } catch (e: HTTPError) {
    throw error(e.status, e.message);
  }
};
