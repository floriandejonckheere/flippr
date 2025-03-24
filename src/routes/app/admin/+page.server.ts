import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    return redirect(302, '/auth/signin');
  }

  if (!locals.user.admin) {
    return redirect(302, '/app/cards');
  }

  return { user: locals.user };
};
