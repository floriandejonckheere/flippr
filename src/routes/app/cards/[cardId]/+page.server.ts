import { error, redirect } from '@sveltejs/kit';

import { eq } from 'drizzle-orm';

import type { PageServerLoad } from './$types';

import { db } from '$lib/server/db';
import type { User } from '$lib/server/db/schema';
import { cards, cardTypes } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event: { locals: { user: User } }) => {
  const cardAndCardType = await db
    .select({
      card: cards,
      cardType: cardTypes
    })
    .from(cards)
    .innerJoin(cardTypes, eq(cards.cardTypeId, cardTypes.id))
    .where(eq(cards.userId, event.locals.user.id))
    .where(eq(cards.id, event.params.cardId));

  if (cardAndCardType.length > 0) {
    return {
      cardAndCardType: cardAndCardType[0]
    };
  }

  error(404, 'Not found');
};

export const actions = {
  delete: async (event: { locals: { user: User } }) => {
    await db
      .delete(cards)
      .where(eq(cards.userId, event.locals.user.id))
      .where(eq(cards.id, event.params.cardId));

    throw redirect(303, '/app/cards');
  }
}
