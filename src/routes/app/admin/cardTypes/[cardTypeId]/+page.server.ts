import { error, redirect } from '@sveltejs/kit';

import { eq } from 'drizzle-orm';

import type { PageServerLoad } from './$types';

import { db } from '$lib/server/db';
import type { User } from '$lib/server/db/schema';
import { cardTypes } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event: { locals: { user: User } }) => {
  const cardType = await db
    .select()
    .from(cardTypes)
    .where(eq(cardTypes.id, event.params.cardTypeId));

  if (cardType.length > 0) {
    return {
      cardType: cardType[0]
    };
  }

  error(404, 'Not found');
};

export const actions = {
  update: async ({ params, request }) => {
    const data = await request.formData();

    const name = data.get('name') as string;
    const format = data.get('format') as string;
    const backgroundColor = data.get('backgroundColor') as string;
    const textColor = data.get('textColor') as string;

    await db
      .update(cardTypes)
      .set({
        name,
        format,
        backgroundColor,
        textColor,
      })
      .where(eq(cardTypes.id, params.cardTypeId));

    throw redirect(303, '/app/admin/cardTypes');
  },
  delete: async (event: { locals: { user: User } }) => {
    await db
      .delete(cardTypes)
      .where(eq(cardTypes.id, event.params.cardTypeId));

    throw redirect(303, '/app/admin/cardTypes');
  }
}
