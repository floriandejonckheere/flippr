import { error, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { HTTPError } from '$lib/server/errors';
import { find, update, destroy } from '$lib/server/db/actions/cardTypes';

export const load: PageServerLoad = async ({ locals, params }) => {
  try {
    const cardType = await find(params.cardTypeId, locals.user);

    return { cardType };
  } catch (e: HTTPError) {
    throw error(e.status, e.message);
  }
};

export const actions = {
  update: async ({ locals, params, request }) => {
    const data = await request.formData();

    const name = data.get('name') as string;
    const format = data.get('format') as string;
    const backgroundColor = data.get('backgroundColor') as string;
    const textColor = data.get('textColor') as string;

    try {
      await update(params.cardTypeId, locals.user, { name, format, backgroundColor, textColor });
    } catch (e: HTTPError) {
      throw error(e.status, e.message);
    }

    throw redirect(303, '/app/admin/cardTypes');
  },
  delete: async ({ locals, params }) => {
    try {
      await destroy(params.cardTypeId, locals.user);
    } catch (e: HTTPError) {
      throw error(e.status, e.message);
    }

    throw redirect(303, '/app/admin/cardTypes');
  }
}
