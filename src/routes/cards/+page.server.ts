import type { PageServerLoad } from './$types';

import { redirectIfNotSignedIn } from '$lib/auth';

export const load: PageServerLoad = async (event: { locals: { user: any } }) => {
  redirectIfNotSignedIn(event);
};
