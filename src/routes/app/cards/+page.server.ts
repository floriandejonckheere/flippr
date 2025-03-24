import { error } from '@sveltejs/kit';

import { all } from '$lib/server/db/actions/cards';

export const load = async ({ locals }) => {
  const { err, data } = await all(locals.user);
console.log(data);

  if (err) {
    throw error(err.status, err.message);
  }

  return { cardAndCardTypes: data };
};
