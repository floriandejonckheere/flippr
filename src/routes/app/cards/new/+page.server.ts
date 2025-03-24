import { type Actions, error, fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import * as cardTypes from '$lib/server/db/actions/cardTypes';
import * as cards from '$lib/server/db/actions/cards';

export const load: PageServerLoad = async ({ locals }) => {
  const { err, data } = await cardTypes.all(locals.user);

  if (err) {
    throw error(err.status, err.message);
  }

  return {
    cardTypes: data
  };
};

export const actions: Actions = {
  create: async ({ locals, request }) => {
    const formData = await request.formData();
    const cardTypeId = formData.get('cardTypeId') as string;
    const value = formData.get('value') as string;

    if (!locals.user) {
      throw error(401, 'Unauthorized');
    }

    const cardData = {
      userId: locals.user.id,
      cardTypeId,
      value
    };

    const { err, data } = await cards.create(cardData, locals.user);

    if (err) {
      throw error(err.status, err.message);
    }

    return redirect(302, `/app/cards/${data}`);
  }
};
