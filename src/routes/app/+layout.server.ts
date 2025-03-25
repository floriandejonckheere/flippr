import { redirect } from '@sveltejs/kit';

import type { User } from '$lib/server/db/types';

export const load = async (event: { locals: { user: User } }) => {
  if (!event.locals.user) {
    return redirect(302, '/auth/signin');
  }
  return { user: event.locals.user };
};
