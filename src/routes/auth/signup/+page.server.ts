import { v4 as uuidv4 } from 'uuid';

import { hash } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, '/app/cards');
  }
  return {};
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');
    const username = formData.get('username');
    const name = formData.get('name');
    const password = formData.get('password');

    if (!validateEmail(email)) {
      return fail(400, { message: 'Invalid email' });
    }
    if (!validateUsername(username)) {
      return fail(400, { message: 'Invalid username' });
    }
    if (!validateName(name)) {
      return fail(400, { message: 'Invalid name' });
    }
    if (!validatePassword(password)) {
      return fail(400, { message: 'Invalid password' });
    }

    const userId = uuidv4();
    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });

    try {
      await db.insert(table.user).values({ id: userId, email, username, name, passwordHash });

      const sessionToken = auth.generateSessionToken();
      const session = await auth.createSession(sessionToken, userId);
      auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (e) {
      console.error(e);

      return fail(500, { message: 'An error has occurred' });
    }
    return redirect(302, '/app/cards');
  }
};

function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.indexOf('@') !== -1 && email.length <= 255;
}

function validateUsername(username: unknown): username is string {
  return (
    typeof username === 'string' && username.length >= 3 && username.length <= 31 && /^[a-z0-9_-]+$/.test(username)
  );
}

function validatePassword(password: unknown): password is string {
  return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

function validateName(name: unknown): name is string {
  return typeof name === 'string' && name.length >= 1 && name.length <= 255;
}
