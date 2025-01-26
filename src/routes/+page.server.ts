import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: { locals: { user: any } }) => {
  return redirect(302, '/cards');
};
