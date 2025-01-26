import type { Actions, PageServerLoad } from './$types';

import { redirectIfNotSignedIn, signout } from '$lib/auth';

export const load: PageServerLoad = async (event: { locals: { user: any } }) => {
  redirectIfNotSignedIn(event);
};

export const actions: Actions = {
  default: signout
};
