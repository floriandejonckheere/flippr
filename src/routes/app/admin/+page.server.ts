import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import type { User } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event: { locals: { user: User } }) => {
  if (!event.locals.user) {
    return redirect(302, '/auth/signin');
  }

  if (!event.locals.user.admin) {
    return redirect(302, '/app/cards');
  }

  return { user: event.locals.user };
};
