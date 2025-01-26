import { eq, asc } from 'drizzle-orm';

import type { PageServerLoad } from './$types';

import { page } from '$app/state';

import { db } from '$lib/server/db';
import { cards, cardTypes } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
  const cardAndCardTypes = await db
    .select({
      card: cards,
      cardType: cardTypes
    })
    .from(cards)
    .innerJoin(cardTypes, eq(cards.cardTypeId, cardTypes.id))
    .where(eq(cards.userId, page.data.user.id))
    .orderBy(asc(cards.createdAt));

  return {
    cardAndCardTypes
  };
};
