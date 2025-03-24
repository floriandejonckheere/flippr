import { error, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { find, update, destroy } from '$lib/server/db/actions/cardTypes';

export const load: PageServerLoad = async ({ locals, params }) => {
  const { err, data } = await find(params.cardTypeId, locals.user);

  if (err) {
    throw error(err.status, err.message);
  }

  return { cardType: data };
};

export const actions = {
  update: async ({ locals, params, request }) => {
    const data = await request.formData();

    const name = data.get('name') as string;
    const format = data.get('format') as string;
    const backgroundColor = data.get('backgroundColor') as string;
    const textColor = data.get('textColor') as string;
    const image = data.get('image') as File;

    const cardTypeData = {
      name,
      format,
      backgroundColor,
      textColor,
      image
    }

    const { err } = await update(params.cardTypeId, cardTypeData, locals.user);

    if (err) {
      throw error(err.status, err.message);
    }

    throw redirect(303, '/app/admin/cardTypes');
  },
  delete: async ({ locals, params }) => {
    const { err } = await destroy(params.cardTypeId, locals.user);

    if (err) {
      throw error(err.status, err.message);
    }

    throw redirect(303, '/app/admin/cardTypes');
  }
}
