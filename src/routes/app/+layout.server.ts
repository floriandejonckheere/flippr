import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: { locals: { user: any } }) => {
  if (!event.locals.user) {
    return redirect(302, '/auth/signin');
  }
  return { user: event.locals.user };
};
