import { fail, redirect } from '@sveltejs/kit';

import * as auth from '$lib/server/auth';

export const redirectIfNotSignedIn = (event: { locals: { user: any } }) => {
    if (!event.locals.user) {
        return redirect(302, '/auth/signin');
    }

    return { user: event.locals.user };
}

export const signout = async (event: { locals: { session: any } }) => {
    if (!event.locals.session) {
        return fail(401);
    }
    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, '/auth/signin');
}
