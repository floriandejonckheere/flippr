import {error, fail, redirect} from '@sveltejs/kit';
import type { Actions } from './$types';

import * as auth from '$lib/server/auth';

import { update } from '$lib/server/db/actions/users';

export const actions: Actions = {
  signout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, '/auth/signin');
  },
  update: async ({ locals, params, request }) => {
    const data = await request.formData();

    const name = data.get('name') as string;
    const password = data.get('password') as string;
    const passwordConfirmation = data.get('passwordConfirmation') as string;

    if (password !== passwordConfirmation) {
      return fail(400, {
        message: 'Passwords do not match',
      });
    }

    const userData = {
      name,
      password,
    }

    const { err } = await update(params.id, userData, locals.user);

    if (err) {
      throw error(err.status, err.message);
    }

    throw redirect(303, '/app');
  }
};
